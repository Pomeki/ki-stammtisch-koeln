import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src', 'components');

const replaceColorsInFile = (filePath) => {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Pattern to match text, border, bg with exact hex
    content = content.replace(/text-\[#06b6d4\]/g, 'text-[var(--color-cyan)]');
    content = content.replace(/text-\[#E11D48\]/g, 'text-[var(--color-red)]');
    
    fs.writeFileSync(filePath, content);
};

const processDirectory = (dirPath) => {
    const files = fs.readdirSync(dirPath);
    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            replaceColorsInFile(fullPath);
        }
    });
};

processDirectory(componentsDir);

// Also process blog page
const blogPagePath = path.join(process.cwd(), 'src', 'app', 'blog', 'page.tsx');
if (fs.existsSync(blogPagePath)) {
    replaceColorsInFile(blogPagePath);
}

console.log('Colors replaced successfully!');
