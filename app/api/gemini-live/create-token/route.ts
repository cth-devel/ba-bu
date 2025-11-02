// Server-side endpoint to create ephemeral authentication tokens for Live API
// These tokens allow secure client-side WebSocket connections

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { createSystemInstruction } from '@/config/voiceAssistantContext';

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { model } = body;

    console.log('Creating ephemeral token for Live API...');

    // Initialize Gemini API client
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Create system instruction
    let systemInstruction: string;
    try {
      systemInstruction = createSystemInstruction();
    } catch (error) {
      console.warn('Failed to load full knowledge base, using basic instruction:', error);
      systemInstruction = 'You are a helpful assistant for BA-BU Family Salon, a beauty salon in Kerala, India. Provide friendly, accurate information about salon services, pricing, and booking.';
    }

    // Model name for Live API
    const modelName = model || 'gemini-1.5-flash';

    // Use the SDK to create an ephemeral token
    // The SDK handles the AuthTokenService.CreateToken API call
    try {
      // For Live API, we need to use the token service
      // This is done via direct API call since SDK may not have this method
      const tokenUrl = `https://generativelanguage.googleapis.com/v1beta/authTokens?key=${apiKey}`;
      
      const expireTime = new Date();
      expireTime.setHours(expireTime.getHours() + 1); // Token expires in 1 hour
      
      const newSessionExpireTime = new Date();
      newSessionExpireTime.setSeconds(newSessionExpireTime.getSeconds() + 60); // New sessions expire in 60 seconds

      // Create token request according to Live API spec
      const tokenRequest: any = {
        authToken: {
          expireTime: expireTime.toISOString(),
          newSessionExpireTime: newSessionExpireTime.toISOString(),
          bidiGenerateContentSetup: {
            model: `models/${modelName}`, // Model name must be prefixed
            generationConfig: {
              responseModalities: ['AUDIO', 'TEXT'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: 'Aoede'
                  }
                }
              }
            },
            systemInstruction: systemInstruction // Corrected: Must be a string
          },
          uses: 1
        }
      };

      console.log('Calling AuthTokenService.CreateToken with body:', JSON.stringify(tokenRequest, null, 2));
      const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenRequest),
      });

      if (!tokenResponse.ok) {
        const errorData = await tokenResponse.json();
        console.error('Token creation failed:', errorData);
        throw new Error(JSON.stringify(errorData));
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.name; // The token itself

      console.log('✓ Ephemeral token created successfully');
      console.log('Token expires:', expireTime.toISOString());

      return NextResponse.json({
        success: true,
        token: token,
        expireTime: expireTime.toISOString(),
      });

    } catch (tokenError: any) {
      console.error('Error creating ephemeral token:', tokenError);
      throw tokenError;
    }

  } catch (error: any) {
    console.error('Error in create-token endpoint:', error);
    return NextResponse.json(
      { 
        error: 'Failed to create ephemeral token',
        message: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

