import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function updateLocale(payload: any, locale: string, filename: string, title: string) {
  const docTr = await payload.findGlobal({ slug: 'bylawsPage', locale: 'tr', depth: 0 });
  const text = fs.readFileSync(filename, 'utf8');
  
  // Normalize newlines
  const normalizedText = text.replace(/\r\n/g, '\n');
  
  // Split by <!-- BLOCK_ID: to get each block safely regardless of newlines
  const blocks = normalizedText.split('<!-- BLOCK_ID:').filter(b => b.trim() !== '');
  
  let translatedContent: any[] = [];
  let blockIndex = 0;

  const originalBlocksArray = docTr.blocks || [];

  for (let i = 0; i < originalBlocksArray.length; i++) {
    const originalBlock = originalBlocksArray[i];
    let newBlock = { ...originalBlock };
    
    if (blockIndex < blocks.length) {
       const textBlock = blocks[blockIndex]; 
       
       if (originalBlock.blockType === 'section_title' && textBlock.includes('[BAŞLIK]')) {
           const blockStart = textBlock.indexOf('[BAŞLIK]');
           const firstLineEnd = textBlock.indexOf('\n', blockStart);
           newBlock.content = textBlock.substring(firstLineEnd).trim();
           blockIndex++;
       } else if (originalBlock.blockType === 'madde' && textBlock.includes('[MADDE')) {
           const blockStart = textBlock.indexOf('[MADDE');
           const firstLineEnd = textBlock.indexOf('\n', blockStart);
           newBlock.content = textBlock.substring(firstLineEnd).trim();
           blockIndex++;
       } else if (originalBlock.blockType === 'list_item' && textBlock.includes('[LİSTE_MADDESİ')) {
           const blockStart = textBlock.indexOf('[LİSTE_MADDESİ');
           const firstLineEnd = textBlock.indexOf('\n', blockStart);
           newBlock.content = textBlock.substring(firstLineEnd).trim();
           blockIndex++;
       } else if (originalBlock.blockType === 'paragraph' && textBlock.includes('[PARAGRAF]')) {
           const blockStart = textBlock.indexOf('[PARAGRAF]');
           const firstLineEnd = textBlock.indexOf('\n', blockStart);
           newBlock.content = textBlock.substring(firstLineEnd).trim();
           blockIndex++;
       }
    }
    translatedContent.push(newBlock);
  }

  await payload.updateGlobal({
    slug: 'bylawsPage',
    locale: locale,
    data: {
      title: title,
      blocks: translatedContent
    }
  });
  console.log(`Successfully updated ${locale} bylaws in Payload CMS.`);
}

async function run() {
  const payload = await getPayload({ config: configPromise });
  await updateLocale(payload, 'fr', 'bylaws-fr.txt', 'Statuts');
  await updateLocale(payload, 'ru', 'bylaws-ru.txt', 'Устав');
  process.exit(0);
}

run().catch(console.error);
