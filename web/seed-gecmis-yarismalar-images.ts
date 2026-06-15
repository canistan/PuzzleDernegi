import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';
import path from 'path';

async function uploadImage(payload: any, filePath: string, alt: string) {
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
  return media.id;
}

async function seed() {
  const payload = await getPayload({ config: configPromise });
  
  console.log("Uploading olivium.jpg...");
  const oliviumId = await uploadImage(payload, '../OLDPuzzle/old/images/olivium.jpg', 'Olivium Outlet Center');
  
  console.log("Uploading 11.jpg...");
  const img11Id = await uploadImage(payload, '../OLDPuzzle/old/images/11.jpg', 'Yarışma Görseli 1');
  
  console.log("Uploading 295.jpg...");
  const img295Id = await uploadImage(payload, '../OLDPuzzle/old/images/295.jpg', 'Yarışma Görseli 2');

  const ergebnisId = '6a2fac58572f786f79dade1c'; // Already uploaded
  
  console.log("Updating pastCompetitionsPage...");
  
  const pageData = await payload.findGlobal({ slug: 'pastCompetitionsPage' });
  
  // Clone competitions array
  const competitions = [...(pageData.competitions || [])];
  
  // Add gallery to the first competition
  if (competitions.length > 0 && competitions[0].type === 'details') {
    competitions[0].gallery = [
      { image: oliviumId },
      { image: img11Id },
      { image: img295Id }
    ];
  }
  
  // Add image to the 4th competition
  if (competitions.length > 3 && competitions[3].type === 'image') {
    competitions[3].singleImage = ergebnisId;
  }
  
  await payload.updateGlobal({
    slug: 'pastCompetitionsPage' as any,
    data: {
      competitions: competitions as any,
    },
  });

  console.log("Successfully added images to past competitions!");
  process.exit(0);
}

seed().catch(console.error);
