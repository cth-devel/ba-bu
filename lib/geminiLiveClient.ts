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
    // Live API requires gemini-2.0-flash-exp (1.5-flash doesn't support Live API)
    this.model = config.model || 'gemini-2.0-flash-exp';
    this.systemInstruction = config.systemInstruction || '';
    this.callbacks = callbacks;
  }

  async connect(): Promise<void> {
    try {
      console.log('Connecting to Python backend WebSocket...');
      
      // Connect to Python backend WebSocket bridge
      // The backend handles token creation and Gemini Live API connection
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080';
      const wsUrl = backendUrl.replace('http://', 'ws://').replace('https://', 'wss://');
      const wsEndpoint = `${wsUrl}/ws/voice-agent`;

      console.log('Connecting to:', wsEndpoint);
      this.ws = new WebSocket(wsEndpoint);

      // Handle WebSocket events
      return new Promise((resolve, reject) => {
        let resolved = false;
        const timeout = setTimeout(() => {
          if (!resolved) {
            resolved = true;
            reject(new Error('Connection timeout - backend not responding'));
          }
        }, 10000); // 10 second timeout

        this.ws!.onopen = () => {
          console.log('✓ Connected to Python backend WebSocket');
          // Backend handles token creation and Gemini connection
          // We just wait for ready signal or start sending messages
          this.isConnectedFlag = true;
          this.reconnectAttempts = 0;
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            this.callbacks.onopen?.();
            resolve();
          }
        };

        this.ws!.onmessage = (event) => {
          try {
            // Handle both JSON and binary messages
            let message: any;
            
            if (typeof event.data === 'string') {
              message = JSON.parse(event.data);
              console.log('Received message from backend:', message);
            } else if (event.data instanceof Blob || event.data instanceof ArrayBuffer) {
              // Handle binary audio data
              this.callbacks.onmessage?.({
                data: event.data,
                type: 'audio'
              });
              return;
            } else {
              console.log('Received unknown message type');
              return;
            }

            // Handle different message types from backend
            if (message.serverContent) {
              // Gemini response forwarded by backend
              this.callbacks.onmessage?.(message);
            } else if (message.error) {
              // Error message from backend
              const error = new Error(message.error || message.message || 'Backend error');
              this.callbacks.onerror?.(error);
            } else if (message.type === 'error') {
              // Error type message
              const error = new Error(message.message || message.error || 'Backend error');
              this.callbacks.onerror?.(error);
            } else if (message.setupComplete) {
              // Setup complete
              console.log('✓ Session setup complete');
            } else {
              // Forward other messages
              this.callbacks.onmessage?.(message);
            }

          } catch (parseError: any) {
            console.error('Error parsing WebSocket message:', parseError);
            this.callbacks.onerror?.(new Error('Failed to parse server message'));
          }
        };

        this.ws!.onerror = (event) => {
          console.error('WebSocket error event:', event);
          const error = new Error('WebSocket connection error');
          this.callbacks.onerror?.(error);
          // Reject if connection hasn't been established yet
          if (!resolved && !this.isConnectedFlag) {
            resolved = true;
            clearTimeout(timeout);
            reject(error);
          }
        };

        this.ws!.onclose = (event) => {
          console.log('WebSocket closed:', event.code, event.reason || 'No reason');
          this.isConnectedFlag = false;
          
          // Log close reason for debugging
          if (event.code !== 1000) {
            console.error(`WebSocket closed unexpectedly with code ${event.code}: ${event.reason || 'No reason provided'}`);
          }

          // Reject if connection promise hasn't resolved
          if (!resolved) {
            resolved = true;
            clearTimeout(timeout);
            const closeError = new Error(`Connection closed with code ${event.code}: ${event.reason || 'Unknown reason'}`);
            reject(closeError);
          }

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
      if (audioBlob) {
        // Send audio blob directly (backend will handle conversion)
        // Option 1: Send as binary
        this.ws.send(audioBlob);
        console.log('Sending real-time audio input (binary)...');
      } else if (text) {
        // Send text as JSON
        const message = {
          realtimeInput: {
            text: text
          }
        };
        this.ws.send(JSON.stringify(message));
        console.log('Sending real-time text input:', text);
      }

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
