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
}

export default function AlbumClient({ images }: { images: AlbumImage[] }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
      {images.map((img, i) => (
        <div 
          key={i} 
          className="relative overflow-hidden rounded-2xl break-inside-avoid shadow-sm hover:shadow-2xl transition-all duration-300 group"
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
        </div>
      ))}
    </div>
  );
}
