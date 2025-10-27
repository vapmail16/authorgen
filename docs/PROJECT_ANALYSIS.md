# AUTHORGEN - Project Analysis & Architecture

## 🎯 Project Purpose

AUTHORGEN is a **static site generator** specifically designed for authors. It transforms CSV data and images into beautiful, modern, fully-functional author websites that are:
- ✅ Completely self-contained (no dependencies)
- ✅ Instantly deployable to any hosting platform
- ✅ Generated from templates (easily create new themes)
- ✅ Mobile-responsive and accessible
- ✅ Zero-config for end users

## 📊 System Architecture

### High-Level Flow

```
┌─────────────┐
│  CSV Data   │
│  + Images   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐
│  Data Parser    │
│  & Transformer  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│ Template Engine │
│  (Handlebars-   │
│   like syntax)  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Asset Copier   │
│  (CSS/JS/Imgs)  │
└──────┬──────────┘
       │
       ▼
┌─────────────────┐
│  Static Site    │
│  (5 HTML pages  │
│   + assets)     │
└─────────────────┘
```

### Component Breakdown

#### 1. Data Layer (`generator.js`)

**parseCSV(filePath)**
- Input: Path to CSV file
- Output: Array of row objects (keys = column headers)
- Uses: Node.js `fs` module, manual parsing
- Edge cases: Handles quoted fields with commas, line breaks in fields

**transformAuthorData(csvRow, dataFolder)**
- Input: Single CSV row object, path to data folder
- Output: Structured data object (see schema below)
- Key transformations:
  - Extracts up to 10 books from columns
  - Processes up to 5 hobbies
  - Parses buy links (pipe-separated: "Amazon|url|B&N|url")
  - Handles both URLs and local filenames for images
  - Filters placeholder text
  - Generates flags (`hasBooks`, `hasHobbies`, etc.)
  - Creates `authorInitials` from name
  - Slices first 2 books for `featuredBooks`

**Key Functions:**
- `cleanFieldValue()` - Removes instructional text, prefixes
- `isPlaceholder()` - Detects fake/sample data
- `parseBuyLinks()` - Converts "Name|URL|Name|URL" to objects
- `convertGoogleDriveURL()` - Transforms Drive share links to direct downloads

#### 2. Template Engine (`renderTemplate()`)

**Processing Pipeline (Order is Critical!):**

```javascript
// 1. Process {{#each}} loops first
{{#each books}}...{{/each}}
  → Within each item:
     a. Process nested {{#each buyLinks}}
     b. Process {{#if}}...{{else}}...{{/if}}
     c. Process {{#if}}...{{/if}}
     d. Replace {{property}} with values

// 2. Process global {{#if}}...{{else}}...{{/if}}
// 3. Process global {{#if}}...{{/if}}
// 4. Process {{#unless}}...{{/unless}}
// 5. Replace global {{variable}}
// 6. Replace {{{htmlVariable}}} (triple braces)
// 7. Clean up leftover tags
// 8. Fix malformed HTML structure
// 9. Clean up whitespace
```

**Why This Order?**
- Nested loops must resolve before conditionals (prevents broken HTML tags)
- Variable replacement happens after conditionals (avoids replacing inside unrendered blocks)
- Cleanup is last to catch any missed tags

**Supported Syntax:**

| Syntax | Purpose | Example |
|--------|---------|---------|
| `{{variable}}` | Insert value | `{{authorName}}` |
| `{{{html}}}` | Insert HTML (no escape) | `{{{extendedBio}}}` |
| `{{#if condition}}...{{/if}}` | Conditional block | `{{#if hasBooks}}...{{/if}}` |
| `{{#if x}}...{{else}}...{{/if}}` | If-else | `{{#if cover}}...{{else}}...{{/if}}` |
| `{{#unless condition}}...{{/unless}}` | Negative conditional | `{{#unless authorPhoto}}...{{/unless}}` |
| `{{#each array}}...{{/each}}` | Loop | `{{#each books}}...{{/each}}` |
| `{{@index}}` | Loop index | `delay="{{@index}}00"` |

