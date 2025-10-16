# AUTHORGEN - Project Architecture

## Overview
AUTHORGEN uses a **template-specific generator architecture** where each template has its own isolated generator logic. This ensures that fixing or enhancing one template doesn't affect others.

## Architecture Diagram

```
AUTHORGEN/
├── generator.js              # Main orchestrator (loads template-specific generators)
├── lib/
│   └── shared.js            # Shared utilities (CSV parsing, data transformation, file ops)
├── templates/
│   ├── black-chrome/
│   │   ├── generator.js     # Black Chrome template engine (original logic)
│   │   ├── index.html
│   │   ├── books.html
│   │   ├── story.html
│   │   ├── contact.html
│   │   ├── blogs.html
│   │   └── assets/
│   └── clean-earth/
│       ├── generator.js     # Clean Earth template engine (enhanced with dot notation)
│       ├── index.html
│       ├── books.html
│       ├── story.html
│       ├── contact.html
│       ├── blogs.html
│       └── assets/
├── Data/
│   └── author-site/
│       ├── data.csv
│       ├── author-images/
│       └── book-covers/
└── generated-sites/
```

## Component Responsibilities

### 1. Main Generator (`generator.js`)
**Role**: Orchestrator - coordinates the generation process

**Responsibilities**:
- Parse command-line arguments
- Validate input paths and template existence
- Load CSV and parse data using shared utilities
- Load template-specific generator dynamically
- Delegate site generation to template-specific generator
- Display generation statistics

**Does NOT contain**:
- Template engine logic
- HTML rendering logic
- Template-specific fixes

### 2. Shared Library (`lib/shared.js`)
**Role**: Common utilities used by all templates

**Exports**:
- `parseCSV(filePath)` - Parse CSV files
- `transformAuthorData(csvRow, dataFolder)` - Transform CSV data into structured object
- `copyDirectory(source, destination)` - Recursively copy directories
- `copyAssets(authorData, templateDir, siteDir)` - Copy assets and images
- `createSiteFiles(authorData, siteDir)` - Create README.md and robots.txt

**Features**:
- CSV parsing with multi-line field support
- Data transformation and validation
- Placeholder detection and cleanup
- Google Drive URL conversion
- Buy links parsing
- File operations

### 3. Template-Specific Generators

#### Black Chrome (`templates/black-chrome/generator.js`)
**Template Engine**: Original implementation

**Features**:
- Handlebars-like syntax
- Nested loops support
- Conditionals (if/else/unless)
- Simple variable replacement
- Template-specific HTML cleanup

**Limitations**:
- No dot notation support for array indices
- Nested `{{#if}}` wrapping `{{#each}}` may cause empty renders

#### Clean Earth (`templates/clean-earth/generator.js`)
**Template Engine**: Enhanced implementation

**Features**:
- All Black Chrome features PLUS:
- **Dot notation support**: `{{buyLinks.0.url}}`, `{{buyLinks.0.name}}`
- **Array index access**: Access array elements by index
- **Enhanced getNestedValue()**: Handles both object properties and array indices
- Template-specific HTML cleanup

**Use Cases**:
- Templates that need to access specific array elements
- Templates that want to avoid nested loop issues
- More explicit data access patterns

## How It Works

### Site Generation Flow

```
1. User runs: node generator.js Data/author-site 1 clean-earth
                                 ↓
2. Main generator.js:
   - Parses arguments
   - Validates paths
   - Loads CSV using shared.parseCSV()
   - Transforms data using shared.transformAuthorData()
                                 ↓
3. Loads template-specific generator:
   - require('templates/clean-earth/generator.js')
   - Validates it exports generateSite()
                                 ↓
4. Template generator:
   - Creates output directory
   - Calls shared.copyAssets()
   - Renders each HTML file using its renderTemplate()
   - Calls shared.createSiteFiles()
                                 ↓
5. Complete! Site generated in generated-sites/
```

### Template Engine Comparison

