import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise });
    
    // Delete all albums
    const albums = await payload.find({
      collection: 'albums',
      limit: 100,
    });

    for (const album of albums.docs) {
      await payload.delete({
        collection: 'albums',
        id: album.id,
      });
    }

    return NextResponse.json({ success: true, message: `Deleted ${albums.docs.length} albums` });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
