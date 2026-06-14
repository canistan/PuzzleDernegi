import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Geçmiş Yarışmalar | Puzzle Derneği',
};

export default async function GecmisYarismalar(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const payload = await getPayload({ config: configPromise });
  let pastCompetitionsPage: any = null;
  
  try {
    pastCompetitionsPage = await payload.findGlobal({ slug: 'pastCompetitionsPage', locale: locale as any });
  } catch (error) {
    console.error('Failed to load pastCompetitionsPage', error);
  }

  const t = await getTranslations('competitions');

  const pageTitle = pastCompetitionsPage?.title || 'GEÇMİŞ PUZZLE YARIŞMALARI';
  const pageDescription = pastCompetitionsPage?.description || '';

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="section-header animate-fade-in" style={{ paddingTop: '1rem', marginBottom: pageDescription ? '2rem' : '3rem' }}>
          <div className="section-divider" />
          <h1 style={{ marginTop: '1rem', color: '#0F172A' }}>{pageTitle}</h1>
          {pageDescription && (
            <p style={{ whiteSpace: 'pre-line' }}>{pageDescription}</p>
          )}
        </div>
        
        <div className="card animate-fade-in" style={{ 
          padding: '2rem',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}>
          
          {pastCompetitionsPage?.competitions?.map((comp: any, index: number) => {
            return (
              <div key={index}>
                {comp.title && (
                  <h2 style={{ 
                    color: '#0F172A', 
                    fontSize: '1.5rem',
                    borderBottom: comp.type === 'details' ? '2px solid #F1F5F9' : 'none', 
                    paddingBottom: comp.type === 'details' ? '0.75rem' : '0', 
                    marginBottom: '1rem',
                  }}>
                    {comp.title}
                  </h2>
                )}

                {comp.type === 'details' && (
                  <>
                    {comp.paragraphs && comp.paragraphs.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', marginBottom: '1.5rem' }}>
                        {comp.paragraphs.map((p: any, pIndex: number) => (
                          <p key={pIndex} style={{ color: '#475569', lineHeight: 1.7, textAlign: 'justify', fontSize: '0.95rem' }}>
                            {p.text}
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {comp.gallery && comp.gallery.length > 0 && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: comp.gallery.length > 1 ? 'repeat(auto-fit, minmax(250px, 1fr))' : '1fr', 
                        gap: '0.875rem',
                      }}>
                        {comp.gallery.map((g: any, gIndex: number) => {
                          const imgUrl = g.image?.url;
                          if (!imgUrl) return null;
                          return (
                            <div key={gIndex} style={{ position: 'relative', aspectRatio: '16/10', borderRadius: '12px', overflow: 'hidden' }}>
                              <Image src={imgUrl} alt={comp.title || 'Galeri Görseli'} fill style={{ objectFit: 'cover' }} />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}

                {comp.type === 'winners' && (
                  <>
                    {comp.winnersList && comp.winnersList.length > 0 && (
                      <ol style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', color: '#334155' }}>
                        {comp.winnersList.map((w: any, wIndex: number) => (
                          <li key={wIndex} style={{ fontSize: '0.95rem' }}>{w.name}</li>
                        ))}
                      </ol>
                    )}
                    
                    {comp.specialAwards && comp.specialAwards.length > 0 && (
                      <div style={{ marginTop: '1.25rem' }}>
                        {comp.specialAwards.map((s: any, sIndex: number) => (
                          <div key={sIndex} style={{ marginBottom: '1rem' }}>
                            <h3 style={{ color: '#FF6B35', fontSize: '1.1rem' }}>{s.awardName}</h3>
                            <ol style={{ paddingLeft: '1.5rem', color: '#334155' }}>
                              <li>{s.winner}</li>
                            </ol>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {comp.type === 'image' && (
                  <div style={{ textAlign: 'center' }}>
                    {comp.imageDescription && (
                      <p style={{ color: '#64748B', marginBottom: '1rem', fontSize: '0.95rem' }}>{comp.imageDescription}</p>
                    )}
                    {comp.singleImage?.url && (
                      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', maxWidth: '640px', margin: '0 auto' }}>
                        <Image src={comp.singleImage.url} alt={comp.title || 'Tablo'} fill style={{ objectFit: 'contain' }} />
                      </div>
                    )}
                  </div>
                )}

                {/* Separator */}
                {index < pastCompetitionsPage.competitions.length - 1 && (
                  <hr style={{ border: 'none', borderTop: '1px solid #F1F5F9', margin: '1.5rem 0' }} />
                )}
              </div>
            );
          })}

          {(!pastCompetitionsPage?.competitions || pastCompetitionsPage.competitions.length === 0) && (
            <div style={{ textAlign: 'center', color: '#64748B', padding: '3rem 1rem' }}>
              {t('noData')}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