| Feature | Black Chrome | Clean Earth |
|---------|--------------|-------------|
| Variable replacement | `{{name}}` | `{{name}}` |
| Nested properties | `{{social.twitter}}` | `{{social.twitter}}` |
| Array indices | ❌ Not supported | ✅ `{{buyLinks.0.url}}` |
| Loops | `{{#each books}}` | `{{#each books}}` |
| Conditionals | `{{#if condition}}` | `{{#if condition}}` |
| Conditional else | `{{#if}}...{{else}}...{{/if}}` | `{{#if}}...{{else}}...{{/if}}` |
| Unless | `{{#unless condition}}` | `{{#unless condition}}` |
| HTML content | `{{{bio}}}` | `{{{bio}}}` |

## Creating a New Template

### Step 1: Create Template Directory
```bash
mkdir -p templates/my-template/assets/{css,js,icons}
```

### Step 2: Create Template Generator
Create `templates/my-template/generator.js`:

```javascript
const fs = require('fs');
const path = require('path');

function renderTemplate(templateContent, data) {
    // Your custom template engine logic
    // Can extend black-chrome or clean-earth logic
    // Or implement completely new logic
}

function generateSite(authorData, templateDir, outputDir) {
    // 1. Create output directory
    // 2. Copy assets using shared.copyAssets()
    // 3. Render HTML files using your renderTemplate()
    // 4. Create site files using shared.createSiteFiles()
}

module.exports = { generateSite, renderTemplate };
```

### Step 3: Create HTML Templates
- `index.html` - Home/About page
- `books.html` - Books showcase
- `story.html` - Author story
- `contact.html` - Contact page
- `blogs.html` - Blog page (optional)

### Step 4: Generate Site
```bash
node generator.js Data/author-site 1 my-template
```

## Benefits of This Architecture

### ✅ Isolation
- Each template has its own generator
- Fixes to one template don't affect others
- No more "breaking changes" across templates

### ✅ Flexibility
- Templates can have completely different engines
- Can implement new features per template
- Easy to experiment without risk

### ✅ Maintainability
- Clear separation of concerns
- Shared code in one place (lib/shared.js)
- Template-specific code stays with template

### ✅ Extensibility
- Easy to add new templates
- Can reuse or extend existing generators
- No need to modify main generator.js

## Command Reference

```bash
# Generate site with black-chrome template
node generator.js Data/author-site 1 black-chrome

# Generate site with clean-earth template
node generator.js Data/author-site 1 clean-earth

# Generate with custom output directory
node generator.js Data/author-site 1 clean-earth ./output

# List available templates
ls templates/
```

## Migration Notes

### From Old Architecture to New

**Old**: Single `generator.js` with all template logic
- Changes affected all templates
- Template-specific fixes mixed with core logic

**New**: Distributed generators
- Each template is independent
- Core utilities in shared library
- Main generator is just an orchestrator

### What Changed
1. **Main generator.js**: Now only orchestrates, doesn't render
2. **Template logic**: Moved to `templates/[name]/generator.js`
3. **Shared utilities**: Extracted to `lib/shared.js`

### What Stayed the Same
- CSV data format
- Data folder structure
- Template HTML syntax
- Command-line interface
- Generated output structure

## Troubleshooting

### Template generator not found
**Error**: `Template generator not found: templates/my-template/generator.js`

**Solution**: Each template must have a `generator.js` file that exports `generateSite()`

### Template doesn't work after migration
**Solution**: 
1. Check that template's `generator.js` exists
2. Verify it exports `generateSite()` function
3. Ensure it uses `shared.copyAssets()` and `shared.createSiteFiles()`

### Buy links not rendering
**Solution**: 
- **Black Chrome**: Uses nested loops, may have issues - this is original behavior
- **Clean Earth**: Use dot notation: `{{buyLinks.0.url}}` instead of `{{#each buyLinks}}`

## Future Enhancements

Possible improvements:
1. **Template inheritance**: Base template generator class
2. **Plugin system**: Allow templates to register custom helpers
3. **Template validation**: Ensure required files exist before generation
4. **Template CLI**: `npm create authorgen-template my-template`
5. **Template marketplace**: Share templates with community

## Questions?

For questions or issues, check:
1. Template's `generator.js` exports correct functions
2. Shared utilities are being used correctly
3. HTML templates use supported syntax
4. Generated site has all required files

---
**Architecture Version**: 2.0
**Last Updated**: October 16, 2025

