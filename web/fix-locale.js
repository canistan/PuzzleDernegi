const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (file === 'page.tsx' || file === 'layout.tsx') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      if (content.includes('setRequestLocale(locale);')) {
        // Find where it was wrongly placed
        // Remove it
        content = content.replace(/\s*setRequestLocale\(locale\);\n/g, '\n');
        
        // Add it after const { locale } = await props.params; or await params;
        content = content.replace(/(const\s+\{\s*locale\s*\}\s*=\s*await\s+.*?params;)/, "$1\n  setRequestLocale(locale);");
        
        fs.writeFileSync(fullPath, content);
        console.log('Fixed locale usage in', fullPath);
      }
    }
  }
}

processDir('./src/app/(app)/[locale]');
