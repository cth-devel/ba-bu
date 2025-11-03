#!/usr/bin/env python3
"""
Simple test script to verify backend connection
"""
import asyncio
import websockets
import json
import sys

async def test_websocket():
    """Test WebSocket connection to backend"""
    try:
        print("Testing WebSocket connection to ws://localhost:8080/ws/voice-agent...")
        uri = "ws://localhost:8080/ws/voice-agent"
        
        async with websockets.connect(uri) as websocket:
            print("✓ Connected to backend WebSocket")
            
            # Wait for any messages
            try:
                message = await asyncio.wait_for(websocket.recv(), timeout=5.0)
                print(f"✓ Received message: {message[:100]}...")
            except asyncio.TimeoutError:
                print("⚠ No message received in 5 seconds (this might be normal)")
            
            # Send a test message
            test_msg = {
                "realtimeInput": {
                    "text": "Hello, this is a test"
                }
            }
            await websocket.send(json.dumps(test_msg))
            print("✓ Sent test message")
            
            # Wait for response
            try:
                response = await asyncio.wait_for(websocket.recv(), timeout=10.0)
                print(f"✓ Received response: {str(response)[:200]}...")
            except asyncio.TimeoutError:
                print("⚠ No response received in 10 seconds")
            
            print("✓ Test completed successfully")
            
    except Exception as e:
        print(f"✗ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    asyncio.run(test_websocket())



