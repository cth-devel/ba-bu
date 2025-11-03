"""
FastAPI application for BaBu Voice Agent
Handles ephemeral token generation and WebSocket bridge to Gemini Live API
"""
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import json
import logging
from config import CORS_ORIGINS, PORT
from services.token_service import create_ephemeral_token
from services.live_api_service import LiveApiWebSocketBridge
from models.token_request import TokenRequest, TokenResponse, ErrorResponse

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(title="BaBu Voice Agent API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "service": "BaBu Voice Agent API"}


@app.post("/api/token", response_model=TokenResponse)
async def create_token(request: TokenRequest = None):
    """
    Create ephemeral authentication token for Gemini Live API.
    
    Returns:
        TokenResponse with token and expiration info
    """
    try:
        logger.info("Creating ephemeral token...")
        token_data = await create_ephemeral_token()
        
        logger.info("Token created successfully")
        return TokenResponse(
            success=True,
            token=token_data["token"],
            expireTime=token_data["expireTime"],
            newSessionExpireTime=token_data["newSessionExpireTime"],
        )
    except Exception as e:
        logger.error(f"Error creating token: {e}")
        raise HTTPException(
            status_code=500,
            detail={
                "error": "Failed to create ephemeral token",
                "message": str(e)
            }
        )


@app.websocket("/ws/voice-agent")
async def voice_agent_websocket(websocket: WebSocket):
    """
    WebSocket endpoint for voice agent communication.
    
    This endpoint:
    1. Accepts WebSocket connection from frontend
    2. Creates ephemeral token
    3. Establishes connection to Gemini Live API
    4. Bridges messages bidirectionally
    """
    await websocket.accept()
    logger.info("Client WebSocket connected")
    
    bridge = None
    
    try:
        # Step 1: Try to create ephemeral token (if fails, use API key directly)
        from config import GEMINI_API_KEY
        token = None
        try:
            logger.info("Creating ephemeral token for WebSocket session...")
            token_data = await create_ephemeral_token()
            token = token_data["token"]
            logger.info("Ephemeral token created successfully")
        except Exception as token_error:
            logger.warning(f"Failed to create ephemeral token: {token_error}")
            logger.info("Falling back to direct API key authentication")
            token = None
        
        # Step 2: Create WebSocket bridge (with token or API key)
        # If token creation failed, use API key directly
        auth = token if token else GEMINI_API_KEY
        bridge = LiveApiWebSocketBridge(auth)
        
        # Step 3: Bridge messages (this handles bidirectional communication)
        logger.info("Starting message bridge...")
        try:
            await bridge.bridge_messages(websocket)
        except Exception as bridge_error:
            logger.error(f"Bridge error: {bridge_error}", exc_info=True)
            # Send error to client before closing
            try:
                await websocket.send_json({
                    "error": str(bridge_error),
                    "message": str(bridge_error),
                    "type": "error"
                })
            except:
                pass
            raise
        
    except WebSocketDisconnect:
        logger.info("Client WebSocket disconnected")
    except Exception as e:
        logger.error(f"WebSocket error: {e}")
        try:
            await websocket.send_json({
                "error": str(e),
                "type": "error"
            })
        except:
            pass
    finally:
        if bridge:
            await bridge.close()
        logger.info("WebSocket connection closed")


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler."""
    logger.error(f"Unhandled exception: {exc}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal server error",
            "message": str(exc)
        }
    )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=PORT,
        reload=True,
        log_level="info"
    )

