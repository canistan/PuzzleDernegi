import { NextResponse } from 'next/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const dynamic = 'force-dynamic';

export async function GET() {
  const payload = await getPayload({ config: configPromise });
  const galleryPhotosGlobal = await payload.findGlobal({
    slug: 'galleryPage',
    locale: 'tr' as any,
  }).catch(() => null) as any;

  const albumsRes = await payload.find({
    collection: 'albums',
    limit: 10,
    locale: 'tr' as any,
  });

  const singleAlbum = albumsRes.docs[0];

  const filtered = galleryPhotosGlobal?.photos?.filter((p: any) => p.album === singleAlbum.id || p.album?.id === singleAlbum.id) || [];

  return NextResponse.json({
    singleAlbumId: singleAlbum?.id,
    singleAlbumIdType: typeof singleAlbum?.id,
    photosCount: galleryPhotosGlobal?.photos?.length,
    firstPhotoAlbumId: galleryPhotosGlobal?.photos?.[0]?.album?.id,
    firstPhotoAlbumIdType: typeof galleryPhotosGlobal?.photos?.[0]?.album?.id,
    filteredCount: filtered.length,
    firstPhotoImageHasUrl: !!filtered[0]?.image?.url,
    firstPhotoImageType: typeof filtered[0]?.image,
  });
}
