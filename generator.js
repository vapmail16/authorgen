#!/usr/bin/env node

/**
 * Author Website Generator - Main Orchestrator
 * Delegates to template-specific generators
 */

const fs = require('fs');
const path = require('path');
const shared = require('./lib/shared.js');

// ===== Main Function =====
function main() {
    console.log('━'.repeat(60));
    console.log('   🎨 AUTHOR WEBSITE GENERATOR');
    console.log('━'.repeat(60));
    
    const args = process.argv.slice(2);
    
    if (args.length < 1) {
        console.log('\n❌ Usage: node generator.js <data-folder-or-csv> [row-number] [template] [output-dir]\n');
        console.log('Examples:');
        console.log('  # Using data folder (recommended):');
        console.log('  node generator.js Data/author-site 1');
        console.log('  node generator.js Data/author-site 1 clean-earth');
        console.log('  ');
        console.log('  # Using CSV file directly (legacy):');
        console.log('  node generator.js author1.csv 1');
        console.log('  node generator.js author1.csv 2 black-chrome ./output\n');
        console.log('Data folder structure:');
        console.log('  Data/author-site/');
        console.log('    ├── data.csv');
        console.log('    ├── author-images/');
        console.log('    │   └── john-smith.jpg');
        console.log('    └── book-covers/');
        console.log('        ├── book1-cover.jpg');
        console.log('        └── book2-cover.jpg\n');
        process.exit(1);
    }
    
    const inputPath = args[0];
    const rowNumber = parseInt(args[1]) || 1;
    const templateName = args[2] || 'black-chrome';
    const outputDir = args[3] || null;
    
    let csvFile;
    let dataFolder = null;
    
    // Determine if input is a folder or CSV file
    if (fs.existsSync(inputPath)) {
        const stats = fs.statSync(inputPath);
        if (stats.isDirectory()) {
            // It's a data folder
            dataFolder = inputPath;
            const possibleCSV = path.join(dataFolder, 'data.csv');
            if (fs.existsSync(possibleCSV)) {
                csvFile = possibleCSV;
                console.log(`\n📁 Using data folder: ${dataFolder}`);
            } else {
                console.error(`\n❌ Error: data.csv not found in folder: ${dataFolder}\n`);
                process.exit(1);
            }
        } else {
            // It's a CSV file
            csvFile = inputPath;
            // Try to detect data folder (same directory as CSV)
            const csvDir = path.dirname(csvFile);
            if (fs.existsSync(path.join(csvDir, 'author-images')) || 
                fs.existsSync(path.join(csvDir, 'book-covers'))) {
                dataFolder = csvDir;
                console.log(`\n📁 Detected data folder: ${dataFolder}`);
            }
        }
    } else {
        console.error(`\n❌ Error: Path not found: ${inputPath}\n`);
        process.exit(1);
    }
    
    // Check if CSV exists
    if (!fs.existsSync(csvFile)) {
        console.error(`\n❌ Error: CSV file not found: ${csvFile}\n`);
        process.exit(1);
    }
    
    // Check if template exists
    const templateDir = path.join(__dirname, 'templates', templateName);
    if (!fs.existsSync(templateDir)) {
        console.error(`\n❌ Error: Template not found: ${templateName}\n`);
        console.error('Available templates:');
        const templatesDir = path.join(__dirname, 'templates');
        if (fs.existsSync(templatesDir)) {
            const templates = fs.readdirSync(templatesDir)
                .filter(item => fs.statSync(path.join(templatesDir, item)).isDirectory());
            templates.forEach(t => console.error(`  - ${t}`));
        }
        console.error('');
        process.exit(1);
    }
    
    // Check if template has a generator.js
    const templateGeneratorPath = path.join(templateDir, 'generator.js');
    if (!fs.existsSync(templateGeneratorPath)) {
        console.error(`\n❌ Error: Template generator not found: ${templateGeneratorPath}\n`);
        console.error(`Each template must have its own generator.js file.\n`);
        process.exit(1);
    }
    
    try {
        // Parse CSV
        console.log(`\n📖 Reading CSV: ${csvFile}`);
        const rows = shared.parseCSV(csvFile);
        
        if (rows.length < rowNumber) {
            console.error(`\n❌ Error: Row ${rowNumber} not found in CSV (only ${rows.length} rows)\n`);
            process.exit(1);
        }
        
        const csvRow = rows[rowNumber - 1];
        
        // Transform data
        console.log(`📊 Processing data...`);
        const authorData = shared.transformAuthorData(csvRow, dataFolder);
        
        // Determine output directory
        const authorSlug = authorData.authorName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        
        // Use template name in directory name if not default template
        const folderName = templateName === 'black-chrome' 
            ? authorSlug 
            : `${authorSlug}-${templateName}`;
        
        const finalOutputDir = outputDir || path.join(__dirname, 'generated-sites', folderName);
        
        // Load template-specific generator
        console.log(`\n🎨 Using template: ${templateName}`);
        const templateGenerator = require(templateGeneratorPath);
        
        if (!templateGenerator.generateSite || typeof templateGenerator.generateSite !== 'function') {
            console.error(`\n❌ Error: Template generator must export a 'generateSite' function\n`);
            process.exit(1);
        }
        
        // Generate site using template-specific generator
        templateGenerator.generateSite(authorData, templateDir, finalOutputDir);
        
        console.log('\n━'.repeat(60));
        console.log('   ✨ GENERATION COMPLETE!');
        console.log('━'.repeat(60));
        console.log(`\n📊 Stats:`);
        console.log(`   • Pages: ${authorData.showBlogs ? 5 : 4}`);
        console.log(`   • Books: ${authorData.books.length}`);
        console.log(`   • Hobbies: ${authorData.hobbies.length}`);
        console.log(`   • Template: ${templateName}`);
        console.log('\n');
        
    } catch (error) {
        console.error(`\n❌ Error: ${error.message}\n`);
        console.error(error.stack);
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    main();
}

module.exports = { main };
