import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const doc = await payload.findGlobal({ slug: 'bylawsPage', locale: 'tr', depth: 0 });
  
  let output = '';
  if (doc.content) {
    doc.content.forEach((block: any, index: number) => {
      output += `--- Blok ${index + 1} (${block.blockType}) ---\n`;
      if (block.blockType === 'article') {
         output += `[Madde Numarası]: ${block.number}\n`;
         output += `[Başlık]: ${block.title}\n`;
         output += `[İçerik]:\n${JSON.stringify(block.content, null, 2)}\n\n`;
      } else {
         output += `[İçerik]:\n${JSON.stringify(block, null, 2)}\n\n`;
      }
    });
  } else {
    output = JSON.stringify(doc, null, 2);
  }

  fs.writeFileSync('bylaws-tr.txt', output);
  console.log('Exported to bylaws-tr.txt');
  process.exit(0);
}
run().catch(console.error);
