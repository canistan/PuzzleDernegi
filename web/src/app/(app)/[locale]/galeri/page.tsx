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
        
        {albums.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#64748B', padding: '4rem 1rem' }}>
            {t('noAlbums')}
          </div>
        ) : albums.length === 1 ? (
          (() => {
            const singleAlbum = albums[0];
            const galleryPhotos = galleryPhotosGlobal?.photos?.filter((p: any) => p.album === singleAlbum.id || p.album?.id === singleAlbum.id) || [];
            
            const albumImages = (singleAlbum.images || []).map((img: any) => img as any);
            const extraImages = galleryPhotos.map((p: any) => p.image);
            const allImages = [...albumImages, ...extraImages];

            const images = allImages.map((media: any) => {
              return {
                src: media.url!,
                alt: media.alt || singleAlbum.title,
                width: media.width || 800,
                height: media.height || 600,
              };
            }).filter((img: any) => img.src);
            
            return images.length > 0 ? (
              <AlbumClient images={images} />
            ) : (
              <div style={{ textAlign: 'center', color: '#64748B', padding: '4rem 1rem' }}>
                {t('noPhotos')}
              </div>
            );
          })()
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {albums.map((album) => {
              const cover = album.coverImage as any;
              const dateObj = new Date(album.date);
              const formattedDate = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
              const galleryPhotos = galleryPhotosGlobal?.photos?.filter((p: any) => p.album === album.id || p.album?.id === album.id) || [];
              const photoCount = (Array.isArray(album.images) ? album.images.length : 0) + galleryPhotos.length;
              
              return (
                <Link 
                  href={`/galeri/${album.id}`} 
                  key={album.id}
                  style={{
                    display: 'block',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#fff',
                    border: '1px solid #E2E8F0',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ aspectRatio: '4/3', width: '100%', overflow: 'hidden', position: 'relative', background: '#F1F5F9' }}>
                    {cover?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={cover.url} 
                        alt={cover.alt || album.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CBD5E1' }}>
                        <svg style={{ width: '48px', height: '48px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }} />
                    
                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', padding: '1.25rem', color: '#fff' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#FF8E53', background: 'rgba(0,0,0,0.4)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>
                          {formattedDate}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {photoCount} {t('photos')}
                        </span>
                      </div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.3 }}>{album.title}</h3>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
