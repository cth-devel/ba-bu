<!-- 6ffdedab-7939-4d9d-a9fb-54e6da582e4a f83861d1-e3db-4cb6-9bb2-8509797f11ba -->
# Live API Voice Agent - Python Backend (Based on Google's Official Examples)

## Overview

Replace broken Next.js API routes with a Python FastAPI backend service following Google's official Live API native audio implementation patterns from [generative-ai repository](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_live_api_native_audio.ipynb). The Python service will handle ephemeral token generation, native audio WebSocket connections, and integrate BaBu knowledge base for system instructions.

## Architecture

- **Python Backend**: FastAPI service with WebSocket support following Google's patterns
- **WebSocket Bridge**: Bidirectional native audio streaming (frontend ↔ backend ↔ Gemini Live API)
- **Knowledge Base**: BaBu-specific system instructions loaded from knowledge-base/ directory
- **Next.js Frontend**: Updated to connect to Python backend via WebSocket/HTTP

## Implementation Steps

### 1. Python Backend Service Setup

**Directory Structure:**

```
voice-agent-service/
  main.py                 # FastAPI application entry point
  requirements.txt        # Python dependencies
  services/
    token_service.py      # Ephemeral token generation using google-generativeai
    live_api_service.py   # WebSocket handler for Live API
    knowledge_base.py     # Load and format BaBu knowledge base
  models/
    token_request.py      # Request/response models
  config.py               # Configuration settings
  .env                    # Environment variables
  README.md               # Setup instructions
```

**Dependencies (requirements.txt):**

```
fastapi>=0.104.0
websockets>=12.0
uvicorn[standard]>=0.24.0
google-generativeai>=0.3.0
python-dotenv>=1.0.0
aiofiles>=23.2.0
```

### 2. Ephemeral Token Generation

**Reference**: Google's token creation patterns from `intro_live_api_native_audio.ipynb`

**File**: `services/token_service.py`

- Use `google.generativeai` SDK to create ephemeral tokens
- Call `AuthTokenService.CreateToken` API
- Configure token with:
  - Expiration: 1 hour from creation
  - New session expiration: 60 seconds
  - Uses: 1 (single use)
  - `bidiGenerateContentSetup` with:
    - Model: `gemini-2.0-flash-exp` or `gemini-1.5-flash`
    - `responseModalities`: `["AUDIO", "TEXT"]` for native audio
    - `speechConfig` with voice configuration (e.g., "Aoede")
    - `systemInstruction` from BaBu knowledge base

**Implementation Pattern:**

```python
# Following Google's notebook patterns
import google.generativeai as genai

async def create_ephemeral_token(system_instruction: str):
    # Use SDK to create token with bidiGenerateContentSetup
    # Return token for frontend use
    pass
```

### 3. Knowledge Base Integration

**File**: `services/knowledge_base.py`

- Copy `knowledge-base/` directory to `voice-agent-service/resources/knowledge-base/`
- Load all 11 markdown files:
  - `01-salon-information.md`
  - `02-contact-locations.md`
  - `03-services-overview.md`
  - `04-hair-care-services.md`
  - `05-skin-body-care.md`
  - `06-bridal-services.md`
  - `07-mens-grooming.md`
  - `08-pricing-guide.md`
  - `09-booking-process.md`
  - `10-faq.md`
  - `INDEX.md`
- Build comprehensive system instruction string
- Format for Live API requirements (plain text, not JSON structure)
- Cache in memory for performance
- Include BaBu-specific context:
  - Services and pricing information
  - Contact details and locations
  - Working hours and booking process
  - FAQ responses

### 4. Live API WebSocket Handler

**Reference**: Google's WebSocket implementation from notebook

**File**: `services/live_api_service.py`

- Implement bidirectional WebSocket bridge:
  - Accept client WebSocket connections from Next.js frontend
  - Connect to Gemini Live API WebSocket:

`wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?access_token={token}`

  - Forward messages bidirectionally:
    - Client → Backend → Gemini Live API (audio/text input)
    - Gemini Live API → Backend → Client (audio/text responses)
- Handle message types following Google's patterns:
  - `BidiGenerateContentSetup` (first message after connection)
  - `BidiGenerateContentRealtimeInput` (real-time audio/text)
  - `BidiGenerateContentServerContent` (model responses)
  - `setupComplete`, `turnComplete`, error handling
- Native audio streaming:
  - Accept audio blobs from frontend (WebM format)
  - Forward to Gemini Live API as binary audio data
  - Receive audio responses from Gemini
  - Stream back to frontend as binary audio data
- Handle connection lifecycle:
  - Connection establishment
  - Reconnection on errors
  - Cleanup on disconnect

### 5. FastAPI REST and WebSocket Endpoints

**File**: `main.py`

