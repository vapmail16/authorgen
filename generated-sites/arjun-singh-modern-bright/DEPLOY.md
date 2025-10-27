# Deploy This Site

## Quick Deploy

This is a standalone, deployable author website.

## Option 1: Netlify (Easiest) ⭐

1. Go to https://app.netlify.com/drop
2. Drag this ENTIRE folder to Netlify
3. Your site is live!

## Option 2: Railway / Render / Other Docker Platform

**IMPORTANT:** Deploy THIS FOLDER only, not the entire repository.

```bash
# In Railway/Render/Similar:
# Point to this folder as the root
# Dockerfile is already here
```

## Option 3: Manual Docker

```bash
docker build -t author-site .
docker run -p 8080:80 author-site
```

Visit: http://localhost:8080

## What's Included

- ✅ All HTML pages
- ✅ All CSS/JS/Icons
- ✅ All images
- ✅ Dockerfile for containerization
- ✅ README with instructions
- ✅ robots.txt for SEO

## No Dependencies

This is a **pure static site** - no build step, no Node.js, no nothing!
Just upload and serve.

