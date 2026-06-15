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

async function check() {
  const { MongoClient } = await import('mongodb');
  const uri = process.env.MONGODB_URI as string;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db('test');
  const media = await db.collection('media').find({}).sort({ _id: -1 }).limit(10).toArray();
  console.log(JSON.stringify(media.map(d => ({ filename: d.filename, url: d.url, id: d._id })), null, 2));
  await client.close();
  process.exit(0);
}

check().catch(console.error);
