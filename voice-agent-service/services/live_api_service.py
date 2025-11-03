"""
Live API Service
WebSocket bridge between frontend and Gemini Live API
Following Google's official implementation patterns
"""
import json
import asyncio
import websockets
from typing import Dict, Any, Callable
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from config import GEMINI_API_KEY


class LiveApiWebSocketBridge:
    """
    Bidirectional WebSocket bridge between frontend and Gemini Live API.
    
    Reference: Google's intro_live_api_native_audio.ipynb patterns
    """
    
    def __init__(self, auth_token: str = None):
        # Accept either ephemeral token or API key
        from config import GEMINI_API_KEY
        self.auth_token = auth_token or GEMINI_API_KEY
        self.client_ws = None
        self.gemini_ws = None
        # Use token in access_token parameter, or key if it's an API key
        # Try token first (ephemeral), fallback to key (API key)
        if len(self.auth_token) < 100:
            # Likely API key - use ?key= parameter
            self.gemini_url = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key={self.auth_token}"
        else:
            # Likely ephemeral token - use ?access_token= parameter
            self.gemini_url = f"wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?access_token={self.auth_token}"
        self.is_connected = False
    
    async def connect_to_gemini(self) -> None:
        """Connect to Gemini Live API WebSocket."""
        try:
            print(f"Connecting to Gemini at: {self.gemini_url.split('?')[0]}...")
            self.gemini_ws = await websockets.connect(
                self.gemini_url,
                ping_interval=None,  # Disable ping for Live API
                close_timeout=10
            )
            self.is_connected = True
            print("✓ Connected to Gemini Live API WebSocket")
            
            # Send setup message immediately after connection
            try:
                await self.send_setup_message()
                print("✓ Setup message sent to Gemini")
            except Exception as setup_err:
                print(f"✗ Error sending setup message: {setup_err}")
                raise
        except websockets.exceptions.InvalidStatusCode as e:
            print(f"✗ Gemini WebSocket connection failed with status {e.status_code}")
            print(f"  Response headers: {e.headers}")
            raise Exception(f"Gemini API connection failed: HTTP {e.status_code}")
        except Exception as e:
            print(f"✗ Error connecting to Gemini Live API: {e}")
            import traceback
            traceback.print_exc()
            raise
    
    async def send_to_gemini(self, message: Dict[str, Any]) -> None:
        """Send message to Gemini Live API."""
        if not self.gemini_ws or not self.is_connected:
            raise Exception("Not connected to Gemini Live API")
        
        try:
            await self.gemini_ws.send(json.dumps(message))
        except Exception as e:
            print(f"Error sending message to Gemini: {e}")
            raise
    
    async def receive_from_gemini(self) -> Dict[str, Any]:
        """Receive message from Gemini Live API."""
        if not self.gemini_ws or not self.is_connected:
            raise Exception("Not connected to Gemini Live API")
        
        try:
            message = await self.gemini_ws.recv()
            return json.loads(message)
        except Exception as e:
            print(f"Error receiving message from Gemini: {e}")
            raise
    
    async def handle_client_message(self, message: Dict[str, Any]) -> None:
        """Handle message from frontend client."""
        if "setup" in message:
            # Forward setup message to Gemini
            await self.send_to_gemini(message)
        elif "realtimeInput" in message:
            # Forward real-time input to Gemini
            await self.send_to_gemini(message)
        elif "clientContent" in message:
            # Forward client content to Gemini
            await self.send_to_gemini(message)
        else:
            print(f"Unknown message type from client: {message}")
    
    async def forward_gemini_response(self, response: Dict[str, Any]) -> None:
        """Forward Gemini response to frontend client."""
        if self.client_ws:
            try:
                # Check if response contains audio data
                if "serverContent" in response:
                    server_content = response["serverContent"]
                    if "modelTurn" in server_content:
                        parts = server_content["modelTurn"].get("parts", [])
                        for part in parts:
                            # Check for inline audio data
                            if "inlineData" in part and part["inlineData"].get("mimeType", "").startswith("audio/"):
                                # Send audio data as binary
                                import base64
                                audio_data = base64.b64decode(part["inlineData"]["data"])
                                await self.client_ws.send_bytes(audio_data)
                                continue
                
                # Send text/JSON response
                await self.client_ws.send_text(json.dumps(response))
            except Exception as e:
                print(f"Error forwarding response to client: {e}")
    
    async def bridge_messages(self, client_ws) -> None:
        """
        Bridge messages between frontend and Gemini Live API.
        
        This runs two concurrent tasks:
        1. Forward client messages to Gemini
        2. Forward Gemini responses to client
        """
        self.client_ws = client_ws
        
        # Connect to Gemini
        try:
            await self.connect_to_gemini()
        except Exception as gemini_error:
            # If Gemini connection fails, send error to client and raise
            print(f"Failed to connect to Gemini: {gemini_error}")
            if self.client_ws:
                try:
                    await self.client_ws.send_text(json.dumps({
                        "error": str(gemini_error),
                        "message": str(gemini_error),
                        "type": "error"
                    }))
                except:
                    pass
            raise
        
        # Create tasks for bidirectional forwarding
        print("Starting bidirectional message forwarding...")
        client_to_gemini = asyncio.create_task(self._forward_client_to_gemini())
        gemini_to_client = asyncio.create_task(self._forward_gemini_to_client())
        
        # Wait for either task to complete (connection closed)
        done, pending = await asyncio.wait(
            [client_to_gemini, gemini_to_client],
            return_when=asyncio.FIRST_COMPLETED
        )
        
        # Cancel pending tasks
        for task in pending:
            task.cancel()
            try:
                await task
            except asyncio.CancelledError:
                pass
        
        # Cleanup
        await self.close()
    
    async def _forward_client_to_gemini(self) -> None:
        """Forward messages from client to Gemini."""
        try:
            print("Starting client-to-Gemini forwarding loop...")
            while self.is_connected and self.client_ws and self.gemini_ws:
                try:
                    # FastAPI WebSocket: check message type
                    # We need to use receive() which returns a dict
                    msg = await self.client_ws.receive()
                    print(f"Received message from client: {msg.get('type', 'unknown')}")
                    
                    if msg["type"] == "websocket.receive":
                        if "text" in msg:
                            # Text/JSON message
                            message = msg["text"]
                            print(f"Text message from client: {message[:100]}...")
                            try:
                                message_data = json.loads(message)
                                await self.handle_client_message(message_data)
                            except json.JSONDecodeError as e:
                                print(f"Invalid JSON from client: {e}")
                        elif "bytes" in msg:
                            # Binary audio data
                            audio_data = msg["bytes"]
                            print(f"Binary audio data from client: {len(audio_data)} bytes")
                            await self._send_audio_to_gemini(audio_data)
                    elif msg["type"] == "websocket.disconnect":
                        print("Client WebSocket disconnected")
                        self.is_connected = False
                        break
                        
                except Exception as e:
                    print(f"Error receiving from client: {e}")
                    import traceback
                    traceback.print_exc()
                    break
        except Exception as e:
            print(f"Error forwarding client to Gemini: {e}")
            import traceback
            traceback.print_exc()
    
    async def _forward_gemini_to_client(self) -> None:
        """Forward messages from Gemini to client."""
        try:
            while self.is_connected and self.gemini_ws:
                try:
                    response = await self.receive_from_gemini()
                    print(f"Received from Gemini: {list(response.keys())}")
                    await self.forward_gemini_response(response)
                    
                    # Check for turn completion or errors
                    if response.get("error"):
                        error_msg = response.get("error", {})
                        if isinstance(error_msg, dict):
                            print(f"Gemini API error: {error_msg.get('message', error_msg)}")
                        else:
                            print(f"Gemini API error: {error_msg}")
                    if response.get("serverContent", {}).get("turnComplete"):
                        # Turn completed, wait for next message
                        print("Turn completed")
                except websockets.exceptions.ConnectionClosed as e:
                    print(f"Gemini WebSocket closed: code={e.code}, reason={e.reason}")
                    self.is_connected = False
                    break
                except Exception as e:
                    print(f"Error receiving from Gemini: {e}")
                    import traceback
                    traceback.print_exc()
                    break
        except Exception as e:
            print(f"Error forwarding Gemini to client: {e}")
            import traceback
            traceback.print_exc()
    
    async def _send_audio_to_gemini(self, audio_data: bytes) -> None:
        """Send binary audio data to Gemini."""
        import base64
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        
        message = {
            "realtimeInput": {
                "audio": {
                    "mimeType": "audio/webm",
                    "data": audio_base64
                }
            }
        }
        
        await self.send_to_gemini(message)
    
    async def send_setup_message(self) -> None:
        """Send setup message to Gemini after connection."""
        from services.knowledge_base import get_system_instruction
        from config import MODEL_NAME, VOICE_NAME
        
        # Get system instruction text
        system_instruction_text = get_system_instruction()
        
        # Format system instruction as Content object with parts
        setup_message = {
            "setup": {
                "model": f"models/{MODEL_NAME}",
                "generationConfig": {
                    "responseModalities": ["AUDIO", "TEXT"],
                    "speechConfig": {
                        "voiceConfig": {
                            "prebuiltVoiceConfig": {
                                "voiceName": VOICE_NAME
                            }
                        }
                    }
                },
                "systemInstruction": {
                    "parts": [
                        {
                            "text": system_instruction_text
                        }
                    ]
                }
            }
        }
        
        await self.send_to_gemini(setup_message)
    
    async def close(self) -> None:
        """Close all connections."""
        self.is_connected = False
        if self.gemini_ws:
            try:
                await self.gemini_ws.close()
            except:
                pass
        if self.client_ws:
            try:
                await self.client_ws.close()
            except:
                pass

