import sharp from 'sharp';
async function run() {
  const files = [
    './public/images/puzzle-logo.png',
    './public/images/puzzle-logo-2_.png',
    './public/images/puzzle-logo-18px.png',
    './public/images/logo-new-1.png'
  ];
  for (const file of files) {
    try {
      const metadata = await sharp(file).metadata();
      console.log(file, `${metadata.width}x${metadata.height}`);
    } catch (e) {
      console.log(file, 'failed');
    }
  }
}
run().catch(console.error);
