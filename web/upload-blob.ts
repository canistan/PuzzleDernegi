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
  const { put } = await import('@vercel/blob');
  
  async function uploadDirect(filePath: string) {
    const buffer = fs.readFileSync(filePath);
    const name = path.basename(filePath);
    
    console.log(`Uploading ${name} directly to Vercel Blob...`);
    const blob = await put(`media/${name}`, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    });
    console.log(`Blob URL: ${blob.url}`);
    return blob.url;
  }
  
  const oliviumUrl = await uploadDirect('../OLDPuzzle/old/images/olivium.jpg');
  const img11Url = await uploadDirect('../OLDPuzzle/old/images/11.jpg');
  const img295Url = await uploadDirect('../OLDPuzzle/old/images/295.jpg');
  const ergebnisUrl = await uploadDirect('../OLDPuzzle/old/images/ERGEBNIS.JPG');

  console.log("Now linking these URLs in the DB...");
  
  const { getPayload } = await import('payload');
  const configPromise = (await import('./payload.config')).default;
  const payload = await getPayload({ config: configPromise });
  
  // Create records with the explicit URL
  const oliviumMedia = await payload.create({ collection: 'media', data: { alt: 'Olivium', url: oliviumUrl, filename: 'olivium.jpg' } as any });
  const img11Media = await payload.create({ collection: 'media', data: { alt: '11', url: img11Url, filename: '11.jpg' } as any });
  const img295Media = await payload.create({ collection: 'media', data: { alt: '295', url: img295Url, filename: '295.jpg' } as any });
  const ergebnisMedia = await payload.create({ collection: 'media', data: { alt: 'Ergebnis', url: ergebnisUrl, filename: 'ERGEBNIS.JPG' } as any });
  
  // Update pastCompetitionsPage
  const pageData = await payload.findGlobal({ slug: 'pastCompetitionsPage' });
  const competitions = [...(pageData.competitions || [])];
  
  if (competitions.length > 0 && competitions[0].type === 'details') {
    competitions[0].gallery = [
      { image: oliviumMedia.id },
      { image: img11Media.id },
      { image: img295Media.id }
    ];
  }
  
  if (competitions.length > 3 && competitions[3].type === 'image') {
    competitions[3].singleImage = ergebnisMedia.id;
  }
  
  await payload.updateGlobal({
    slug: 'pastCompetitionsPage' as any,
    data: {
      competitions: competitions as any,
    },
  });

  console.log("Fixed everything!");
  process.exit(0);
}

run().catch(console.error);
