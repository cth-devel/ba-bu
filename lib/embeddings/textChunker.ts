// Text Chunker for Knowledge Base
// Chunks knowledge base files into smaller pieces for embedding

export interface TextChunk {
  text: string;
  metadata: {
    source: string;
    section?: string;
    chunkIndex: number;
    startLine?: number;
    endLine?: number;
  };
}

/**
 * Chunk text into smaller pieces suitable for embedding
 * Uses semantic boundaries (paragraphs, sections) when possible
 */
export const chunkText = (
  text: string,
  source: string,
  options: {
    maxChunkSize?: number;
    chunkOverlap?: number;
    preserveParagraphs?: boolean;
  } = {}
): TextChunk[] => {
  const {
    maxChunkSize = 1000, // characters per chunk
    chunkOverlap = 200, // characters to overlap between chunks
    preserveParagraphs = true,
  } = options;

  const chunks: TextChunk[] = [];

  if (text.length <= maxChunkSize) {
    // Single chunk if text is short enough
    chunks.push({
      text: text.trim(),
      metadata: {
        source,
        chunkIndex: 0,
      },
    });
    return chunks;
  }

  if (preserveParagraphs) {
    // Split by paragraphs first (double newlines)
    const paragraphs = text.split(/\n\s*\n/);
    let currentChunk = '';
    let chunkIndex = 0;
    let startLine = 1;

    paragraphs.forEach((paragraph, paraIndex) => {
      const trimmedPara = paragraph.trim();
      if (!trimmedPara) return;

      // If adding this paragraph would exceed chunk size, finalize current chunk
      if (currentChunk && currentChunk.length + trimmedPara.length > maxChunkSize) {
        chunks.push({
          text: currentChunk.trim(),
          metadata: {
            source,
            chunkIndex: chunkIndex++,
            startLine,
          },
        });

        // Start new chunk with overlap
        const overlap = currentChunk.slice(-chunkOverlap);
        currentChunk = overlap + '\n\n' + trimmedPara;
        startLine = paraIndex + 1;
      } else {
        // Add paragraph to current chunk
        currentChunk += (currentChunk ? '\n\n' : '') + trimmedPara;
      }
    });

    // Add final chunk
    if (currentChunk.trim()) {
      chunks.push({
        text: currentChunk.trim(),
        metadata: {
          source,
          chunkIndex: chunkIndex,
          startLine,
        },
      });
    }
  } else {
    // Simple character-based chunking with overlap
    let start = 0;
    let chunkIndex = 0;

    while (start < text.length) {
      let end = start + maxChunkSize;

      // Try to break at sentence boundary
      if (end < text.length) {
        const sentenceEnd = text.lastIndexOf('.', end);
        const paragraphEnd = text.lastIndexOf('\n', end);
        const breakPoint = Math.max(sentenceEnd, paragraphEnd);

        if (breakPoint > start + maxChunkSize * 0.5) {
          end = breakPoint + 1;
        }
      }

      const chunkText = text.slice(start, end).trim();

      if (chunkText) {
        chunks.push({
          text: chunkText,
          metadata: {
            source,
            chunkIndex: chunkIndex++,
          },
        });
      }

      // Move start with overlap
      start = end - chunkOverlap;
    }
  }

  return chunks;
};

/**
 * Chunk knowledge base markdown file into sections
 * Preserves section headers and structure
 */
export const chunkMarkdownFile = (
  content: string,
  source: string
): TextChunk[] => {
  const lines = content.split('\n');
  const chunks: TextChunk[] = [];
  let currentSection = '';
  let currentText = '';
  let chunkIndex = 0;
  let startLine = 1;

  lines.forEach((line, lineIndex) => {
    const trimmedLine = line.trim();

    // Detect section headers (markdown headers)
    if (trimmedLine.match(/^#{1,6}\s+.+$/)) {
      // Save previous section if exists
      if (currentText.trim()) {
        chunks.push({
          text: currentText.trim(),
          metadata: {
            source,
            section: currentSection || undefined,
            chunkIndex: chunkIndex++,
            startLine,
            endLine: lineIndex,
          },
        });
      }

      // Start new section
      currentSection = trimmedLine.replace(/^#+\s+/, '');
      currentText = line + '\n';
      startLine = lineIndex + 1;
    } else {
      // Add to current text
      currentText += line + '\n';

      // Chunk if too large
      if (currentText.length > 1500) {
        chunks.push({
          text: currentText.trim(),
          metadata: {
            source,
            section: currentSection || undefined,
            chunkIndex: chunkIndex++,
            startLine,
            endLine: lineIndex + 1,
          },
        });

        // Start new chunk with last part
        const lastParagraph = currentText.slice(-500);
        currentText = lastParagraph;
        startLine = lineIndex + 1;
      }
    }
  });

  // Add final chunk
  if (currentText.trim()) {
    chunks.push({
      text: currentText.trim(),
      metadata: {
        source,
        section: currentSection || undefined,
        chunkIndex: chunkIndex,
        startLine,
      },
    });
  }

  return chunks;
};

