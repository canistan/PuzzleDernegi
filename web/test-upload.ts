import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const filePath = '../OLDPuzzle/old/images/ERGEBNIS.JPG';
  const buffer = fs.readFileSync(filePath);
  const size = fs.statSync(filePath).size;
  
  const media = await payload.create({
    collection: 'media',
    data: { alt: 'Ergebnis' },
    file: {
      data: buffer,
      name: 'ERGEBNIS.JPG',
      size: size,
      mimetype: 'image/jpeg'
    }
  });
  console.log("Uploaded successfully. ID:", media.id);
  process.exit(0);
}

run().catch(console.error);
