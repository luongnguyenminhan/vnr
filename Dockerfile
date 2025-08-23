FROM python:3.11-slim-bookworm

# Install Node.js for building frontend
RUN apt-get update && apt-get install -y \
    curl \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy frontend source and build
COPY fe/ ./fe/
WORKDIR /app/fe
RUN npm install && npm run build

# Copy built frontend to FastAPI static directory
WORKDIR /app
RUN mkdir -p app/static && cp -r fe/dist/* app/static/

# Copy the rest of the application
COPY . .

# expose fastapi port for internal network
EXPOSE 8000

# CMD với proxy headers cho reverse proxy
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--proxy-headers", "--forwarded-allow-ips", "*"]