// Gemini Live API Client
// WebSocket-based client for real-time voice and text interactions

export interface GeminiLiveConfig {
  model?: string;
  systemInstruction?: string;
}

export interface GeminiLiveCallbacks {
  onopen?: () => void;
  onmessage?: (message: any) => void;
  onerror?: (error: Error) => void;
  onclose?: (event: CloseEvent) => void;
}

export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private token: string = '';
  private model: string;
  private systemInstruction: string;
  private callbacks: GeminiLiveCallbacks;
  private isConnectedFlag: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 3;

  constructor(config: GeminiLiveConfig, callbacks: GeminiLiveCallbacks = {}) {
    this.model = config.model || 'gemini-1.5-flash';
    this.systemInstruction = config.systemInstruction || '';
    this.callbacks = callbacks;
  }

  async connect(): Promise<void> {
    try {
      console.log('Connecting to Gemini Live API via WebSocket...');
      console.log('Model:', this.model);

      // Step 1: Get ephemeral token from server
      console.log('Step 1: Requesting ephemeral token from server...');
      const tokenResponse = await fetch('/api/gemini-live/create-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: this.model,
        }),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        let errorMessage = errorData.error || errorData.message || `HTTP ${tokenResponse.status}`;
        try {
          if (errorMessage.startsWith('{') || errorMessage.startsWith('[')) {
            const parsed = JSON.parse(errorMessage);
            errorMessage = parsed.error?.message || parsed.message || errorMessage;
          }
        } catch (parseError) {
          // Ignore parse errors and use original message
        }
        throw new Error(errorMessage);
      }

      const tokenData = await tokenResponse.json();
      this.token = tokenData.token;

      if (!this.token) {
        throw new Error('Failed to obtain ephemeral token');
      }

      console.log('✓ Ephemeral token obtained');

      // Step 2: Connect to WebSocket with token
      console.log('Step 2: Connecting to WebSocket...');
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?access_token=${this.token}`;

      this.ws = new WebSocket(wsUrl);

      // Step 3: Handle WebSocket events
      return new Promise((resolve, reject) => {
        this.ws!.onopen = () => {
          console.log('✓ WebSocket connection opened');

          // Step 4: Send setup message (required as first message)
          console.log('Step 3: Sending session setup...');
          try {
            // Load system instruction
            let systemInstructionText = this.systemInstruction;
            if (!systemInstructionText) {
              // Try to load from context
              try {
                const { getSystemInstruction } = require('@/lib/voiceAssistantContext');
                systemInstructionText = getSystemInstruction();
              } catch (e) {
                systemInstructionText = 'You are a helpful assistant for BA-BU Family Salon.';
              }
            }

            const setupMessage = {
              setup: {
                model: this.model,
                generationConfig: {
                  responseModalities: ['AUDIO', 'TEXT'],
                  speechConfig: {
                    voiceConfig: {
                      prebuiltVoiceConfig: {
                        voiceName: 'Aoede'
                      }
                    }
                  }
                },
                systemInstruction: {
                  parts: [
                    {
                      text: systemInstructionText
                    }
                  ]
                }
              }
            };

            this.ws!.send(JSON.stringify(setupMessage));
            console.log('✓ Session setup sent');

            this.isConnectedFlag = true;
            this.reconnectAttempts = 0;
            this.callbacks.onopen?.();
            resolve();

          } catch (setupError: any) {
            console.error('Error sending setup message:', setupError);
            reject(new Error(`Setup failed: ${setupError.message}`));
          }
        };

        this.ws!.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            console.log('Received WebSocket message:', message);

            // Handle different message types
            if (message.serverContent) {
              // Model response
              this.callbacks.onmessage?.(message);
            } else if (message.error) {
              // Error message
              const error = new Error(message.error.message || 'WebSocket error');
              this.callbacks.onerror?.(error);
            } else if (message.setupComplete) {
              // Setup complete
              console.log('✓ Session setup complete');
            }

          } catch (parseError: any) {
            console.error('Error parsing WebSocket message:', parseError);
            this.callbacks.onerror?.(new Error('Failed to parse server message'));
          }
        };

        this.ws!.onerror = (event) => {
          console.error('WebSocket error:', event);
          const error = new Error('WebSocket connection error');
          this.callbacks.onerror?.(error);
          reject(error);
        };

        this.ws!.onclose = (event) => {
          console.log('WebSocket closed:', event.code, event.reason);
          this.isConnectedFlag = false;

          // Attempt to reconnect if unexpected close
          if (event.code !== 1000 && this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
            setTimeout(() => {
              this.connect().catch(() => {
                this.callbacks.onclose?.(event);
              });
            }, 2000);
          } else {
            this.callbacks.onclose?.(event);
          }
        };
      });

    } catch (error: any) {
      console.error('Error connecting to Gemini Live API:', error);
      this.isConnectedFlag = false;
      this.callbacks.onerror?.(new Error(error.message || 'Connection failed'));
      throw error;
    }
  }

  async sendRealtimeInput(audioBlob?: Blob, text?: string): Promise<void> {
    if (!this.isConnected() || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Session not connected. Call connect() first.');
    }

    try {
      const message: any = {
        realtimeInput: {}
      };

      if (audioBlob) {
        // Convert audio blob to base64
        const arrayBuffer = await audioBlob.arrayBuffer();
        const base64Audio = btoa(
          String.fromCharCode(...new Uint8Array(arrayBuffer))
        );
        message.realtimeInput.audio = {
          mimeType: audioBlob.type || 'audio/webm',
          data: base64Audio
        };
        console.log('Sending real-time audio input...');
      }

      if (text) {
        message.realtimeInput.text = text;
        console.log('Sending real-time text input:', text);
      }

      this.ws.send(JSON.stringify(message));
      console.log('✓ Real-time input sent');

    } catch (error: any) {
      console.error('Error sending real-time input:', error);
      this.callbacks.onerror?.(new Error(error.message || 'Failed to send input'));
      throw error;
    }
  }

  async sendAudio(audioData: string, mimeType: string = 'audio/pcm;rate=16000'): Promise<void> {
    if (!this.isConnected() || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Session not connected. Call connect() first.');
    }

    try {
      const audioBlob = new Blob([audioData], { type: mimeType });
      await this.sendRealtimeInput(audioBlob);
    } catch (error: any) {
      console.error('Error sending audio:', error);
      this.callbacks.onerror?.(new Error(error.message || 'Failed to send audio'));
      throw error;
    }
  }

  async sendText(text: string): Promise<void> {
    if (!this.isConnected() || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      throw new Error('Session not connected. Call connect() first.');
    }

    try {
      await this.sendRealtimeInput(undefined, text);
    } catch (error: any) {
      console.error('Error sending text:', error);
      this.callbacks.onerror?.(new Error(error.message || 'Failed to send text'));
      throw error;
    }
  }

  sendActivityStart(): void {
    if (!this.isConnected() || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      this.ws.send(JSON.stringify({
        realtimeInput: {
          activityStart: {}
        }
      }));
      console.log('Activity start signal sent');
    } catch (error: any) {
      console.error('Error sending activity start:', error);
    }
  }

  sendActivityEnd(): void {
    if (!this.isConnected() || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return;
    }

    try {
      this.ws.send(JSON.stringify({
        realtimeInput: {
          activityEnd: {}
        }
      }));
      console.log('Activity end signal sent');
    } catch (error: any) {
      console.error('Error sending activity end:', error);
    }
  }

  close(): void {
    if (this.ws) {
      this.ws.close(1000, 'Client closing connection');
      this.ws = null;
    }
    this.isConnectedFlag = false;
    this.token = '';
    this.callbacks.onclose?.(new CloseEvent('close'));
    console.log('Gemini Live API connection closed');
  }

  isConnected(): boolean {
    return this.isConnectedFlag && this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }
}
