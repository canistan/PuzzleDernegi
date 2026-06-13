const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');

async function upload() {
  const mediaDir = path.join(__dirname, 'media');
  const files = fs.readdirSync(mediaDir);
  
  for (const file of files) {
    if (file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')) {
      const filePath = path.join(mediaDir, file);
      const fileData = fs.readFileSync(filePath);
      console.log(`Uploading ${file} to Vercel Blob...`);
      try {
        const blob = await put(file, fileData, { 
          access: 'public',
          token: "vercel_blob_rw_Cj4r9hklQCETewqr_FUNP3S3JMvaQk6iWeWEa4UnxFRb7Jy",
          addRandomSuffix: false // We need exact filename to match db!
        });
        console.log(`Uploaded ${file}: ${blob.url}`);
      } catch (e) {
        console.error(`Error uploading ${file}:`, e.message);
      }
    }
  }
}
upload();
