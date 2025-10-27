# Data Folder Workflow Guide

## 🎯 Overview

The new workflow uses a **data folder** containing:
1. **CSV file** with author data and image filenames
2. **author-images/** folder with author photos
3. **book-covers/** folder with book cover images

This eliminates the need for Google Drive URLs and keeps everything organized in one place.

---

## 📁 Folder Structure

```
data/
└── [author-name]/                 # One folder per author
    ├── data.csv                   # Author data (required)
    ├── author-images/             # Author photos folder (optional)
    │   └── [author-photo].jpg     # E.g., john-smith.jpg
    └── book-covers/               # Book covers folder (optional)
        ├── [book1-cover].jpg      # E.g., dark-mirror-cover.jpg
        └── [book2-cover].jpg      # E.g., echoes-silence-cover.jpg
```

### Example:

```
data/
└── john-author/
    ├── data.csv
    ├── author-images/
    │   └── john-photo.jpg
    └── book-covers/
        ├── dark-mirror-cover.jpg
        └── echoes-cover.jpg
```

---

## 📊 CSV Format Changes

### Author Photo Column

**Old (URL-based):**
```csv
Author Photo URL (Optional)
https://drive.google.com/open?id=abc123
```

**New (Filename-based):**
```csv
Author Photo
john-photo.jpg
```

### Book Cover Columns

**Old (URL-based):**
```csv
Book 1 - Cover Image URL
https://drive.google.com/open?id=xyz789
```

**New (Filename-based):**
```csv
Book 1 - Cover Image
dark-mirror-cover.jpg
```

---

## 🚀 How to Use

### Step 1: Create Data Folder

```bash
mkdir -p data/author-name/author-images
mkdir -p data/author-name/book-covers
```

### Step 2: Add CSV File

Create or place `data.csv` in the author folder with image **filenames** (not URLs).

### Step 3: Add Images

Place images in the appropriate folders:
- Author photos → `author-images/`
- Book covers → `book-covers/`

**Important:** Filenames in CSV must match actual image files!

### Step 4: Generate Website

```bash
node generator.js data/author-name 1
```

That's it! The generator will:
1. ✅ Read the CSV from the data folder
2. ✅ Copy author photo to generated site
3. ✅ Copy book covers to generated site
4. ✅ Create complete, self-contained website

---

## 📝 Complete Example

### 1. Create Folder Structure

```bash
cd /Users/abhinavsharma/Downloads/AUTHORGEN
mkdir -p data/john-smith/author-images
mkdir -p data/john-smith/book-covers
```

### 2. Create CSV (`data/john-smith/data.csv`)

```csv
Author Name,Tagline,Author Bio,Author Photo,Book 1 - Title,Book 1 - Cover Image
John Smith,Award-Winning Author,"John Smith is a bestselling author...",john-smith.jpg,My First Novel,my-first-novel-cover.jpg
```

### 3. Add Images

```bash
# Copy author photo
cp ~/Downloads/johns-photo.jpg data/john-smith/author-images/john-smith.jpg

# Copy book cover
cp ~/Downloads/book-cover.jpg data/john-smith/book-covers/my-first-novel-cover.jpg
```

### 4. Generate Site

```bash
node generator.js data/john-smith 1
```

### 5. Output

```
generated-sites/
└── john-smith-2025-10-12/
    ├── index.html
    ├── books.html
    ├── story.html
    ├── contact.html
    ├── assets/
    │   ├── css/
    │   ├── js/
    │   ├── icons/
    │   └── images/              # ← Images copied here!
    │       ├── john-smith.jpg
    │       └── my-first-novel-cover.jpg
    └── README.md
```

---

## 🎨 Image Recommendations

### Author Photos

| Specification | Recommendation |
|--------------|----------------|
| **Size** | 800x800px or larger |
| **Format** | JPG, PNG, or WEBP |
| **Aspect Ratio** | Square (1:1) |
| **File Size** | < 500KB |
| **Naming** | `author-name.jpg` (lowercase, hyphens) |

### Book Covers

| Specification | Recommendation |
|--------------|----------------|
| **Size** | 600x900px or larger |
| **Format** | JPG, PNG, or WEBP |
| **Aspect Ratio** | 2:3 (portrait) |
| **File Size** | < 1MB |
| **Naming** | `book-title-cover.jpg` (descriptive) |

---

## ✅ CSV Checklist

When creating your CSV, ensure:

- [ ] **Author Photo** column has filename only (not URL)
- [ ] **Book X - Cover Image** columns have filenames only
- [ ] Filenames match exactly (case-sensitive on some systems)
- [ ] Images exist in correct folders
- [ ] Image formats are supported (JPG, PNG, WEBP)

---

## 🔄 Multiple Authors Workflow

### Option 1: Separate Folders

```
data/
├── author-1/
│   ├── data.csv
│   ├── author-images/
│   └── book-covers/
├── author-2/
│   ├── data.csv
│   ├── author-images/
│   └── book-covers/
└── author-3/
    ├── data.csv
    ├── author-images/
    └── book-covers/
```

Generate each:
```bash
node generator.js data/author-1 1
node generator.js data/author-2 1
node generator.js data/author-3 1
```

### Option 2: Shared CSV with Multiple Rows

```
data/all-authors/
├── data.csv              # Contains all authors (multiple rows)
├── author-images/
│   ├── author1.jpg
│   ├── author2.jpg
│   └── author3.jpg
└── book-covers/
    ├── book1-cover.jpg
    ├── book2-cover.jpg
    └── book3-cover.jpg
```

Generate each author:
```bash
node generator.js data/all-authors 1  # First author
node generator.js data/all-authors 2  # Second author
node generator.js data/all-authors 3  # Third author
```

---

## 🔧 Troubleshooting

### Issue: "Warning: Author photo not found"

**Cause:** Image filename in CSV doesn't match actual file

**Solution:**
1. Check filename in CSV
2. Check actual filename in `author-images/` folder
3. Ensure they match exactly (case-sensitive)

### Issue: "Warning: Book cover not found"

**Cause:** Book cover filename in CSV doesn't match actual file

**Solution:**
1. Check Book X - Cover Image column in CSV
2. Check actual filename in `book-covers/` folder
3. Ensure they match exactly

### Issue: Images don't show on website

**Cause:** Images weren't copied or wrong path

**Solution:**
1. Check `generated-sites/[author]/assets/images/` folder
2. Verify images were copied
3. Check browser console for 404 errors
4. Regenerate site

### Issue: CSV not found

**Cause:** CSV file not named `data.csv`

**Solution:**
- Rename CSV to exactly `data.csv` (lowercase)
- Or use CSV path directly: `node generator.js path/to/file.csv`

---

## 🆚 Backwards Compatibility

The system still supports the old URL-based approach:

**Old way (still works):**
```csv
Author Photo URL (Optional)
https://drive.google.com/open?id=abc123
```

**New way (recommended):**
```csv
Author Photo
john-smith.jpg
```

You can even mix both in the same CSV if needed!

---

## 📦 What Gets Generated

Every generated site includes:

```
author-name-2025-10-12/
├── index.html           ← Complete HTML with data
├── books.html           ← All books page
├── story.html           ← Author story
├── contact.html         ← Contact page
├── robots.txt           ← SEO config
├── README.md            ← Deployment guide
└── assets/
    ├── css/
    │   └── styles.css   ← Complete styling
    ├── js/
    │   └── main.js      ← All interactions
    ├── icons/
    │   └── icons.svg    ← Icon library
    └── images/          ← YOUR IMAGES HERE!
        ├── author-photo.jpg
        ├── book1-cover.jpg
        └── book2-cover.jpg
```

**Everything is self-contained!** Just drag this folder to Netlify and deploy.

---

## 💡 Best Practices

1. **Organize by Author:** One folder per author for easy management
2. **Consistent Naming:** Use lowercase with hyphens (e.g., `john-smith.jpg`)
3. **Optimize Images:** Compress before adding to save space
4. **Test Locally:** Always preview before deploying
5. **Backup Data:** Keep original CSV and images safe
6. **Version Control:** Consider using Git for data folders

---

## 🎓 Example Template

Use this as a template for new authors:

```bash
# Create new author data folder
mkdir -p data/[author-name]/author-images
mkdir -p data/[author-name]/book-covers

# Copy template CSV
cat > data/[author-name]/data.csv << 'EOF'
Timestamp,Email Address,Website Template,Author Name,Tagline,Author Bio,Author Photo,Extended Bio,Personal Story,Book 1 - Title,Book 1 - Publish Date,Book 1 - Description,Book 1 - Buy Links,Book 1 - Cover Image,Contact Email,Location,Twitter Handle,Instagram Handle
2025-10-12 12:00:00,author@email.com,Black Chrome,Author Name,Your Tagline,"Your short bio here",author-photo.jpg,"Your extended bio here","Your personal story here",Book Title,October 2025,Book description,https://amazon.com/your-book,book-cover.jpg,author@email.com,Your City,@yourhandle,@yourhandle
EOF

# Add images
# Then run generator
node generator.js data/[author-name] 1
```

---

## 📚 Quick Reference Commands

```bash
# Generate from data folder
node generator.js data/author-name 1

# Generate specific row from shared CSV
node generator.js data/all-authors 2

# Generate to custom output directory
node generator.js data/author-name 1 black-chrome ./custom-output

# List what's in data folder
ls -R data/author-name/

# Check if images exist
ls data/author-name/author-images/
ls data/author-name/book-covers/
```

---

## 🎉 Summary

**New Workflow Benefits:**
- ✅ No Google Drive dependencies
- ✅ Everything in one organized folder
- ✅ Easy to backup and version control
- ✅ Faster processing (no downloads)
- ✅ Works offline
- ✅ Simpler to manage multiple authors

**Migration from Old System:**
1. Download images from Google Drive
2. Place in data folder structure
3. Update CSV with filenames
4. Generate!

---

**Version:** 2.0.0  
**Last Updated:** October 12, 2025  
**Backwards Compatible:** Yes (URLs still work)

