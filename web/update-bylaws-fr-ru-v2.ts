import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function updateLocale(payload: any, locale: string, filename: string, title: string) {
  const docTr = await payload.findGlobal({ slug: 'bylawsPage', locale: 'tr', depth: 0 });
  const text = fs.readFileSync(filename, 'utf8');
  
  // Normalize newlines
  const normalizedText = text.replace(/\r\n/g, '\n');
  
  // Split by <!-- BLOCK_ID: to get each block safely regardless of newlines
  const pieces = normalizedText.split('<!-- BLOCK_ID:').filter(b => b.trim() !== '');
  
  const translationsMap = new Map();

  for (const piece of pieces) {
      const idEnd = piece.indexOf('-->');
      if (idEnd === -1) continue;
      
      const id = piece.substring(0, idEnd).trim();
      let content = '';

      if (piece.includes('[BAŞLIK]')) {
           const blockStart = piece.indexOf('[BAŞLIK]');
           const firstLineEnd = piece.indexOf('\n', blockStart);
           content = piece.substring(firstLineEnd).trim();
      } else if (piece.includes('[MADDE')) {
           const blockStart = piece.indexOf('[MADDE');
           const firstLineEnd = piece.indexOf('\n', blockStart);
           content = piece.substring(firstLineEnd).trim();
      } else if (piece.includes('[LİSTE_MADDESİ')) {
           const blockStart = piece.indexOf('[LİSTE_MADDESİ');
           const firstLineEnd = piece.indexOf('\n', blockStart);
           content = piece.substring(firstLineEnd).trim();
      } else if (piece.includes('[PARAGRAF]')) {
           const blockStart = piece.indexOf('[PARAGRAF]');
           const firstLineEnd = piece.indexOf('\n', blockStart);
           content = piece.substring(firstLineEnd).trim();
      }

      if (content && id) {
          translationsMap.set(id, content);
      }
  }

  const originalBlocksArray = docTr.blocks || [];
  let translatedContent: any[] = [];
  let updatedCount = 0;

  for (let i = 0; i < originalBlocksArray.length; i++) {
    const originalBlock = originalBlocksArray[i];
    let newBlock = { ...originalBlock };
    
    if (newBlock.id && translationsMap.has(newBlock.id)) {
        newBlock.content = translationsMap.get(newBlock.id);
        updatedCount++;
    }
    translatedContent.push(newBlock);
  }

  console.log(`For ${locale}, found ${translationsMap.size} translations, updated ${updatedCount} blocks.`);

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
