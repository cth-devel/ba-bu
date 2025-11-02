// Knowledge Base Loader
// Loads and processes knowledge base files for RAG

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { chunkMarkdownFile } from './textChunker';
import { generateBatchEmbeddings } from './embeddingService';
import { VectorStore } from './vectorStore';

export interface KnowledgeBaseConfig {
  knowledgeBasePath: string;
  vectorStore: VectorStore;
  model?: string;
}

/**
 * Load all knowledge base files and create embeddings
 */
export const loadKnowledgeBase = async (
  config: KnowledgeBaseConfig
): Promise<void> => {
  const { knowledgeBasePath, vectorStore } = config;

  try {
    // Get all markdown files from knowledge base
    const files = readdirSync(knowledgeBasePath).filter(
      (file) => file.endsWith('.md') && file !== 'INDEX.md'
    );

    console.log(`Found ${files.length} knowledge base files`);

    // Process each file
    for (const file of files) {
      const filePath = join(knowledgeBasePath, file);
      const content = readFileSync(filePath, 'utf-8');

      console.log(`Processing ${file}...`);

      // Chunk the file
      const chunks = chunkMarkdownFile(content, file);

      console.log(`  Created ${chunks.length} chunks`);

      // Generate embeddings for all chunks in batch
      try {
        const texts = chunks.map((chunk) => chunk.text);
        const embeddings = await generateBatchEmbeddings(
          texts,
          'RETRIEVAL_DOCUMENT'
        );

        // Add documents to vector store
        chunks.forEach((chunk, index) => {
          if (embeddings[index] && embeddings[index].length > 0) {
            vectorStore.addDocument({
              text: chunk.text,
              embedding: embeddings[index],
              metadata: {
                ...chunk.metadata,
                title: chunk.metadata.section || file.replace('.md', ''),
              },
            });
          }
        });

        console.log(`  Added ${chunks.length} documents to vector store`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
        // Continue with next file
      }

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    console.log(`\nTotal documents in vector store: ${vectorStore.size()}`);
  } catch (error) {
    console.error('Error loading knowledge base:', error);
    throw error;
  }
};

/**
 * Search knowledge base using query embedding
 */
export const searchKnowledgeBase = async (
  query: string,
  vectorStore: VectorStore,
  topK: number = 5
): Promise<Array<{ text: string; metadata: any; similarity: number }>> => {
  const { generateEmbedding } = await import('./embeddingService');

  try {
    // Generate embedding for query
    const queryEmbedding = await generateEmbedding({
      content: query,
      taskType: 'RETRIEVAL_QUERY',
    });

    // Search vector store
    const results = vectorStore.search(queryEmbedding, topK, 0.5);

    return results.map((result) => ({
      text: result.document.text,
      metadata: result.document.metadata,
      similarity: result.similarity,
    }));
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    throw error;
  }
};

