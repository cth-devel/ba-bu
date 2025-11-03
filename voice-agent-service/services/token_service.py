"""
Token Service
Creates ephemeral authentication tokens for Gemini Live API
Following Google's official implementation patterns
"""
import json
import os
from datetime import datetime, timedelta
from typing import Dict, Any
import httpx
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from config import GEMINI_API_KEY, MODEL_NAME, VOICE_NAME
from services.knowledge_base import get_system_instruction


async def create_ephemeral_token() -> Dict[str, Any]:
    """
    Create an ephemeral authentication token for Gemini Live API.
    
    Reference: Google's intro_live_api_native_audio.ipynb patterns
    
    Returns:
        Dict with token and expiration info
    """
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured")

    # Calculate expiration times
    expire_time = datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    new_session_expire_time = datetime.utcnow() + timedelta(seconds=60)  # New sessions expire in 60 seconds

    # Get system instruction from knowledge base
    system_instruction = get_system_instruction()

    # Build token request following Google's patterns
    token_request = {
        "authToken": {
            "expireTime": expire_time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "newSessionExpireTime": new_session_expire_time.strftime("%Y-%m-%dT%H:%M:%SZ"),
            "bidiGenerateContentSetup": {
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
                            "text": system_instruction
                        }
                    ]
                }
            },
            "uses": 1  # Token can be used once
        }
    }

    # Call AuthTokenService.CreateToken API
    # Using the correct endpoint format for ephemeral tokens
    token_url = f"https://generativelanguage.googleapis.com/v1beta/authTokens?key={GEMINI_API_KEY}"
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                token_url,
                json=token_request,
                headers={"Content-Type": "application/json"},
                timeout=30.0
            )
            
            if not response.is_success:
                error_data = response.json() if response.content else {}
                error_msg = error_data.get("error", {}).get("message", f"HTTP {response.status_code}")
                raise Exception(f"Failed to create ephemeral token: {error_msg}")
            
            token_data = response.json()
            token = token_data.get("name", "")
            
            if not token:
                raise Exception("Token response did not contain a token")
            
            return {
                "token": token,
                "expireTime": expire_time.isoformat(),
                "newSessionExpireTime": new_session_expire_time.isoformat(),
            }
            
        except httpx.HTTPError as e:
            raise Exception(f"HTTP error creating token: {str(e)}")
        except Exception as e:
            raise Exception(f"Error creating ephemeral token: {str(e)}")

