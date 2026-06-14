import { getPayload } from 'payload';
import configPromise from '../payload.config';
import fs from 'fs';
import path from 'path';

async function restore() {
  const payload = await getPayload({ config: configPromise });

  console.log('--- Payload DB Restore Started ---');

  // 1. Restore Media
  console.log('Restoring Media...');
  const mediaJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'media.json'), 'utf-8'));
  
  for (const media of mediaJson) {
    const filePath = path.join(process.cwd(), 'media', media.filename);
    if (!fs.existsSync(filePath)) {
      console.log(`[!] File not found: ${media.filename}, skipping...`);
      continue;
    }

    try {
      const fileData = fs.readFileSync(filePath);
      await payload.create({
        collection: 'media',
        data: {
          alt: media.alt || media.filename,
        },
        file: {
          data: fileData,
          name: media.filename,
          mimetype: media.mime_type,
          size: media.filesize,
        }
      });
      console.log(`[+] Uploaded: ${media.filename}`);
    } catch (err: any) {
      console.error(`[-] Failed to upload ${media.filename}:`, err.message);
    }
  }

  // 2. Restore Albums
  console.log('\nRestoring Albums...');
  try {
    const albumsJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'albums.json'), 'utf-8'));
    const localesJson = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'albums_locales.json'), 'utf-8'));

    for (const album of albumsJson) {
      // Find title from locales
      const localeEntry = localesJson.find((l: any) => l._parent_id === album.id && l._locale === 'tr');
      const title = localeEntry ? localeEntry.title : `Album ${album.id}`;

      // We don't restore cover_image_id yet because IDs changed in MongoDB.
      // Since it's only 1 album, user can pick the cover image again in the panel.
      await payload.create({
        collection: 'albums',
        data: {
          title: title,
          date: album.date,
        }
      });
      console.log(`[+] Created album: ${title}`);
    }
  } catch(e: any) {
    console.error('Failed to restore albums:', e.message);
  }

  console.log('\n--- Restore Complete! ---');
  process.exit(0);
}

restore();
