// RAG Service
// Retrieval Augmented Generation service for voice assistant

import { globalVectorStore } from '@/lib/embeddings/vectorStore';
import { generateEmbedding } from '@/lib/embeddings/embeddingService';
import { createSystemInstruction } from '@/config/voiceAssistantContext';

export interface RAGResponse {
  context: string;
  sources: Array<{
    text: string;
    source: string;
    section?: string;
    similarity: number;
  }>;
}

/**
 * Retrieve relevant context from knowledge base for a query
 */
export const retrieveContext = async (
  query: string,
  topK: number = 5,
  similarityThreshold: number = 0.6
): Promise<RAGResponse> => {
  try {
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding({
      content: query,
      taskType: 'RETRIEVAL_QUERY',
    });

    // Search vector store
    const results = globalVectorStore.search(queryEmbedding, topK, similarityThreshold);

    // Format context
    const context = results
      .map((result) => result.document.text)
      .join('\n\n---\n\n');

    // Format sources
    const sources = results.map((result) => ({
      text: result.document.text.substring(0, 200) + '...', // Preview
      source: result.document.metadata.source,
      section: result.document.metadata.section,
      similarity: result.similarity,
    }));

    return {
      context,
      sources,
    };
  } catch (error) {
    console.error('Error retrieving context:', error);
    // Return empty context on error
    return {
      context: '',
      sources: [],
    };
  }
};

/**
 * Create enhanced system instruction with retrieved context
 */
export const createEnhancedSystemInstruction = async (
  userQuery: string
): Promise<string> => {
  // Get base system instruction
  const baseInstruction = createSystemInstruction();

  // Retrieve relevant context
  const ragResponse = await retrieveContext(userQuery, 5, 0.6);

  if (!ragResponse.context || ragResponse.sources.length === 0) {
    // No relevant context found, return base instruction
    return baseInstruction;
  }

  // Create enhanced instruction with context
  const enhancedInstruction = `${baseInstruction}

**RETRIEVED CONTEXT FOR CURRENT QUERY**:
The following information is specifically relevant to answer the user's query. Use this information to provide accurate and detailed responses:

${ragResponse.context}

**INSTRUCTIONS**:
1. Use the retrieved context above to answer the user's query accurately
2. If the context contains pricing information, cite it specifically
3. If the context contains service details, provide complete information
4. Reference the source files when mentioning specific information
5. If information is not in the retrieved context but is in your knowledge base, you can still reference it, but prioritize the retrieved context

**SOURCES**: Information retrieved from:
${ragResponse.sources.map((s, i) => `${i + 1}. ${s.source}${s.section ? ` - ${s.section}` : ''}`).join('\n')}`;

  return enhancedInstruction;
};

/**
 * Check if vector store is initialized
 */
export const isVectorStoreInitialized = (): boolean => {
  return globalVectorStore.size() > 0;
};

