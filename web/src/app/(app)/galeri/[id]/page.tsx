import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { Media } from '../../../../../payload-types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import AlbumClient from './AlbumClient';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const payload = await getPayload({ config: configPromise });
  try {
    const album = await payload.findByID({ collection: 'albums', id: Number(params.id) });
    return { title: `${album.title} | Puzzle Derneği` };
  } catch {
    return { title: 'Albüm | Puzzle Derneği' };
  }
}

export default async function AlbumDetail({ params }: { params: { id: string } }) {
  const payload = await getPayload({ config: configPromise });
  let album;
  
  try {
    album = await payload.findByID({
      collection: 'albums',
      id: Number(params.id),
    });
  } catch {
    notFound();
  }

  const dateObj = new Date(album.date);
  const formattedDate = dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  
  const images = (album.images || []).map((img: any) => {
    const media = img as Media;
    return {
      src: media.url!,
      alt: media.alt || album.title,
      width: media.width || 800,
      height: media.height || 600,
    };
  }).filter(img => img.src);

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-8">
          <Link href="/galeri" className="inline-flex items-center text-slate-500 hover:text-orange-500 transition-colors font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Albümlere Dön
          </Link>
        </div>

        <div className="text-center mb-12 animate-fade-in">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm tracking-wide uppercase mb-4">
            {formattedDate}
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {album.title}
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Toplam {images.length} fotoğraf
          </p>
        </div>
        
        {images.length > 0 ? (
          <AlbumClient images={images} />
        ) : (
          <div className="text-center py-20 text-slate-400">
            Bu albümde henüz fotoğraf bulunmuyor.
          </div>
        )}

      </div>
    </div>
  );
}
