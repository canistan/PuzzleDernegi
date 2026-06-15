'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';

interface AlbumImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  albumId?: string;
}

interface AlbumData {
  id: string;
  title: string;
}

export default function AlbumClient({ images, albums = [] }: { images: AlbumImage[], albums?: AlbumData[] }) {
  const [activeAlbum, setActiveAlbum] = useState<string>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredImages = activeAlbum === 'all' 
    ? images 
    : images.filter(img => img.albumId === activeAlbum);

  return (
    <div className="w-full">
      {/* Tags Filter Bar */}
      {albums.length > 0 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => setActiveAlbum('all')}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeAlbum === 'all'
                ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white shadow-lg shadow-orange-500/30 scale-105'
                : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-[#FF6B35]'
            }`}
          >
            Tümü
          </button>
          {albums.map((album) => (
            <button
              key={album.id}
              onClick={() => setActiveAlbum(album.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeAlbum === album.id
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white shadow-lg shadow-orange-500/30 scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-orange-300 hover:text-[#FF6B35]'
              }`}
            >
              {album.title}
            </button>
          ))}
        </div>
      )}

      {/* Masonry Grid */}
      {filteredImages.length > 0 ? (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
          {filteredImages.map((img, i) => (
            <div 
              key={i} 
              className="relative overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              onClick={() => {
                setLightboxIndex(i);
                setLightboxOpen(true);
              }}
            >
              <Image 
                src={img.src} 
                alt={img.alt}
                width={img.width || 800}
                height={img.height || 600}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500 py-12">
          Bu albümde henüz görsel bulunmuyor.
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={filteredImages.map(img => ({ src: img.src, alt: img.alt }))}
      />
    </div>
  );
}
