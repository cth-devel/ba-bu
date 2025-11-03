"""
Configuration settings for the voice agent service
"""
import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
# Priority: .env.local (parent) > .env (local)
parent_env = Path(__file__).parent.parent / ".env.local"
env_path = Path(__file__).parent / ".env"

# Load .env.local first (has real API key)
if parent_env.exists():
    load_dotenv(parent_env, override=True)

# Load .env as fallback (has placeholder)
if env_path.exists():
    load_dotenv(env_path, override=False)

# API Configuration
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

# If still placeholder or empty, try direct read from .env.local
if not GEMINI_API_KEY or GEMINI_API_KEY == "your_api_key_here":
    if parent_env.exists():
        try:
            with open(parent_env, 'r') as f:
                for line in f:
                    if line.strip().startswith('GEMINI_API_KEY='):
                        api_key_value = line.split('=', 1)[1].strip().strip('"').strip("'")
                        if api_key_value and api_key_value != 'your_api_key_here':
                            GEMINI_API_KEY = api_key_value
                            break
        except Exception as e:
            print(f"Warning: Could not read API key from .env.local: {e}")
PORT = int(os.getenv("PORT", "8080"))
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# Model Configuration
# Live API requires gemini-2.0-flash-exp or similar
# gemini-1.5-flash does NOT support Live API (bidiGenerateContent)
MODEL_NAME = os.getenv("MODEL_NAME", "gemini-2.0-flash-exp")
VOICE_NAME = os.getenv("VOICE_NAME", "Aoede")  # Options: Aoede, Charon, Fenrir, Kore, Puck

# Knowledge Base Configuration
KB_BASE_PATH = Path(__file__).parent / "resources" / "knowledge-base"

# Validate configuration
if not GEMINI_API_KEY:
    print("Warning: GEMINI_API_KEY not set. Token generation will fail.")
    print("Please set GEMINI_API_KEY in .env file")

# CORS Configuration
CORS_ORIGINS = [
    FRONTEND_URL,
    "http://localhost:3000",
    "https://babusalon.com",
    "https://www.babusalon.com",
]

