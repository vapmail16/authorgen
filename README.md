# 🎨 Author Website Generator

Transform CSV form responses into beautiful, deployment-ready author websites.

## 🚀 Quick Start

```bash
node generator.js Data/author-site 1
```

## 📚 Documentation

All documentation is in the [`docs/`](./docs/) folder.

## ✨ Features

- 🎨 Multiple Templates (Black Chrome, Clean Earth, Vibrant Bold)
- 📱 Fully Responsive
- 🚀 Deploy Anywhere (Netlify, Vercel, GitHub Pages)
- 📦 Self-Contained Sites
- 🎯 No Dependencies
- 🐳 Docker Support

## 🐳 Docker Usage

### Deploy Individual Site

Each generated site has its own Dockerfile. Choose which site to deploy:

```bash
# Method 1: Use the deploy script
./deploy-site.sh arjun-singh-2025-10-16

# Method 2: Manual deployment
cd generated-sites/arjun-singh-2025-10-16
docker build -t author-site .
docker run -p 8080:80 --name author-site author-site
```

Visit `http://localhost:8080`

### Deploy All Sites

Or use docker-compose to run multiple sites:

```bash
docker-compose up
```

This will serve:
- Site 1: http://localhost:8080
- Site 2: http://localhost:8081

## 📖 Full Documentation

See [docs/README.md](./docs/README.md) for complete documentation.

