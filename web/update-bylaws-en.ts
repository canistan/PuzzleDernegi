import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const docTr = await payload.findGlobal({ slug: 'bylawsPage', locale: 'tr', depth: 0 });
  const textEn = fs.readFileSync('bylaws-en-user.txt', 'utf8');
  
  const translatedBlocks = textEn.split('\n\n').filter(b => b.trim() !== '');
  
  let translatedContent: any[] = [];
  let blockIndex = 0;

  // The 'content' field in the doc is actually 'blocks' array based on the schema
  const originalBlocksArray = docTr.blocks || [];

  for (let i = 0; i < originalBlocksArray.length; i++) {
    const originalBlock = originalBlocksArray[i];
    let newBlock = { ...originalBlock };
    
    // Find the next translated block text
    if (blockIndex < translatedBlocks.length) {
       const textBlock = translatedBlocks[blockIndex];
       
       if (originalBlock.blockType === 'section_title' && textBlock.includes('[BAŞLIK]')) {
           newBlock.content = textBlock.replace('[BAŞLIK]\n', '').trim();
           blockIndex++;
       } else if (originalBlock.blockType === 'madde' && textBlock.includes('[MADDE')) {
           const lines = textBlock.split('\n');
           newBlock.content = lines.slice(1).join('\n').trim();
           blockIndex++;
       } else if (originalBlock.blockType === 'list_item' && textBlock.includes('[LİSTE_MADDESİ')) {
           const lines = textBlock.split('\n');
           newBlock.content = lines.slice(1).join('\n').trim();
           blockIndex++;
       } else if (originalBlock.blockType === 'paragraph' && textBlock.includes('[PARAGRAF]')) {
           const lines = textBlock.split('\n');
           newBlock.content = lines.slice(1).join('\n').trim();
           blockIndex++;
       }
    }
    translatedContent.push(newBlock);
  }

  await payload.updateGlobal({
    slug: 'bylawsPage',
    locale: 'en',
    data: {
      title: 'Bylaws',
      blocks: translatedContent
    }
  });

  console.log('Successfully updated English bylaws in Payload CMS.');
  process.exit(0);
}

run().catch(console.error);
