import { getPayload } from 'payload';
import configPromise from './payload.config';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const docFr = await payload.findGlobal({ slug: 'bylawsPage', locale: 'fr', depth: 0 });
  const docRu = await payload.findGlobal({ slug: 'bylawsPage', locale: 'ru', depth: 0 });
  console.log('FR TITLE:', docFr.title);
  console.log('FR BLOCKS:', docFr.blocks?.slice(0, 3));
  console.log('RU TITLE:', docRu.title);
  process.exit(0);
}
run().catch(console.error);
