/**
 * Shared utilities for Author Website Generator
 * Used by all template-specific generators
 */

const fs = require('fs');
const path = require('path');

// ===== CSV Parser =====
function parseCSV(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.trim().split('\n');
    
    if (lines.length < 2) {
        throw new Error('CSV file must have at least a header row and one data row');
    }

    // Parse header
    const headers = parseCSVLine(lines[0]);
    
    // Parse data rows
    const rows = [];
    let currentLine = '';
    let inQuotes = false;
    
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        
        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            currentLine += char;
            
            if (char === '"') {
                inQuotes = !inQuotes;
            }
        }
        
        if (!inQuotes) {
            const values = parseCSVLine(currentLine);
            const row = {};
            headers.forEach((header, index) => {
                row[header] = values[index] || '';
            });
            rows.push(row);
            currentLine = '';
        } else {
            currentLine += '\n';
        }
    }
    
    return rows;
}

function parseCSVLine(line) {
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        const nextChar = line[i + 1];
        
        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    
    values.push(current.trim());
    return values;
}

// ===== Data Transformer =====
function transformAuthorData(csvRow, dataFolder) {
    const data = {
        authorName: cleanFieldValue(csvRow['Author Name']) || 'Author',
        authorInitials: getInitials(cleanFieldValue(csvRow['Author Name']) || 'Author'),
        tagline: cleanFieldValue(csvRow['Tagline']) || '',
        authorBio: cleanFieldValue(csvRow['Author Bio']) || '',
        authorPhoto: null,
        authorPhotoFile: null,
        extendedBio: formatMultilineText(cleanFieldValue(csvRow['Extended Bio']) || ''),
        personalStory: formatMultilineText(cleanFieldValue(csvRow['Personal Story']) || ''),
        currentYear: new Date().getFullYear(),
        dataFolder: dataFolder,
        
        // Current Work
        showCurrentWork: false,
        currentWorkTitle: '',
        currentWorkDescription: '',
        
        // Books
        books: [],
        hasBooks: false,
        featuredBooks: [],
        
        // Hobbies
        hobbies: [],
        hasHobbies: false,
        
        // Contact & Social
        contactEmail: cleanFieldValue(csvRow['Contact Email']) || cleanFieldValue(csvRow['Email Address']) || '',
        location: cleanFieldValue(csvRow['Location']) || '',
        social: {
            twitter: '',
            facebook: '',
            instagram: '',
            linkedin: ''
        },
        hasSocial: false,
        
        // Blog
        blogRSS: '',
        showBlogs: false
    };
    
    // Process author photo
    const photoField = csvRow['Author Photo URL (Optional)'] || csvRow['Author Photo'] || '';
    
    if (photoField && photoField.trim()) {
        if (photoField.startsWith('http') || photoField.includes('drive.google.com')) {
            data.authorPhoto = convertGoogleDriveURL(photoField);
        } else {
            const cleanFilename = cleanFieldValue(photoField);
            if (cleanFilename && !isPlaceholder(cleanFilename)) {
                data.authorPhotoFile = cleanFilename;
                data.authorPhoto = `assets/images/${cleanFilename}`;
            }
        }
    }
    
    // Process books
    const bookCount = parseInt(csvRow['How many books do you want to showcase?']) || 0;
    for (let i = 1; i <= 6; i++) {
        const title = cleanFieldValue(csvRow[`Book ${i} - Title`]);
        const publishDate = cleanFieldValue(csvRow[`Book ${i} - Publish Date`]);
        const description = cleanFieldValue(csvRow[`Book ${i} - Description`]);
        
        if (title && !isPlaceholder(title)) {
            const coverField = csvRow[`Book ${i} - Cover Image URL`] || csvRow[`Book ${i} - Cover Image`] || '';
            let coverPath = '';
            let coverFile = null;
            
            if (coverField && coverField.trim()) {
                const cleanCover = cleanFieldValue(coverField);
                if (cleanCover && !isPlaceholder(cleanCover)) {
                    if (cleanCover.startsWith('http') || cleanCover.includes('drive.google.com')) {
                        coverPath = convertGoogleDriveURL(cleanCover);
                    } else {
                        coverFile = cleanCover;
                        coverPath = `assets/images/${cleanCover}`;
                    }
                }
            }
            
            const book = {
                title: title,
                publishDate: publishDate || '',
                description: description || '',
                cover: coverPath,
                coverFile: coverFile,
                buyLinks: parseBuyLinks(csvRow[`Book ${i} - Buy Links`] || '')
            };
            
            data.books.push(book);
        }
    }
    
    data.hasBooks = data.books.length > 0;
    data.featuredBooks = data.books.slice(0, 3);
    
    // Process hobbies
    const hobbyTitlesRaw = csvRow['Hobbies & Interests - Titles'] || '';
    const hobbyIconsRaw = csvRow['Hobbies & Interests - Icons'] || '';
    const hobbyDescriptionsRaw = csvRow['Hobbies & Interests - Descriptions'] || '';
    
    if (!isPlaceholder(hobbyTitlesRaw)) {
        const hobbyTitles = hobbyTitlesRaw.split('\n').filter(Boolean);
        const hobbyIcons = hobbyIconsRaw.split('\n').filter(Boolean);
        const hobbyDescriptions = hobbyDescriptionsRaw.split('|').map(d => d.trim()).filter(Boolean);
        
        for (let i = 0; i < hobbyTitles.length; i++) {
            const title = hobbyTitles[i].trim();
            if (title && !isPlaceholder(title)) {
                data.hobbies.push({
                    title: title,
                    icon: (hobbyIcons[i] || 'heart').trim(),
                    description: (hobbyDescriptions[i] || '').trim()
                });
            }
        }
    }
    
    data.hasHobbies = data.hobbies.length > 0;
    
    // Process social media
    const twitterHandle = cleanHandle(cleanFieldValue(csvRow['Twitter Handle']) || '');
    const facebookURL = cleanFieldValue(csvRow['Facebook Page URL']) || '';
    const instagramHandle = cleanHandle(cleanFieldValue(csvRow['Instagram Handle']) || '');
    const linkedinURL = cleanFieldValue(csvRow['LinkedIn Profile URL']) || '';
    
    if (twitterHandle && !isPlaceholder(twitterHandle)) data.social.twitter = twitterHandle;
    if (facebookURL && !isPlaceholder(facebookURL)) data.social.facebook = facebookURL;
    if (instagramHandle && !isPlaceholder(instagramHandle)) data.social.instagram = instagramHandle;
    if (linkedinURL && !isPlaceholder(linkedinURL)) data.social.linkedin = linkedinURL;
    
    data.hasSocial = !!(data.social.twitter || data.social.facebook || 
                        data.social.instagram || data.social.linkedin);
    
    // Process current work
    const workTitle = cleanFieldValue(csvRow['Current Work Title']) || '';
    const workDesc = cleanFieldValue(csvRow['Current Work Description']) || '';
    if (workTitle && !isPlaceholder(workTitle)) {
        data.currentWorkTitle = workTitle;
        data.currentWorkDescription = workDesc;
        data.showCurrentWork = true;
    }
    
    // Process blog
    const blogRSS = cleanFieldValue(csvRow['Blog RSS Feed URL']) || '';
    if (blogRSS && !isPlaceholder(blogRSS)) {
        data.blogRSS = blogRSS;
        data.showBlogs = true;
    }
    
    return data;
}

