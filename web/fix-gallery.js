const { getPayload } = require('payload');
const configPromise = require('./payload.config.ts').default;

async function fix() {
  const payload = await getPayload({ config: configPromise });
  
  const media = await payload.find({
    collection: 'media',
    where: {
      alt: {
        like: 'Galeri Fotoğrafı',
      }
    },
    limit: 100
  });

  const ids = media.docs.map(d => d.id);
  
  await payload.updateGlobal({
    slug: 'galleryPage',
    data: {
      images: ids
    }
  });
  
  console.log('Fixed gallery with ' + ids.length + ' images');
}
fix().catch(console.error);
