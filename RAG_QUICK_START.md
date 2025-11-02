# RAG Quick Start Guide

Quick guide to get started with RAG (Retrieval Augmented Generation) for the voice assistant.

## Overview

This RAG implementation uses the **Gemini Embeddings API directly via HTTP** (no SDK required) to create semantic search capabilities for the voice assistant.

**Reference**: [Gemini Embeddings API](https://ai.google.dev/api/embeddings)

## Quick Setup

### 1. Environment Variables

Add to `.env.local`:

```env
GEMINI_API_KEY=your_api_key_here
```

Get your API key from: [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Initialize Vector Store

On first run, initialize the vector store:

**Option A: API Call**
```bash
curl -X POST http://localhost:3000/api/embeddings/initialize
```

**Option B: Programmatic**
```typescript
// In your initialization code
await fetch('/api/embeddings/initialize', { 
  method: 'POST' 
});
```

**Option C: Manual Script**
```typescript
import { loadKnowledgeBase } from '@/lib/embeddings/knowledgeBaseLoader';
import { globalVectorStore } from '@/lib/embeddings/vectorStore';
import { join } from 'path';

await loadKnowledgeBase({
  knowledgeBasePath: join(process.cwd(), 'knowledge-base'),
  vectorStore: globalVectorStore,
});
```

### 3. Search Knowledge Base

**Via API**:
```typescript
const response = await fetch('/api/embeddings/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    query: 'What is the price of haircut?',
    topK: 5 
  }),
});

const data = await response.json();
console.log(data.results);
```

**Via RAG Service**:
```typescript
import { retrieveContext } from '@/lib/rag/ragService';

const ragResponse = await retrieveContext('What is the price of haircut?', 5);
console.log(ragResponse.context);
console.log(ragResponse.sources);
```

## Integration with Voice Assistant

Update your voice assistant to use RAG:

```typescript
import { createEnhancedSystemInstruction } from '@/lib/rag/ragService';

// In VoiceChatInterface component
const systemInstruction = await createEnhancedSystemInstruction(userQuery);

// Use enhanced instruction with Gemini Live API
// This includes relevant context from knowledge base
```

## How It Works

1. **Knowledge Base** → Markdown files in `/knowledge-base`
2. **Text Chunking** → Splits files into smaller chunks
3. **Embedding Generation** → Creates vectors via Gemini Embeddings API
4. **Vector Store** → Stores embeddings with metadata
5. **Query Processing** → Generates query embedding
6. **Semantic Search** → Finds similar documents using cosine similarity
7. **Context Retrieval** → Returns relevant context for voice assistant

## Files Created

- `lib/embeddings/embeddingService.ts` - HTTP client for Embeddings API
- `lib/embeddings/textChunker.ts` - Text chunking utilities
- `lib/embeddings/vectorStore.ts` - Vector store with search
- `lib/embeddings/knowledgeBaseLoader.ts` - Loads and processes KB
- `lib/rag/ragService.ts` - High-level RAG service
- `app/api/embeddings/initialize/route.ts` - Initialize API
- `app/api/embeddings/search/route.ts` - Search API

## API Endpoints

### Initialize Vector Store
```
POST /api/embeddings/initialize
```

### Search Knowledge Base
```
POST /api/embeddings/search
Body: { "query": "your query", "topK": 5 }
```

### Check Status
```
GET /api/embeddings/initialize
```

## Example Usage

```typescript
// 1. Initialize (one time)
await fetch('/api/embeddings/initialize', { method: 'POST' });

// 2. Search
const response = await fetch('/api/embeddings/search', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    query: 'What services do you offer?',
    topK: 3 
  }),
});

const { results } = await response.json();

// 3. Use results
results.forEach((result) => {
  console.log(`Source: ${result.metadata.source}`);
  console.log(`Similarity: ${result.similarity}`);
  console.log(`Text: ${result.text.substring(0, 100)}...`);
});
```

## Performance Tips

1. **Initialize Once**: Initialize vector store on server start
2. **Cache Embeddings**: Store embeddings to avoid regeneration
3. **Batch Processing**: Use batch API for multiple documents
4. **Similarity Threshold**: Adjust threshold (0.5-0.8) based on results

## Troubleshooting

**"GEMINI_API_KEY not configured"**
- Verify `.env.local` has `GEMINI_API_KEY`
- Restart dev server after adding

**"Vector store not initialized"**
- Call `/api/embeddings/initialize` first
- Check knowledge base files exist

**"No results found"**
- Lower similarity threshold (e.g., 0.5)
- Check embeddings were generated successfully
- Verify query is related to knowledge base content

## Next Steps

1. **Initialize**: Run initialization on server start
2. **Integrate**: Use RAG in voice assistant
3. **Test**: Test with various queries
4. **Optimize**: Fine-tune chunk size and similarity threshold

For detailed documentation, see [EMBEDDINGS_RAG_IMPLEMENTATION.md](./EMBEDDINGS_RAG_IMPLEMENTATION.md)

---

**References**:
- [Gemini Embeddings API](https://ai.google.dev/api/embeddings)
- [Embeddings Guide](https://ai.google.dev/tutorials/embeddings_quickstart)

