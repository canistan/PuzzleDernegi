import sharp from 'sharp';
async function run() {
  const metadata = await sharp('./public/images/logo.png').metadata();
  console.log(metadata);
}
run().catch(console.error);
