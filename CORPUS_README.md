# Corpus Processing and Search with Google Embeddings

This document explains how to process and search the Vietnamese historical corpus using Google embeddings and Qdrant vector database.

## 📚 Corpus Overview

The system processes the `corpus.md` file, which contains:
- **Language**: Vietnamese
- **Topic**: History of the Communist Party of Vietnam and the Doi Moi (Renovation) policy (1975-2018)
- **Content**: Comprehensive historical and political document
- **Size**: ~50,000+ characters, multiple sections and topics

## 🚀 Quick Start

### 1. Process the Corpus

Run the corpus processing script to load the Vietnamese document into Qdrant:

```bash
python process_corpus.py
```

This script will:
- ✅ Read and chunk the Vietnamese text using advanced section-aware chunking
- ✅ Generate Google embeddings for each chunk
- ✅ Store vectors in Qdrant collection "vietnam_history"
- ✅ Display processing statistics
- ✅ Test search functionality

### 2. Test Search Functionality

Run the search test script to verify everything works:

```bash
python test_corpus_search.py
```

This will test various Vietnamese search queries and display results.

## 🔧 Technical Features

### Advanced Text Chunking

The system uses sophisticated Vietnamese text chunking:

- **Section-aware splitting**: Recognizes Vietnamese headers and section markers
- **Sentence boundary detection**: Uses Vietnamese punctuation patterns
- **Optimal chunk size**: 1500 characters with intelligent splitting
- **Metadata preservation**: Tracks sections, word counts, and document structure

### Google Embeddings Integration

- **Model**: `text-embedding-004` (Google's latest embedding model)
- **Language support**: Optimized for Vietnamese text
- **Dimension**: 768-dimensional vectors
- **Real-time processing**: Generates embeddings on-demand

### Qdrant Vector Storage

- **Collection**: `vietnam_history`
- **Distance metric**: Cosine similarity
- **Rich metadata**: Each vector includes comprehensive metadata
- **Efficient search**: Optimized for fast similarity search

## 📊 Corpus Statistics

After processing, the system provides detailed statistics:

```json
{
  "collection_name": "vietnam_history",
  "total_vectors": 45,
  "dimension": 768,
  "total_chunks": 45,
  "unique_sections": 8,
  "total_words": 8500,
  "language": "vietnamese",
  "document_type": "historical_political_document"
}
```

## 🔍 Search Examples

### Vietnamese Queries

The system supports complex Vietnamese search queries:

```python
# Search in Vietnamese
results = await qdrant_service.search_corpus("Đổi mới là gì?")
results = await qdrant_service.search_corpus("Công cuộc đổi mới ở Việt Nam")
results = await qdrant_service.search_corpus("Đại hội VI của Đảng")
```

### Search Results Format

Each search result includes:

```python
{
  "rank": 1,
  "score": 0.85,
  "text": "Full text chunk...",
  "section": "Section header",
  "source_file": "corpus.md",
  "word_count": 250,
  "chunk_index": 15,
  "total_chunks": 45,
  "document_type": "historical_political_document"
}
```

## 🛠 API Integration

### Direct QdrantService Usage

```python
from app.services.qdrant_service import qdrant_service

# Process a new corpus file
success = await qdrant_service.process_corpus_file("/path/to/document.md")

# Search the corpus
results = await qdrant_service.search_corpus("your query", top_k=5)

# Get statistics
stats = await qdrant_service.get_corpus_statistics()
```

### Integration with AIService

The system automatically integrates with the existing AI service:

```python
from app.services.ai_service import ai_service

# The qdrant_service is automatically configured with ai_service
# for embedding generation during corpus processing and search
```

## 🎯 Use Cases

### 1. Historical Research
- Search for specific events, policies, or time periods
- Find relevant sections about Vietnamese Communist Party history
- Locate information about the Doi Moi reform process

### 2. Educational Applications
- Build Vietnamese language learning tools
- Create historical document analysis systems
- Develop political science research assistants

### 3. Content Discovery
- Find related content across different sections
- Discover connections between historical events
- Navigate complex political documents efficiently

## 🔧 Configuration

### Environment Variables

Make sure you have the Google API key configured:

```bash
export GOOGLE_API_KEY="your-google-api-key-here"
```

### Collection Management

```python
# List all collections
collections = await qdrant_service.list_collections()

# Delete a collection
await qdrant_service.delete_collection("vietnam_history")

# Check if collection exists
exists = await qdrant_service.collection_exists("vietnam_history")
```

## 🚨 Troubleshooting

### Common Issues

1. **Google API Key Not Set**
   ```
   Error: GOOGLE_API_KEY not configured
   Solution: Set GOOGLE_API_KEY environment variable
   ```

2. **Qdrant Server Not Running**
   ```
   Error: Failed to initialize Qdrant client
   Solution: Start Qdrant server (docker run -p 6333:6333 qdrant/qdrant)
   ```

3. **Corpus File Not Found**
   ```
   Error: Corpus file not found
   Solution: Ensure corpus.md exists in the project root
   ```

4. **Embedding Generation Failed**
   ```
   Error: Google embedding API call failed
   Solution: Check API key validity and quota limits
   ```

### Performance Tips

- **Chunk Size**: Optimal chunk size is 1000-1500 characters
- **Batch Processing**: The system processes embeddings in batches for efficiency
- **Search Optimization**: Use appropriate `top_k` values (5-10 for most searches)
- **Memory Usage**: Large documents are processed efficiently with streaming

## 📈 Performance Metrics

- **Embedding Generation**: ~2-3 seconds per 1000 characters
- **Vector Storage**: Near real-time for typical document sizes
- **Search Speed**: <100ms for similarity search
- **Memory Usage**: Minimal, uses streaming processing for large documents

## 🔮 Future Enhancements

- Multi-language support (English, French, Chinese)
- Custom embedding models fine-tuned for Vietnamese
- Advanced semantic search with query expansion
- Document clustering and topic modeling
- Integration with RAG (Retrieval-Augmented Generation) pipelines

## 📞 Support

For issues or questions about the corpus processing system:

1. Check the logs for detailed error messages
2. Verify Google API key configuration
3. Ensure Qdrant server is running and accessible
4. Test with smaller documents first for debugging

---

*Built with Google Generative AI and Qdrant for Vietnamese historical document processing and search.*
