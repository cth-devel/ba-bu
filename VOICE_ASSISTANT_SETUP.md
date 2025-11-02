# Voice Assistant Setup Guide

Complete guide for setting up and using the Voice Assistant with RAG (Retrieval Augmented Generation) for BA-BU Family Salon.

## Current Status

### ✅ Completed Implementation

**Knowledge Base**:
- ✅ Complete knowledge base structure (11 markdown files)
- ✅ All service information, pricing, and booking details
- ✅ Organized and indexed for easy reference

**RAG System (Ready to Use)**:
- ✅ Embeddings API implementation (direct HTTP - no SDK required)
- ✅ Text chunking for knowledge base files
- ✅ Vector store with semantic search
- ✅ Knowledge base loader
- ✅ RAG service for context retrieval
- ✅ API routes for initialization and search

**Voice Assistant UI**:
- ✅ Voice assistant widget button
- ✅ Voice chat interface modal
- ✅ Microphone icon component
- ✅ Audio utilities
- ✅ Integration with main layout

**API Infrastructure**:
- ✅ Server-side API routes
- ✅ Embeddings API endpoints
- ✅ Gemini Live API route structure
- ✅ System instruction generation

### ⏳ Pending (Requires Gemini Live API SDK)

**Gemini Live API**:
- ⏳ Actual WebSocket connection (waiting for official SDK)
- ⏳ Real-time audio streaming
- ⏳ Ephemeral token generation
- ⏳ Live audio conversation

**Note**: The voice assistant infrastructure is complete. Once the Gemini Live API SDK is available, only the connection logic needs to be updated.

## Prerequisites

