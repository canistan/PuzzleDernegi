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
  const { MongoClient, ObjectId } = await import('mongodb');
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('test');
  
  const blobUrls: Record<string, string> = {
    'olivium.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/olivium.jpg',
    '11.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/11.jpg',
    '11-1.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/11.jpg',
    '295.jpg': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/295.jpg',
    'ERGEBNIS.JPG': 'https://1sghmjvzof64yr9q.public.blob.vercel-storage.com/media/ERGEBNIS.JPG'
  };

  const idsToUpdate = [
    '6a2fb23c6d08a6d8a3fc620a',
    '6a2fb23b6d08a6d8a3fc6204',
    '6a2fb2396d08a6d8a3fc61fe',
    '6a2fb2376d08a6d8a3fc61f7'
  ];

  for (const idStr of idsToUpdate) {
    const doc = await db.collection('media').findOne({ _id: new ObjectId(idStr) });
    if (doc && blobUrls[doc.filename]) {
      console.log(`Updating ${doc.filename} to ${blobUrls[doc.filename]}`);
      await db.collection('media').updateOne(
        { _id: doc._id },
        { $set: { url: blobUrls[doc.filename] } }
      );
    }
  }

  console.log("Fixed URLs in database!");
  await client.close();
  process.exit(0);
}

run().catch(console.error);
