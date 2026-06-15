import { getPayload } from 'payload';
import configPromise from './payload.config';
import { tuzukData } from './src/app/(app)/[locale]/tuzuk/tuzukData';

async function seed() {
  const payload = await getPayload({ config: configPromise });

  const blocks = tuzukData.map((item: any) => {
    return {
      blockType: item.type || 'paragraph',
      maddeNo: item.maddeNo || item.number || '',
      listMarker: item.listMarker || '',
      content: item.content || '',
    };
  });

  await payload.updateGlobal({
    slug: 'bylawsPage' as any,
    data: {
      title: 'Dernek Tüzüğü',
      blocks: blocks as any,
    },
  });

  console.log("Seeded bylaws correctly!");
  process.exit(0);
}

seed().catch(console.error);
