# BaBu Voice Agent Service

Python FastAPI backend service for BaBu Family Salon voice assistant using Google's Gemini Live API.

## Overview

This service handles:
- Ephemeral token generation for Gemini Live API
- WebSocket bridge between frontend and Gemini Live API
- BaBu knowledge base integration for system instructions
- Real-time audio and text communication

## Prerequisites

- Python 3.10 or higher
- Google Gemini API key with Live API access
- Knowledge base files in `resources/knowledge-base/`

## Installation

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Edit `.env` and set your API key:
```env
GEMINI_API_KEY=your_api_key_here
PORT=8080
FRONTEND_URL=http://localhost:3000
```

## Running the Service

Start the service:
```bash
python main.py
```

Or with uvicorn:
```bash
uvicorn main:app --port 8080 --reload
```

The service will start on `http://localhost:8080`

## API Endpoints

### Health Check
```
GET /api/health
```

### Create Ephemeral Token
```
POST /api/token
```

Returns:
```json
{
  "success": true,
  "token": "ephemeral_token_string",
  "expireTime": "2025-01-01T12:00:00",
  "newSessionExpireTime": "2025-01-01T12:01:00"
}
```

### WebSocket Connection
```
WebSocket /ws/voice-agent
```

Connects frontend to Gemini Live API through the backend bridge.

## Development Workflow

1. Start the Python backend service:
   ```bash
   cd voice-agent-service
   python main.py
   ```

2. Start the Next.js frontend (in a separate terminal):
   ```bash
   npm run dev
   ```

3. The frontend will connect to the backend at `http://localhost:8080`

## Configuration

Edit `config.py` or `.env` file to configure:
- `GEMINI_API_KEY`: Your Google Gemini API key
- `PORT`: Service port (default: 8080)
- `FRONTEND_URL`: Frontend origin for CORS
- `MODEL_NAME`: Gemini model (default: `gemini-2.0-flash-exp`)
- `VOICE_NAME`: Voice for audio responses (default: `Aoede`)

## Knowledge Base

The service loads knowledge base files from `resources/knowledge-base/`:
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

These files are loaded and formatted into the system instruction for the voice assistant.

## Troubleshooting

### Token Creation Fails
- Verify `GEMINI_API_KEY` is set correctly in `.env`
- Check API key has Live API access
- Review error logs for specific error messages

### WebSocket Connection Issues
- Ensure frontend URL is in CORS_ORIGINS in `config.py`
- Check firewall settings for WebSocket connections
- Verify token is valid and not expired

### Knowledge Base Not Loading
- Verify knowledge base files exist in `resources/knowledge-base/`
- Check file permissions
- Review logs for file loading errors

## References

- [Google's Live API Documentation](https://ai.google.dev/api/live)
- [Google's Live API Examples](https://github.com/GoogleCloudPlatform/generative-ai/blob/main/gemini/multimodal-live-api/intro_live_api_native_audio.ipynb)

