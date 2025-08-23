# LangGraph Integration for Enhanced RAG Chat

This document explains the integration of LangGraph with the existing RAG (Retrieval-Augmented Generation) chat system.

## 🤖 What's New

The AI service now uses **LangGraph** - a powerful framework for building stateful, multi-actor applications with LLMs - instead of raw Google GenAI. This provides several key advantages:

### 🔄 **LangGraph Workflow Architecture**

Instead of a linear execution flow, the system now uses a structured workflow with the following nodes:

```
retrieve_documents → get_conversation_context → generate_response → format_output
```

### 📊 **State Management**

LangGraph introduces proper state management with a typed `RAGState`:

```python
class RAGState(TypedDict):
    query: str
    session_id: Optional[str]
    retrieved_documents: List[str]
    conversation_context: str
    response: str
    metadata: Dict[str, Any]
```

### 🏗️ **Modular Node Architecture**

Each step of the RAG process is now a separate, reusable node:

1. **`retrieve_documents_node`** - Handles document retrieval from Qdrant
2. **`get_conversation_context_node`** - Manages conversation history
3. **`generate_response_node`** - Generates responses using LangChain
4. **`format_output_node`** - Formats final output

## 🚀 **Key Benefits**

### **1. Better Error Handling**
- Each node can handle errors independently
- Graceful fallback to direct LangChain if LangGraph fails
- Detailed error logging and recovery

### **2. Enhanced Debugging**
- State tracking throughout the workflow
- Node-level execution monitoring
- Workflow visualization support

### **3. Improved Maintainability**
- Modular architecture makes it easy to modify individual components
- Clear separation of concerns
- Easier testing of individual nodes

### **4. Future Extensibility**
- Easy to add new nodes (e.g., document ranking, multi-turn reasoning)
- Support for conditional logic and branching
- Human-in-the-loop capabilities

## 📋 **Usage**

### **Automatic Workflow Selection**

The system automatically chooses the best execution method:

```python
# This will use LangGraph if available, otherwise fallback to direct LangChain
response = await ai_service.run_rag_chat(
    query="Đổi mới là gì?",
    session_id="user_session_123"
)
```

### **Workflow Status Monitoring**

Check the status of your LangGraph workflow:

```python
status = ai_service.get_workflow_status()
print(status)
# Output:
# {
#     'langchain_available': True,
#     'langgraph_available': True,
#     'google_client_available': True,
#     'chat_client_available': True,
#     'workflow_initialized': True,
#     'rag_app_compiled': True,
#     'embedding_dimension': 768,
#     'conversation_sessions': 5
# }
```

### **Workflow Visualization**

Generate a visual representation of your workflow:

```python
graph = ai_service.get_langgraph_workflow_graph()
print(graph)  # Mermaid format for visualization
```

## 🔧 **Technical Details**

### **Node Functions**

#### **retrieve_documents_node**
- Embeds the user query using Google embeddings
- Searches Qdrant vector database for relevant documents
- Returns list of retrieved document texts
- Handles errors gracefully with empty list fallback

#### **get_conversation_context_node**
- Retrieves recent conversation history (last 3 turns)
- Formats conversation context for the LLM
- Maintains conversation awareness across sessions

#### **generate_response_node**
- Builds comprehensive context from retrieved documents and conversation history
- Creates optimized system and user messages
- Invokes LangChain ChatGoogleGenerativeAI for response generation
- Enhanced Vietnamese language support

#### **format_output_node**
- Formats final response with metadata
- Prepares output for API consumption
- Includes debugging information

### **Fallback Mechanism**

If LangGraph is not available or fails, the system automatically falls back to the original direct LangChain implementation:

```python
# LangGraph workflow (preferred)
if self.rag_app and LANGGRAPH_AVAILABLE:
    result = await self.rag_app.ainvoke(initial_state)

# Fallback to direct LangChain
else:
    return await self._fallback_rag_chat(query, top_k, session_id)
```

## 🧪 **Testing**

### **Run LangGraph Tests**

```bash
python test_langgraph_workflow.py
```

