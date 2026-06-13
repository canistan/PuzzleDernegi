import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';

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

  const pageTitle = pastCompetitionsPage?.title || 'GEÇMİŞ PUZZLE YARIŞMALARI';
  const pageDescription = pastCompetitionsPage?.description || '';

  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: pageDescription ? '1rem' : '2rem', color: 'var(--primary)' }}>{pageTitle}</h1>
        {pageDescription && (
          <p className="text-center text-slate-600 mb-8 whitespace-pre-line" style={{ fontSize: '1.1rem' }}>
            {pageDescription}
          </p>
        )}
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          
          {pastCompetitionsPage?.competitions?.map((comp: any, index: number) => {
            return (
              <div key={index}>
                {comp.title && (
                  <h2 style={{ 
                    color: 'var(--text-main)', 
                    borderBottom: comp.type === 'details' ? '1px solid var(--border-color)' : 'none', 
                    paddingBottom: comp.type === 'details' ? '0.5rem' : '0', 
                    marginBottom: '1rem' 
                  }}>
                    {comp.title}
                  </h2>
                )}

                {comp.type === 'details' && (
                  <>
                    {comp.paragraphs && comp.paragraphs.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                        {comp.paragraphs.map((p: any, pIndex: number) => (
                          <p key={pIndex} className="text-slate-600 leading-relaxed text-justify">
                            {p.text}
                          </p>
                        ))}
                      </div>
                    )}
                    
                    {comp.gallery && comp.gallery.length > 0 && (
                      <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: comp.gallery.length > 1 ? '1fr 1fr' : '1fr', 
                        gap: '1rem' 
                      }}>
                        {comp.gallery.map((g: any, gIndex: number) => {
                          const imgUrl = g.image?.url;
                          if (!imgUrl) return null;
                          return (
                            <div key={gIndex} className="relative aspect-video rounded-lg overflow-hidden">
                              <Image src={imgUrl} alt={comp.title || 'Galeri Görseli'} fill className="object-cover" />
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
                      <ol style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {comp.winnersList.map((w: any, wIndex: number) => (
                          <li key={wIndex}>{w.name}</li>
                        ))}
                      </ol>
                    )}
                    
                    {comp.specialAwards && comp.specialAwards.length > 0 && (
                      <div style={{ marginTop: '1rem' }}>
                        {comp.specialAwards.map((s: any, sIndex: number) => (
                          <div key={sIndex} style={{ marginBottom: '1rem' }}>
                            <h3 style={{ color: 'var(--primary)' }}>{s.awardName}</h3>
                            <ol style={{ paddingLeft: '2rem' }}>
                              <li>{s.winner}</li>
                            </ol>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {comp.type === 'image' && (
                  <div className="text-center">
                    {comp.imageDescription && (
                      <p className="text-muted" style={{ marginBottom: '1rem' }}>{comp.imageDescription}</p>
                    )}
                    {comp.singleImage?.url && (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden my-4 mx-auto max-w-2xl">
                        <Image src={comp.singleImage.url} alt={comp.title || 'Tablo'} fill className="object-contain" />
                      </div>
                    )}
                  </div>
                )}

                {/* Add separator if it's not the last item */}
                {index < pastCompetitionsPage.competitions.length - 1 && (
                  <hr style={{ borderColor: 'var(--border-color)', margin: '2rem 0' }} />
                )}
              </div>
            );
          })}

          {(!pastCompetitionsPage?.competitions || pastCompetitionsPage.competitions.length === 0) && (
            <div className="text-center text-slate-500 py-8">
              Geçmiş yarışma verileri henüz panele eklenmemiş.
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
