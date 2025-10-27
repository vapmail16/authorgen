# 🎨 Author Website Generator

> Transform CSV form responses into beautiful, deployment-ready author websites

## ✨ Features

- 🚀 **Instant Generation** - Create complete static websites in seconds
- 🎨 **Multiple Templates** - Black Chrome (dark theme) & Clean Earth (light theme)
- 📱 **Fully Responsive** - Looks great on desktop, tablet, and mobile
- 🎯 **No Dependencies** - Pure HTML/CSS/JS - deploy anywhere
- 🔧 **Smart Conditionals** - Sections auto-hide when data is missing
- 📦 **Complete Package** - Each site is self-contained and ready to deploy
- 🏗️ **Template-Specific Generators** - Each template has its own isolated engine

## 🖼️ What You Get

Each generated site includes:
- **5 Pages**: About, Books, My Story, Contact, Blog (optional)
- **Modern UI**: Smooth scrolling, fluid transitions, scroll animations
- **Choice of Templates**: 
  - **Black Chrome**: Professional dark theme with orange accents
  - **Clean Earth**: Light, airy theme with earth tones
- **Mobile Menu**: Fully responsive navigation
- **SEO Ready**: Meta tags, robots.txt, sitemap-ready

## 🚀 Quick Start

### **New: Data Folder Workflow (Recommended)**

```bash
# 1. Create data folder
mkdir -p data/author-name/author-images
mkdir -p data/author-name/book-covers

# 2. Add CSV and images to the folder
# - data/author-name/data.csv
# - data/author-name/author-images/author-photo.jpg
# - data/author-name/book-covers/book-cover.jpg

# 3. Generate site (choose template)
node generator.js data/author-name 1 black-chrome  # Dark theme
node generator.js data/author-name 1 clean-earth   # Light theme
```

### **Legacy: CSV File Workflow**

```bash
# Generate a site from CSV file
node generator.js "Your CSV File.csv" 1
```

### Preview the Site

```bash
# Open in browser (Mac)
open generated-sites/[author-folder]/index.html

# Or simply double-click the index.html file
```

### Deploy Instantly

**Drag & Drop to Netlify:**
1. Go to https://app.netlify.com/drop
2. Drag the generated folder
3. Done! Your site is live 🎉

## 📋 Requirements

- **Node.js** 12+ (no npm packages required!)
- Data folder with CSV and images (recommended)
  - OR CSV file with Google Drive URLs (legacy support)

## 📊 Data Format

### New: Data Folder Structure

```
data/author-name/
├── data.csv                    # Author data
├── author-images/              # Author photos
│   └── photo.jpg              # Referenced as "photo.jpg" in CSV
└── book-covers/                # Book covers
    ├── book1.jpg              # Referenced as "book1.jpg" in CSV
    └── book2.jpg
```

**CSV should contain filenames, not URLs:**
- `Author Photo`: `john-smith.jpg` (not URL)
- `Book 1 - Cover Image`: `book-cover.jpg` (not URL)

### Legacy: URL-Based (Still Supported)

Your CSV can use Google Drive URLs:
- `Author Photo URL (Optional)`: `https://drive.google.com/...`
- `Book 1 - Cover Image URL`: `https://drive.google.com/...`

**Documentation:**
- `DATA_FOLDER_WORKFLOW.md` - Complete data folder guide
- `QUICK_START.md` - Step-by-step walkthrough
- `USAGE_GUIDE.md` - Full documentation

## 🎯 Usage Examples

### With Data Folder (Recommended)

```bash
# Generate from data folder
node generator.js data/author-name 1

# Multiple authors, shared CSV
node generator.js data/all-authors 1   # First author
node generator.js data/all-authors 2   # Second author

# Custom output
node generator.js data/author-name 1 black-chrome ./output
```

### With CSV File (Legacy)

```bash
# Generate from CSV
node generator.js "responses.csv" 1

# Different row
node generator.js "responses.csv" 2

# Custom template and output
node generator.js "responses.csv" 1 black-chrome ./output
```

## 📁 Project Structure

```
AUTHORGEN/
├── generator.js              # Main orchestrator (loads template generators)
├── lib/
│   └── shared.js            # Shared utilities (CSV, data transform, file ops)
├── package.json              # Project configuration
├── README.md                 # This file
├── ARCHITECTURE.md           # New architecture documentation
├── USAGE_GUIDE.md           # Detailed usage guide
├── templates/                # Website templates
│   ├── black-chrome/        # Black Chrome theme
│   │   ├── generator.js     # Black Chrome template engine
│   │   ├── *.html           # Page templates
│   │   └── assets/          # CSS, JS, Icons
│   └── clean-earth/         # Clean Earth theme
│       ├── generator.js     # Clean Earth template engine (enhanced)
│       ├── *.html           # Page templates
│       └── assets/          # CSS, JS, Icons
└── generated-sites/         # Your generated websites
```

## 🌐 Deployment Options

| Platform | Difficulty | Cost | Speed |
|----------|-----------|------|--------|
| **Netlify** | ⭐ Easy | Free | Instant |
| **Vercel** | ⭐ Easy | Free | Instant |
| **GitHub Pages** | ⭐⭐ Medium | Free | 1 min |
| **Surge.sh** | ⭐ Easy | Free | Instant |
| **Traditional Hosting** | ⭐⭐⭐ Hard | $$ | Manual |

## 🎨 Available Templates

