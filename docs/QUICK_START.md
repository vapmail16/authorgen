# 🚀 Quick Start Guide - Data Folder Workflow

## What You'll Do

When a user submits a form:
1. Create a data folder for them
2. Add their CSV and images
3. Choose a template (black-chrome or clean-earth)
4. Run one command
5. Get a complete, deployable website!

---

## Step-by-Step

### 1️⃣ Create Author's Data Folder

```bash
cd /Users/abhinavsharma/Downloads/AUTHORGEN

# Replace 'author-name' with actual author name
mkdir -p data/author-name/author-images
mkdir -p data/author-name/book-covers
```

**Example:**
```bash
mkdir -p data/john-smith/author-images
mkdir -p data/john-smith/book-covers
```

---

### 2️⃣ Add Author's Data

#### A. Place the CSV File

Save their form response as `data.csv` in the author folder:

```bash
data/john-smith/data.csv
```

**CSV Format:**
- Column: `Author Photo` → Value: `john-smith.jpg` (filename only)
- Column: `Book 1 - Cover Image` → Value: `book1-cover.jpg` (filename only)
- Column: `Book 2 - Cover Image` → Value: `book2-cover.jpg` (filename only)

#### B. Add Author Photo

Place author's photo in `author-images/` folder with the **exact name** from CSV:

```bash
data/john-smith/author-images/john-smith.jpg
```

#### C. Add Book Covers

Place book cover images in `book-covers/` folder with **exact names** from CSV:

```bash
data/john-smith/book-covers/book1-cover.jpg
data/john-smith/book-covers/book2-cover.jpg
```

---

### 3️⃣ Generate Website

```bash
# Dark theme (professional)
node generator.js data/john-smith 1 black-chrome

# Light theme (natural)
node generator.js data/john-smith 1 clean-earth
```

**Output:**
```
generated-sites/john-smith-2025-10-12/
├── index.html
├── books.html  
├── story.html
├── contact.html
├── assets/
│   └── images/
│       ├── john-smith.jpg      ← Author photo
│       ├── book1-cover.jpg     ← Book covers
│       └── book2-cover.jpg
└── README.md
```

---

### 4️⃣ Deploy

**Option 1 - Netlify (Easiest):**
1. Go to https://app.netlify.com/drop
2. Drag the `generated-sites/john-smith-2025-10-12` folder
3. Done! Live in 30 seconds 🎉

**Option 2 - Vercel:**
```bash
cd generated-sites/john-smith-2025-10-12
npx vercel --prod
```

---

## 📋 Complete Example

Let's say a user named "Sarah Johnson" submitted the form.

### Step 1: Setup

```bash
cd /Users/abhinavsharma/Downloads/AUTHORGEN
mkdir -p data/sarah-johnson/author-images
mkdir -p data/sarah-johnson/book-covers
```

### Step 2: Add Files

```
data/sarah-johnson/
├── data.csv                      ← Form response with filenames
├── author-images/
│   └── sarah-johnson.jpg        ← Photo user uploaded
└── book-covers/
    ├── midnight-dreams.jpg      ← Book cover 1
    └── echoes-past.jpg          ← Book cover 2
```

**CSV Content Example:**
```csv
Author Name,Author Photo,Book 1 - Title,Book 1 - Cover Image,Book 2 - Title,Book 2 - Cover Image
Sarah Johnson,sarah-johnson.jpg,Midnight Dreams,midnight-dreams.jpg,Echoes of the Past,echoes-past.jpg
```

### Step 3: Generate

```bash
node generator.js data/sarah-johnson 1
```

### Step 4: You'll See

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   🎨 AUTHOR WEBSITE GENERATOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📁 Using data folder: data/sarah-johnson

📖 Reading CSV: data/sarah-johnson/data.csv
📊 Processing data...

🚀 Generating site for: Sarah Johnson
📦 Copying assets...
📸 Copying author photo: sarah-johnson.jpg
📚 Copied 2 book cover(s)
📄 Generating index.html...
📄 Generating books.html...
📄 Generating story.html...
📄 Generating contact.html...

✅ Site generated successfully!
📁 Location: /Users/abhinavsharma/Downloads/AUTHORGEN/generated-sites/sarah-johnson-2025-10-12

   ✨ GENERATION COMPLETE!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 Stats:
   • Pages: 4
   • Books: 2
   • Hobbies: 3
   • Template: black-chrome
