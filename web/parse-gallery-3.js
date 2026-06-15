const fs = require('fs');
const path = require('path');
const https = require('https');

const content = fs.readFileSync('/Users/canalbayrak/.gemini/antigravity-ide/brain/a9db596e-14a8-41d0-883d-c33142340639/.system_generated/steps/3605/content.md', 'utf8');

const match = content.match(/data-page="([^"]+)"/);
if (match && match[1]) {
  const rawStr = match[1].replace(/&quot;/g, '"').replace(/&#039;/g, "'");
  const dataPage = JSON.parse(rawStr);
  const albums = dataPage.props.albumsWithPhotos || [];
  
  console.log(`Found ${albums.length} albums`);
  
  const outputDir = path.join(process.cwd(), 'public', 'yarisbul-images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const downloadFile = (url, dest) => {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(dest);
      https.get(url, response => {
        response.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      }).on('error', err => {
        fs.unlink(dest, () => reject(err));
      });
    });
  };

  const processAlbums = async () => {
    for (const album of albums) {
      const albumName = album.title_tr || album.title || 'Untitled';
      console.log(`Processing Album: ${albumName}`);
      
      const safeAlbumName = albumName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
      const albumDir = path.join(outputDir, safeAlbumName);
      if (!fs.existsSync(albumDir)) {
        fs.mkdirSync(albumDir, { recursive: true });
      }
      
      const photos = album.photos || [];
      console.log(`  Found ${photos.length} photos`);
      
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        if (photo.image_url) {
          const ext = path.extname(photo.image_url.split('?')[0]) || '.jpg';
          const filename = `photo_${i+1}${ext}`;
          const dest = path.join(albumDir, filename);
          console.log(`    Downloading ${photo.image_url} -> ${filename}`);
          try {
            await downloadFile(photo.image_url, dest);
            console.log(`      Success`);
          } catch (e) {
            console.log(`      Failed: ${e.message}`);
          }
        }
      }
    }
  };
  
  processAlbums().then(() => {
    console.log('All downloads completed');
  }).catch(console.error);
}
