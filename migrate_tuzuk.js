const fs = require('fs');

const phpFile = fs.readFileSync('OLDPuzzle/old/tuzukR.php', 'utf8');
const startIndex = phpFile.indexOf('<h3>YAPBOZ DERNEĞİ TÜZÜĞÜ</h3>');
const endIndex = phpFile.indexOf('<!-- FOOTER -->');

let content = phpFile.substring(startIndex, endIndex);

// Remove closing divs that belong to the container
content = content.replace(/<\/div><!-- col -->/g, '');
content = content.replace(/<\/div><!-- row -->/g, '');
content = content.replace(/<\/div><!-- container -->/g, '');
content = content.replace(/<div class="headline style-3">/g, '');
content = content.replace(/<br>/g, '<br />');

// Clean up some problematic HTML for React
content = content.replace(/<B>/g, '<b>').replace(/<\/B>/g, '</b>');

const pageContent = `import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dernek Tüzüğü | Puzzle Derneği',
};

export default function Tuzuk() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>DERNEK TÜZÜĞÜ</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
        }}>
          <div dangerouslySetInnerHTML={{ __html: \`${content.replace(/`/g, '\\`')}\` }} />
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('web/src/app/tuzuk/page.tsx', pageContent);
console.log("Tuzuk migrated!");
