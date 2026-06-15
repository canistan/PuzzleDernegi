import { Metadata } from 'next';
import { tuzukData } from './tuzukData';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import { Fragment } from 'react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Dernek Tüzüğü | Puzzle Derneği',
};

export default async function Tuzuk(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const payload = await getPayload({ config: configPromise });
  const bylawsPage = await payload.findGlobal({
    slug: 'bylawsPage',
    locale: locale as any,
  });

  const t = await getTranslations('bylawsPage');

  const title = bylawsPage.title || 'Dernek Tüzüğü';
  
  // Use payload blocks if they exist, otherwise fallback to tuzukData
  const hasPayloadBlocks = bylawsPage.blocks && bylawsPage.blocks.length > 0;
  
  // Normalize payload blocks to match the old structure for rendering
  const displayBlocks = hasPayloadBlocks
    ? bylawsPage.blocks!.map((block: any) => ({
        type: block.blockType,
        content: block.content,
        maddeNo: block.maddeNo,
        listMarker: block.listMarker
      }))
    : tuzukData;

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header animate-fade-in">
          <div className="section-divider" />
          <h1 style={{ marginTop: '1rem' }}>{t('associationName')}</h1>
          <p>{title}</p>
        </div>
        
        <div className="card animate-fade-in" style={{ padding: '2rem', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {displayBlocks.map((item: any, index: number) => {
              if (item.type === 'main_title') return null; // Handled in hero
              
              if (item.type === 'section_title') {
                const cleanTitle = item.content.replace(/<\/?b>|<\/?h3>/gi, '').trim();
                return (
                  <div key={index} style={{ paddingTop: '2rem', borderBottom: '2px solid var(--border-light)', paddingBottom: '0.5rem', marginTop: '1rem' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--secondary)' }}>
                      {cleanTitle}
                    </h3>
                  </div>
                );
              }
              
              if (item.type === 'madde') {
                let c = item.content;
                if(c.startsWith('</b>')) c = c.substring(4).trim();
                
                return (
                  <div key={index} style={{ 
                    backgroundColor: 'var(--bg-color)', 
                    borderRadius: '12px', 
                    padding: '1.5rem', 
                    borderLeft: '4px solid var(--primary)', 
                    marginTop: '1rem',
                    transition: 'transform 0.3s',
                  }}>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
                      <span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '6px', fontSize: '0.875rem', marginRight: '0.75rem' }}>
                        {t('article')} {item.maddeNo}
                      </span>
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, textAlign: 'justify', whiteSpace: 'pre-line' }}>
                      {c}
                    </p>
                  </div>
                );
              }
              
              if (item.type === 'list_item') {
                return (
                  <div key={index} style={{ display: 'flex', alignItems: 'flex-start', marginTop: '1rem', marginLeft: '1rem' }}>
                    <div style={{ flexShrink: 0, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--border-light)', color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '1rem' }}>
                      {item.listMarker?.replace('.', '') || ''}
                    </div>
                    <div style={{ flex: 1, color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, paddingTop: '4px', whiteSpace: 'pre-line' }}>
                      {item.content}
                    </div>
                  </div>
                );
              }
              
              if (item.type === 'paragraph') {
                return (
                  <p key={index} style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, textAlign: 'justify', marginTop: '1rem', whiteSpace: 'pre-line' }}>
                    {item.content}
                  </p>
                );
              }
              
              return null;
            })}
          </div>
        </div>
        
        {/* Footer info for document */}
        <div style={{ marginTop: '3rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem', animationDelay: '0.2s' }} className="animate-fade-in">
          <p>{t('lastUpdate')}: {new Date().getFullYear()}</p>
          <p>{t('officialBylaws')}</p>
        </div>
      </div>
    </div>
  );
}
