import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Link from 'next/link';
import AlbumClient from './[id]/AlbumClient';

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
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title.includes(' ') ? (
              <>
                {title.split(' ')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">{title.split(' ').slice(1).join(' ')}</span>
              </>
            ) : (
              title
            )}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        {albums.length === 0 ? (
          <div className="text-center text-slate-500 py-12">
            Henüz albüm bulunmamaktadır.
          </div>
        ) : albums.length === 1 ? (
          (() => {
            const singleAlbum = albums[0];
            const images = (singleAlbum.images || []).map((img: any) => {
              const media = img as any;
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
              <div className="text-center text-slate-500 py-12">
                Bu albümde henüz fotoğraf bulunmuyor.
              </div>
            );
          })()
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {albums.map((album) => {
              const cover = album.coverImage as any;
              const dateObj = new Date(album.date);
              const formattedDate = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
              const photoCount = Array.isArray(album.images) ? album.images.length : 0;
              
              return (
                <Link 
                  href={`/galeri/${album.id}`} 
                  key={album.id}
                  className="group block relative rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden relative bg-slate-100">
                    {cover?.url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={cover.url} 
                        alt={cover.alt || album.title}
                        className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                    
                    <div className="absolute bottom-0 left-0 w-full p-6 text-white transform transition-transform translate-y-2 group-hover:translate-y-0">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider text-orange-400 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                          {formattedDate}
                        </span>
                        <span className="text-sm font-medium flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {photoCount} Fotoğraf
                        </span>
                      </div>
                      <h3 className="text-xl font-bold leading-tight line-clamp-2">{album.title}</h3>
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
