// Vector Store for RAG
// Stores embeddings and enables semantic search

export interface VectorDocument {
  id: string;
  text: string;
  embedding: number[];
  metadata: {
    source: string;
    section?: string;
    chunkIndex: number;
    title?: string;
    [key: string]: any;
  };
}

/**
 * Calculate cosine similarity between two vectors
 */
export const cosineSimilarity = (a: number[], b: number[]): number => {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  const denominator = Math.sqrt(normA) * Math.sqrt(normB);
  if (denominator === 0) return 0;

  return dotProduct / denominator;
};

/**
 * Vector Store implementation
 * Stores documents with embeddings and provides similarity search
 */
export class VectorStore {
  private documents: VectorDocument[] = [];

  /**
   * Add a document with its embedding to the store
   */
  addDocument(document: Omit<VectorDocument, 'id'>): string {
    const id = `${document.metadata.source}_${document.metadata.chunkIndex}_${Date.now()}`;
    const doc: VectorDocument = {
      id,
      ...document,
    };
    this.documents.push(doc);
    return id;
  }

  /**
   * Add multiple documents at once
   */
  addDocuments(documents: Omit<VectorDocument, 'id'>[]): string[] {
    return documents.map((doc) => this.addDocument(doc));
  }

  /**
   * Search for similar documents using cosine similarity
   * @param queryEmbedding - Embedding vector of the search query
   * @param topK - Number of results to return
   * @param threshold - Minimum similarity score (0-1)
   * @returns Array of documents sorted by similarity (highest first)
   */
  search(
    queryEmbedding: number[],
    topK: number = 5,
    threshold: number = 0.7
  ): Array<{ document: VectorDocument; similarity: number }> {
    const results = this.documents
      .map((doc) => ({
        document: doc,
        similarity: cosineSimilarity(queryEmbedding, doc.embedding),
      }))
      .filter((result) => result.similarity >= threshold)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, topK);

    return results;
  }

  /**
   * Get all documents
   */
  getAllDocuments(): VectorDocument[] {
    return [...this.documents];
  }

  /**
   * Get documents by source
   */
  getDocumentsBySource(source: string): VectorDocument[] {
    return this.documents.filter((doc) => doc.metadata.source === source);
  }

  /**
   * Get document by ID
   */
  getDocument(id: string): VectorDocument | undefined {
    return this.documents.find((doc) => doc.id === id);
  }

  /**
   * Clear all documents
   */
  clear(): void {
    this.documents = [];
  }

  /**
   * Get total number of documents
   */
  size(): number {
    return this.documents.length;
  }
}

// Global vector store instance
export const globalVectorStore = new VectorStore();

