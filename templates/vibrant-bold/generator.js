const fs = require('fs');
const path = require('path');
const { parseCSV, transformAuthorData, getNestedValue, copyDirectory } = require('../../lib/shared');

// ===== Handlebars-like Template Engine (Enhanced Logic) =====
function renderTemplate(templateContent, data) {
    let rendered = templateContent;

    // Handle each loops FIRST: {{#each array}}...{{/each}}
    rendered = rendered.replace(/\{\{#each\s+([\w\.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayName, content) => {
        const array = getNestedValue(data, arrayName); // Use getNestedValue for array access
        if (!Array.isArray(array) || array.length === 0) return '';

        return array.map((item, index) => {
            let itemContent = content;
            // Replace @index
            itemContent = itemContent.replace(/\{\{@index\}\}/g, index);

            // Handle nested {{#if}}...{{else}}...{{/if}} within each item (with dot notation support)
            let prevItemContent = '';
            let maxIterations = 5;
            while (prevItemContent !== itemContent && maxIterations > 0) {
                prevItemContent = itemContent;
                itemContent = itemContent.replace(/\{\{#if\s+([\w\.]+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, cond, ifCont, elseCont) => {
                    const value = getNestedValue(item, cond);
                    return value ? ifCont : elseCont;
                });
                maxIterations--;
            }

            // Handle nested ifs without else within each (with dot notation support)
            itemContent = itemContent.replace(/\{\{#if\s+([\w\.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, cond, cont) => {
                const value = getNestedValue(item, cond);
                return value ? cont : '';
            });

            // Handle nested each (for buy links, etc) - PROCESS AFTER conditionals
            itemContent = itemContent.replace(/\{\{#each\s+([\w\.]+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (m, arrName, cont) => {
                const nestedArray = getNestedValue(item, arrName); // Use getNestedValue
                if (!Array.isArray(nestedArray) || nestedArray.length === 0) return '';

                return nestedArray.map(nestedItem => {
                    let nestedContent = cont;
                    // Handle nested {{#if}} in nested each
                    nestedContent = nestedContent.replace(/\{\{#if\s+([\w\.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (nm, cond, ifCont) => {
                        const nestedValue = getNestedValue(nestedItem, cond); // Use getNestedValue
                        return nestedValue ? ifCont : '';
                    });
                    // Replace nested item properties
                    nestedContent = nestedContent.replace(/\{\{([\w\.]+)\}\}/g, (nm, p) => {
                        const nestedValue = getNestedValue(nestedItem, p); // Use getNestedValue
                        return nestedValue !== undefined ? nestedValue : '';
                    });
                    return nestedContent;
                }).join('');
            });

            // Replace item properties (with dot notation support)
            itemContent = itemContent.replace(/\{\{([\w\.]+)\}\}/g, (m, prop) => {
                const value = getNestedValue(item, prop);
                return value !== undefined ? value : '';
            });

            return itemContent;
        }).join('');
    });

    // Handle conditionals with else: {{#if condition}}...{{else}}...{{/if}} (with dot notation)
    let previousRendered = '';
    let iterations = 0;
    while (previousRendered !== rendered && iterations < 10) {
        previousRendered = rendered;
        rendered = rendered.replace(/\{\{#if\s+([\w\.]+)\}\}([\s\S]*?)\{\{else\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, ifContent, elseContent) => {
            const value = getNestedValue(data, condition);
            return value ? ifContent : elseContent;
        });
        iterations++;
    }

    // Handle conditionals without else: {{#if condition}}...{{/if}} (with dot notation)
    rendered = rendered.replace(/\{\{#if\s+([\w\.]+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
        const value = getNestedValue(data, condition);
        return value ? content : '';
    });

    // Handle unless conditionals: {{#unless condition}}...{{/unless}} (with dot notation)
    rendered = rendered.replace(/\{\{#unless\s+([\w\.]+)\}\}([\s\S]*?)\{\{\/unless\}\}/g, (match, condition, content) => {
        const value = getNestedValue(data, condition);
        return !value ? content : '';
    });

    // Handle simple variable replacements: {{variable}} (with dot notation)
    rendered = rendered.replace(/\{\{([\w\.]+)\}\}/g, (match, variable) => {
        const value = getNestedValue(data, variable);
        return value !== undefined ? value : '';
    });

    // Handle HTML content: {{{variable}}} (with dot notation)
    rendered = rendered.replace(/\{\{\{([\w\.]+)\}\}\}/g, (match, variable) => {
        const value = getNestedValue(data, variable);
        return value !== undefined ? value : '';
    });

    // Clean up any leftover template tags (from empty sections)
    rendered = rendered.replace(/\{\{#\w+\s+[\w\.]+\}\}/g, '');
    rendered = rendered.replace(/\{\{\/\w+\}\}/g, '');
    rendered = rendered.replace(/\{\{else\}\}/g, '');

    // Clean up empty links and their containers
    rendered = rendered.replace(/<a\s+href=""\s+[^>]*><\/a>/g, '');

    // Clean up leftover variable placeholders
    rendered = rendered.replace(/\{\{[\w\.]+\}\}/g, '');

    // Clean up leftover braces from HTML rendering
    rendered = rendered.replace(/\{(<[^>]+>.*?<\/[^>]+>)\}/g, '$1');

    // Vibrant Bold specific fixes
    // Clean up excessive whitespace left by removed sections
    rendered = rendered.replace(/\n\s*\n\s*\n/g, '\n\n');

    return rendered;
}

// ===== Site Generation =====
function generateSite(authorData, templateName, outputDir) {
    console.log(`\n🎨 Generating site with ${templateName} template...`);
    
    // Create output directory
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    // Copy template assets
    const templateDir = path.join(__dirname);
    const assetsDir = path.join(templateDir, 'assets');
    const outputAssetsDir = path.join(outputDir, 'assets');
    
    if (fs.existsSync(assetsDir)) {
        copyDirectory(assetsDir, outputAssetsDir);
        console.log(`📁 Copied template assets`);
    }

    // Copy author images
    if (authorData.authorPhotoFile) {
        const sourcePath = path.join(authorData.dataFolder, 'author-images', authorData.authorPhotoFile);
        const destPath = path.join(outputDir, 'assets/images', authorData.authorPhotoFile);
        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, destPath);
            console.log(`📸 Copied author photo: ${authorData.authorPhotoFile}`);
        }
    }

    // Copy book cover images
    authorData.books.forEach((book, index) => {
        if (book.coverFile) {
            const sourcePath = path.join(authorData.dataFolder, 'book-covers', book.coverFile);
            const destPath = path.join(outputDir, 'assets/images', book.coverFile);
            if (fs.existsSync(sourcePath)) {
                fs.copyFileSync(sourcePath, destPath);
                console.log(`📚 Copied book cover ${index + 1}: ${book.coverFile}`);
            }
        }
    });

    // Generate HTML pages
    const pages = ['index.html', 'books.html', 'story.html', 'contact.html', 'blogs.html'];
    
    pages.forEach(pageName => {
        const templatePath = path.join(templateDir, pageName);
        if (fs.existsSync(templatePath)) {
            const templateContent = fs.readFileSync(templatePath, 'utf8');
            const renderedContent = renderTemplate(templateContent, authorData);
            
            const outputPath = path.join(outputDir, pageName);
            fs.writeFileSync(outputPath, renderedContent);
            console.log(`📄 Generated ${pageName}`);
        }
    });

    // Generate additional files
    generateRobotsTxt(outputDir);
    generateReadme(outputDir, authorData, templateName);
    
    console.log(`\n✨ Site generation complete!`);
    console.log(`📂 Output directory: ${outputDir}`);
}

// ===== Additional File Generation =====
function generateRobotsTxt(outputDir) {
    const robotsContent = `User-agent: *
Allow: /

Sitemap: ${outputDir}/sitemap.xml`;
    
    fs.writeFileSync(path.join(outputDir, 'robots.txt'), robotsContent);
    console.log(`🤖 Generated robots.txt`);
}

function generateReadme(outputDir, authorData, templateName) {
    const readmeContent = `# ${authorData.authorName} - Author Website

Generated with AUTHORGEN using the **${templateName}** template.

## About This Site

This is a static website generated from CSV data using the AUTHORGEN static site generator.

## Template Features

- **Vibrant Bold Design**: Electric blue, hot pink, and neon green color scheme
- **Modern Typography**: Poppins and Montserrat fonts
- **Interactive Animations**: Scroll animations, hover effects, and dynamic color shifting
- **Responsive Layout**: Optimized for all device sizes
- **Contact Form**: Interactive contact form with validation
- **Social Integration**: Social media links and sharing

## Files Generated

- \`index.html\` - Home page with hero section and featured content
- \`books.html\` - Complete book collection
- \`story.html\` - Author's personal story
- \`contact.html\` - Contact information and form
- \`blogs.html\` - Blog page (coming soon)
- \`assets/\` - CSS, JavaScript, images, and icons

## Deployment

This site can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any web server

## Generated on

${new Date().toISOString()}

---

*Generated by AUTHORGEN - Author Website Generator*
`;
    
    fs.writeFileSync(path.join(outputDir, 'README.md'), readmeContent);
    console.log(`📖 Generated README.md`);
}

module.exports = { parseCSV, transformAuthorData, generateSite, renderTemplate };