```

---

## ⚠️ Common Issues

### "Warning: Author photo not found"

**Problem:** Filename in CSV doesn't match actual file

**Fix:**
```bash
# Check CSV for author photo filename
# Example: "sarah-johnson.jpg"

# Check actual file
ls data/sarah-johnson/author-images/

# Rename if needed
mv data/sarah-johnson/author-images/Sarah_Johnson.JPG \
   data/sarah-johnson/author-images/sarah-johnson.jpg
```

### "Warning: Book cover not found"

**Problem:** Book cover filename doesn't match CSV

**Fix:**
```bash
# Check CSV for book cover filenames
# Example: "midnight-dreams.jpg"

# Check actual files
ls data/sarah-johnson/book-covers/

# Rename if needed
mv data/sarah-johnson/book-covers/MidnightDreams.jpg \
   data/sarah-johnson/book-covers/midnight-dreams.jpg
```

---

## 🎯 Pro Tips

### 1. Use Consistent Naming

**Good:**
- `john-smith.jpg`
- `midnight-dreams.jpg`
- `book-cover-1.jpg`

**Avoid:**
- `John Smith.jpg` (spaces)
- `MidnightDreams.JPG` (uppercase)
- `Book Cover 1.JPEG` (spaces + uppercase)

### 2. Prepare Images First

Before running generator:
```bash
# Resize author photo to 800x800
# Resize book covers to 600x900
# Compress all images
# Rename to match CSV
```

### 3. Verify Before Generating

```bash
# Check all files exist
ls data/author-name/data.csv
ls data/author-name/author-images/
ls data/author-name/book-covers/

# Verify filenames match CSV
cat data/author-name/data.csv | grep "Author Photo"
```

### 4. Test Before Deploying

```bash
# Generate site
node generator.js data/author-name 1

# Open in browser
open generated-sites/author-name-2025-10-12/index.html

# Check that images load correctly
```

---

## 🔄 Batch Processing Multiple Authors

If you have multiple authors:

```bash
# Generate all
node generator.js data/author-1 1
node generator.js data/author-2 1
node generator.js data/author-3 1

# Or use a loop
for author in data/*/; do
    node generator.js "$author" 1
done
```

---

## 📦 Deliverables

For each author, you deliver:

```
author-name-2025-10-12/    ← Complete website folder
```

**They can:**
- Open `index.html` locally to preview
- Drag folder to Netlify for instant hosting
- Upload to any web host via FTP
- Use GitHub Pages, Vercel, Surge, etc.

**Everything included:**
- ✅ All HTML pages
- ✅ Complete CSS styling
- ✅ JavaScript interactions
- ✅ Author photo
- ✅ Book covers
- ✅ Icons library
- ✅ Deployment guide

---

## 📝 Checklist

Before generating:
- [ ] Data folder created
- [ ] `data.csv` added to folder
- [ ] Author photo in `author-images/` folder
- [ ] Book covers in `book-covers/` folder
- [ ] Filenames in CSV match actual files
- [ ] Images are optimized/compressed

After generating:
- [ ] Open site locally to preview
- [ ] Check images load correctly
- [ ] Verify all sections display properly
- [ ] Test navigation works
- [ ] Review content for accuracy

Before delivering:
- [ ] Test deploy to Netlify/Vercel
- [ ] Confirm live site works
- [ ] Check mobile responsiveness
- [ ] Share link with author

---

## 🆘 Need Help?

**Check the docs:**
- `DATA_FOLDER_WORKFLOW.md` - Complete workflow guide
- `README.md` - Project overview
- `USAGE_GUIDE.md` - Detailed usage
- `data/john-author/README.md` - Example structure

**Debug steps:**
1. Check CSV format
2. Verify file names match
3. Check image file formats
4. Try regenerating
5. Check console for errors

---

## ⚡ Speed Tips

**For faster workflow:**

```bash
# Create alias
alias authgen='node /Users/abhinavsharma/Downloads/AUTHORGEN/generator.js'

# Use it
authgen data/author-name 1

# Or create script
cat > generate-author.sh << 'EOF'
#!/bin/bash
AUTHOR=$1
cd /Users/abhinavsharma/Downloads/AUTHORGEN
node generator.js "data/$AUTHOR" 1
EOF

chmod +x generate-author.sh

# Use it
./generate-author.sh john-smith
```

---

**That's it!** You're ready to generate beautiful author websites from data folders! 🎉

