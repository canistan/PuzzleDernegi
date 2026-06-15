import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import { NextResponse } from 'next/server';

export async function GET() {
  const payload = await getPayload({ config: configPromise });

  try {
    const galleryPage = await payload.findGlobal({
      slug: 'galleryPage',
      depth: 2,
    });

    return NextResponse.json({ success: true, galleryPage });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
