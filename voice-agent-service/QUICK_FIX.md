# Quick Fix for HTTP 404 Error

## Issue
Ephemeral token creation returns HTTP 404. This might mean:
1. Live API requires special access/whitelist
2. The API endpoint format has changed
3. Free tier doesn't support ephemeral tokens

## Solution
I've updated the code to fallback to using API key directly in WebSocket connection when ephemeral token creation fails.

## How It Works Now

1. **First attempt**: Try to create ephemeral token
2. **If fails**: Use API key directly in WebSocket URL with `?key=` parameter
3. **Continue**: WebSocket bridge works with either authentication method

## Testing

1. **Restart backend**:
   ```bash
   cd voice-agent-service
   python3 main.py
   ```

2. **Test in browser**:
   - Go to `http://localhost:3000`
   - Click microphone icon
   - Should connect now (may see warning about token, but connection works)

3. **Check logs**:
   - Backend will show: "Falling back to direct API key authentication"
   - This means it's using API key directly (which should work)

## Note

The Live API WebSocket can accept API key directly via `?key=` parameter in the URL. This is a valid authentication method and should work for testing.

If you need ephemeral tokens (for production security), you may need:
- Special API access from Google
- Enable Live API in your Google Cloud Console
- Contact Google support for Live API access



