// Server-side API route for Gemini Live API
// Handles secure API key management and proxy requests

import { NextRequest, NextResponse } from 'next/server';
import { createSystemInstruction } from '@/config/voiceAssistantContext';

export async function GET(request: NextRequest) {
  try {
    // Return system instruction for client
    const systemInstruction = createSystemInstruction();

    return NextResponse.json({
      success: true,
      systemInstruction,
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || 'gemini-2.5-flash-native-audio-preview-09-2025',
    });
  } catch (error) {
    console.error('Error fetching system instruction:', error);
    return NextResponse.json(
      { error: 'Failed to fetch system instruction' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    // This endpoint can be used for server-side proxy requests
    // For client-to-server architecture, ephemeral tokens should be used instead
    
    // Placeholder for future server-side proxy implementation
    // Currently using client-to-server with ephemeral tokens for better performance

    return NextResponse.json({
      success: true,
      message: 'Gemini Live API endpoint ready',
    });
  } catch (error) {
    console.error('Error in Gemini Live API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