### Black Chrome Theme
Modern, artistic design featuring:
- **Dark Theme**: Black background with chrome/silver accents
- **Smooth Animations**: Fade-in, slide, scale effects on scroll
- **Interactive Elements**: Card tilt effects, custom cursor
- **Typography**: Playfair Display (headings) + Inter (body)

### Clean Earth Theme ✨ NEW
Light, natural design featuring:
- **Light Theme**: Warm earth tones with generous spacing
- **Minimalist Design**: Clean, readable typography
- **Enhanced Engine**: Supports dot notation for arrays
- **Typography**: Lora (headings) + Open Sans (body)
- **Nature-Inspired**: Sage, sand, olive color palette

## 🔧 Customization

### Change Colors

Edit `generated-sites/[author]/assets/css/styles.css`:

```css
:root {
    --color-accent: #ff6b35;  /* Change this */
    --color-chrome: #c0c0c0;  /* And this */
}
```

### Edit Content

Simply edit the HTML files - clean structure, well-commented.

### Add Pages

Copy an existing HTML file and modify. Add link to navigation.

## 💡 Key Features

### Conditional Rendering
Sections automatically hide when data is missing:
- No books? Books section hidden
- No hobbies? Hobbies section hidden
- No blog RSS? Blog page not generated

### Smart Data Handling
- Google Drive URLs auto-converted to direct links
- Multiple buy links supported (pipe-separated)
- Multi-line text properly formatted
- Social media handles cleaned automatically

### Performance Optimized
- Single CSS file (no external dependencies)
- Optimized animations (GPU-accelerated)
- Lazy loading support built-in
- Minimal JavaScript footprint

## 📈 What's Included in Generated Sites

```
author-name-2025-10-12/
├── index.html       # Home/About page
├── books.html       # All books showcase
├── story.html       # Author's story
├── contact.html     # Contact & social
├── blogs.html       # Blog (if RSS provided)
├── README.md        # Deployment guide
├── robots.txt       # SEO config
└── assets/
    ├── css/styles.css      # All styling
    ├── js/main.js          # All interactions
    └── icons/icons.svg     # Icon sprite
```

**Total Size**: ~50 KB (before images)  
**Load Time**: < 2 seconds  
**Pages**: 4-5 (depending on data)

## 🎯 Use Cases

- **Individual Authors**: Generate personal portfolio sites
- **Publishing Houses**: Bulk-generate sites for multiple authors
- **Writing Workshops**: Give students instant portfolio sites
- **Literary Agents**: Create showcases for represented authors
- **Book Launch**: Quick promotional sites for new releases

## 🛠️ Technical Details

- **No Build Process**: Pure static files
- **No Dependencies**: Zero npm packages needed for generated sites
- **Cross-Browser**: Works on all modern browsers
- **SEO Friendly**: Semantic HTML, meta tags, clean URLs
- **Accessible**: Proper heading hierarchy, alt tags
- **Fast**: Static HTML = instant page loads

## 📚 Documentation

- **README.md** - This file (overview and quick start)
- **ARCHITECTURE.md** - New template-specific generator architecture
- **USAGE_GUIDE.md** - Complete usage documentation
- **DATA_FOLDER_WORKFLOW.md** - Data folder setup guide
- **QUICK_START.md** - Step-by-step walkthrough
- Generated sites include their own README with deployment instructions

## ⚡ Pro Tips

1. Use high-quality images (800x800+ for author photo)
2. Keep short bio to 2-3 sentences (use Extended Bio for more)
3. Test locally before deploying
4. Multiple buy links? Separate with ` | `
5. For best results, fill in all optional fields

## 🔄 Workflow

```
1. Collect data via Google Form
   ↓
2. Export responses to CSV
   ↓
3. Run generator: node generator.js file.csv 1
   ↓
4. Preview: open index.html
   ↓
5. Deploy: drag folder to Netlify
   ↓
6. Done! Live website in < 5 minutes
```

## 📊 Stats

- **Generation Time**: < 5 seconds per site
- **Files Created**: 6-9 files per site
- **Template Options**: 2 (Black Chrome, Clean Earth)
- **Supported Browsers**: All modern browsers
- **Mobile Responsive**: 100%
- **Architecture**: Template-specific generators (v2.0)

## 🚦 Status

- ✅ CSV Parser - Complete
- ✅ Black Chrome Template - Complete
- ✅ Clean Earth Template - Complete ✨ NEW
- ✅ Template-Specific Generators - Complete ✨ NEW
- ✅ Data Transformation - Complete
- ✅ Asset Management - Complete
- ✅ Conditional Rendering - Complete
- ✅ Deployment Ready - Complete

## 🤝 Contributing

Want to create new templates? Each template now has its own generator:
1. Create new folder in `templates/your-template/`
2. Create `generator.js` with `generateSite()` and `renderTemplate()` functions
3. Add HTML files with template syntax
4. Include `assets/` folder with CSS, JS, icons
5. Done! Your template is completely isolated from others

See `ARCHITECTURE.md` for detailed guide on creating new templates.

## 📝 License

MIT License - Free for commercial and personal use

## 🎉 Get Started Now!

```bash
node generator.js "your-form-responses.csv" 1
```

Generate beautiful author websites in seconds! 🚀

---

**Version**: 2.0.0 (Template-Specific Generators)  
**Created**: October 2025  
**Generator**: Static Site Generator for Authors
**Architecture**: Template-specific generators with shared utilities