1. **Google Gemini API Key**
   - Sign up at [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Create an API key with Embeddings API access
   - Note: Gemini Live API may require separate access/waitlist

2. **Node.js Environment**
   - Node.js 18+ required
   - Next.js 13+ (already configured)

3. **Browser Requirements**
   - Modern browser with Web Audio API support
   - Microphone access permission (for voice when implemented)

## Setup Instructions

### 1. Configure Environment Variables

Create `.env.local` file in the project root:

```env
# Gemini API Key (Required)
GEMINI_API_KEY=your_actual_api_key_here

# Optional: Model configuration
NEXT_PUBLIC_GEMINI_MODEL=gemini-2.5-flash-native-audio-preview-09-2025
NEXT_PUBLIC_GEMINI_ENABLED=true

# Site configuration
NEXT_PUBLIC_SITE_URL=https://babusalon.com
```

**Important**: 
- Never commit `.env.local` to version control
- Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 2. Initialize RAG System

The RAG system needs to be initialized once to create embeddings from the knowledge base.

**Option A: Via API (Recommended)**

Start your development server:
```bash
npm run dev
```

Initialize the vector store:
```bash
curl -X POST http://localhost:3000/api/embeddings/initialize
```

**Option B: Programmatically**

Create a script to initialize on server start:
```typescript
// In your app initialization or API route
import { loadKnowledgeBase } from '@/lib/embeddings/knowledgeBaseLoader';
import { globalVectorStore } from '@/lib/embeddings/vectorStore';
import { join } from 'path';

await loadKnowledgeBase({
  knowledgeBasePath: join(process.cwd(), 'knowledge-base'),
  vectorStore: globalVectorStore,
});
```

### 3. Knowledge Base Structure

The knowledge base is located in `/knowledge-base/` directory:

- `INDEX.md` - Navigation index for AI
- `01-salon-information.md` - Basic salon info
- `02-contact-locations.md` - All branch locations
- `03-services-overview.md` - Service categories overview
- `04-hair-care-services.md` - Complete hair services
- `05-skin-body-care.md` - Skin & body care services
- `06-bridal-services.md` - Bridal packages
- `07-mens-grooming.md` - Men's grooming services
- `08-pricing-guide.md` - Comprehensive pricing
- `09-booking-process.md` - Booking instructions
- `10-faq.md` - Frequently asked questions

### 4. How RAG Works

1. **Knowledge Base Files** → Markdown files with all salon information
2. **Text Chunking** → Files are split into smaller chunks (preserving sections)
3. **Embedding Generation** → Each chunk is converted to a vector using Gemini Embeddings API
4. **Vector Store** → Embeddings stored with metadata for semantic search
5. **Query Processing** → User queries are embedded and searched against the store
6. **Context Retrieval** → Relevant chunks are retrieved based on similarity
7. **Enhanced Response** → Retrieved context is used to answer queries accurately

## Current Implementation Details

### File Structure

```
components/
  ├── VoiceAssistant.tsx          # Main widget button (bottom right)
  ├── VoiceChatInterface.tsx       # Modal interface for voice chat
  └── icons/
      └── MicrophoneIcon.tsx       # Microphone icon component

lib/
  ├── geminiLiveClient.ts          # Gemini Live API client (placeholder)
  ├── audioUtils.ts                # Audio processing utilities
  ├── voiceAssistantContext.ts    # Client-side context
  └── embeddings/
      ├── embeddingService.ts     # Direct HTTP client for Embeddings API
      ├── textChunker.ts           # Text chunking utilities
      ├── vectorStore.ts           # Vector store with cosine similarity search
      └── knowledgeBaseLoader.ts   # Loads and processes knowledge base
  └── rag/
      └── ragService.ts            # High-level RAG service

config/
  └── voiceAssistantContext.ts    # Server-side context loader

app/api/
  ├── embeddings/
  │   ├── initialize/
  │   │   └── route.ts            # Initialize vector store API
  │   └── search/
  │       └── route.ts            # Semantic search API
  └── gemini-live/
      ├── route.ts                # Gemini Live API route (placeholder)
      └── ephemeral-token/
          └── route.ts            # Token generation (placeholder)

knowledge-base/
  ├── INDEX.md
  └── [10 content files].md
```

### API Endpoints

**Initialize Vector Store**
```
POST /api/embeddings/initialize
```
Initializes the RAG system by loading all knowledge base files and generating embeddings.

**Response**:
```json
{
  "success": true,
  "message": "Vector store initialized successfully",
  "documentCount": 150
}
```

**Search Knowledge Base**
```
POST /api/embeddings/search
Body: { "query": "What is the price of haircut?", "topK": 5 }
```
Searches the knowledge base using semantic similarity.

**Response**:
```json
{
  "success": true,
  "results": [
    {
      "text": "Basic Hair Cut: ₹350...",
      "metadata": {
        "source": "04-hair-care-services.md",
        "section": "Ladies Haircuts"
      },
      "similarity": 0.89
    }
  ],
  "count": 5
}
```

**Check Vector Store Status**
```
GET /api/embeddings/initialize
```
Returns initialization status and document count.

## Testing RAG System

### 1. Initialize Vector Store

```bash
# Start dev server
npm run dev

# Initialize (in another terminal)
curl -X POST http://localhost:3000/api/embeddings/initialize
```

### 2. Test Search

```typescript
// Via fetch
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

### 3. Test RAG Service

```typescript
import { retrieveContext, createEnhancedSystemInstruction } from '@/lib/rag/ragService';

// Retrieve context
const ragResponse = await retrieveContext('What services do you offer?', 5);
console.log('Context:', ragResponse.context);
console.log('Sources:', ragResponse.sources);

// Create enhanced system instruction
const instruction = await createEnhancedSystemInstruction('What is the price?');
```

## Integration with Voice Assistant

The RAG system is ready to integrate with the voice assistant:

```typescript
import { createEnhancedSystemInstruction } from '@/lib/rag/ragService';

// In VoiceChatInterface component
const handleQuery = async (userQuery: string) => {
  // Get enhanced system instruction with relevant context
  const systemInstruction = await createEnhancedSystemInstruction(userQuery);
  
  // Use with Gemini Live API (when SDK available)
  // This will provide context-aware responses
};
```

## Making It Work

### Step 1: Set API Key
1. Get API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Add to `.env.local`: `GEMINI_API_KEY=your_key_here`

### Step 2: Initialize RAG System
1. Start dev server: `npm run dev`
2. Call initialization endpoint: `POST /api/embeddings/initialize`
3. Wait for embeddings to be generated (takes ~1-2 minutes)

### Step 3: Test RAG System
1. Test search endpoint with queries
2. Verify results are relevant
3. Check similarity scores (should be > 0.7 for good matches)

### Step 4: Integrate with Voice Assistant (When SDK Available)
1. Update `lib/geminiLiveClient.ts` with actual SDK connection
2. Use `createEnhancedSystemInstruction()` for context-aware responses
3. Test voice interactions

## Troubleshooting

**"GEMINI_API_KEY not configured"**
- Verify `.env.local` exists and has `GEMINI_API_KEY`
- Restart dev server after adding environment variables

**"Vector store not initialized"**
- Call `/api/embeddings/initialize` endpoint first
- Check knowledge base files exist in `/knowledge-base/`
- Verify API key has Embeddings API access

**"No results found"**
- Lower similarity threshold in search (default: 0.7, try 0.5)
- Verify embeddings were generated successfully
- Check query is related to knowledge base content

**"Rate limiting"**
- Implement delays between batch requests
- Consider using batch API for multiple embeddings
- Monitor API usage and costs

## Production Deployment

Before deploying:

1. **Set Production Environment Variables**:
   ```env
   GEMINI_API_KEY=production_api_key
   NEXT_PUBLIC_SITE_URL=https://babusalon.com
   ```

2. **Initialize Vector Store**:
   - Run initialization on deployment
   - Or use background job to initialize
   - Consider caching embeddings

3. **Monitor API Usage**:
   - Track Embeddings API calls
   - Monitor costs
   - Implement rate limiting

4. **HTTPS Required**:
   - Microphone access requires HTTPS
   - Ensure SSL certificate is valid

## Next Steps

1. ✅ **RAG System**: Complete and ready to use
2. ⏳ **Gemini Live API**: Wait for official SDK
3. ⏳ **Voice Integration**: Update connection when SDK available
4. ⏳ **Testing**: Test voice interactions when live

## Support

**Documentation**:
- [RAG Implementation Guide](./EMBEDDINGS_RAG_IMPLEMENTATION.md)
- [RAG Quick Start](./RAG_QUICK_START.md)
- [Gemini Embeddings API](https://ai.google.dev/api/embeddings)
- [Gemini Live API](https://ai.google.dev/gemini-api/docs/live)

**For Issues**:
- Check browser console for errors
- Verify environment variables are set
- Check API key has required access
- Review knowledge base files for accuracy

---

**Current Status**: RAG system is **fully implemented and ready to use**. Voice assistant UI is complete. Waiting for Gemini Live API SDK for final integration.
