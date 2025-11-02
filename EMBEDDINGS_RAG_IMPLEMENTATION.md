# Embeddings & RAG Implementation Guide

Complete guide for implementing RAG (Retrieval Augmented Generation) using Gemini Embeddings API directly via HTTP without SDK.

## Overview

This implementation uses the **Gemini Embeddings API** directly via HTTP REST endpoints to create a RAG system for the voice assistant. No SDK required!

**Reference**: [Gemini Embeddings API Documentation](https://ai.google.dev/api/embeddings)

## Architecture

```
Knowledge Base (Markdown) 
    ↓
Text Chunker (splits into chunks)
    ↓
Gemini Embeddings API (HTTP) → Generates embeddings
    ↓
Vector Store (stores embeddings + metadata)
    ↓
Query → Generate Query Embedding → Semantic Search → Retrieve Context
    ↓
Enhanced System Instruction → Voice Assistant
```

## Implementation Details

### 1. Embedding Service (`lib/embeddings/embeddingService.ts`)

Direct HTTP implementation of Gemini Embeddings API:

**Endpoint**: `POST https://generativelanguage.googleapis.com/v1beta/models/{model}:embedContent`

**Features**:
- Single embedding generation
- Batch embedding generation
- Task types: `RETRIEVAL_DOCUMENT`, `RETRIEVAL_QUERY`, `SEMANTIC_SIMILARITY`
- Optional dimensionality reduction

**Usage**:
```typescript
import { generateEmbedding } from '@/lib/embeddings/embeddingService';

// Generate embedding for document
const embedding = await generateEmbedding({
  content: 'Your text here',
  taskType: 'RETRIEVAL_DOCUMENT',
  title: 'Document Title', // Optional, improves quality
});

// Generate embedding for query
const queryEmbedding = await generateEmbedding({
  content: 'What is the price?',
  taskType: 'RETRIEVAL_QUERY',
});
```

### 2. Text Chunker (`lib/embeddings/textChunker.ts`)

Splits knowledge base files into smaller chunks:

**Features**:
- Paragraph-aware chunking
- Section preservation (markdown headers)
- Overlap between chunks for context
- Configurable chunk size

**Usage**:
```typescript
import { chunkMarkdownFile } from '@/lib/embeddings/textChunker';

const chunks = chunkMarkdownFile(content, 'source-file.md');
// Returns: Array of chunks with metadata
```

### 3. Vector Store (`lib/embeddings/vectorStore.ts`)

In-memory vector store with cosine similarity search:

**Features**:
- Stores documents with embeddings
- Cosine similarity search
- Top-K retrieval
- Similarity threshold filtering
- Metadata-based filtering

**Usage**:
```typescript
import { globalVectorStore } from '@/lib/embeddings/vectorStore';

// Add document
store.addDocument({
  text: 'Document text',
  embedding: [0.1, 0.2, ...],
  metadata: { source: 'file.md', section: 'Pricing' }
});

// Search
const results = store.search(queryEmbedding, topK: 5, threshold: 0.7);
```

### 4. Knowledge Base Loader (`lib/embeddings/knowledgeBaseLoader.ts`)

Loads and processes all knowledge base files:

**Features**:
- Automatic file discovery
- Batch embedding generation
- Progress tracking
- Error handling

**Usage**:
```typescript
import { loadKnowledgeBase } from '@/lib/embeddings/knowledgeBaseLoader';

await loadKnowledgeBase({
  knowledgeBasePath: './knowledge-base',
  vectorStore: globalVectorStore,
});
```

### 5. RAG Service (`lib/rag/ragService.ts`)

High-level RAG service for voice assistant:

**Features**:
- Query-based context retrieval
- Enhanced system instruction generation
- Source attribution
- Similarity scoring

**Usage**:
```typescript
import { retrieveContext, createEnhancedSystemInstruction } from '@/lib/rag/ragService';

// Retrieve context for query
const ragResponse = await retrieveContext('What is the price of haircut?', topK: 5);

// Create enhanced system instruction
const instruction = await createEnhancedSystemInstruction(userQuery);
```

## API Routes

### 1. Initialize Vector Store

**Endpoint**: `POST /api/embeddings/initialize`

Initializes the vector store by loading all knowledge base files and generating embeddings.

**Response**:
```json
{
  "success": true,
  "message": "Vector store initialized successfully",
  "documentCount": 150
}
```

### 2. Search Knowledge Base

**Endpoint**: `POST /api/embeddings/search`

Searches the knowledge base using semantic similarity.

**Request**:
```json
{
  "query": "What is the price of haircut?",
  "topK": 5
}
```

**Response**:
```json
{
  "success": true,
  "results": [
    {
      "text": "Basic Hair Cut: ₹350...",
      "metadata": {
        "source": "04-hair-care-services.md",
        "section": "Ladies Haircuts",
        "chunkIndex": 0
      },
      "similarity": 0.89
    }
  ],
  "count": 5
}
```

## Setup Instructions

### 1. Environment Variables

Add to `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

### 2. Initialize Vector Store

On first run, initialize the vector store:

```bash
# Make API call to initialize
curl -X POST http://localhost:3000/api/embeddings/initialize
```

Or call programmatically:
```typescript
// In your initialization code
await fetch('/api/embeddings/initialize', { method: 'POST' });
```

### 3. Integration with Voice Assistant

Update `VoiceChatInterface.tsx` to use RAG:

```typescript
import { createEnhancedSystemInstruction } from '@/lib/rag/ragService';

// In component
const systemInstruction = await createEnhancedSystemInstruction(userQuery);
```

## API Reference

### Gemini Embeddings API

**Base URL**: `https://generativelanguage.googleapis.com/v1beta`

**Models**:
- `models/embedding-001` (default)
- `models/text-embedding-004` (newer, when available)

**Task Types**:
- `RETRIEVAL_DOCUMENT` - For embedding documents
- `RETRIEVAL_QUERY` - For embedding search queries
- `SEMANTIC_SIMILARITY` - For similarity matching
- `CLASSIFICATION` - For classification tasks
- `CLUSTERING` - For clustering tasks

**Reference**: [Official Documentation](https://ai.google.dev/api/embeddings)

## Benefits of Direct HTTP Implementation

1. **No SDK Dependency**: Works immediately without waiting for SDK
2. **Full Control**: Direct access to API features
3. **Flexibility**: Easy to customize and extend
4. **Performance**: Can optimize requests as needed
5. **Compatibility**: Works with any HTTP client

## Performance Considerations

1. **Batch Processing**: Use `batchEmbedContents` for multiple documents
2. **Caching**: Cache embeddings to avoid regenerating
3. **Rate Limiting**: Implement delays between requests
4. **Vector Store**: Consider persistent storage for production

## Production Recommendations

1. **Persistent Storage**: Use database or vector database (Pinecone, Weaviate)
2. **Caching**: Cache embeddings in Redis or similar
3. **Background Jobs**: Initialize vector store as background job
4. **Monitoring**: Track API usage and costs
5. **Error Handling**: Implement retry logic and fallbacks

## Testing

```typescript
// Test embedding generation
const embedding = await generateEmbedding({
  content: 'Test text',
  taskType: 'RETRIEVAL_DOCUMENT',
});
console.log('Embedding dimension:', embedding.length);

// Test search
const results = await fetch('/api/embeddings/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: 'haircut price', topK: 3 }),
});
const data = await results.json();
console.log('Search results:', data);
```

## Troubleshooting

**API Key Error**:
- Verify `GEMINI_API_KEY` is set in `.env.local`
- Check API key is valid and has embedding access

**Rate Limiting**:
- Implement delays between batch requests
- Consider using batch API for multiple embeddings

**Memory Issues**:
- Vector store is in-memory; consider persistent storage
- Limit number of documents for development

**Similarity Scores Low**:
- Check query and documents are in same language
- Verify embeddings are generated correctly
- Adjust similarity threshold

## References

- [Gemini Embeddings API](https://ai.google.dev/api/embeddings)
- [Embeddings Guide](https://ai.google.dev/tutorials/embeddings_quickstart)
- [RAG Best Practices](https://ai.google.dev/gemini-api/docs/grounding)

---

**Note**: This implementation uses direct HTTP calls to the Gemini Embeddings API. No SDK required!

