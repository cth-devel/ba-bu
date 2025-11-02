# Gemini Live API Implementation Status

## Current Implementation ❌

**We are NOT using WebSockets or the Live API.** We're currently using:

- **REST API** via `generateContent()` method
- **Endpoint**: `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent`
- **File**: `app/api/gemini-live/ephemeral-token/route.ts`
- **SDK**: `@google/generative-ai` (GoogleGenerativeAI)

This is the **standard text generation API**, NOT the Live API.

## What the Live API Actually Requires ✅

Based on [Google's Live API Documentation](https://ai.google.dev/api/live):

### 1. **WebSocket Connection Required**

```typescript
// WebSocket endpoint
const wsUrl = 'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent';
```

### 2. **First Message: Session Configuration**

The first message after connecting must be a `BidiGenerateContentSetup`:

```typescript
{
  "setup": {
    "model": "gemini-2.0-flash-exp",
    "generationConfig": {
      "responseModalities": ["AUDIO", "TEXT"],
      "speechConfig": {
        "voiceConfig": {
          "prebuiltVoiceConfig": {
            "voiceName": "Aoede" // or other voice
          }
        }
      }
    },
    "systemInstruction": "You are a helpful assistant..."
  }
}
```

### 3. **Ephemeral Token Authentication**

- Call `AuthTokenService.CreateToken` to get an ephemeral token
- Use token in `access_token` query parameter or `Authorization: Token {token}` header

### 4. **Real-time Messages**

Send real-time input via `BidiGenerateContentRealtimeInput`:

```typescript
{
  "realtimeInput": {
    "audio": base64EncodedAudioBlob, // For voice
    "text": "Hello", // For text
    "activityStart": {}, // Optional
    "activityEnd": {} // Optional
  }
}
```

### 5. **Receive Messages**

Listen for WebSocket messages with:
- `BidiGenerateContentServerContent` - Model responses (audio, text, tool calls)
- `TurnComplete` - When turn is finished
- `ActivityStart/ActivityEnd` - User activity detection

## How We Should Implement It

### Step 1: Create Ephemeral Token Server Endpoint

```typescript
// app/api/gemini-live/create-token/route.ts
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST() {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  // Call AuthTokenService.CreateToken
  // Return ephemeral token
}
```

### Step 2: WebSocket Client Implementation

```typescript
// lib/geminiLiveClient.ts
export class GeminiLiveClient {
  private ws: WebSocket | null = null;
  private token: string = '';

  async connect() {
    // 1. Get ephemeral token from server
    const tokenResponse = await fetch('/api/gemini-live/create-token');
    const { token } = await tokenResponse.json();
    this.token = token;

    // 2. Connect to WebSocket with token
    const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?access_token=${token}`;
    this.ws = new WebSocket(wsUrl);

    // 3. Send setup message when connected
    this.ws.onopen = () => {
      this.ws!.send(JSON.stringify({
        setup: {
          model: 'gemini-2.0-flash-exp',
          generationConfig: { /* ... */ },
          systemInstruction: '...'
        }
      }));
    };

    // 4. Handle incoming messages
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Process BidiGenerateContentServerContent
    };
  }
}
```

### Step 3: Send Real-time Audio/Text

```typescript
async sendRealtimeInput(audioBlob?: Blob, text?: string) {
  const message: any = {
    realtimeInput: {}
  };

  if (audioBlob) {
    message.realtimeInput.audio = await blobToBase64(audioBlob);
  }
  if (text) {
    message.realtimeInput.text = text;
  }

  this.ws!.send(JSON.stringify(message));
}
```

## Key Differences: Current vs. Live API

| Feature | Current (REST) | Live API (WebSocket) |
|---------|----------------|---------------------|
| **Connection** | HTTP POST requests | WebSocket (persistent) |
| **Latency** | High (request/response) | Low (real-time streaming) |
| **Audio Support** | ❌ No native support | ✅ Real-time audio streaming |
| **Interruption** | ❌ Not supported | ✅ Barge-in supported |
| **Stateful** | ❌ Stateless | ✅ Stateful sessions |
| **Authentication** | API key in header | Ephemeral token |

## Next Steps

1. ✅ Fix text input issue (done)
2. Implement ephemeral token generation endpoint
3. Replace REST API calls with WebSocket connection
4. Implement proper Live API message protocol
5. Add real-time audio streaming support
6. Test with actual WebSocket connection

