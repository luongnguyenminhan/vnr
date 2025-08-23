#!/usr/bin/env python3
"""
Script to process and store the Vietnamese historical corpus in Qdrant using Google embeddings.
This script demonstrates the integration between QdrantService and AIService.
"""

import asyncio
import os
import sys
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app.services.qdrant_service import qdrant_service
from app.services.ai_service import ai_service, initialize_qdrant_integration
from app.core.config import logger


async def process_vietnam_history_corpus():
    """Process the Vietnam history corpus file and store it in Qdrant."""

    print("🚀 Starting corpus processing...")
    print("=" * 60)

    # Initialize the AI-Qdrant integration
    print("🔗 Initializing AI-Qdrant integration...")
    initialize_qdrant_integration()

    # Define paths
    corpus_file = project_root / "corpus.md"

    if not corpus_file.exists():
        print(f"❌ Corpus file not found: {corpus_file}")
        print("Please ensure corpus.md exists in the project root directory.")
        return False

    try:
        # Check AI service readiness
        print("🔍 Checking AI service...")
        if not hasattr(ai_service, "client") or ai_service.client is None:
            print(
                "❌ Google AI client not initialized. Please check GOOGLE_API_KEY configuration."
            )
            return False

        print("✅ AI service ready")

        # Process the corpus
        print(f"📖 Processing corpus: {corpus_file}")
        collection_name = "vietnam_history"

        success = await qdrant_service.process_corpus_file(
            str(corpus_file), collection_name=collection_name
        )

        if success:
            print("✅ Corpus processing completed successfully!")

            # Get and display statistics
            print("\n📊 Corpus Statistics:")
            print("-" * 30)
            stats = await qdrant_service.get_corpus_statistics(collection_name)

            if "error" not in stats:
                print(f"Collection: {stats['collection_name']}")
                print(f"Total Vectors: {stats['total_vectors']}")
                print(f"Dimension: {stats['dimension']}")
                print(f"Total Chunks: {stats['total_chunks']}")
                print(f"Unique Sections: {stats['unique_sections']}")
                print(f"Source Files: {stats['source_files']}")
                print(f"Total Words: {stats['total_words']}")
                print(f"Average Chunk Size: {stats['avg_chunk_size']} words")
                print(f"Language: {stats['language']}")
                print(f"Document Type: {stats['document_type']}")
            else:
                print(f"Error getting statistics: {stats['error']}")

            # Test search functionality
            print("\n🔍 Testing search functionality...")
            test_queries = [
                "Đổi mới là gì?",
                "Đại hội VI của Đảng",
                "Chủ nghĩa xã hội ở Việt Nam",
                "Công cuộc đổi mới",
            ]

            for query in test_queries:
                print(f"\nQuery: '{query}'")
                results = await qdrant_service.search_corpus(query, top_k=2)
                if results:
                    for result in results:
                        print(".3f")
                        print(f"  Section: {result['section'][:50]}...")
                        print(f"  Text: {result['text'][:100]}...")
                else:
                    print("  No results found")

            print("\n🎉 Corpus processing and testing completed successfully!")
            print("=" * 60)
            return True

        else:
            print("❌ Corpus processing failed!")
            return False

    except Exception as e:
        print(f"❌ Error during corpus processing: {e}")
        logger.error(f"Corpus processing error: {e}")
        return False


async def main():
    """Main function to run the corpus processing."""
    print("🇻🇳 VIETNAM HISTORY CORPUS PROCESSING")
    print("=" * 60)
    print("This script will process the Vietnamese historical document")
    print("and store it in Qdrant using Google embeddings.")
    print("=" * 60)

    # Run the processing
    success = await process_vietnam_history_corpus()

    if success:
        print("\n✅ Processing completed successfully!")
        print("\nNext steps:")
        print("1. Start your FastAPI server: uvicorn app.main:app --reload")
        print("2. Test the chat functionality at: http://localhost:8000")
        print("3. Try searching for Vietnamese historical topics")
    else:
        print("\n❌ Processing failed!")
        sys.exit(1)


if __name__ == "__main__":
    # Run the async main function
    asyncio.run(main())