- `POST /api/token` - Create ephemeral token (returns JSON with token)
- `GET /api/health` - Health check endpoint
- `WebSocket /ws/voice-agent` - Main voice communication endpoint
- Configure CORS for Next.js frontend origin (http://localhost:3000)
- Add request logging and error handling

### 6. Update Frontend to Use Python Backend

**File**: `lib/geminiLiveClient.ts`

- Change token endpoint: `/api/gemini-live/create-token` → `http://localhost:8080/api/token`
- Connect WebSocket to: `ws://localhost:8080/ws/voice-agent`
- Remove direct Gemini API connection logic
- Update error handling for Python backend responses

**File**: `components/VoiceChatInterface.tsx`

- Update connection logic for Python backend
- Handle audio streaming via WebSocket bridge
- Improve error handling and status messages
- Ensure proper audio format handling (WebM → Gemini API)

### 7. Remove Broken Components

**Files to delete:**

- `app/api/gemini-live/ephemeral-token/route.ts` (broken REST endpoint)
- `app/api/gemini-live/create-token/route.ts` (replaced by Python service)
- `app/api/gemini-live/route.ts` (if not needed for health checks)

### 8. Remove Documentation Files

**Files to delete:**

- `LIVE_API_IMPLEMENTATION.md`
- `LIVE_API_IMPLEMENTATION_COMPLETE.md`
- `EMBEDDINGS_RAG_IMPLEMENTATION.md`
- `RAG_QUICK_START.md`
- `VOICE_ASSISTANT_SETUP.md`

### 9. Configuration and Environment

**File**: `voice-agent-service/.env`

```env
GEMINI_API_KEY=your_api_key_here
PORT=8080
FRONTEND_URL=http://localhost:3000
```

**File**: `voice-agent-service/config.py`

- Load environment variables
- Configure CORS settings
- Set knowledge base path
- Configure model and voice settings

### 10. Documentation and Testing

**File**: `voice-agent-service/README.md`

- Python version requirements (Python 3.10+)
- Installation instructions (`pip install -r requirements.txt`)
- Run instructions (`uvicorn main:app --port 8080`)
- Environment setup
- Testing instructions

**Update**: Main project README with:

- Python backend service startup instructions
- Port configuration (8080)
- Development workflow (start both Next.js and Python services)

## Key Implementation Details

### Native Audio Configuration

**Following Google's patterns from notebook:**

- Use `responseModalities: ["AUDIO", "TEXT"]` for native audio support
- Configure `speechConfig` with appropriate voice (e.g., "Aoede", "Charon", "Fenrir", "Kore", "Puck")
- Handle audio format: Native audio from Gemini, WebM from frontend
- Process audio responses efficiently (streaming)

### WebSocket Message Handling

**Based on Google's examples:**

- Send `BidiGenerateContentSetup` message immediately after WebSocket connection
- Handle real-time input streaming (don't wait for complete audio)
- Process server content chunks (text and audio) as they arrive
- Manage turn completion and session lifecycle properly
- Handle activity detection (activityStart/activityEnd)

### Knowledge Base Integration

- Load all markdown files from `resources/knowledge-base/`
- Build comprehensive system instruction string
- Include BaBu-specific context:
  - Service categories and pricing
  - Booking information
  - Contact details and locations
  - Working hours and FAQ
- Format for Live API (plain text system instruction)

## Files to Create

**New Files:**

- `voice-agent-service/main.py`
- `voice-agent-service/services/token_service.py`
- `voice-agent-service/services/live_api_service.py`
- `voice-agent-service/services/knowledge_base.py`
- `voice-agent-service/models/token_request.py`
- `voice-agent-service/config.py`
- `voice-agent-service/requirements.txt`
- `voice-agent-service/.env.example`
- `voice-agent-service/README.md`
- `voice-agent-service/resources/knowledge-base/` (copy all MD files)

**Files to Modify:**

- `lib/geminiLiveClient.ts` - Update endpoints to Python backend
- `components/VoiceChatInterface.tsx` - Update connection logic

**Files to Delete:**

- `app/api/gemini-live/ephemeral-token/route.ts`
- `app/api/gemini-live/create-token/route.ts`
- `app/api/gemini-live/route.ts` (if not needed)
- `LIVE_API_IMPLEMENTATION.md`
- `LIVE_API_IMPLEMENTATION_COMPLETE.md`
- `EMBEDDINGS_RAG_IMPLEMENTATION.md`
- `RAG_QUICK_START.md`
- `VOICE_ASSISTANT_SETUP.md`

## Testing Strategy

1. Test Python service startup and health endpoint
2. Test ephemeral token generation endpoint
3. Test WebSocket connection (frontend ↔ Python ↔ Gemini)
4. Test audio streaming bidirectionally
5. Test BaBu knowledge integration in responses
6. Test error handling and reconnection
7. Verify low-latency communication
8. Test with actual voice input/output

### To-dos

- [ ] Create ClickUp task for Missing Blog Post Pages (High Priority)
- [ ] Create ClickUp task for ToniGuyFooter Wrong Links (High Priority)
- [ ] Create ClickUp task for Sitemap Missing /aboutus Page (Medium Priority)
- [ ] Create ClickUp task for Hardcoded WhatsApp Number (Medium Priority)
- [ ] Create ClickUp task for Blog Post Images Verification (Low Priority)
- [ ] Create Java Spring Boot service structure and configuration files
- [ ] Integrate Java Gen AI SDK and implement TokenService for ephemeral token generation
- [ ] Copy knowledge base to Java service and create KnowledgeBaseService to load and format system instructions
- [ ] Implement LiveApiService with WebSocket bridge between frontend and Gemini Live API
- [ ] Create REST controller with /api/token and /ws/voice-agent endpoints
- [ ] Update geminiLiveClient.ts and VoiceChatInterface.tsx to connect to Java backend
- [ ] Delete app/api/gemini-live/ephemeral-token/route.ts and create-token/route.ts
- [ ] Delete LIVE_API_IMPLEMENTATION.md, LIVE_API_IMPLEMENTATION_COMPLETE.md, EMBEDDINGS_RAG_IMPLEMENTATION.md, RAG_QUICK_START.md, VOICE_ASSISTANT_SETUP.md