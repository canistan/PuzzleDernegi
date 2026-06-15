import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // 1. Get all media files
    const media = await payload.find({
      collection: 'media',
      limit: 100, // Assuming less than 100 media files were uploaded
    });
    
    const mediaIds = media.docs.map(doc => doc.id);

    if (mediaIds.length === 0) {
      return NextResponse.json({ success: false, message: 'No media found to assign.' });
    }

    // 2. Find the album (User named it "Genel Etkinlik Albümü" in the screenshot)
    const albums = await payload.find({
      collection: 'albums',
      where: {
        title: {
          like: 'Genel Etkinlik Albümü'
        }
      }
    });

    if (albums.docs.length === 0) {
       return NextResponse.json({ success: false, message: 'Album not found.' });
    }

    const albumId = albums.docs[0].id;

    // 3. Update album with all media
    await payload.update({
      collection: 'albums',
      id: albumId,
      data: {
        images: mediaIds
      }
    });

    return NextResponse.json({ success: true, message: `Successfully assigned ${mediaIds.length} media items to the album!`, albumId, mediaIds });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
