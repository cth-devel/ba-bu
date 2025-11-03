# Testing Guide for BaBu Voice Agent

## Quick Start Testing

### 1. Backend Service Status

Check if backend is running:
```bash
curl http://localhost:8080/api/health
```

Expected response:
```json
{"status":"healthy","service":"BaBu Voice Agent API"}
```

### 2. Test WebSocket Connection

Run the test script:
```bash
cd voice-agent-service
python3 test_connection.py
```

This will:
- Connect to `ws://localhost:8080/ws/voice-agent`
- Send a test message
- Wait for response

### 3. Browser Testing

1. **Start Backend** (Terminal 1):
   ```bash
   cd voice-agent-service
   python3 main.py
   ```

2. **Start Frontend** (Terminal 2):
   ```bash
   npm run dev
   ```

3. **Open Browser**:
   - Go to `http://localhost:3000`
   - Click the microphone icon (bottom right)
   - Click "Start Speaking" when connection is ready
   - Speak into microphone
   - Wait for AI response

### 4. Expected Behavior

**Connection Flow:**
1. Frontend connects to `ws://localhost:8080/ws/voice-agent`
2. Backend creates ephemeral token from Gemini API
3. Backend connects to Gemini Live API WebSocket
4. Backend sends setup message with BaBu knowledge base
5. Frontend can send audio/text messages
6. Backend forwards messages to Gemini
7. Gemini responses (audio/text) forwarded back to frontend

**Status Indicators:**
- `idle` - Ready to connect
- `connecting` - Establishing connection
- `connected` - Ready to speak
- `listening` - Recording audio
- `processing` - Sending to AI
- `speaking` - Playing AI response
- `error` - Connection or API error

### 5. Troubleshooting

**Backend not starting:**
- Check if port 8080 is available
- Verify Python dependencies are installed: `pip install -r requirements.txt`
- Check API key is set in `.env.local` (project root)

**WebSocket connection fails:**
- Verify backend is running on port 8080
- Check browser console for errors
- Ensure `NEXT_PUBLIC_BACKEND_URL` is not blocking (defaults to localhost:8080)

**Token generation fails:**
- Verify `GEMINI_API_KEY` is valid in `.env.local`
- Check API key has Live API access
- Review backend logs for specific error messages

**No audio response:**
- Check microphone permissions in browser
- Verify audio format compatibility
- Review browser console for audio playback errors

### 6. Debugging

**Backend Logs:**
```bash
cd voice-agent-service
python3 main.py
# Watch for connection logs and errors
```

**Frontend Console:**
- Open browser DevTools (F12)
- Check Console tab for connection messages
- Look for WebSocket connection status
- Check Network tab for WebSocket upgrade

**Test Token Generation:**
```bash
cd voice-agent-service
python3 -c "import asyncio; from services.token_service import create_ephemeral_token; print(asyncio.run(create_ephemeral_token()))"
```



