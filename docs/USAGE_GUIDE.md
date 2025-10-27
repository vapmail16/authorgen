# Author Website Generator - Usage Guide

## 🎨 Overview

This tool generates complete, deployment-ready static websites for authors using data from CSV files (Google Forms responses). Each generated site is a self-contained folder with all necessary assets.

## 📁 Project Structure

```
AUTHORGEN/
├── generator.js                    # Main orchestrator (loads template generators)
├── lib/
│   └── shared.js                  # Shared utilities (CSV, data transform, file ops)
├── package.json                    # Project configuration
├── ARCHITECTURE.md                 # Template-specific generator architecture
├── USAGE_GUIDE.md                 # This file
├── templates/                      # Website templates
│   ├── black-chrome/              # Black Chrome theme (dark)
│   │   ├── generator.js           # Black Chrome template engine
│   │   ├── index.html             # Home/About page template
│   │   ├── books.html             # Books page template
│   │   ├── story.html             # My Story page template
│   │   ├── contact.html           # Contact page template
│   │   ├── blogs.html             # Blog page template
│   │   └── assets/                # Template assets
│   │       ├── css/styles.css     # Black Chrome styling
│   │       ├── js/main.js         # Smooth scrolling & animations
│   │       └── icons/icons.svg    # Icon sprite
│   └── clean-earth/               # Clean Earth theme (light)
│       ├── generator.js           # Clean Earth template engine (enhanced)
│       ├── index.html, books.html, etc.
│       └── assets/                # Template assets
├── Data/                           # Author data folders
│   └── author-site/
│       ├── data.csv
│       ├── author-images/
│       └── book-covers/
└── generated-sites/               # Output folder for generated sites
    └── [author-name-date]/       # Each author gets their own folder
```

## 🚀 Quick Start

### 1. Generate a Website

```bash
node generator.js "Your CSV File.csv" [row-number] [template] [output-directory]
```

**Examples:**

```bash
# Generate site with black-chrome template (dark theme)
node generator.js "Author Website Form Responses - Form Responses 1.csv" 1 black-chrome

# Generate site with clean-earth template (light theme)
node generator.js "Author Website Form Responses - Form Responses 1.csv" 1 clean-earth

# Generate site for second author
node generator.js "Author Website Form Responses - Form Responses 1.csv" 2 black-chrome

# Specify custom output directory
node generator.js "Author Website Form Responses - Form Responses 1.csv" 1 clean-earth ./my-custom-output

# Using data folder (recommended)
node generator.js Data/author-site 1 clean-earth
```

### 2. Preview the Generated Site

After generation, open the `index.html` file in your browser:

```bash
# On Mac
open generated-sites/[author-folder]/index.html

# On Windows
start generated-sites/[author-folder]/index.html

# On Linux
xdg-open generated-sites/[author-folder]/index.html
```

Or simply drag the `index.html` file into your browser.

## 📊 CSV Format

Your CSV should contain the following columns (as exported from the Google Form):

### Required Fields:
- **Author Name** - Author's full name
- **Tagline** - Short tagline/subtitle
- **Author Bio** - Brief biography (2-3 sentences)
- **Email Address** or **Contact Email** - Contact email

### Optional Fields:

**Profile:**
- Author Photo URL (Optional) - Direct image URL or Google Drive link
- Site URL/Name
- Extended Bio - Detailed biography
- Personal Story - Personal writing journey
- Location - Author's location

**Books (up to 6):**
- Book [1-6] - Title
- Book [1-6] - Publish Date
- Book [1-6] - Description
- Book [1-6] - Buy Links (pipe-separated: link1 | link2)
- Book [1-6] - Cover Image URL

**Current Work:**
- Current Work Title
- Current Work Description

**Hobbies & Interests:**
- Hobbies & Interests - Titles (one per line)
- Hobbies & Interests - Icons (one per line, see icon list below)
- Hobbies & Interests - Descriptions (pipe-separated: desc1 | desc2)

**Social Media:**
- Twitter Handle
- Facebook Page URL
- Instagram Handle
- LinkedIn Profile URL
- Blog RSS Feed URL

## 🎨 Available Templates

### Black Chrome Theme
Modern, artistic design with:
- **Color Scheme**: Black background with chrome/silver accents and orange highlights
- **5 Pages**: About, Books, My Story, Contact, Blog (if RSS feed provided)
- **Features**:
  - Smooth scrolling throughout
  - Fluid transitions between sections
  - CSS animations on scroll
  - Responsive design (mobile-friendly)
  - Interactive hover effects
  - Card tilt effects on desktop
  - Custom cursor glow effect
  - Reading progress bar (on story page)
  - Modern navigation with mobile menu

## 🎯 Available Icons for Hobbies

Use these icon names in the "Hobbies & Interests - Icons" column:

