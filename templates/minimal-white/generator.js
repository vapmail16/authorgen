/**
 * Black Chrome Template Generator
 * Original template engine logic
 */

const fs = require('fs');
const path = require('path');

// ===== Template Engine =====
function renderTemplate(templateContent, data) {
    let rendered = templateContent;
    
    // Handle each loops FIRST: {{#each array}}...{{/each}}
    rendered = rendered.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, arrayName, content) => {
        const array = data[arrayName];
        if (!Array.isArray(array) || array.length === 0) return '';
        
        return array.map((item, index) => {
            let itemContent = content;
            // Replace @index
            itemContent = itemContent.replace(/\{\{@index\}\}/g, index);
            
            // Handle nested each (for buy links, etc) - PROCESS FIRST before conditionals
            itemContent = itemContent.replace(/\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g, (m, arrName, cont) => {
                const nestedArray = item[arrName];
                if (!Array.isArray(nestedArray) || nestedArray.length === 0) return '';
                
                return nestedArray.map(nestedItem => {
                    let nestedContent = cont;
                    // Handle nested {{#if}} in nested each
                    nestedContent = nestedContent.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (nm, cond, ifCont) => {
                        return nestedItem[cond] ? ifCont : '';
                    });
                    // Replace nested item properties
                    nestedContent = nestedContent.replace(/\{\{(\w+)\}\}/g, (nm, p) => {
                        return nestedItem[p] !== undefined ? nestedItem[p] : '';
                    });
                    return nestedContent;
                }).join('');
            });
            
            // Handle nested {{#if}}...{{else}}...{{/if}} within each item (process from innermost to outermost)
            let prevItemContent = '';
            let maxIterations = 5;
            while (prevItemContent !== itemContent && maxIterations > 0) {
                prevItemContent = itemContent;
                itemContent = itemContent.replace(/\{\{#if\s+(\w+)\}\}((?:(?!\{\{#if).)*?)\{\{else\}\}((?:(?!\{\{#if).)*?)\{\{\/if\}\}/g, (m, cond, ifCont, elseCont) => {
                    return item[cond] ? ifCont : elseCont;
                });
                maxIterations--;
            }
            
            // Handle nested ifs without else within each
            itemContent = itemContent.replace(/\{\{#if\s+(\w+)\}\}([\s\S]*?)\{\{\/if\}\}/g, (m, cond, cont) => {
                return item[cond] ? cont : '';
            });
            
            // Replace item properties
            itemContent = itemContent.replace(/\{\{(\w+)\}\}/g, (m, prop) => {
                return item[prop] !== undefined ? item[prop] : '';
            });
            
            return itemContent;
        }).join('');
    });
    
    // Handle conditionals with else: {{#if condition}}...{{else}}...{{/if}} (non-greedy, multiple passes)
    let previousRendered = '';
    let iterations = 0;
    while (previousRendered !== rendered && iterations < 10) {
        previousRendered = rendered;
        rendered = rendered.replace(/\{\{#if\s+(\w+\.?\w*)\}\}((?:(?!\{\{#if).)*?)\{\{else\}\}((?:(?!\{\{#if).)*?)\{\{\/if\}\}/g, (match, condition, ifContent, elseContent) => {
            const value = getNestedValue(data, condition);
            return value ? ifContent : elseContent;
        });
        iterations++;
    }
    
    // Handle conditionals without else: {{#if condition}}...{{/if}}
    rendered = rendered.replace(/\{\{#if\s+(\w+\.?\w*)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, condition, content) => {
        const value = getNestedValue(data, condition);
        return value ? content : '';
    });
    
    // Handle unless conditionals: {{#unless condition}}...{{/unless}}
    rendered = rendered.replace(/\{\{#unless\s+(\w+\.?\w*)\}\}([\s\S]*?)\{\{\/unless\}\}/g, (match, condition, content) => {
        const value = getNestedValue(data, condition);
        return !value ? content : '';
    });
    
    // Handle simple variable replacements: {{variable}}
    rendered = rendered.replace(/\{\{(\w+\.?\w*)\}\}/g, (match, variable) => {
        const value = getNestedValue(data, variable);
        return value !== undefined ? value : '';
    });
    
    // Handle HTML content: {{{variable}}}
    rendered = rendered.replace(/\{\{\{(\w+\.?\w*)\}\}\}/g, (match, variable) => {
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
    rendered = rendered.replace(/\{\{\w+\.?\w*\}\}/g, '');
    
    // Clean up leftover braces from HTML rendering
    rendered = rendered.replace(/\{(<[^>]+>.*?<\/[^>]+>)\}/g, '$1');
    
    // Fix broken book-links divs (empty or unclosed) on home page
    rendered = rendered.replace(/<div class="book-links">\s*(?=<div class="book-card")/g, '<div class="book-links"></div>\n                        </div>\n                    </div>\n                ');
    rendered = rendered.replace(/<div class="book-links">\s*<\/div>\s*(?=<div class="book-card")/g, '</div>\n                    </div>\n                ');
    
    // Fix broken book-item-links divs (empty or unclosed) on books page
    rendered = rendered.replace(/<div class="book-item-links">\s*<span class="buy-label">Available at:<\/span>\s*(?=<div class="book-item")/g, '<div class="book-item-links">\n                            <span class="buy-label">Available at:</span>\n                        </div>\n                    </div>\n                </div>\n                ');
    
    // Remove "Books coming soon" empty state when books exist
    rendered = rendered.replace(/<div class="books-list">[\s\S]*?<\/div>\s*<div class="empty-state"[\s\S]*?<\/div>/g, (match) => {
        if (match.includes('book-item')) {
            return match.replace(/<div class="empty-state"[\s\S]*?<\/div>/g, '');
        }
        return match;
    });
    
    // Clean up excessive whitespace left by removed sections
    rendered = rendered.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return rendered;
}

function getNestedValue(obj, path) {
    return path.split('.').reduce((current, prop) => {
        return current && current[prop] !== undefined ? current[prop] : undefined;
    }, obj);
}

// ===== Site Generator =====
function generateSite(authorData, templateDir, outputDir) {
    console.log(`\n🚀 Generating site for: ${authorData.authorName}`);
    
    const siteDir = outputDir;
    
    // Create output directory
    if (fs.existsSync(siteDir)) {
        fs.rmSync(siteDir, { recursive: true });
    }
    fs.mkdirSync(siteDir, { recursive: true });
    
    // Use shared utilities for copying assets
    const shared = require('../../lib/shared.js');
    shared.copyAssets(authorData, templateDir, siteDir);
    
    // Process HTML files
    const htmlFiles = ['index.html', 'books.html', 'story.html', 'contact.html'];
    
    // Only include blogs.html if blog is enabled
    if (authorData.showBlogs) {
        htmlFiles.push('blogs.html');
    }
    
    htmlFiles.forEach(file => {
        const templatePath = path.join(templateDir, file);
        
        if (fs.existsSync(templatePath)) {
            console.log(`📄 Generating ${file}...`);
            const templateContent = fs.readFileSync(templatePath, 'utf-8');
            const rendered = renderTemplate(templateContent, authorData);
            fs.writeFileSync(path.join(siteDir, file), rendered);
        }
    });
    
    // Create README and other files
    shared.createSiteFiles(authorData, siteDir);
    
    console.log(`\n✅ Site generated successfully!`);
    console.log(`📁 Location: ${siteDir}`);
    console.log(`\n🌐 To preview: Open ${path.join(siteDir, 'index.html')} in your browser`);
}

module.exports = { generateSite, renderTemplate };

