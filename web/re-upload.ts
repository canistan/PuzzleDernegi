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
  
  async function uploadImage(filePath: string, alt: string) {
    const buffer = fs.readFileSync(filePath);
    const size = fs.statSync(filePath).size;
    const name = path.basename(filePath);
    
    const media = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data: buffer,
        name: name,
        size: size,
        mimetype: 'image/jpeg'
      }
    });
    console.log(`Uploaded ${name}: ${media.id} -> ${media.url}`);
    return media.id;
  }
  
  // 1. Delete the bad media records
  await payload.delete({ collection: 'media', id: '6a2fac6fe579d4b2edaf3849' }).catch(() => {}); // 295
  await payload.delete({ collection: 'media', id: '6a2fac6fe579d4b2edaf3842' }).catch(() => {}); // 11
  await payload.delete({ collection: 'media', id: '6a2fac6ee579d4b2edaf3830' }).catch(() => {}); // olivium
  await payload.delete({ collection: 'media', id: '6a2fac58572f786f79dade1c' }).catch(() => {}); // ergebnis
  
  // 2. Upload them again
  console.log("Uploading olivium.jpg...");
  const oliviumId = await uploadImage('../OLDPuzzle/old/images/olivium.jpg', 'Olivium Outlet Center');
  
  console.log("Uploading 11.jpg...");
  const img11Id = await uploadImage('../OLDPuzzle/old/images/11.jpg', 'Yarışma Görseli 1');
  
  console.log("Uploading 295.jpg...");
  const img295Id = await uploadImage('../OLDPuzzle/old/images/295.jpg', 'Yarışma Görseli 2');

  console.log("Uploading ERGEBNIS.JPG...");
  const ergebnisId = await uploadImage('../OLDPuzzle/old/images/ERGEBNIS.JPG', 'Dünya Puzzle Şampiyonası');

  console.log("Updating pastCompetitionsPage...");
  
  const pageData = await payload.findGlobal({ slug: 'pastCompetitionsPage' });
  const competitions = [...(pageData.competitions || [])];
  
  if (competitions.length > 0 && competitions[0].type === 'details') {
    competitions[0].gallery = [
      { image: oliviumId },
      { image: img11Id },
      { image: img295Id }
    ];
  }
  
  if (competitions.length > 3 && competitions[3].type === 'image') {
    competitions[3].singleImage = ergebnisId;
  }
  
  await payload.updateGlobal({
    slug: 'pastCompetitionsPage' as any,
    data: {
      competitions: competitions as any,
    },
  });

  console.log("Fixed successfully!");
  process.exit(0);
}

run().catch(console.error);
