import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Link from 'next/link';
import AlbumClient from './[id]/AlbumClient';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Galeri Albümleri | Puzzle Derneği',
};

export const dynamic = 'force-dynamic';

export default async function Galeri(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const payload = await getPayload({ config: configPromise });
  const galleryPage = await payload.findGlobal({
    slug: 'gallerySettings',
    locale: locale as any,
  });

  const galleryPhotosGlobal = await payload.findGlobal({
    slug: 'galleryPage',
    locale: locale as any,
  }).catch(() => null) as any;

  const t = await getTranslations('gallery');

  const albumsRes = await payload.find({
    collection: 'albums',
    sort: '-date',
    limit: 50,
    locale: locale as any,
  });
  
  const albums = albumsRes.docs;

  const title = galleryPage?.title || 'DERNEK GALERİSİ';
  const subtitle = galleryPage?.subtitle || 'Geçmiş yarışmalardan ve etkinliklerimizden unutulmaz anlar.';

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="section-header animate-fade-in" style={{ paddingTop: '1rem' }}>
          <div className="section-divider" />
          <h1 style={{ marginTop: '1rem' }}>
            {title.includes(' ') ? (
              <>
                {title.split(' ')[0]}{' '}
                <span className="text-gradient-primary">{title.split(' ').slice(1).join(' ')}</span>
              </>
            ) : title}
          </h1>
          <p>{subtitle}</p>
        </div>
        
        {/* DEBUG OUTPUT */}
        <pre style={{ display: 'none' }} id="debug-info">
          {JSON.stringify({
            locale,
            galleryPhotosGlobalLength: galleryPhotosGlobal?.photos?.length,
            singleAlbumId: albums[0]?.id,
            filteredPhotos: galleryPhotosGlobal?.photos?.filter((p: any) => p.album === albums[0]?.id || p.album?.id === albums[0]?.id)?.length,
            firstPhotoUrl: galleryPhotosGlobal?.photos?.[0]?.image?.url,
          }, null, 2)}
        </pre>

        {/* Unified Gallery */}
        {(() => {
          const allImages: any[] = [];
          
          albums.forEach((album: any) => {
            const albumImages = album.images || [];
            albumImages.forEach((media: any) => {
              if (media && media.url) {
                allImages.push({
                  src: media.url,
                  alt: media.alt || album.title,
                  width: media.width || 800,
                  height: media.height || 600,
                  albumId: album.id,
                });
              }
            });
          });

          const globalPhotos = galleryPhotosGlobal?.photos || [];
          globalPhotos.forEach((p: any) => {
            const media = p.image;
            const albumId = p.album?.id || p.album;
            if (media && media.url) {
              allImages.push({
                src: media.url,
                alt: media.alt || 'Galeri Görseli',
                width: media.width || 800,
                height: media.height || 600,
                albumId: typeof albumId === 'string' ? albumId : (albumId ? String(albumId) : undefined),
              });
            }
          });

          const albumData = albums.map(a => ({ id: String(a.id), title: a.title }));

          return (
            <div className="mt-8">
              <AlbumClient images={allImages} albums={albumData} />
            </div>
          );
        })()}
      </div>
    </div>
  );
}
