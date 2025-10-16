# Clean Earth Template

> A light, professional author website template with generous spacing and earth-tone accents

## 🎨 Design Philosophy

**Clean Earth** is designed for authors seeking a calm, professional, and elegant online presence. Unlike the dramatic Black Chrome template, this template prioritizes:

- **Readability** - Generous whitespace and optimal typography
- **Professionalism** - Clean, modern design without distraction
- **Warmth** - Earth-tone color palette (sage, sand, olive, sky)
- **Accessibility** - High contrast, clear hierarchy, semantic HTML

## 🎯 Target Audience

Perfect for:
- Literary fiction authors
- Memoir writers
- Academic authors
- Professional non-fiction writers
- Authors targeting traditional publishing

## 📊 Features

### Layout
- **Sticky navigation** with left-aligned links
- **Centered hero** with large author name
- **Generous spacing** throughout (64-96px sections)
- **Wide content areas** for readability
- **Responsive grid** that shifts on mobile

### Pages
1. **index.html** - Home/About with featured books, hobbies, current work
2. **books.html** - Tiled grid of all books with large covers
3. **story.html** - Author's personal story with readable typography
4. **contact.html** - Contact info with social links and form
5. **blogs.html** - Blog/RSS integration (conditional)

### Design Elements
- **Circular author photo** with accent border
- **Book cards** with hover lift effect
- **Collapsible extended bio** ("Read more" functionality)
- **Icon-based contact** information
- **Large social links** on contact page
- **Gentle scroll animations**

## 🎨 Color Palette

```css
Background:     #FEFEFE (Clean white)
Secondary BG:   #F9F8F6 (Soft off-white)
Text:           #2B2B2B (Deep charcoal)
Accent (Sage):  #A4B494 (Primary)
Accent (Olive): #8B9556 (CTA buttons)
Accent (Sand):  #D4C5B0
Accent (Sky):   #9DB4C0
Links:          #6B9080 (Soft blue-green)
```

## 📝 Typography

- **Headers**: Crimson Text (Serif) - Warmth and gravitas
- **Body**: Inter (Sans-serif) - Clear readability
- **Base size**: 18px (1.125rem)
- **Line height**: 1.7 (generous)
- **Max width**: 70 characters for optimal reading

## 🚀 Usage

Generate a site with the Clean Earth template:

```bash
node generator.js Data/author-name 1 clean-earth
```

The generated site will be in:
```
generated-sites/author-name-YYYY-MM-DD/
```

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and up (3-column featured books grid)
- **Tablet**: 768px - 1024px (2-column grid, centered photo)
- **Mobile**: Under 768px (Single column, mobile menu)

## ✨ Interactions (JavaScript)

- Smooth scrolling for anchor links
- Mobile navigation toggle
- "Read more" expandable bio
- Gentle scroll-based animations
- Form validation (enhanced)
- Navbar shadow on scroll
- Reading progress indicator (story page)
- Image error handling

## 🎯 CSV Field Usage

**All fields from the CSV are utilized:**

| Field | Used In | Display |
|-------|---------|---------|
| authorName | All pages | Headings, navigation |
| tagline | index.html, footer | Subtitle |
| authorBio | index.html | Main bio paragraph |
| authorPhoto | index.html | Circular image with border |
| extendedBio | index.html, story.html | Collapsible content |
| personalStory | story.html | Main story content |
| currentWork* | index.html | Highlighted section |
| books | books.html, index.html | Grids and cards |
| hobbies | index.html | Icon row |
| contactEmail | contact.html | With mail icon |
| location | contact.html | With map icon |
| social.* | contact.html, footer | Icon links |
| blogRSS | blogs.html | RSS integration |

## 🔄 Comparison with Black Chrome

| Aspect | Black Chrome | Clean Earth |
|--------|--------------|-------------|
| **Background** | Black (#0a0a0a) | White (#FEFEFE) |
| **Accent** | Orange (#ff6b35) | Sage green (#A4B494) |
| **Mood** | Dramatic, edgy | Calm, professional |
| **Spacing** | Compact | Generous |
| **Typography** | Artistic | Readable |
| **Animations** | Heavy, 3D effects | Gentle fades |
| **Target** | Creative/genre fiction | Literary/professional |

## 📦 Files Included

```
clean-earth/
├── index.html          (8.8 KB)
├── books.html          (6.4 KB)
├── story.html          (4.7 KB)
├── contact.html        (7.7 KB)
├── blogs.html          (4.7 KB)
└── assets/
    ├── css/
    │   └── styles.css  (~18 KB - Complete styling)
    ├── js/
    │   └── main.js     (~8 KB - All interactions)
    └── icons/
        └── icons.svg   (Shared icon sprite)
```

## 🎓 Customization

### Change Colors

Edit `assets/css/styles.css`:

```css
:root {
    --color-accent: #YOUR_COLOR;      /* Change primary accent */
    --color-cta: #YOUR_CTA_COLOR;     /* Change button color */
}
```

### Change Fonts

Update the Google Fonts link in HTML files:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Then update CSS:

```css
:root {
    --font-serif: 'Your Serif Font', serif;
    --font-sans: 'Your Sans Font', sans-serif;
}
```

### Adjust Spacing

Modify spacing variables in CSS:

```css
:root {
    --space-lg: 4rem;   /* Section horizontal padding */
    --space-xl: 6rem;   /* Section vertical padding */
}
```

## ✅ Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Graceful degradation for older browsers

## 📊 Performance

- **Total CSS**: ~18 KB (uncompressed)
- **Total JS**: ~8 KB (uncompressed)
- **No external dependencies** (except Google Fonts)
- **Fast load times**: < 2 seconds
- **Smooth animations**: GPU-accelerated

## 🚢 Deployment

Generated sites can be deployed to:
- **Netlify** (drag & drop)
- **Vercel** (instant deploy)
- **GitHub Pages** (free hosting)
- **Any static host** (FTP upload)

## 📄 License

Part of AUTHORGEN project - Free to use and customize

## 🎉 Credits

- **Template Design**: Clean Earth
- **Generator**: AUTHORGEN v1.0
- **Fonts**: Crimson Text (Google Fonts), Inter (Google Fonts)
- **Icons**: Shared icon sprite from Black Chrome

---

**Generated**: October 2025  
**Version**: 1.0.0  
**Template Name**: clean-earth

