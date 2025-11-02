// Embedding Service for Gemini Embeddings API
// Direct HTTP implementation without SDK

export interface EmbeddingResponse {
  embedding: {
    values: number[];
  };
}

export interface EmbedContentParams {
  content: string;
  taskType?: 'RETRIEVAL_DOCUMENT' | 'RETRIEVAL_QUERY' | 'SEMANTIC_SIMILARITY' | 'CLASSIFICATION' | 'CLUSTERING';
  title?: string;
  outputDimensionality?: number;
}

/**
 * Generate embedding for text content using Gemini Embeddings API
 * Direct HTTP implementation - no SDK required
 * Reference: https://ai.google.dev/api/embeddings
 */
export const generateEmbedding = async (
  params: EmbedContentParams
): Promise<number[]> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const model = 'models/embedding-001'; // or 'models/text-embedding-004' when available

  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:embedContent?key=${apiKey}`;

  const requestBody = {
    content: {
      parts: [
        {
          text: params.content,
        },
      ],
    },
    ...(params.taskType && { taskType: params.taskType }),
    ...(params.title && { title: params.title }),
    ...(params.outputDimensionality && { outputDimensionality: params.outputDimensionality }),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Embedding API error: ${error.error?.message || response.statusText}`);
    }

    const data: EmbeddingResponse = await response.json();

    if (!data.embedding?.values) {
      throw new Error('Invalid embedding response format');
    }

    return data.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
};

/**
 * Generate embeddings for multiple texts in batch
 * More efficient for processing multiple documents
 */
export const generateBatchEmbeddings = async (
  contents: string[],
  taskType: EmbedContentParams['taskType'] = 'RETRIEVAL_DOCUMENT'
): Promise<number[][]> => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  const model = 'models/embedding-001';

  const url = `https://generativelanguage.googleapis.com/v1beta/${model}:batchEmbedContents?key=${apiKey}`;

  const requestBody = {
    requests: contents.map((content) => ({
      model: model,
      content: {
        parts: [
          {
            text: content,
          },
        ],
      },
      taskType: taskType,
    })),
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Batch Embedding API error: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    if (!data.embeddings || !Array.isArray(data.embeddings)) {
      throw new Error('Invalid batch embedding response format');
    }

    return data.embeddings.map((embedding: any) => embedding.values || []);
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
};

