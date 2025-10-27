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

Each generated site includes a Dockerfile. To build and run:

```bash
cd generated-sites/arjun-singh
docker build -t author-site .
docker run -p 8080:80 author-site
```

Visit `http://localhost:8080`

## 📖 Full Documentation

See [docs/README.md](./docs/README.md) for complete documentation.

