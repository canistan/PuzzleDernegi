import sharp from 'sharp';
async function run() {
  const image = sharp('./public/images/logo.png');
  // Crop a 202x202 region from the left (width=202, height=202, left=0, top=0)
  await image
    .extract({ left: 0, top: 0, width: 202, height: 202 })
    .toFile('./public/images/logo-icon.png');
    
  // Create favicon/icon for Next.js
  await sharp('./public/images/logo-icon.png')
    .resize(32, 32)
    .toFile('./src/app/icon.png');
    
  console.log('Successfully created logo-icon.png and icon.png');
}
run().catch(console.error);
