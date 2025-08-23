# RAG Chat Bubble Service

A production-ready FastAPI service that provides conversational RAG (Retrieval-Augmented Generation) through an embeddable chat bubble widget. Features Google AI integration, Qdrant vector storage, and a comprehensive admin interface.

## 🚀 Features

- **Floating Chat Bubble**: Embeddable HTML/JS widget for easy integration
- **Conversational RAG**: AI-powered responses using document context
- **Google AI Integration**: Embeddings and chat via Google Generative AI
- **Qdrant Vector Storage**: Efficient document and vector management
- **Admin Interface**: Web-based admin panel for corpus management
- **Session Management**: Persistent conversation context
- **Security Logging**: Comprehensive security warnings for hard-coded credentials
- **Modern UI**: Responsive design with dark mode support

## 🛠️ Quick Start

### Prerequisites

- Python 3.8+
- Qdrant database (local or remote)
- Google AI API key

### 1. Installation

```bash
# Clone the repository
git clone <repository-url>
cd vnr

# Install dependencies
pip install -r requirements.txt
```

### 2. Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env and set your Google API key
GOOGLE_API_KEY=your_google_api_key_here
QDRANT_URL=http://localhost:6333  # Adjust if needed
```

### 3. Start Qdrant (if running locally)

```bash
# Using Docker
docker run -d -p 6333:6333 qdrant/qdrant

# Or using Docker Compose
docker-compose up qdrant
```

### 4. Run the Application

```bash
# Development server
uvicorn app.main:app --reload

# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### 5. Access the Application

- **API Documentation**: http://127.0.0.1:8000/docs
- **Admin Interface**: http://127.0.0.1:8000/admin/ui
- **Health Check**: http://127.0.0.1:8000/chat/health

## 📡 API Endpoints

### Chat Endpoints

- `GET /chat/bubble` - Returns the embeddable chat bubble HTML/JS
- `POST /chat/send` - Send chat message and receive AI response
- `GET /chat/health` - Chat service health check

### Admin Endpoints (Password Protected)

- `GET /admin/ui` - Admin web interface
- `POST /admin/upload` - Upload documents (file or URL)
- `DELETE /admin/corpus/{name}` - Delete document collection
- `GET /admin/status` - View system status and collections

## 🔧 Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `GOOGLE_API_KEY` | None | Google AI API key (required) |
| `QDRANT_URL` | `http://localhost:6333` | Qdrant database URL |
| `QDRANT_API_KEY` | None | Qdrant API key (if needed) |

### Hard-coded Settings

⚠️ **SECURITY WARNING**: This application uses a hard-coded admin password as required by specification.

```python
# In app/core/config.py
DEFAULT_ADMIN_PASSWORD = "ChangeMeHardCoded123!"  # INSECURE BY DESIGN
```

**This is intentionally insecure for demonstration purposes only.**

## 🗨️ Using the Chat Bubble

### Embedding in Your Website

1. Get the chat bubble HTML:
```bash
curl http://127.0.0.1:8000/chat/bubble
```

2. Copy the returned HTML and paste it into your website's `<body>` tag

3. The chat bubble will automatically connect to your FastAPI backend

### Customization

The chat bubble supports:
- **Session persistence**: Conversations continue across page reloads
- **Responsive design**: Works on mobile and desktop
- **Dark mode**: Automatic dark/light theme detection
- **Error handling**: Graceful fallbacks for network issues
- **Accessibility**: Screen reader support and keyboard navigation

## 🔐 Security Considerations

### 🚨 CRITICAL SECURITY WARNING

This application contains **intentionally insecure configurations** as required by the project specification:

- Hard-coded admin password in source code
- Comprehensive security warnings logged at startup
- No user authentication system
- Admin endpoints protected only by hard-coded password

**DO NOT use this configuration in production environments.**

### Security Features

- **Security Logging**: All admin access attempts are logged
- **Password Verification**: Admin endpoints require password authentication
- **Input Validation**: Comprehensive validation on all API endpoints
- **Error Handling**: Secure error messages without information leakage

## 🏗️ Architecture

```
app/
├── api/endpoints/          # FastAPI route handlers
│   ├── chat.py            # Chat API endpoints
│   └── admin.py           # Admin API endpoints
├── core/                  # Configuration and setup
│   └── config.py          # Settings and security warnings
├── services/              # Business logic
│   ├── ai_service.py      # Google AI integration
│   └── qdrant_service.py  # Vector database operations
├── schemas/               # Pydantic models
│   ├── chat.py            # Chat request/response models
│   └── admin.py           # Admin models
├── models/                # Data models
│   └── metadata_store.py  # Simple metadata storage
└── utils/                 # Utilities
    └── chat_bubble_template.py  # Chat bubble HTML template
```

## 🧪 Development

### Running Tests

```bash
# Install test dependencies
pip install pytest pytest-asyncio

# Run tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html
```

### Code Quality

```bash
# Format code
black app/

# Lint code
flake8 app/

# Type checking
mypy app/
```

## 📊 Monitoring

### Health Checks

- `/chat/health` - Chat service health status
- `/admin/status` - System status and collection information

### Logging

The application provides comprehensive logging:

- **Security events**: Admin access attempts and authentication failures
- **AI service**: Embedding and chat generation activities
- **Qdrant operations**: Collection management and search operations
- **API requests**: All endpoint access with timestamps

## 🚀 Deployment

### Docker

```dockerfile
FROM python:3.11-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Setup

```bash
# Production environment
export GOOGLE_API_KEY=your_production_key
export QDRANT_URL=http://your-qdrant-instance:6333

# Run with production settings
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📝 License

This project is provided as-is for educational and demonstration purposes.

## ⚠️ Disclaimer

This application is a **demonstration project** with intentionally insecure configurations. It should not be used in production environments without significant security enhancements including:

- Proper user authentication system
- Secure credential management
- Input sanitization and validation
- Rate limiting and abuse protection
- HTTPS enforcement
- Regular security audits

**Use at your own risk.**

## 🆘 Support

For issues and questions:
1. Check the API documentation at `/docs`
2. Review the admin interface at `/admin/ui`
3. Check application logs for detailed error information
