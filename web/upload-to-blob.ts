import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';
import path from 'path';

async function migrate() {
  const payload = await getPayload({ config: configPromise });
  const mediaDir = path.join(__dirname, 'media');
  
  const files = fs.readdirSync(mediaDir);
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
      const filePath = path.join(mediaDir, file);
      const fileData = fs.readFileSync(filePath);
      const size = fs.statSync(filePath).size;

      console.log(`Uploading ${file}...`);
      try {
        // We can just use the payload update API but wait! 
        // Vercel Blob plugin will automatically upload the file if we provide the file data in a create or update.
        // Let's find the media item in the db:
        const mediaDocs = await payload.find({
          collection: 'media',
          where: {
            filename: {
              equals: file,
            }
          }
        });

        if (mediaDocs.docs.length > 0) {
          const doc = mediaDocs.docs[0];
          // Update the document with the file to trigger the Vercel Blob plugin
          await payload.update({
            collection: 'media',
            id: doc.id,
            data: {
              ...doc
            },
            file: {
              data: fileData,
              mimetype: file.endsWith('.png') ? 'image/png' : 'image/jpeg',
              name: file,
              size: size,
            }
          });
          console.log(`Updated ${file} in DB and uploaded to Vercel Blob`);
        } else {
          console.log(`Media document for ${file} not found in DB`);
        }
      } catch (e) {
        console.error(`Error processing ${file}`, e);
      }
    }
  }
  
  console.log('Done!');
  process.exit(0);
}

migrate();
