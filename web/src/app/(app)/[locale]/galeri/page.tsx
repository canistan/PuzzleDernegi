import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Link from 'next/link';
import AlbumClient from './[id]/AlbumClient';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Galeri Albümleri | Puzzle Derneği',
};


export default async function Galeri(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const payload = await getPayload({ config: configPromise });
  const galleryPage = await payload.findGlobal({
    slug: 'gallerySettings',
    locale: locale as any,
  });


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
            singleAlbumId: albums[0]?.id,
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
