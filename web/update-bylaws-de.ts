import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const docTr = await payload.findGlobal({ slug: 'bylawsPage', locale: 'tr', depth: 0 });
  const textDe = fs.readFileSync('bylaws-de-user.txt', 'utf8');
  
  const translatedBlocks = textDe.split('\n\n').filter(b => b.trim() !== '');
  
  let translatedContent: any[] = [];
  let blockIndex = 0;

  const originalBlocksArray = docTr.blocks || [];

  for (let i = 0; i < originalBlocksArray.length; i++) {
    const originalBlock = originalBlocksArray[i];
    let newBlock = { ...originalBlock };
    
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
    locale: 'de',
    data: {
      title: 'Satzung',
      blocks: translatedContent
    }
  });

  console.log('Successfully updated German bylaws in Payload CMS.');
  process.exit(0);
}

run().catch(console.error);
