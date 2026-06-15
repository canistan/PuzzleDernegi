import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    const publicImagesDir = path.join(process.cwd(), 'public', 'images');
    
    // Choose some images that look like gallery images
    const imagesToUpload = [
      '11.jpg',
      '295.jpg',
      'ERGEBNIS.JPG',
      'GOPR0295.jpg',
      'barcelo.jpg',
      'katsahne.jpg',
      'katssahne.jpg',
      'olivium.jpg',
      'puzzle-play.jpg',
      'torium.jpg'
    ];

    const uploadedMediaIds: any[] = [];

    for (const imgName of imagesToUpload) {
      try {
        const filePath = path.join(publicImagesDir, imgName);
        const fileData = await fs.readFile(filePath);
        
        // Find if already exists
        const existing = await payload.find({
          collection: 'media',
          where: {
            filename: {
              equals: imgName
            }
          }
        });

        if (existing.docs.length > 0) {
          uploadedMediaIds.push(existing.docs[0].id);
          continue;
        }

        const size = (await fs.stat(filePath)).size;
        
        const media = await payload.create({
          collection: 'media',
          data: {
            alt: `Gallery image ${imgName}`,
          },
          file: {
            data: fileData,
            mimetype: 'image/jpeg',
            name: imgName,
            size: size
          }
        });
        
        uploadedMediaIds.push(media.id);
        console.log(`Uploaded ${imgName}`);
      } catch (err: any) {
        console.error(`Failed to upload ${imgName}:`, err.message);
      }
    }

    if (uploadedMediaIds.length > 0) {
      // Create a gallery album
      const album = await payload.create({
        collection: 'albums',
        data: {
          title: 'Genel Etkinlikler Albümü',
          date: new Date().toISOString(),
          coverImage: uploadedMediaIds[0],
          images: uploadedMediaIds
        }
      });
      
      return NextResponse.json({ success: true, albumId: album.id, message: 'Gallery seeded successfully!' });
    }

    return NextResponse.json({ success: false, message: 'No images uploaded' }, { status: 400 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
