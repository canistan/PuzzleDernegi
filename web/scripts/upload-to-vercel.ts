import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { put } from '@vercel/blob';

const uri = "mongodb+srv://semsicanalbayrak_db_user:iWQEkUlkAorX6Jlk@cluster0.wnyldml.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0";

// Make sure the token is available
if (!process.env.BLOB_READ_WRITE_TOKEN) {
  throw new Error("BLOB_READ_WRITE_TOKEN is missing in environment variables.");
}

async function run() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('test');
    
    const mediaRows = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'media.json'), 'utf-8'));
    
    console.log(`Starting local direct upload for ${mediaRows.length} images...`);

    for (const row of mediaRows) {
      const filePath = path.join(process.cwd(), 'media', row.filename);
      if (!fs.existsSync(filePath)) {
        console.log(`[!] File not found locally: ${row.filename}`);
        continue;
      }

      const fileBuffer = fs.readFileSync(filePath);

      try {
        console.log(`Uploading ${row.filename} to Vercel Blob...`);
        const blob = await put(row.filename, fileBuffer, {
          access: 'public',
          token: process.env.BLOB_READ_WRITE_TOKEN,
        });
        
        const blobUrl = blob.url;

        // Insert to MongoDB
        await db.collection('media').updateOne(
          { filename: row.filename },
          {
            $set: {
              alt: row.alt || row.filename,
              url: blobUrl,
              filename: row.filename,
              mimeType: row.mime_type,
              filesize: row.filesize,
              width: row.width,
              height: row.height,
              focalX: row.focal_x,
              focalY: row.focal_y,
              createdAt: new Date(row.created_at),
              updatedAt: new Date(row.updated_at),
              _id: row.id,
            }
          },
          { upsert: true }
        );

        console.log(`[+] Uploaded & Saved: ${row.filename} -> ${blobUrl}`);
      } catch(err: any) {
        console.error(`[-] Failed ${row.filename}:`, err.message);
      }
    }

    console.log('\n--- Upload Complete! ---');

  } finally {
    await client.close();
  }
}
run().catch(console.error);
