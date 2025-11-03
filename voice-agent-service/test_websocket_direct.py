#!/usr/bin/env python3
"""Test WebSocket connection directly to verify it works"""
import asyncio
import websockets
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from config import GEMINI_API_KEY

async def test_direct_gemini():
    """Test direct connection to Gemini with API key"""
    # Test with API key directly
    url = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key={GEMINI_API_KEY}"
    
    print(f"Testing direct connection to Gemini...")
    print(f"URL: {url.split('?')[0]}...")
    print(f"API Key length: {len(GEMINI_API_KEY)}")
    
    try:
        async with websockets.connect(url, ping_interval=None, close_timeout=10) as ws:
            print("✓ Connected to Gemini WebSocket")
            
            # Send a simple setup message (systemInstruction must be Content with parts)
            # Live API requires gemini-2.0-flash-exp or similar
            setup = {
                "setup": {
                    "model": "models/gemini-2.0-flash-exp",
                    "generationConfig": {
                        "responseModalities": ["TEXT"],
                    },
                    "systemInstruction": {
                        "parts": [
                            {
                                "text": "You are a helpful assistant."
                            }
                        ]
                    }
                }
            }
            
            print("Sending setup message...")
            await ws.send(json.dumps(setup))
            print("✓ Setup message sent")
            
            # Wait for response
            try:
                response = await asyncio.wait_for(ws.recv(), timeout=5.0)
                print(f"✓ Received response: {str(response)[:200]}...")
            except asyncio.TimeoutError:
                print("⚠ No response in 5 seconds")
                
            print("✓ Direct connection test successful!")
            
    except websockets.exceptions.InvalidStatusCode as e:
        print(f"✗ Connection failed with HTTP {e.status_code}")
        print(f"  Headers: {e.headers}")
        raise
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
        raise

if __name__ == "__main__":
    asyncio.run(test_direct_gemini())

