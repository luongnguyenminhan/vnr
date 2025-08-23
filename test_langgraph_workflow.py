#!/usr/bin/env python3
"""
Test script for LangGraph workflow in ai_service.py
"""

import asyncio
import sys
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from app.services.ai_service import ai_service, initialize_qdrant_integration
from app.core.config import logger


async def test_langgraph_workflow():
    """Test the LangGraph workflow functionality"""

    print("🧠 LANGGRAPH WORKFLOW TEST")
    print("=" * 50)

    # Initialize Qdrant integration
    print("🔗 Initializing Qdrant integration...")
    initialize_qdrant_integration()

    # Check workflow status
    print("\n📊 Workflow Status:")
    status = ai_service.get_workflow_status()
    for key, value in status.items():
        print(f"   {key}: {value}")

    # Test workflow graph generation
    print("\n📈 Workflow Graph:")
    graph = ai_service.get_langgraph_workflow_graph()
    if graph:
        print("   ✅ Workflow graph generated successfully")
        print("   Graph preview (first 200 chars):")
        print(f"   {graph[:200]}...")
    else:
        print("   ❌ Could not generate workflow graph")

    # Test RAG chat with LangGraph
    print("\n🤖 Testing RAG Chat with LangGraph:")

    test_queries = [
        "Đổi mới là gì?",
        "Công cuộc đổi mới ở Việt Nam",
        "Lịch sử thống nhất đất nước",
    ]

    session_id = "test_session_langgraph"

    for i, query in enumerate(test_queries, 1):
        print(f"\n{i}. Query: '{query}'")
        print("-" * 40)

        try:
            response = await ai_service.run_rag_chat(query=query, session_id=session_id)

            print(f"Response: {response[:200]}...")
            print("✅ LangGraph workflow executed successfully")
        except Exception as e:
            print(f"❌ Error: {e}")

    # Test conversation history
    print("\n💬 Conversation History:")
    history = ai_service.get_conversation_history(session_id)
    print(f"   Total turns: {len(history)}")
    for i, turn in enumerate(history, 1):
        print(f"   Turn {i}: User: {turn['user'][:50]}...")
        print(f"           AI: {turn['ai'][:50]}...")

    print("\n✅ LangGraph workflow testing completed!")


async def compare_workflows():
    """Compare LangGraph vs Direct LangChain performance"""

    print("\n🔍 WORKFLOW COMPARISON TEST")
    print("=" * 50)

    query = "Đại hội VI của Đảng Cộng sản Việt Nam"

    # Force using fallback (direct LangChain) first
    ai_service.rag_app = None  # Temporarily disable LangGraph

    print("1. Testing Direct LangChain (Fallback):")
    try:
        response1 = await ai_service.run_rag_chat(query=query, session_id="compare_1")
        print(f"   ✅ Success: {response1[:100]}...")
    except Exception as e:
        print(f"   ❌ Error: {e}")

    # Re-enable LangGraph if available
    if hasattr(ai_service, "_setup_langgraph_workflow"):
        ai_service._setup_langgraph_workflow()

    print("\n2. Testing LangGraph Workflow:")
    try:
        response2 = await ai_service.run_rag_chat(query=query, session_id="compare_2")
        print(f"   ✅ Success: {response2[:100]}...")
    except Exception as e:
        print(f"   ❌ Error: {e}")

    print("\n🔄 Comparison completed!")


async def main():
    """Main test function"""
    await test_langgraph_workflow()
    await compare_workflows()

    print("\n🎉 All tests completed!")
    print("\n📝 Note: Make sure to install required packages:")
    print("   pip install langchain-google-genai langgraph")


if __name__ == "__main__":
    asyncio.run(main())
