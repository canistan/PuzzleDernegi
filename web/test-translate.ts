import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
});

async function run() {
  const { getPayload } = await import('payload');
  const configPromise = (await import('./payload.config')).default;
  const payload = await getPayload({ config: configPromise });

  const { autoTranslateGlobalHook } = await import('./src/hooks/autoTranslateHook');
  const hook = autoTranslateGlobalHook('homePage');

  const homePageTr = await payload.findGlobal({ slug: 'homePage', locale: 'tr' });
  console.log('Original TR doc:', JSON.stringify(homePageTr, null, 2).slice(0, 200));

  // Manually trigger the hook
  await hook({
    doc: homePageTr,
    previousDoc: homePageTr,
    req: {
      locale: 'tr',
      payload,
      context: {}
    } as any
  });

  // Wait a bit for async process to finish
  await new Promise(r => setTimeout(r, 15000));

  const homePageEn = await payload.findGlobal({ slug: 'homePage', locale: 'en' });
  console.log('Translated EN doc:', JSON.stringify(homePageEn, null, 2).slice(0, 200));

  process.exit(0);
}

run().catch(console.error);
