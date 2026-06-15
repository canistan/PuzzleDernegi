import { getPayload } from 'payload';
import configPromise from './payload.config';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const locales = ['tr', 'en', 'de', 'fr', 'ru'];
  
  for (const locale of locales) {
    const doc = await payload.findGlobal({ slug: 'bylawsPage', locale: locale as any, depth: 0 });
    
    let updated = false;
    if (doc.blocks) {
      doc.blocks.forEach((block: any) => {
        if (block.blockType === 'list_item' && typeof block.listMarker === 'string') {
          const m = block.listMarker.trim();
          if (m === 'я.' || m === 'я' || m === 'r.') {
            block.listMarker = 'i.';
            updated = true;
          } else if (m === 'в.' || m === 'в') {
            block.listMarker = 'v.';
            updated = true;
          } else if (m === 'I.' || m === 'I') {
            block.listMarker = 'i.';
            updated = true;
          } else if (m === 'VI.' || m === 'VI') {
             block.listMarker = 'vi.';
             updated = true;
          } else if (m === 'VII.' || m === 'VII') {
             block.listMarker = 'vii.';
             updated = true;
          } else if (m === 'viii.' || m === 'viii') {
             block.listMarker = 'viii.';
             updated = true;
          }
        }
      });
      
      if (updated) {
        await payload.updateGlobal({
          slug: 'bylawsPage',
          locale: locale as any,
          data: {
            blocks: doc.blocks
          }
        });
        console.log(`Fixed markers for ${locale}`);
      }
    }
  }
  
  process.exit(0);
}

run().catch(console.error);
