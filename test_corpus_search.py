#!/usr/bin/env python3
"""
Test script to demonstrate corpus search functionality with Vietnamese historical document.
"""

import asyncio
import sys
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app.services.qdrant_service import qdrant_service
from app.services.ai_service import initialize_qdrant_integration


async def test_corpus_search():
    """Test various search queries on the Vietnamese history corpus."""

    print("🔍 VIETNAM HISTORY CORPUS SEARCH TEST")
    print("=" * 50)

    # Initialize the AI-Qdrant integration
    print("🔗 Initializing AI-Qdrant integration...")
    initialize_qdrant_integration()

    collection_name = "vietnam_history"

    # Check if collection exists
    exists = await qdrant_service.collection_exists(collection_name)
    if not exists:
        print(f"❌ Collection '{collection_name}' does not exist!")
        print(
            "Please run process_corpus.py first to create and populate the collection."
        )
        return False

    # Get collection statistics
    print("📊 Collection Statistics:")
    stats = await qdrant_service.get_corpus_statistics(collection_name)
    if "error" in stats:
        print(f"Error: {stats['error']}")
        return False

    print(f"Total vectors: {stats['total_vectors']}")
    print(f"Total chunks: {stats['total_chunks']}")
    print(f"Language: {stats['language']}")
    print("-" * 30)

    # Test queries in Vietnamese
    test_queries = [
        "Đại hội VI của Đảng Cộng sản Việt Nam",
        "Công cuộc đổi mới ở Việt Nam",
        "Chủ nghĩa xã hội và cách mạng ở Việt Nam",
        "Lịch sử thống nhất đất nước",
        "Những thành tựu của công cuộc đổi mới",
        "Bước ngoặt của đất nước sau năm 1986",
        "Vai trò lãnh đạo của Đảng Cộng sản",
        "Những khó khăn trong quá trình đổi mới",
        "Quan hệ đối ngoại trong thời kỳ đổi mới",
        "Phát triển kinh tế thị trường định hướng xã hội chủ nghĩa",
    ]

    print("\n🔍 Testing Search Queries:")
    print("=" * 50)

    for i, query in enumerate(test_queries, 1):
        print(f"\n{i}. Query: '{query}'")
        print("-" * 40)

        try:
            results = await qdrant_service.search_corpus(query, top_k=3)

            if results:
                for result in results:
                    print(".3f")
                    print(f"   Section: {result['section']}")
                    print(f"   Word Count: {result['word_count']}")
                    print(f"   Chunk: {result['chunk_index']}/{result['total_chunks']}")
                    print(f"   Preview: {result['text'][:150]}...")
                    print()
            else:
                print("   No results found")

        except Exception as e:
            print(f"   Error: {e}")

    print("\n✅ Search testing completed!")
    return True


async def interactive_search():
    """Interactive search mode for manual testing."""

    print("\n🤖 Interactive Search Mode")
    print("=" * 30)
    print("Enter Vietnamese search queries (type 'quit' to exit):")

    while True:
        try:
            query = input("\nEnter query: ").strip()

            if not query:
                continue

            if query.lower() in ["quit", "exit", "q"]:
                break

            print(f"\nSearching for: '{query}'")
            print("-" * 40)

            results = await qdrant_service.search_corpus(query, top_k=5)

            if results:
                for i, result in enumerate(results, 1):
                    print(f"\n{i}. Score: {result['score']:.3f}")
                    print(f"   Section: {result['section']}")
                    print(f"   Text: {result['text'][:300]}...")
            else:
                print("No results found")

        except KeyboardInterrupt:
            print("\nExiting...")
            break
        except Exception as e:
            print(f"Error: {e}")


async def main():
    """Main function."""
    # Run basic tests
    success = await test_corpus_search()

    if success:
        # Offer interactive mode
        interactive = (
            input("\nWould you like to try interactive search? (y/n): ").strip().lower()
        )
        if interactive in ["y", "yes"]:
            await interactive_search()

    print("\n🎉 All tests completed!")


if __name__ == "__main__":
    asyncio.run(main())