#### 3. Asset Management

**copyAssets()**
- Copies entire template folder structure to output
- Preserves directory hierarchy
- Skips `.html` files (those are rendered separately)

**Image Copying:**
- Author photos: `dataFolder/author-images/*.jpg` → `output/assets/images/`
- Book covers: `dataFolder/book-covers/*.jpg` → `output/assets/images/`
- Checks file existence, warns if missing
- Maintains original filenames

#### 4. Site Generation (`generateSite()`)

**Steps:**
1. Create output directory with timestamp
2. Copy all template assets (CSS, JS, icons)
3. Create `assets/images/` directory
4. Copy author photo (if local file)
5. Copy book cover images (if local files)
6. Generate all 5 HTML pages:
   - `index.html` (About/Home)
   - `books.html` (Books listing)
   - `story.html` (My Story)
   - `contact.html` (Contact)
   - `blogs.html` (Blog)
7. Write files to disk
8. Print success message with stats

## 📋 Data Schema (Complete)

```javascript
{
  // ===== Author Information =====
  authorName: "John Doe",
  authorInitials: "JD",  // Auto-generated from name
  tagline: "Bestselling Mystery Author",
  bio: "Short bio (1-2 sentences) for home page",
  extendedBio: "<p>Longer bio with HTML</p>",  // For My Story page
  personalStory: "<p>Personal journey with HTML</p>",  // For My Story page
  
  // ===== Images =====
  authorPhoto: "assets/images/author.jpg",  // Path in generated site
  authorPhotoFile: "author.jpg",  // Original filename (for copying)
  
  // ===== Books (Array of up to 10) =====
  books: [
    {
      title: "Book Title",
      publishDate: "01/15/2023",
      description: "Book description text",
      cover: "assets/images/book-1.jpg",  // Path in generated site
      coverFile: "book-1.jpg",  // Original filename (for copying)
      buyLinks: [
        { name: "Amazon", url: "https://amazon.com/..." },
        { name: "Barnes & Noble", url: "https://..." }
      ]
    }
  ],
  featuredBooks: [],  // First 2 books for home page (auto-generated)
  
  // ===== Hobbies (Array of up to 5) =====
  hobbies: [
    {
      name: "Reading",
      icon: "📚",  // Emoji or icon name
      description: "Love reading classic literature"
    }
  ],
  
  // ===== Current Work =====
  currentWorkTitle: "Working on Book 3",
  currentWorkDescription: "Details about current project",
  
  // ===== Contact Information =====
  email: "author@example.com",
  phone: "+1 (555) 123-4567",
  
  // ===== Social Media =====
  socialLinks: {
    twitter: "https://twitter.com/username",
    facebook: "https://facebook.com/username",
    instagram: "https://instagram.com/username",
    linkedin: "https://linkedin.com/in/username",
    medium: "https://medium.com/@username"
  },
  
  // ===== Computed Flags (for conditional rendering) =====
  hasBooks: true,  // books.length > 0
  hasHobbies: true,  // hobbies.length > 0
  hasCurrentWork: true,  // currentWorkTitle && currentWorkDescription exist
  hasSocial: true,  // At least one social link exists
  
  // ===== Meta =====
  dataFolder: "/path/to/Data/author-folder"  // Used for image copying
}
```

## 🎨 Template Structure

### Required Files

Every template MUST have these files:

```
templates/template-name/
├── index.html        # Home/About page
├── books.html        # Books listing page
├── story.html        # My Story page
├── contact.html      # Contact page
├── blogs.html        # Blog page (can be placeholder)
└── assets/
    ├── css/
    │   └── styles.css  # All styles
    ├── js/
    │   └── main.js     # Animations, interactions
    └── icons/
        └── icons.svg   # SVG sprite for icons
```

### Navigation Structure

All templates should have consistent navigation:

```html
<nav class="nav">
  <a href="index.html">About</a>
  <a href="books.html">Books</a>
  <a href="story.html">My Story</a>
  <a href="blogs.html">Blog</a>
  <a href="contact.html">Contact</a>
</nav>
```

### Footer Structure

