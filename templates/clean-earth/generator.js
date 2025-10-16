/**
 * Clean Earth Template Generator
 * Enhanced template engine with dot notation support for array access
 */

const fs = require('fs');
const path = require('path');

// ===== Enhanced Template Engine =====
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
    
    // Clean Earth specific fixes
    // Fix broken book-buy-links divs (empty or unclosed)
    rendered = rendered.replace(/<div class="book-buy-links">\s*(?=<div class="book-card")/g, '<div class="book-buy-links"></div>\n                        </div>\n                    </div>\n                ');
    rendered = rendered.replace(/<div class="book-buy-links">\s*<\/div>\s*(?=<div class="book-card")/g, '</div>\n                    </div>\n                ');
    
    // Clean up excessive whitespace left by removed sections
    rendered = rendered.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return rendered;
}

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

