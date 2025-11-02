// API Route to Initialize Vector Store
// Loads knowledge base and creates embeddings

import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import { globalVectorStore } from '@/lib/embeddings/vectorStore';
import { loadKnowledgeBase } from '@/lib/embeddings/knowledgeBaseLoader';

export async function POST(request: NextRequest) {
  try {
    // Check if already initialized
    if (globalVectorStore.size() > 0) {
      return NextResponse.json({
        success: true,
        message: 'Vector store already initialized',
        documentCount: globalVectorStore.size(),
      });
    }

    // Get knowledge base path
    const knowledgeBasePath = join(process.cwd(), 'knowledge-base');

    // Load knowledge base
    await loadKnowledgeBase({
      knowledgeBasePath,
      vectorStore: globalVectorStore,
    });

    return NextResponse.json({
      success: true,
      message: 'Vector store initialized successfully',
      documentCount: globalVectorStore.size(),
    });
  } catch (error: any) {
    console.error('Error initializing vector store:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to initialize vector store' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    initialized: globalVectorStore.size() > 0,
    documentCount: globalVectorStore.size(),
  });
}

