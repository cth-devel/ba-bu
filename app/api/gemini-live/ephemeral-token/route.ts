// Server-side API proxy for Gemini Live API
// This keeps the API key secure on the server

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

    // Get request body
    const body = await request.json();
    const { message, model } = body;

    // Initialize Gemini API client with basic system instruction for testing
    // Full knowledge base will be added after we verify basic connection works
    const basicSystemInstruction = 'You are a helpful assistant for BA-BU Family Salon, a beauty salon in Kerala, India. Provide friendly, accurate information about salon services, pricing, and booking.';
    
    // Initialize Gemini API client
    console.log('Initializing Gemini API client...');
    const genAI = new GoogleGenerativeAI(apiKey);
    
    console.log('Creating generative model...');
    // Try gemini-1.5-flash or gemini-pro for free tier
    const modelName = model || 'gemini-1.5-flash';
    console.log('Using model:', modelName);
    
    const generativeModel = genAI.getGenerativeModel({ 
      model: modelName,
      systemInstruction: basicSystemInstruction
    });

    console.log('Processing message via Gemini API:', message?.substring(0, 50));
    console.log('Using model:', modelName);

    // Generate content with timeout and better error handling
    console.log('Calling Gemini API with message:', message?.substring(0, 50));
    console.log('API Key length:', apiKey ? apiKey.length : 0);
    const startTime = Date.now();
    
    try {
      // Create a promise that will timeout after 20 seconds
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('API call timeout after 20 seconds')), 20000)
      );
      
      const result = await Promise.race([
        generativeModel.generateContent(message || 'Hello'),
        timeoutPromise
      ]) as any;
      
      const duration = Date.now() - startTime;
      console.log(`✓ API call completed in ${duration}ms`);
      
      const response = result.response;
      const text = response.text();
      
      console.log('✓ Gemini API response received:', text.substring(0, 100));
      console.log('✓ API call completed - check Google Cloud Console for usage');

      return NextResponse.json({
        success: true,
        response: text,
        duration: `${duration}ms`,
      });
    } catch (apiError: any) {
      const duration = Date.now() - startTime;
      console.error(`✗ API call failed after ${duration}ms:`, apiError);
      console.error('Error details:', {
        message: apiError.message,
        name: apiError.name,
        stack: apiError.stack?.substring(0, 200)
      });
      throw apiError;
    }
  } catch (error: any) {
    console.error('Error calling Gemini API:', error);
    console.error('Full error:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { 
        error: 'Failed to generate response',
        message: error.message || 'Unknown error'
      },
      { status: 500 }
    );
  }
}

