// API Route for RAG Search
// Searches knowledge base using embeddings

import { NextRequest, NextResponse } from 'next/server';
import { globalVectorStore } from '@/lib/embeddings/vectorStore';
import { generateEmbedding } from '@/lib/embeddings/embeddingService';

export async function POST(request: NextRequest) {
  try {
    const { query, topK = 5 } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    // Generate embedding for query
    const queryEmbedding = await generateEmbedding({
      content: query,
      taskType: 'RETRIEVAL_QUERY',
    });

    // Search vector store
    const results = globalVectorStore.search(queryEmbedding, topK, 0.5);

    // Format results
    const formattedResults = results.map((result) => ({
      text: result.document.text,
      metadata: result.document.metadata,
      similarity: result.similarity,
    }));

    return NextResponse.json({
      success: true,
      results: formattedResults,
      count: formattedResults.length,
    });
  } catch (error: any) {
    console.error('Error searching knowledge base:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to search knowledge base' },
      { status: 500 }
    );
  }
}

