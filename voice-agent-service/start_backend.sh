#!/bin/bash
# Script to start the voice agent backend service

cd "$(dirname "$0")"

echo "Starting BaBu Voice Agent Backend..."
echo "Port: 8080"
echo "Model: gemini-2.0-flash-exp"
echo ""
echo "Make sure you have:"
echo "1. GEMINI_API_KEY set in .env.local (project root)"
echo "2. All dependencies installed: pip install -r requirements.txt"
echo ""
echo "Starting service..."
echo ""

python3 main.py



