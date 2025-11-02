// Audio utilities for handling audio capture and conversion
// Converts audio to 16-bit PCM, 16kHz, mono format for Gemini Live API

/**
 * Converts audio buffer to 16-bit PCM, 16kHz, mono format
 * @param audioBuffer - Web Audio API AudioBuffer
 * @returns Base64 encoded PCM audio data
 */
export const convertAudioToPCM = async (audioBuffer: AudioBuffer): Promise<string> => {
  // Target format: 16-bit PCM, 16kHz, mono
  const targetSampleRate = 16000;
  const targetChannels = 1;

  // Resample if needed
  const offlineContext = new OfflineAudioContext(
    targetChannels,
    audioBuffer.duration * targetSampleRate,
    targetSampleRate
  );

  const source = offlineContext.createBufferSource();
  const buffer = await offlineContext.createBuffer(
    audioBuffer.numberOfChannels,
    audioBuffer.length,
    audioBuffer.sampleRate
  );

  // Copy audio data
  for (let channel = 0; channel < audioBuffer.numberOfChannels; channel++) {
    buffer.getChannelData(channel).set(audioBuffer.getChannelData(channel));
  }

  source.buffer = buffer;
  source.connect(offlineContext.destination);
  source.start(0);

  const resampledBuffer = await offlineContext.startRendering();

  // Convert to mono if needed
  let monoData: Float32Array;
  if (resampledBuffer.numberOfChannels === 1) {
    monoData = resampledBuffer.getChannelData(0);
  } else {
    // Mix channels to mono
    const left = resampledBuffer.getChannelData(0);
    const right = resampledBuffer.getChannelData(1);
    monoData = new Float32Array(left.length);
    for (let i = 0; i < left.length; i++) {
      monoData[i] = (left[i] + right[i]) / 2;
    }
  }

  // Convert to 16-bit PCM
  const pcm16 = new Int16Array(monoData.length);
  for (let i = 0; i < monoData.length; i++) {
    const sample = Math.max(-1, Math.min(1, monoData[i]));
    pcm16[i] = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
  }

  // Convert to Base64
  const pcmBuffer = pcm16.buffer;
  const bytes = new Uint8Array(pcmBuffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

/**
 * Converts base64 PCM audio data to AudioBuffer for playback
 * @param base64Audio - Base64 encoded PCM audio (24kHz output from Gemini)
 * @param sampleRate - Sample rate (default: 24000 for Gemini output)
 * @returns AudioBuffer ready for playback
 */
export const convertPCMToAudioBuffer = async (
  base64Audio: string,
  sampleRate: number = 24000
): Promise<AudioBuffer> => {
  // Decode base64
  const binaryString = atob(base64Audio);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Convert to Int16Array
  const int16Array = new Int16Array(bytes.buffer);

  // Convert to Float32Array
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / 32768.0;
  }

  // Create AudioBuffer
  const audioContext = new AudioContext({ sampleRate });
  const audioBuffer = audioContext.createBuffer(1, float32Array.length, sampleRate);
  audioBuffer.getChannelData(0).set(float32Array);

  return audioBuffer;
};

/**
 * Plays audio buffer through Web Audio API
 * @param audioBuffer - AudioBuffer to play
 */
export const playAudioBuffer = (audioBuffer: AudioBuffer): void => {
  const audioContext = new AudioContext({ sampleRate: audioBuffer.sampleRate });
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
};

/**
 * Checks if browser supports required audio APIs
 * @returns boolean indicating browser support
 */
export const checkAudioSupport = (): boolean => {
  return (
    typeof AudioContext !== 'undefined' ||
    typeof (window as any).webkitAudioContext !== 'undefined'
  );
};

/**
 * Requests microphone permission
 * @returns Promise<MediaStream> - Microphone stream
 */
export const requestMicrophonePermission = async (): Promise<MediaStream> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  } catch (error) {
    console.error('Error requesting microphone permission:', error);
    throw error;
  }
};

/**
 * Creates MediaRecorder from MediaStream
 * @param stream - MediaStream from microphone
 * @returns MediaRecorder
 */
export const createMediaRecorder = (stream: MediaStream): MediaRecorder => {
  const options = {
    mimeType: 'audio/webm',
    audioBitsPerSecond: 128000,
  };

  const recorder = new MediaRecorder(stream, options);
  return recorder;
};

