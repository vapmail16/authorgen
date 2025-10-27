#!/bin/bash

# Deploy script for individual generated sites
# Usage: ./deploy-site.sh <site-folder-name>

SITE_NAME=$1

if [ -z "$SITE_NAME" ]; then
    echo "Usage: ./deploy-site.sh <site-folder-name>"
    echo "Example: ./deploy-site.sh arjun-singh-2025-10-16"
    exit 1
fi

SITE_PATH="generated-sites/$SITE_NAME"

if [ ! -d "$SITE_PATH" ]; then
    echo "Error: Site folder not found: $SITE_PATH"
    echo "Available sites:"
    ls generated-sites/
    exit 1
fi

echo "📦 Building Docker image for: $SITE_NAME"
echo "🖐   Stopping any existing container..."
docker stop $SITE_NAME 2>/dev/null
docker rm $SITE_NAME 2>/dev/null

echo "🏗️  Building new image..."
cd $SITE_PATH
docker build -t $SITE_NAME:latest .

echo "🚀 Starting container..."
docker run -d -p 8080:80 --name $SITE_NAME $SITE_NAME:latest

echo "✅ Deployment complete!"
echo "🌐 Visit: http://localhost:8080"

