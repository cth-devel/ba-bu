'use client';

import { useState, useEffect, useRef } from 'react';
import { CloseIcon } from './Icons';
import { GeminiLiveClient } from '@/lib/geminiLiveClient';
import { getSystemInstruction } from '@/lib/voiceAssistantContext';
import {
  requestMicrophonePermission,
  createMediaRecorder,
  convertAudioToPCM,
  convertPCMToAudioBuffer,
  playAudioBuffer,
  checkAudioSupport,
} from '@/lib/audioUtils';

interface VoiceChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
}

type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'listening' | 'processing' | 'speaking' | 'error';

const VoiceChatInterface = ({ isOpen, onClose }: VoiceChatInterfaceProps) => {
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [lastResponse, setLastResponse] = useState<string | null>(null);

  const clientRef = useRef<GeminiLiveClient | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const responseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) {
      cleanup();
      return;
    }

    // Check audio support
    if (!checkAudioSupport()) {
      setError('Your browser does not support audio recording. Please use a modern browser.');
      setStatus('error');
      return;
    }

    // Initialize connection when modal opens
    initializeConnection();

    return () => {
      cleanup();
    };
  }, [isOpen]);

  // Auto-scroll to response when it appears
  useEffect(() => {
    if (lastResponse && responseRef.current) {
      responseRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [lastResponse]);

  const cleanup = () => {
    if (clientRef.current) {
      clientRef.current.close();
      clientRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
    setStatus('idle');
    setLastResponse(null); // Clear response on cleanup
  };

  const initializeConnection = async () => {
    try {
      setStatus('connecting');
      setError(null);

      // Request microphone permission
      try {
        const stream = await requestMicrophonePermission();
        mediaStreamRef.current = stream;
        setHasPermission(true);

        // Create media recorder
        const recorder = createMediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          await processAudioChunks();
        };
      } catch (err) {
        setHasPermission(false);
        setError('Microphone permission denied. Please enable microphone access in your browser settings.');
        setStatus('error');
        return;
      }

      // Get system instruction
      const systemInstruction = getSystemInstruction();

      // Initialize Gemini Live client (WebSocket-based)
      // Token is obtained server-side via /api/gemini-live/create-token
      const client = new GeminiLiveClient(
        {
          model: 'gemini-1.5-flash', // Hardcode to a reliable model
          systemInstruction,
        },
        {
          onopen: () => {
            setStatus('connected');
            setError(null); // Clear any previous errors
          },
          onmessage: async (message: any) => {
            console.log('Received WebSocket message:', message);
            
            // Handle serverContent from Live API
            if (message.serverContent) {
              const { modelTurn, turnComplete } = message.serverContent;

              // Handle audio response (from Live API)
              if (modelTurn?.parts) {
                for (const part of modelTurn.parts) {
                  // Check for audio response
                  if (part.inlineData?.mimeType?.startsWith('audio/')) {
                    setStatus('speaking');
                    try {
                      // Decode base64 audio data properly
                      const base64Data = part.inlineData.data;
                      const binaryString = atob(base64Data);
                      const audioArray = new Uint8Array(binaryString.length);
                      for (let i = 0; i < binaryString.length; i++) {
                        audioArray[i] = binaryString.charCodeAt(i);
                      }

                      // Convert to AudioBuffer and play
                      const audioContext = new AudioContext();
                      const audioBuffer = await audioContext.decodeAudioData(audioArray.buffer);
                      playAudioBuffer(audioBuffer);
                      
                      if (turnComplete) {
                        setStatus('connected');
                      }
                    } catch (err) {
                      console.error('Error playing audio:', err);
                      if (turnComplete) {
                        setStatus('connected');
                      }
                    }
                  }

                  // Handle text response
                  if (part.text) {
                    const responseText = part.text;
                    console.log('AI Response chunk:', responseText);
                    
                    if (turnComplete === false) {
                      // Streaming - append chunk
                      setLastResponse((prev) => (prev || '') + responseText);
                      setStatus('speaking');
                    } else {
                      // Complete response
                      setLastResponse(responseText);
                      setStatus('speaking');
                      
                      // Show complete response for a reasonable time
                      setTimeout(() => {
                        setStatus('connected');
                      }, 5000);
                    }
                  }
                }
              }

              // Handle turn completion
              if (turnComplete && !modelTurn?.parts) {
                setStatus('connected');
              }
            }
          },
          onerror: (err: Error) => {
            setError(err.message || 'Connection error occurred');
            setStatus('error');
          },
          onclose: () => {
            setStatus('idle');
          },
        }
      );

      clientRef.current = client;
      await client.connect();
    } catch (err: any) {
      setError(err.message || 'Failed to initialize voice assistant');
      setStatus('error');
    }
  };

  const processAudioChunks = async () => {
    if (audioChunksRef.current.length === 0 || !clientRef.current) {
      console.warn('No audio chunks to process or client not ready');
      setStatus('connected');
      return;
    }

    try {
      setStatus('processing');
      setLastResponse(null); // Clear previous response
      console.log('Processing audio chunks:', audioChunksRef.current.length);

      // Combine audio chunks into blob
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      audioChunksRef.current = [];

      console.log('Audio blob created, sending to Live API via WebSocket...');

      // Send to Gemini Live API via WebSocket
      if (clientRef.current.isConnected()) {
        try {
          // Send audio blob directly to Live API
          await clientRef.current.sendRealtimeInput(audioBlob);
          setStatus('processing'); // Keep as 'processing' until response arrives
          console.log('Audio sent via WebSocket, waiting for response...');
        } catch (sendError: any) {
          console.error('Error sending audio:', sendError);
          setError(`Failed to send audio: ${sendError.message}`);
          setStatus('error');
        }
      } else {
        console.error('Client not connected');
        setError('Connection lost. Please try again.');
        setStatus('error');
      }
    } catch (err: any) {
      console.error('Error processing audio:', err);
      setError(err.message || 'Error processing audio');
      setStatus('error');
    }
  };

  const handleStartRecording = () => {
    if (!mediaRecorderRef.current) {
      setError('Microphone not ready. Please wait for initialization.');
      return;
    }
    
    if (!clientRef.current?.isConnected()) {
      setError('Not connected yet. Please wait for connection to complete.');
      setStatus('connecting');
      return;
    }

    try {
      audioChunksRef.current = [];
      mediaRecorderRef.current.start(100); // Collect data every 100ms
      setIsRecording(true);
      setStatus('listening');
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to start recording');
      setStatus('error');
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatus('processing');
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleClose = () => {
    cleanup();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-3xl max-w-md sm:max-w-lg w-full max-h-[90vh] overflow-hidden relative shadow-2xl border border-gray-100 flex flex-col">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-10 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-all duration-200"
          aria-label="Close voice assistant"
          tabIndex={0}
        >
          <CloseIcon className="w-6 h-6 text-gray-500" />
        </button>

        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 font-gunteerz tracking-wider">
              Voice Assistant
            </h3>
            <p className="text-sm sm:text-base text-gray-600 tracking-wider">
              Ask me about our services, pricing, or book an appointment
            </p>
          </div>

          {/* Status Indicator */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center gap-3">
              <div
                className={`w-3 h-3 rounded-full ${
                  status === 'connected' || status === 'listening'
                    ? 'bg-green-500 animate-pulse'
                    : status === 'connecting' || status === 'processing'
                    ? 'bg-yellow-500 animate-pulse'
                    : status === 'error'
                    ? 'bg-red-500'
                    : 'bg-gray-400'
                }`}
              />
              <span className="text-sm font-medium text-gray-700 capitalize">
                {status === 'idle' && 'Ready to connect'}
                {status === 'connecting' && 'Connecting...'}
                {status === 'connected' && 'Connected'}
                {status === 'listening' && 'Listening...'}
                {status === 'processing' && 'Processing...'}
                {status === 'speaking' && 'Speaking...'}
                {status === 'error' && 'Error'}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* AI Response Message */}
          {lastResponse && (
            <div ref={responseRef} className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <p className="text-xs text-blue-600 font-medium mb-1">AI Response:</p>
              <p className="text-sm text-blue-900">{lastResponse}</p>
            </div>
          )}

          {/* Permission Denied Message */}
          {hasPermission === false && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
              <p className="text-sm text-yellow-700">
                Microphone permission is required. Please enable microphone access in your browser settings and refresh the page.
              </p>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col gap-4">
            {status === 'connected' && !isRecording && (
              <button
                onClick={handleStartRecording}
                className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                aria-label="Start recording"
              >
                <span className="w-3 h-3 bg-white rounded-full"></span>
                Start Speaking
              </button>
            )}

            {isRecording && (
              <button
                onClick={handleStopRecording}
                className="w-full px-6 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 animate-pulse"
                aria-label="Stop recording"
              >
                <span className="w-3 h-3 bg-white rounded-full animate-pulse"></span>
                Stop & Send
              </button>
            )}

            {status === 'error' && (
              <button
                onClick={initializeConnection}
                className="w-full px-6 py-4 bg-gray-600 text-white font-bold rounded-xl hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                aria-label="Retry connection"
              >
                Retry Connection
              </button>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs sm:text-sm text-gray-600 text-center">
                {status === 'connected' && 'Click "Start Speaking" to begin voice interaction'}
                {status === 'listening' && 'Speak clearly into your microphone'}
                {status === 'processing' && 'Processing your request...'}
                {status === 'speaking' && 'Voice assistant is speaking...'}
                {status === 'connecting' && 'Establishing connection...'}
                {status === 'error' && 'Click "Retry Connection" to try again'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChatInterface;