- `book-open` - Reading
- `paint-brush` - Painting/Art
- `music` - Music
- `camera` - Photography
- `gamepad` - Gaming
- `dumbbell` - Fitness/Exercise
- `utensils` - Cooking/Food
- `plane` - Travel
- `tree` - Nature
- `heart` - General interests
- `laptop` - Technology/Coding
- `car` - Automotive
- `paw` - Pets/Animals
- `seedling` - Gardening
- `chess` - Strategy games
- `swimmer` - Swimming
- `bicycle` - Cycling
- `guitar` - Playing instruments
- `palette` - Arts & crafts
- `coffee` - Coffee enthusiast

## 📦 Generated Site Structure

Each generated site folder contains:

```
author-name-2025-10-12/
├── index.html              # Home/About page
├── books.html              # Books showcase
├── story.html              # Author story
├── contact.html            # Contact page
├── blogs.html              # Blog page (if RSS provided)
├── README.md               # Deployment instructions
├── robots.txt              # SEO configuration
└── assets/
    ├── css/
    │   └── styles.css      # All styles (minified)
    ├── js/
    │   └── main.js         # All JavaScript
    └── icons/
        └── icons.svg       # Icon sprite
```

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Easiest)

1. Go to https://app.netlify.com/drop
2. Drag and drop the generated folder
3. Your site is live! (Free custom domain available)

### Option 2: Vercel

```bash
cd generated-sites/[author-folder]
npx vercel --prod
```

### Option 3: GitHub Pages

```bash
cd generated-sites/[author-folder]
git init
git add .
git commit -m "Initial commit"
git remote add origin [your-repo-url]
git push -u origin main
```

Then enable GitHub Pages in repository settings.

### Option 4: Traditional Web Hosting

Upload the generated folder via FTP to any web host (Bluehost, HostGator, GoDaddy, etc.)

### Option 5: Surge.sh

```bash
cd generated-sites/[author-folder]
npx surge
```

## 🎛️ Customization

### Changing Colors

Edit `assets/css/styles.css` and modify the CSS variables at the top:

```css
:root {
    --color-bg: #0a0a0a;              /* Background color */
    --color-accent: #ff6b35;          /* Accent color */
    --color-chrome: #c0c0c0;          /* Chrome color */
    /* ... more variables */
}
```

### Editing Content

Simply edit the HTML files directly. The structure is clean and well-commented.

### Adding More Pages

Copy an existing HTML file, modify the content, and add a link to it in the navigation.

## 🔧 Troubleshooting

### Problem: CSV not found
**Solution**: Use quotes around the filename if it contains spaces:
```bash
node generator.js "My CSV File.csv"
```

### Problem: Row not found
**Solution**: Check how many rows are in your CSV. Row numbers start at 1.

### Problem: Images not showing
**Solution**: 
- Ensure image URLs are publicly accessible
- For Google Drive, use the "Anyone with the link" sharing setting
- The generator automatically converts Google Drive URLs to direct links

### Problem: Template not found
**Solution**: Ensure the template folder exists in `templates/[template-name]`

## 💡 Tips & Best Practices

1. **Images**: Use high-quality images (at least 800x800px for author photo, 600x900px for book covers)
2. **Books**: Fill in as many fields as possible for better presentation
3. **Buy Links**: Separate multiple links with ` | ` (pipe character with spaces)
4. **Bio**: Keep the short bio to 2-3 sentences, use Extended Bio for longer content
5. **Testing**: Always preview the generated site locally before deploying
6. **Updates**: To update a site, regenerate it and replace the deployed folder

## 📈 Features by Section

### About Page (index.html)
- Hero section with author photo and bio
- Current work in progress
- Featured books (up to 3)
- Hobbies & interests grid

### Books Page
- Full list of all books
- Large book covers
- Detailed descriptions
- Buy links for each book

### My Story Page
- Extended biography
- Personal story
- Location information
- Photo gallery support

### Contact Page
- Contact information
- Social media links (when provided)
- Contact form (Formspree integration ready)

### Blog Page (Optional)
- Appears only if Blog RSS Feed URL is provided
- Can be customized to show latest posts

## 🔄 Batch Generation

To generate sites for multiple authors:

```bash
# Generate for rows 1, 2, and 3
node generator.js "responses.csv" 1
node generator.js "responses.csv" 2
node generator.js "responses.csv" 3
```

Or create a simple script:

```bash
#!/bin/bash
for i in {1..10}; do
    node generator.js "responses.csv" $i
done
```

## 📞 Support & Updates

- Each generated site is standalone and requires no maintenance
- The generator can be run multiple times - it overwrites previous output for the same author
- All sites are static HTML/CSS/JS - no server-side code needed
- Sites work on all modern browsers (Chrome, Firefox, Safari, Edge)

## ⚡ Performance

- Average generation time: < 5 seconds per site
- Generated site size: 1-3 MB (depending on images)
- Page load time: < 2 seconds on modern connections
- Mobile-optimized and SEO-friendly

---

**Version**: 1.0.0  
**Last Updated**: October 12, 2025  
**License**: MIT

