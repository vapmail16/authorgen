# 📚 Documentation Index

Complete guide to all documentation in the AUTHORGEN project.

## 🚀 Getting Started

### For New Users

1. **[README.md](README.md)** ⭐ START HERE
   - Overview and features
   - Quick start guide
   - Available templates
   - Deployment options
   - **Updated**: v2.0.0 with template-specific generators

2. **[QUICK_START.md](QUICK_START.md)**
   - Step-by-step walkthrough
   - Data folder setup
   - Template selection
   - Complete example
   - **Updated**: Added template choices

3. **[DATA_FOLDER_WORKFLOW.md](DATA_FOLDER_WORKFLOW.md)**
   - Recommended workflow
   - Folder structure
   - Image management
   - Best practices

## 📖 Usage Guides

### For Regular Use

4. **[USAGE_GUIDE.md](USAGE_GUIDE.md)**
   - Detailed command reference
   - CSV format specification
   - All configuration options
   - Troubleshooting
   - **Updated**: New project structure, template examples

5. **Command Reference**
   ```bash
   # Basic usage
   node generator.js <data-folder> <row-number> <template>
   
   # Templates
   - black-chrome  # Dark, professional theme
   - clean-earth   # Light, natural theme
   ```

## 🏗️ Architecture

### For Developers & Contributors

6. **[ARCHITECTURE.md](ARCHITECTURE.md)** ✨ NEW
   - Template-specific generator pattern
   - Component responsibilities
   - How to create new templates
   - Template engine comparison
   - Migration guide
   - **Created**: v2.0.0

7. **[CHANGELOG.md](CHANGELOG.md)** ✨ NEW
   - Version history
   - What's new in v2.0.0
   - Breaking changes (none!)
   - Migration guide
   - **Created**: v2.0.0

## 🎨 Template Documentation

### Template-Specific Guides

8. **[templates/black-chrome/README.md](templates/black-chrome/README.md)**
   - Black Chrome theme features
   - Customization options
   - Technical details

9. **[templates/clean-earth/README.md](templates/clean-earth/README.md)** ✨ NEW
   - Clean Earth theme features
   - Enhanced template engine
   - Dot notation usage
   - **Created**: v2.0.0

## 🔧 Technical Documentation

### Under the Hood

10. **Code Files**
    - `generator.js` - Main orchestrator
    - `lib/shared.js` - Shared utilities
    - `templates/*/generator.js` - Template-specific engines

11. **Template Syntax**
    - Handlebars-like syntax
    - Variables: `{{authorName}}`
    - Loops: `{{#each books}}...{{/each}}`
    - Conditionals: `{{#if hasBooks}}...{{/if}}`
    - Clean Earth: `{{buyLinks.0.url}}` (array access)

## 📊 Reference

### Quick Reference

| Document | Purpose | Audience | Updated |
|----------|---------|----------|---------|
| README.md | Overview & Quick Start | Everyone | v2.0.0 ✓ |
| QUICK_START.md | Step-by-step guide | New users | v2.0.0 ✓ |
| USAGE_GUIDE.md | Detailed usage | Regular users | v2.0.0 ✓ |
| ARCHITECTURE.md | System design | Developers | v2.0.0 ✨ |
| CHANGELOG.md | Version history | All | v2.0.0 ✨ |
| DATA_FOLDER_WORKFLOW.md | Data organization | Users | v1.0.0 |

## 🎯 Document Selection Guide

### "I want to..."

**Generate my first site**
→ Start with [README.md](README.md) then [QUICK_START.md](QUICK_START.md)

**Understand the data format**
→ Read [DATA_FOLDER_WORKFLOW.md](DATA_FOLDER_WORKFLOW.md)

**Learn all commands and options**
→ Check [USAGE_GUIDE.md](USAGE_GUIDE.md)

**Create a new template**
→ Study [ARCHITECTURE.md](ARCHITECTURE.md)

**See what's new**
→ Review [CHANGELOG.md](CHANGELOG.md)

**Customize an existing template**
→ See template-specific README in `templates/[name]/README.md`

**Troubleshoot issues**
→ Check [USAGE_GUIDE.md](USAGE_GUIDE.md) troubleshooting section

**Deploy a generated site**
→ See deployment section in [README.md](README.md)

## 📝 Documentation Standards

### For Contributors

All documentation follows these standards:

1. **Markdown Format**: All docs use `.md` extension
2. **Clear Headers**: Use emoji + descriptive titles
3. **Code Examples**: Always include working examples
4. **Updated Dates**: Track when docs are updated
5. **Cross-References**: Link between related docs

### Documentation Version

- **Current Version**: 2.0.0
- **Last Updated**: October 16, 2025
- **Architecture**: Template-Specific Generators

## 🔄 Update History

### October 16, 2025 (v2.0.0)
- ✅ README.md - Updated architecture, templates, version
- ✅ QUICK_START.md - Added template selection
- ✅ USAGE_GUIDE.md - Updated project structure, examples
- ✨ ARCHITECTURE.md - Created (new)
- ✨ CHANGELOG.md - Created (new)
- ✨ DOCUMENTATION_INDEX.md - Created (this file)
- ✨ templates/clean-earth/README.md - Created (new)

### October 12, 2025 (v1.0.0)
- Created initial documentation
- README.md, USAGE_GUIDE.md, DATA_FOLDER_WORKFLOW.md, QUICK_START.md

## 🌟 Featured Documents

### Most Important (Top 3)

1. 🥇 **[README.md](README.md)** - Start here!
2. 🥈 **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understand the system
3. 🥉 **[QUICK_START.md](QUICK_START.md)** - Get up and running

### Recently Added (v2.0.0)

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Complete architecture guide
- **[CHANGELOG.md](CHANGELOG.md)** - Version history
- **[DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)** - This file

## 💡 Tips

1. **New to the project?** Read docs in this order:
   - README.md → QUICK_START.md → DATA_FOLDER_WORKFLOW.md

2. **Want to contribute?** Read:
   - ARCHITECTURE.md → CHANGELOG.md

3. **Having issues?** Check:
   - USAGE_GUIDE.md (Troubleshooting) → ARCHITECTURE.md

4. **Creating templates?** Study:
   - ARCHITECTURE.md → templates/*/README.md

---

**Documentation Version**: 2.0.0  
**Total Documents**: 11 (6 updated, 5 new)  
**Last Updated**: October 16, 2025

