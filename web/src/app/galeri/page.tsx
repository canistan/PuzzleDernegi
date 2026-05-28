import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Galeri | Puzzle Derneği',
};

export default function Galeri() {
  // Generate an array from 1 to 25 for the gallery images based on the old site's structure
  const images = Array.from({ length: 25 }, (_, i) => i + 1);

  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>GALERİ</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
        }}>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {images.map((id) => (
              <div 
                key={id} 
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingBottom: '75%', // 4:3 Aspect Ratio
                  overflow: 'hidden',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
                className="hover-zoom"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={`/images/gallery/${id}.jpg`} 
                  alt={`Galeri Görsel ${id}`}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