This script will:
- ✅ Test LangGraph workflow execution
- ✅ Compare performance with direct LangChain
- ✅ Verify conversation history management
- ✅ Generate workflow status reports

### **Manual Testing**

```python
from app.services.ai_service import ai_service

# Test LangGraph workflow
response = await ai_service.run_rag_chat(
    query="Công cuộc đổi mới ở Việt Nam",
    session_id="test_session"
)

# Check workflow status
status = ai_service.get_workflow_status()
```

## 📊 **Performance Comparison**

| Feature | Direct LangChain | LangGraph Workflow |
|---------|------------------|-------------------|
| Error Handling | Basic try/catch | Node-level error handling |
| State Management | Manual | Automatic state tracking |
| Debugging | Limited | Rich state inspection |
| Extensibility | Difficult | Easy to add nodes |
| Visualization | None | Workflow graphs |
| Maintainability | Moderate | High |

## 🔧 **Configuration**

### **Environment Variables**

Make sure you have the Google API key configured:

```bash
export GOOGLE_API_KEY="your-google-api-key-here"
```

### **Dependencies**

Required packages (already in requirements.txt):

```txt
langchain-google-genai>=2.0.7
langgraph>=0.2.35
langchain-core>=0.2.29
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **LangGraph Not Available**
   ```
   Error: LANGGRAPH_AVAILABLE = False
   Solution: pip install langgraph
   ```

2. **Workflow Compilation Failed**
   ```
   Error: Could not compile LangGraph workflow
   Solution: Check LangChain and LangGraph versions
   ```

3. **Node Execution Failed**
   ```
   Error: [Node name] failed with error
   Solution: Check individual node logs for specific issues
   ```

4. **State Validation Errors**
   ```
   Error: State validation failed
   Solution: Check RAGState type definitions
   ```

### **Debugging Workflow**

```python
# Enable detailed logging
import logging
logging.getLogger("langgraph").setLevel(logging.DEBUG)

# Check workflow execution
status = ai_service.get_workflow_status()
print(f"Workflow initialized: {status['workflow_initialized']}")

# Visualize workflow
graph = ai_service.get_langgraph_workflow_graph()
print(graph)
```

## 🔮 **Future Enhancements**

### **Planned Features**

1. **Conditional Logic**
   - Add decision nodes for dynamic routing
   - Context-aware response generation

2. **Human-in-the-Loop**
   - Human approval for sensitive responses
   - Interactive clarification requests

3. **Advanced State Management**
   - Persistent conversation state
   - Cross-session context sharing

4. **Performance Optimization**
   - Parallel node execution
   - Caching and memoization

5. **Monitoring & Observability**
   - Workflow execution metrics
   - Real-time performance monitoring

## 📚 **API Reference**

### **AIService Methods**

#### **`run_rag_chat(query, session_id=None, top_k=5)`**
Main method for RAG chat with automatic workflow selection.

#### **`get_workflow_status()`**
Returns dictionary with workflow status information.

#### **`get_langgraph_workflow_graph()`**
Returns Mermaid format workflow visualization.

#### **`_setup_langgraph_workflow()`**
Internal method to initialize LangGraph workflow.

## 🎯 **Best Practices**

### **1. Error Handling**
- Always check workflow status before critical operations
- Implement proper fallbacks for workflow failures
- Log errors with sufficient context

### **2. State Management**
- Keep session IDs consistent across requests
- Monitor conversation store size
- Clear old sessions periodically

### **3. Performance**
- Use appropriate `top_k` values
- Monitor embedding generation times
- Cache frequently accessed documents

### **4. Monitoring**
- Regularly check workflow status
- Monitor conversation history growth
- Track response quality metrics

## 📞 **Support**

For issues with LangGraph integration:

1. Check the workflow status: `ai_service.get_workflow_status()`
2. Verify LangGraph installation: `pip list | grep langgraph`
3. Check logs for detailed error messages
4. Test with simple queries first for debugging

---

*Built with LangGraph for enhanced RAG capabilities and improved workflow management.*