function getInitials(name) {
    return name
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

function cleanHandle(handle) {
    if (!handle) return '';
    return handle.replace(/^@/, '').trim();
}

function cleanFieldValue(value) {
    if (!value || typeof value !== 'string') return '';
    
    let cleaned = value.trim();
    
    cleaned = cleaned.replace(/^Extended Bio\s*/i, '');
    cleaned = cleaned.replace(/^Personal Story\s*/i, '');
    
    cleaned = cleaned.split('\n')
        .filter(line => {
            const trimmed = line.trim();
            return trimmed !== '*' && 
                   trimmed.length > 0 && 
                   !trimmed.match(/^[\*\-\+]+$/) &&
                   !trimmed.toLowerCase().includes('tell readers') &&
                   !trimmed.toLowerCase().includes('share your') &&
                   !trimmed.toLowerCase().includes('describe what');
        })
        .join('\n')
        .trim();
    
    return cleaned;
}

function isPlaceholder(value) {
    if (!value || typeof value !== 'string') return true;
    
    const placeholderPatterns = [
        /^Book \d+ - /i,
        /^Hobbies & Interests/i,
        /^Current Work/i,
        /^Author Bio/i,
        /^Extended Bio/i,
        /^Personal Story/i,
        /^Column \d+/i,
        /^Location$/i,
        /^Twitter$/i,
        /^Tagline$/i,
        /^\s*\*+\s*$/,
        /list your hobbies/i,
        /for each hobby/i,
        /title of what/i
    ];
    
    return placeholderPatterns.some(pattern => pattern.test(value.trim()));
}

function formatMultilineText(text) {
    if (!text) return '';
    return text.split('\n')
        .filter(line => {
            const trimmed = line.trim();
            return !line.includes('*') && 
                   trimmed.length > 0 &&
                   !isPlaceholder(trimmed);
        })
        .map(line => `<p>${line.trim()}</p>`)
        .join('\n                    ');
}

function convertGoogleDriveURL(url) {
    if (!url || !url.includes('drive.google.com')) return url;
    
    const fileIdMatch = url.match(/[-\w]{25,}/);
    if (fileIdMatch) {
        return `https://drive.google.com/uc?export=view&id=${fileIdMatch[0]}`;
    }
    return url;
}

function parseBuyLinks(linksString) {
    if (!linksString || !linksString.trim()) return [];
    
    const links = linksString.split('|').map(link => link.trim()).filter(Boolean);
    return links.map(link => {
        let name = 'Buy Now';
        let url = link;
        
        if (link.toLowerCase().includes('amazon')) {
            name = 'Amazon';
        } else if (link.toLowerCase().includes('barnes')) {
            name = 'Barnes & Noble';
        } else if (link.toLowerCase().includes('goodreads')) {
            name = 'Goodreads';
        }
        
        return { name, url };
    });
}

// ===== File Operations =====
function copyDirectory(source, destination) {
    if (!fs.existsSync(destination)) {
        fs.mkdirSync(destination, { recursive: true });
    }
    
    const items = fs.readdirSync(source);
    
    items.forEach(item => {
        const sourcePath = path.join(source, item);
        const destPath = path.join(destination, item);
        
        if (fs.statSync(sourcePath).isDirectory()) {
            copyDirectory(sourcePath, destPath);
        } else {
            fs.copyFileSync(sourcePath, destPath);
        }
    });
}

function copyAssets(authorData, templateDir, siteDir) {
    // Copy assets directory
    const assetsSource = path.join(templateDir, 'assets');
    const assetsDest = path.join(siteDir, 'assets');
    
    if (fs.existsSync(assetsSource)) {
        console.log('📦 Copying assets...');
        copyDirectory(assetsSource, assetsDest);
    }
    
    // Create images directory for local images
    const imagesDest = path.join(siteDir, 'assets', 'images');
    if (!fs.existsSync(imagesDest)) {
        fs.mkdirSync(imagesDest, { recursive: true });
    }
    
    // Copy author photo if it's a local file
    if (authorData.authorPhotoFile && authorData.dataFolder) {
        const authorImagesDir = path.join(authorData.dataFolder, 'author-images');
        const sourcePath = path.join(authorImagesDir, authorData.authorPhotoFile);
        const destPath = path.join(imagesDest, authorData.authorPhotoFile);
        
        if (fs.existsSync(sourcePath)) {
            console.log(`📸 Copying author photo: ${authorData.authorPhotoFile}`);
            fs.copyFileSync(sourcePath, destPath);
        } else {
            console.log(`⚠️  Warning: Author photo not found: ${sourcePath}`);
        }
    }
    
    // Copy book cover images if they're local files
    let bookImagesCopied = 0;
    authorData.books.forEach(book => {
        if (book.coverFile && authorData.dataFolder) {
            const bookCoversDir = path.join(authorData.dataFolder, 'book-covers');
            const sourcePath = path.join(bookCoversDir, book.coverFile);
            const destPath = path.join(imagesDest, book.coverFile);
            
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                bookImagesCopied++;
            } else {
                console.log(`⚠️  Warning: Book cover not found: ${sourcePath}`);
            }
        }
    });
    
    if (bookImagesCopied > 0) {
        console.log(`📚 Copied ${bookImagesCopied} book cover(s)`);
    }
}

