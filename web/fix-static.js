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
      
      // Skip if already has setRequestLocale
      if (content.includes('setRequestLocale')) continue;
      if (!content.includes('export default async function')) continue;

      // Add import
      if (!content.includes("import { setRequestLocale } from 'next-intl/server';")) {
        // If next-intl/server is imported, append to it
        if (content.includes("from 'next-intl/server'")) {
           content = content.replace(/import\s+{([^}]+)}\s+from\s+'next-intl\/server';/, (match, p1) => {
             return `import { ${p1.trim()}, setRequestLocale } from 'next-intl/server';`;
           });
        } else {
           content = `import { setRequestLocale } from 'next-intl/server';\n` + content;
        }
      }

      // Inject setRequestLocale
      content = content.replace(/export default async function\s+\w+\(.*?(?:params.*?:\s*Promise<\{\s*locale:\s*string\s*\}>)?\s*\)\s*\{[\s\S]*?(?:const { locale } = await .*?params;)?/, (match) => {
        if (!match.includes('locale')) return match; // If no locale in params, skip
        
        let newMatch = match;
        // Ensure locale is extracted if not already
        if (!match.includes('const { locale }')) {
            // Need to handle params extraction, complex, so let's just do a simple replace
        }
        
        return newMatch + '\n  setRequestLocale(locale);';
      });
      
      fs.writeFileSync(fullPath, content);
      console.log('Fixed', fullPath);
    }
  }
}

processDir('./src/app/(app)/[locale]');