```html
<footer class="footer">
  <div class="footer-main">
    <h3>{{authorName}}</h3>
    <p>{{tagline}}</p>
  </div>
  <div class="footer-social">
    {{#if socialLinks.twitter}}
    <a href="{{socialLinks.twitter}}">Twitter</a>
    {{/if}}
    <!-- More social links -->
  </div>
  <p class="footer-copyright">© 2024 {{authorName}}. All rights reserved.</p>
</footer>
```

## 🎯 Black Chrome Template (Reference)

### Design Philosophy
- **Dark theme** with chrome accents (#ff6b35 orange)
- **Modern & premium** feel
- **Animations** on scroll (fade-in, slide-up, scale)
- **Smooth scrolling** between sections
- **Fluid transitions** on hover
- **Mobile-first** responsive design

### Key CSS Features

```css
:root {
  --color-accent: #ff6b35;
  --color-bg: #0a0a0a;
  --color-chrome-light: #e0e0e0;
  --font-display: 'Playfair Display', serif;
  --font-body: 'Inter', sans-serif;
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Layout Patterns

**Hero Section (Home)**
```css
.hero-content {
  display: grid;
  grid-template-columns: 1fr 280px;  /* Text left, image right */
  gap: 4rem;
  align-items: center;
}
```

**Book Cards (Home)**
```css
.book-card {
  display: flex;
  flex-direction: row;  /* Horizontal: image + text */
  gap: 2rem;
  padding: 1.5rem;
}

.book-cover-wrapper {
  width: 180px;
  flex-shrink: 0;
}
```

**Book Items (Books Page)**
```css
.book-item {
  display: grid;
  grid-template-columns: 220px 1fr;  /* Cover left, content right */
  gap: 2.5rem;
  padding: 2.5rem;
}
```

### Animation System

```javascript
// main.js
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, delay);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});
```

**Usage in HTML:**
```html
<div data-animate="fade-up" data-delay="100">
  Content appears after 100ms
