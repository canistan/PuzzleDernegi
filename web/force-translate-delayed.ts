import { getPayload } from 'payload';
import configPromise from './payload.config';
import { translateJSON } from './src/utilities/translate';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function run() {
  const payload = await getPayload({ config: configPromise });
  const TARGET_LOCALES = ['en', 'de', 'fr', 'ru'];
  // We already did homePage in en, de (Wait, de failed due to quota)
  // Let's do them all again to be safe.
  const globals = ['homePage', 'historyPage', 'pastCompetitionsPage', 'bylawsPage', 'gallerySettings', 'contactPage'];

  for (const slug of globals) {
    console.log(`Processing global: ${slug}`);
    const doc = await payload.findGlobal({ slug: slug as any, locale: 'tr' });
    
    const dataToTranslate = { ...doc };
    delete dataToTranslate.id;
    delete dataToTranslate._id;
    delete dataToTranslate.createdAt;
    delete dataToTranslate.updatedAt;
    delete dataToTranslate.globalType;

    for (const locale of TARGET_LOCALES) {
      console.log(`Translating ${slug} to ${locale}...`);
      try {
        const translatedData = await translateJSON(dataToTranslate, locale);
        await payload.updateGlobal({
          slug: slug as any,
          locale: locale,
          data: translatedData,
        });
        console.log(`Successfully updated ${slug} in ${locale}`);
      } catch (err) {
        console.error(`Failed to translate ${slug} to ${locale}:`, err);
      }
      console.log(`Waiting 5 seconds before next request to avoid quota limits...`);
      await sleep(5000);
    }
  }

  console.log("All done!");
  process.exit(0);
}

run().catch(console.error);
