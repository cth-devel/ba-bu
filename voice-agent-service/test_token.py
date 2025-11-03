#!/usr/bin/env python3
"""Test token creation directly"""
import asyncio
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))

from config import GEMINI_API_KEY, MODEL_NAME, VOICE_NAME
from services.knowledge_base import get_system_instruction
import httpx
import json
from datetime import datetime, timedelta

async def test_token():
    """Test token creation"""
    print(f"API Key length: {len(GEMINI_API_KEY)}")
    print(f"Model: {MODEL_NAME}")
    print(f"Voice: {VOICE_NAME}")
    
    expire_time = datetime.utcnow() + timedelta(hours=1)
    new_session_expire_time = datetime.utcnow() + timedelta(seconds=60)
    system_instruction = get_system_instruction()
    
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
                "systemInstruction": system_instruction
            },
            "uses": 1
        }
    }
    
    token_url = f"https://generativelanguage.googleapis.com/v1beta/authTokens?key={GEMINI_API_KEY}"
    
    print(f"\nRequest URL: {token_url.split('?')[0]}...")
    print(f"Request body keys: {list(token_request['authToken'].keys())}")
    
    async with httpx.AsyncClient() as client:
        try:
            print("\nSending request...")
            response = await client.post(
                token_url,
                json=token_request,
                headers={"Content-Type": "application/json"},
                timeout=30.0
            )
            
            print(f"Response status: {response.status_code}")
            print(f"Response headers: {dict(response.headers)}")
            
            if not response.is_success:
                error_data = response.json() if response.content else {}
                print(f"\nError response: {json.dumps(error_data, indent=2)}")
                error_msg = error_data.get("error", {}).get("message", f"HTTP {response.status_code}")
                raise Exception(f"Failed to create ephemeral token: {error_msg}")
            
            token_data = response.json()
            token = token_data.get("name", "")
            print(f"\n✓ Token created successfully!")
            print(f"Token (first 50 chars): {token[:50]}...")
            
        except httpx.HTTPError as e:
            print(f"\n✗ HTTP Error: {e}")
            raise
        except Exception as e:
            print(f"\n✗ Error: {e}")
            import traceback
            traceback.print_exc()
            raise

if __name__ == "__main__":
    asyncio.run(test_token())



