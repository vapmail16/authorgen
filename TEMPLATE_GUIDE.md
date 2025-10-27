# Author Website Template Collection

## Available Templates (10 Total)

### Existing Templates
1. **black-chrome** - Dark theme with orange accents
2. **clean-earth** - Light earth tones with generous spacing
3. **vibrant-bold** - Bold colors and energetic design

### New Templates (Ready for Customization)
4. **minimal-white** - Ultra clean white design with minimal colors
5. **retro-vintage** - Warm tones, serif fonts, nostalgic feel
6. **tech-dark** - Modern dark with neon cyan/blue accents
7. **elegant-serif** - Formal, traditional design
8. **modern-bright** - White background with vibrant colorful accents
9. **newspaper-style** - Column layout, editorial design
10. **artistic-portfolio** - Asymmetric, creative design

## How to Customize Each Template

Each new template has:
- ✓ All HTML files (index, books, story, contact, blogs)
- ✓ generator.js (works with the main generator)
- ✓ JavaScript (same functionality as black-chrome)
- ✓ Icons (same as black-chrome)
- ✓ Base CSS (copied from black-chrome)

### Next Step: Customize CSS

Each template needs its CSS variables customized in `assets/css/styles.css`:

```css
:root {
    --color-bg: #...;           /* Background color */
    --color-accent: #...;       /* Accent color */
    --color-text: #...;         /* Text color */
    /* etc */
}
```

See each template's `THEME_CUSTOMIZATION.md` for color suggestions.

## How to Generate with New Templates

```bash
node generator.js Data/author-site 1 minimal-white
node generator.js Data/author-site 1 retro-vintage
node generator.js Data/author-site 1 tech-dark
# etc...
```

## Current Status

✅ Folder structure created
✅ Base files copied
✅ Theme documentation created
⏳ CSS customization needed (see THEME_CUSTOMIZATION.md in each folder)

## To Complete the Templates

1. Open each template's CSS file: `templates/[name]/assets/css/styles.css`
2. Update the CSS variables (lines 6-28) with the colors from `THEME_CUSTOMIZATION.md`
3. Test by generating a site with that template
4. Adjust as needed