</div>
```

## 🔧 Common Issues & Solutions

### Issue 1: Both Image and Placeholder Showing

**Problem:**
```html
<img src="{{cover}}">
<div class="placeholder">{{title}}</div>
<!-- Both render! -->
```

**Solution:**
```html
{{#if cover}}
<img src="{{cover}}">
{{else}}
<div class="placeholder">{{title}}</div>
{{/if}}
```

**CSS Fallback:**
```css
.book-cover-wrapper .book-cover ~ .book-cover-placeholder {
  display: none;
}
```

### Issue 2: Broken HTML Structure (Nested Loops)

**Problem:** Template engine removes closing tags when buy links are empty.

**Solution:** Post-processing cleanup in `renderTemplate()`:
```javascript
rendered = rendered.replace(
  /<div class="book-links">\s*(?=<div class="book-card")/g,
  '<div class="book-links"></div>\n</div>\n</div>\n'
);
```

### Issue 3: Placeholder Text Showing

**Problem:** CSV contains "Enter your bio", "Optional", "Provide URL", etc.

**Solution:** Filter in `cleanFieldValue()` and `isPlaceholder()`:
```javascript
function isPlaceholder(text) {
  const keywords = ['enter', 'optional', 'provide', 'url', 'example'];
  return keywords.some(k => text.toLowerCase().includes(k));
}
```

### Issue 4: Images Too Large

**Problem:** Book covers/author photos dominate the page.

**Solution:** Set max-width and aspect-ratio:
```css
.hero-image {
  max-width: 280px;
  aspect-ratio: 1;
  object-fit: cover;
}

.book-cover-large {
  max-width: 220px;
  aspect-ratio: 2/3;
}
```

## 📝 Creating a New Template (Step-by-Step)

### Step 1: Setup Structure
```bash
mkdir -p templates/my-template/assets/{css,js,icons}
touch templates/my-template/{index,books,story,contact,blogs}.html
touch templates/my-template/assets/css/styles.css
touch templates/my-template/assets/js/main.js
```

### Step 2: Start with index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{authorName}} - Author</title>
  <link rel="stylesheet" href="assets/css/styles.css">
</head>
<body>
  <!-- Navigation -->
  <nav>
    <a href="index.html">About</a>
    <a href="books.html">Books</a>
    <a href="story.html">My Story</a>
    <a href="blogs.html">Blog</a>
    <a href="contact.html">Contact</a>
  </nav>

  <!-- Hero Section -->
  <section class="hero">
    <div class="hero-content">
      <div class="hero-text">
        <h1>{{authorName}}</h1>
        <p>{{tagline}}</p>
        <p>{{bio}}</p>
      </div>
      {{#if authorPhoto}}
      <img src="{{authorPhoto}}" alt="{{authorName}}">
      {{else}}
      <div class="hero-placeholder">{{authorInitials}}</div>
      {{/if}}
    </div>
  </section>

  {{#if hasBooks}}
  <!-- Featured Books -->
  <section class="featured-books">
    <h2>Featured Books</h2>
    <div class="books-grid">
      {{#each featuredBooks}}
      <div class="book-card">
        {{#if cover}}
        <img src="{{cover}}" alt="{{title}}">
        {{else}}
        <div class="book-placeholder">{{title}}</div>
        {{/if}}
        <h3>{{title}}</h3>
        <p>{{publishDate}}</p>
        <p>{{description}}</p>
      </div>
      {{/each}}
    </div>
  </section>
  {{/if}}

  <!-- Footer -->
  <footer>
    <p>© 2024 {{authorName}}</p>
  </footer>

  <script src="assets/js/main.js"></script>
</body>
</html>
```

### Step 3: books.html (Full Listing)

```html
<!-- Same header/nav as index.html -->

<section class="books-page">
  <h1>My Books</h1>
  
  {{#if hasBooks}}
  <div class="books-list">
    {{#each books}}
    <article class="book-item">
      <div class="book-cover">
        {{#if cover}}
        <img src="{{cover}}" alt="{{title}}">
        {{else}}
        <div class="cover-placeholder">{{title}}</div>
        {{/if}}
      </div>
      
      <div class="book-details">
        <h2>{{title}}</h2>
        <p class="publish-date">Published: {{publishDate}}</p>
        <p class="description">{{description}}</p>
        
        {{#if buyLinks}}
        <div class="buy-links">
          <span>Available at:</span>
          {{#each buyLinks}}
          <a href="{{url}}" target="_blank">{{name}}</a>
          {{/each}}
        </div>
        {{/if}}
      </div>
    </article>
    {{/each}}
  </div>
  {{else}}
  <p>Books coming soon...</p>
  {{/if}}
</section>

<!-- Same footer as index.html -->
```

### Step 4: story.html

```html
<!-- Same header/nav -->

<section class="story-page">
  <h1>My Story</h1>
  
  {{#if extendedBio}}
  <div class="bio-section">
    <h2>About Me</h2>
    <div class="bio-content">
      {{{extendedBio}}}
    </div>
  </div>
  {{/if}}
  
  {{#if personalStory}}
  <div class="journey-section">
    <h2>My Journey</h2>
    <div class="journey-content">
      {{{personalStory}}}
    </div>
  </div>
  {{/if}}
  
  {{#if hasHobbies}}
  <div class="hobbies-section">
    <h2>Beyond Writing</h2>
    <div class="hobbies-grid">
      {{#each hobbies}}
      <div class="hobby-card">
        <div class="hobby-icon">{{icon}}</div>
        <h3>{{name}}</h3>
        <p>{{description}}</p>
      </div>
      {{/each}}
    </div>
  </div>
  {{/if}}
</section>

<!-- Same footer -->
```

### Step 5: contact.html

```html
<!-- Same header/nav -->

<section class="contact-page">
  <h1>Get in Touch</h1>
  
  <div class="contact-info">
    {{#if email}}
    <div class="contact-item">
      <strong>Email:</strong>
      <a href="mailto:{{email}}">{{email}}</a>
    </div>
    {{/if}}
    
    {{#if phone}}
    <div class="contact-item">
      <strong>Phone:</strong>
      <a href="tel:{{phone}}">{{phone}}</a>
    </div>
    {{/if}}
  </div>
  
  {{#if hasSocial}}
  <div class="social-links">
    <h2>Connect on Social Media</h2>
    {{#if socialLinks.twitter}}
    <a href="{{socialLinks.twitter}}">Twitter</a>
    {{/if}}
    {{#if socialLinks.facebook}}
    <a href="{{socialLinks.facebook}}">Facebook</a>
    {{/if}}
    {{#if socialLinks.instagram}}
    <a href="{{socialLinks.instagram}}">Instagram</a>
    {{/if}}
    {{#if socialLinks.linkedin}}
    <a href="{{socialLinks.linkedin}}">LinkedIn</a>
    {{/if}}
  </div>
  {{/if}}
</section>

<!-- Same footer -->
```

### Step 6: blogs.html (Placeholder)

```html
<!-- Same header/nav -->

<section class="blog-page">
  <h1>Blog</h1>
  <p>Blog coming soon! Check back for updates.</p>
</section>

<!-- Same footer -->
```

### Step 7: styles.css

```css
/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --color-primary: #3498db;
  --color-text: #333;
  --color-bg: #fff;
  --font-body: system-ui, sans-serif;
}

body {
  font-family: var(--font-body);
  color: var(--color-text);
  background: var(--color-bg);
  line-height: 1.6;
}

/* Navigation */
nav {
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: var(--color-primary);
}

nav a {
  color: white;
  text-decoration: none;
}

/* Hero Section */
.hero {
  padding: 4rem 2rem;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}

.hero img {
  width: 100%;
  border-radius: 10px;
}

/* Books Grid */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
}

.book-card {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
}

.book-card img {
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 4px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  
  nav {
    flex-direction: column;
    gap: 0.5rem;
  }
}
```

### Step 8: main.js (Optional)

```javascript
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Basic animation on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => {
  observer.observe(el);
});
```

### Step 9: Test Your Template

```bash
# Create test data
mkdir -p Data/test-author/{author-images,book-covers}

# Generate site with your template
node generator.js Data/test-author my-template

# Open in browser
open generated-sites/test-author-*/index.html
```

### Step 10: Checklist

- [ ] All 5 HTML pages created
- [ ] Navigation works between pages
- [ ] All data fields used appropriately
- [ ] Conditional sections hide when no data
- [ ] Images display correctly
- [ ] Placeholders show when no images
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Footer on all pages
- [ ] Social links work

## 🚀 Usage Examples

### Basic Usage
```bash
node generator.js Data/author-name
```

### With Custom Template
```bash
node generator.js Data/author-name my-template
```

### With Debug Output
```bash
node generator.js Data/author-name my-template 1
```

## 📦 Deployment Guide

### Netlify
1. Drag `generated-sites/author-name-date/` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Done! Site is live.

### Vercel
```bash
cd generated-sites/author-name-date
vercel deploy
```

### GitHub Pages
```bash
cd generated-sites/author-name-date
git init
git add .
git commit -m "Initial commit"
git branch -M gh-pages
git remote add origin https://github.com/username/author-site.git
git push -u origin gh-pages
```

## 🎓 Learning Path for New Developers

1. **Understand the data flow** - Read `generator.js` line by line
2. **Study the template engine** - Focus on `renderTemplate()`
3. **Analyze Black Chrome template** - See how conditionals/loops are used
4. **Create a simple template** - Start with basic HTML/CSS
5. **Test with real data** - Use the provided test data
6. **Add advanced features** - Animations, dark mode, etc.
7. **Share your template** - Contribute back to the project

## 📚 Additional Resources

- [Handlebars Documentation](https://handlebarsjs.com/) - Similar syntax
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## 🤝 Contributing

Want to add a new template? Follow these steps:

1. Fork the repository
2. Create your template in `templates/your-template-name/`
3. Test thoroughly with sample data
4. Document any unique features in a README
5. Submit a pull request

## 📄 License

MIT License - Feel free to use, modify, and distribute.

---

**Last Updated:** October 2024
**Version:** 1.0
**Maintainer:** AUTHORGEN Team