function createSiteFiles(authorData, siteDir) {
    // Create README
    const readme = `# ${authorData.authorName} - Author Website

This is a complete static website ready to deploy.

## Deployment Options

### Option 1: Netlify (Recommended)
1. Drag and drop this folder to https://app.netlify.com/drop
2. Your site will be live instantly!

### Option 2: Vercel
1. Install Vercel CLI: \`npm i -g vercel\`
2. Run: \`vercel --prod\`

### Option 3: GitHub Pages
1. Create a new repository on GitHub
2. Push this folder to the repository
3. Enable GitHub Pages in Settings

### Option 4: Any Web Host
Upload this folder via FTP to your web hosting provider.

## Site Structure
- index.html - Home page
- books.html - Books showcase
- story.html - Author story
- contact.html - Contact page
${authorData.showBlogs ? '- blogs.html - Blog page\n' : ''}- assets/ - All CSS, JS, and icons

## Customization
To customize the site, edit the HTML files and CSS in assets/css/styles.css

---
Generated with Author Website Generator
`;
    
    fs.writeFileSync(path.join(siteDir, 'README.md'), readme);
    
    // Create robots.txt
    const robots = `User-agent: *
Allow: /

Sitemap: https://yoursite.com/sitemap.xml
`;
    fs.writeFileSync(path.join(siteDir, 'robots.txt'), robots);
    
    // Create Dockerfile
    const dockerfile = `FROM nginx:alpine

COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
`;
    fs.writeFileSync(path.join(siteDir, 'Dockerfile'), dockerfile);
}

// ===== Template Engine Helper =====
function getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => {
        if (current && current[prop] !== undefined) {
            return current[prop];
        }
        // Handle array indices (e.g., "buyLinks.0.url")
        if (current && Array.isArray(current) && !isNaN(prop)) {
            return current[parseInt(prop)];
        }
        return undefined;
    }, obj);
}

module.exports = {
    parseCSV,
    transformAuthorData,
    getNestedValue,
    copyDirectory,
    copyAssets,
    createSiteFiles
};

