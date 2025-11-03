# Quick Start Guide

## Issue: "Not Responding" or Connection Closes Immediately

If the connection closes immediately after clicking "Connect", check these:

### 1. Restart Backend Service

The backend must be restarted to pick up code changes:

```bash
# Stop old process (if running)
pkill -f "python3.*main.py"

# Start fresh
cd voice-agent-service
python3 main.py
```

Or use the startup script:
```bash
cd voice-agent-service
./start_backend.sh
```

### 2. Check Backend Logs

When you click "Connect", watch the backend terminal for:
- `Client WebSocket connected`
- `Connecting to Gemini at: ...`
- `✓ Connected to Gemini Live API WebSocket`
- `✓ Setup message sent to Gemini`

If you see errors, note them.

### 3. Check Browser Console

Open DevTools (F12) → Console tab. Look for:
- `Connecting to Python backend WebSocket...`
- `✓ Connected to Python backend WebSocket`
- Any error messages in red

### 4. Common Issues

**Backend not running:**
```bash
curl http://localhost:8080/api/health
# Should return: {"status":"healthy","service":"BaBu Voice Agent API"}
```

**Connection closes immediately:**
- Check backend terminal for Gemini connection errors
- Verify API key is correct in `.env.local`
- Model must be `gemini-2.0-flash-exp` (not 1.5-flash)

**"Connection timeout":**
- Backend is not running or not accepting connections
- Check if port 8080 is available
- Restart backend service

### 5. Test Connection

```bash
cd voice-agent-service
python3 test_websocket_direct.py
```

This tests direct Gemini connection. Should show:
```
✓ Connected to Gemini WebSocket
✓ Setup message sent
✓ Received response: {"setupComplete": {}}
```

If this works, the backend should work too.



