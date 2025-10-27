# Changelog

## Version 2.0.0 - Template-Specific Generators (October 16, 2025)

### 🎉 Major Changes

#### Architecture Overhaul
- **Template-Specific Generators**: Each template now has its own `generator.js` file
- **Shared Utilities**: Common functionality extracted to `lib/shared.js`
- **Main Orchestrator**: `generator.js` now only loads and delegates to template generators
- **Complete Isolation**: Changes to one template don't affect others

#### New Structure
```
AUTHORGEN/
├── generator.js              # Main orchestrator
├── lib/
│   └── shared.js            # Shared utilities
└── templates/
    ├── black-chrome/
    │   └── generator.js     # Black Chrome template engine
    └── clean-earth/
        └── generator.js     # Clean Earth template engine (enhanced)
```

### ✨ New Features

#### Clean Earth Template
- **New Light Theme**: Natural, earth-tone color palette
- **Enhanced Template Engine**: Supports dot notation for array access
- **Array Index Access**: Use `{{buyLinks.0.url}}` to access specific array elements
- **Improved getNestedValue()**: Handles both object properties and array indices
- **Modern Design**: Generous spacing, clean typography, minimalist approach

#### Template Engine Enhancements (Clean Earth only)
- Dot notation support: `{{social.twitter}}`, `{{buyLinks.0.url}}`
- Array index access: `{{books.0.title}}`, `{{hobbies.1.description}}`
- Backward compatible with all existing syntax

### 🔧 Technical Improvements

#### Shared Utilities (`lib/shared.js`)
- `parseCSV(filePath)` - CSV parsing with multi-line support
- `transformAuthorData(csvRow, dataFolder)` - Data transformation
- `copyDirectory(source, destination)` - Recursive directory copying
- `copyAssets(authorData, templateDir, siteDir)` - Asset management
- `createSiteFiles(authorData, siteDir)` - README and robots.txt generation

#### Main Generator (`generator.js`)
- Simplified to orchestration only
- Dynamic template loading
- Template validation (checks for `generator.js` and `generateSite()` function)
- Better error messages
- Lists available templates on error

### 📚 Documentation Updates

#### New Documentation
- **ARCHITECTURE.md**: Complete guide to template-specific generator architecture
- **CHANGELOG.md**: This file - tracks all version changes

#### Updated Documentation
- **README.md**: Updated with new architecture, both templates, version 2.0.0
- **QUICK_START.md**: Added template selection examples
- **USAGE_GUIDE.md**: Updated project structure and examples
- **Clean Earth README**: Template-specific documentation

### 🎨 Templates

#### Black Chrome (v1.0 - Unchanged)
- Dark theme with chrome/silver accents
- Original template engine
- All existing features maintained
- No breaking changes

#### Clean Earth (v1.0 - New)
- Light theme with earth tones
- Enhanced template engine with dot notation
- Sage, sand, olive color palette
- Generous spacing and clean typography
- Supports array index access in templates

### 🚀 Usage Changes

#### Before (v1.0)
```bash
node generator.js data.csv 1
```

#### After (v2.0)
```bash
# Specify template
node generator.js data.csv 1 black-chrome  # Dark theme
node generator.js data.csv 1 clean-earth   # Light theme

# Using data folder (recommended)
node generator.js Data/author-site 1 clean-earth
```

### 💡 Benefits

#### For Developers
- **Isolation**: Fix one template without affecting others
- **Flexibility**: Each template can have completely different engine logic
- **Maintainability**: Clear separation of concerns
- **Extensibility**: Easy to add new templates

#### For Users
- **More Choices**: Two professionally designed templates
- **Safer Updates**: Template fixes don't break existing templates
- **Future-Proof**: Easy to add more templates

### 🔄 Migration Guide

#### From v1.0 to v2.0

**No Breaking Changes!** The command-line interface remains the same:

```bash
# Old command (still works - defaults to black-chrome)
node generator.js Data/author-site 1

# New command (explicit template)
node generator.js Data/author-site 1 black-chrome
node generator.js Data/author-site 1 clean-earth
```

**What Changed:**
1. Template logic moved from main `generator.js` to `templates/[name]/generator.js`
2. Shared utilities extracted to `lib/shared.js`
3. Main `generator.js` now only orchestrates

**What Stayed the Same:**
- CSV data format
- Data folder structure
- Template HTML syntax (for black-chrome)
- Generated output structure
- Deployment process

### 📊 Stats

#### Code Organization
- **Before**: 1 monolithic generator (767 lines)
- **After**: 
  - Main orchestrator: ~140 lines
  - Shared utilities: ~400 lines
  - Black Chrome generator: ~180 lines
  - Clean Earth generator: ~180 lines

#### Templates
- **v1.0**: 1 template (Black Chrome)
- **v2.0**: 2 templates (Black Chrome, Clean Earth)

### 🐛 Bug Fixes

#### Clean Earth Template
- Fixed buy links rendering (using dot notation instead of nested loops)
- Fixed HTML structure issues (proper div closing)
- Enhanced template engine to support array indices

### 🔜 Future Plans

- Template inheritance/base classes
- Plugin system for custom helpers
- Template validation CLI
- Template marketplace
- More built-in templates

### 🙏 Credits

**Architecture**: Template-specific generator pattern
**Templates**: Black Chrome (original), Clean Earth (new)
**Engine**: Enhanced template engine with dot notation support

---

## Version 1.0.0 - Initial Release (October 12, 2025)

### Features
- CSV parsing and data transformation
- Black Chrome template
- Data folder workflow
- Conditional rendering
- Static site generation
- Deployment-ready output

### Template
- Black Chrome: Dark theme with smooth animations

### Documentation
- README.md
- USAGE_GUIDE.md
- DATA_FOLDER_WORKFLOW.md
- QUICK_START.md

---

**Current Version**: 2.0.0
**Release Date**: October 16, 2025
**Architecture**: Template-Specific Generators

