import fs from 'fs';
import path from 'path';

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
  
  const blobUrls: Record<string, string> = {
    'olivium.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/olivium.jpg',
    '11.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/11.jpg',
    '11-1.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/11.jpg',
    '295.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/295.jpg',
    'ERGEBNIS.JPG': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/ERGEBNIS.JPG'
  };

  const mediaDocs = await payload.find({
    collection: 'media',
    limit: 100
  });

  for (const doc of mediaDocs.docs) {
    if (blobUrls[doc.filename as string]) {
      console.log(`Updating ${doc.filename} to ${blobUrls[doc.filename as string]}`);
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          url: blobUrls[doc.filename as string]
        }
      });
    }
  }

  console.log("Fixed URLs in database!");
  process.exit(0);
}

run().catch(console.error);
