#!/bin/bash

# Author Website Generator - Quick Generate Script
# Usage: ./generate.sh [row-number]

CSV_FILE="Author Website Form Responses - Form Responses 1.csv"
ROW=${1:-1}
TEMPLATE="black-chrome"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "   🎨 Author Website Generator - Quick Generate"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Generating website for row: $ROW"
echo ""

node generator.js "$CSV_FILE" "$ROW" "$TEMPLATE"

if [ $? -eq 0 ]; then
    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "   ✅ Success! Next steps:"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo ""
    echo "1. Preview locally:"
    echo "   open generated-sites/*/index.html"
    echo ""
    echo "2. Deploy to Netlify:"
    echo "   Drag the generated folder to: https://app.netlify.com/drop"
    echo ""
    echo "3. Or deploy with Vercel:"
    echo "   cd generated-sites/[folder-name] && npx vercel --prod"
    echo ""
fi

