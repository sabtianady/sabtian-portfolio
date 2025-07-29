#!/bin/bash

# Docker build script for Mojila Portfolio

echo "Building Mojila Portfolio Docker image..."

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  Warning: .env file not found. API_KEY will not be replaced."
    echo "   Create a .env file with API_KEY=your_api_key"
fi

# Load environment variables from .env file
if [ -f ".env" ]; then
    export $(cat .env | xargs)
fi

# Build the Docker image with API_KEY build argument
if [ -n "$API_KEY" ]; then
    echo "Building with API_KEY from .env file..."
    docker build --build-arg API_KEY="$API_KEY" -t mojila-portfolio:latest .
else
    echo "Building without API_KEY (placeholder will remain)..."
    docker build -t mojila-portfolio:latest .
fi

if [ $? -eq 0 ]; then
    echo "✅ Docker image built successfully!"
    echo ""
    echo "To run the container on port 80:"
    echo "  docker run -d -p 8080:80 --restart always --name mojila-portfolio mojila-portfolio"
    echo ""
    echo "Or use docker-compose (recommended):"
    echo "  docker-compose up -d"
    echo ""
    echo "To stop the container:"
    echo "  docker stop mojila-portfolio"
    echo "  docker rm mojila-portfolio"
    echo ""
    echo "Or with docker-compose:"
    echo "  docker-compose down"
else
    echo "❌ Docker build failed!"
    exit 1
fi