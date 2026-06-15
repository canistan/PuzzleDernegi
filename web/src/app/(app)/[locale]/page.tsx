import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const payload = await getPayload({ config: configPromise });
  const t = await getTranslations('home');
  let homePage: any = null;
  
  try {
    homePage = await payload.findGlobal({ slug: 'homePage' as any, locale: locale as any });
  } catch (error) {
    console.error('Failed to load homePage', error);
  }

  // Fallbacks if not set in panel
  const heroTitle = homePage?.heroTitle || t('heroTitle');
  const heroSubtitle = homePage?.heroSubtitle || t('heroSubtitle');
  const heroDescription = homePage?.heroDescription || t('heroDescription');
  const primaryBtnText = homePage?.primaryButtonText || t('primaryBtn');
  const primaryBtnLink = homePage?.primaryButtonLink || 'https://yarisbul.com/event-details/yesilay-avrupa-puzzle-sampiyonasi';
  const secondaryBtnText = homePage?.secondaryButtonText || t('secondaryBtn');
  const secondaryBtnLink = homePage?.secondaryButtonLink || '/uyelik';
  const heroImageUrl = homePage?.heroImage?.url || '/images/puzzle_hero_bg.png';
  const heroBadgeText = homePage?.heroBadgeText || t('badgeText');
  const floatingBadgeIcon = homePage?.floatingBadgeIcon || '🏆';
  const floatingBadgeTitle = homePage?.floatingBadgeTitle || t('floatingTitle');
  const floatingBadgeSubtitle = homePage?.floatingBadgeSubtitle || t('floatingSub');

  const aboutTitle = homePage?.aboutTitle || t('aboutTitle');
  const aboutText1 = homePage?.aboutText1 || t('about1');
  const aboutText2 = homePage?.aboutText2 || t('about2');
  const aboutBgImage = homePage?.aboutBgImage?.url || null;
  const showSponsors = homePage?.showSponsors !== false;
  const sponsorsTitle = homePage?.sponsorsTitle || t('sponsorsTitle');
  const customSponsors = homePage?.sponsors || [];

  const renderPresetSponsor = (presetType: string, key: any) => {
    switch (presetType) {
      case 'dernek':
        return (
          <div key={key} className="sponsor-card">
            <Image src="/images/logo.png" alt="Puzzle Derneği" width={200} height={60} style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain' }} />
          </div>
        );
      case 'yesilay_text':
        return (
          <div key={key} className="sponsor-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#059669', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '5px solid #059669', borderRightColor: 'transparent', transform: 'rotate(45deg)' }}></div>
              YEŞİLAY
            </div>
          </div>
        );
      case 'yesilay_spor':
        return (
          <div key={key} className="sponsor-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#059669', border: '3px solid #059669', borderRadius: '8px', padding: '10px 25px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>YEŞİLAY</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>SPOR KULÜBÜ</span>
            </div>
          </div>
        );
      case 'anatolian':
        return (
          <div key={key} className="sponsor-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#111', color: 'white', padding: '5px 15px', fontWeight: 400, fontSize: '1.8rem', letterSpacing: '-1px' }}>
                anat<span style={{color: '#EA580C'}}>o</span>lian
              </div>
              <div style={{ fontSize: '0.6rem', marginTop: '5px', letterSpacing: '2px', fontWeight: 600, color: '#333' }}>THE PUZZLE OF THE WORLD</div>
            </div>
          </div>
        );
      case 'ecjp':
        return (
          <div key={key} className="sponsor-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#0369A1' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', border: '4px solid #0369A1', position: 'relative', marginBottom: '5px' }}>
                <div style={{ position: 'absolute', top: '15%', left: '15%', right: '15%', bottom: '15%', display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  <div style={{ flex: '1 1 40%', backgroundColor: '#0369A1', borderRadius: '2px' }}></div>
                  <div style={{ flex: '1 1 40%', backgroundColor: '#0EA5E9', borderRadius: '2px' }}></div>
                  <div style={{ flex: '1 1 40%', backgroundColor: '#0EA5E9', borderRadius: '2px' }}></div>
                  <div style={{ flex: '1 1 40%', backgroundColor: '#0369A1', borderRadius: '2px' }}></div>
                </div>
              </div>
              <span style={{ fontSize: '1.6rem', fontWeight: 900 }}>ECJP</span>
            </div>
          </div>
        );
      case 'ideafactory':
        return (
          <div key={key} className="sponsor-card">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '5px' }}>
                <span style={{ fontSize: '1rem', fontWeight: 600, color: '#333' }}>The</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 300, color: '#333' }}>Idea</span>
                <span style={{ fontSize: '1.8rem', fontWeight: 600, color: '#EA580C' }}>Factory</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#666', letterSpacing: '1px' }}>EVENT MANAGEMENT</span>
            </div>
          </div>
        );
      case 'ozensan':
        return (
          <div key={key} className="sponsor-card">
            <Image src="/images/ozensan.png" alt="Özensan A.Ş." width={200} height={60} style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain' }} />
          </div>
        );
      default:
        return null;
    }
  };

  const renderSponsors = () => {
    if (customSponsors && customSponsors.length > 0) {
      const visibleSponsors = customSponsors.filter((sponsor: any) => !sponsor.isHidden);
      
      if (visibleSponsors.length === 0) return null;

      return (
        <div style={{ display: 'flex', gap: '1.5rem', paddingRight: '1.5rem', alignItems: 'center' }}>
          {visibleSponsors.map((sponsor: any, idx: number) => {
            if (sponsor.type === 'preset' && sponsor.presetType) {
              return renderPresetSponsor(sponsor.presetType, idx);
            }
            if (sponsor.type === 'image' && sponsor.logo?.url) {
              return (
                <div key={idx} className="sponsor-card">
                  <Image src={sponsor.logo.url} alt={sponsor.logo.alt || 'Sponsor'} width={200} height={60} style={{ maxHeight: '60px', width: 'auto', objectFit: 'contain' }} />
                </div>
              );
            }
            return null;
          })}
        </div>
      );
    }
    return (
      <div style={{ display: 'flex', gap: '1.5rem', paddingRight: '1.5rem', alignItems: 'center' }}>
        {renderPresetSponsor('dernek', 'def1')}
        {renderPresetSponsor('yesilay_text', 'def2')}
        {renderPresetSponsor('yesilay_spor', 'def3')}
        {renderPresetSponsor('anatolian', 'def4')}
        {renderPresetSponsor('ecjp', 'def5')}
        {renderPresetSponsor('ideafactory', 'def6')}
        {renderPresetSponsor('ozensan', 'def7')}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: '3rem',
        paddingBottom: '4rem',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #F8FAFC 0%, #FFF7ED 50%, #F1F5F9 100%)',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-15%', right: '-5%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-15%', left: '-5%', width: '40%', height: '40%', borderRadius: '50%', background: 'radial-gradient(circle, rgba(43,58,103,0.06) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', alignItems: 'center' }}>
            
            {/* Text Content */}
            <div style={{ textAlign: 'center' }}>
              {heroBadgeText && (
                <div style={{
                  display: 'inline-block',
                  padding: '0.5rem 1.25rem',
                  marginBottom: '1.5rem',
                  borderRadius: '9999px',
                  background: 'rgba(255,107,53,0.1)',
                  color: '#EA580C',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.02em',
                  border: '1px solid rgba(255,107,53,0.15)',
                }}>
                  {heroBadgeText}
                </div>
              )}
              
              <h1 style={{
                fontSize: 'clamp(2.25rem, 6vw, 4rem)',
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: '1.5rem',
                color: '#0F172A',
                letterSpacing: '-0.03em',
              }}>
                {heroTitle}{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #FF6B35, #FF8E53)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  {heroSubtitle}
                </span>
              </h1>
              
              <p style={{
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                color: '#475569',
                marginBottom: '2rem',
                maxWidth: '640px',
                margin: '0 auto 2rem',
                lineHeight: 1.7,
                fontWeight: 400,
                whiteSpace: 'pre-line',
              }}>
                {heroDescription}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', justifyContent: 'center', alignItems: 'center' }}>
                <Link href={primaryBtnLink} target={primaryBtnLink.startsWith('http') ? '_blank' : '_self'}
                  style={{
                    padding: '0.875rem 2rem',
                    background: 'linear-gradient(135deg, #FF6B35, #FF8E53)',
                    color: '#fff',
                    fontWeight: 700,
                    borderRadius: '14px',
                    boxShadow: '0 4px 16px rgba(255,107,53,0.3)',
                    fontSize: '1rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    maxWidth: '320px',
                  }}
                >
                  {primaryBtnText}
                </Link>
                <Link href={secondaryBtnLink} target={secondaryBtnLink.startsWith('http') ? '_blank' : '_self'}
                  style={{
                    padding: '0.875rem 2rem',
                    background: '#fff',
                    color: '#0F172A',
                    fontWeight: 700,
                    borderRadius: '14px',
                    border: '2px solid #E2E8F0',
                    fontSize: '1rem',
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    width: '100%',
                    maxWidth: '320px',
                  }}
                >
                  {secondaryBtnText}
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
              <div style={{ position: 'relative', aspectRatio: '1', width: '100%' }}>
                {/* Decorative ring */}
                <div style={{
                  position: 'absolute', inset: '-8px',
                  background: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,142,83,0.1))',
                  borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                  filter: 'blur(8px)',
                  animation: 'spin 25s linear infinite',
                  pointerEvents: 'none',
                }} />
                
                <Image 
                  src={heroImageUrl} 
                  alt="Puzzle Derneği Etkinlikleri" 
                  fill
                  priority
                  sizes="(max-width: 768px) 90vw, 500px"
                  style={{
                    objectFit: 'cover',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
                    border: '6px solid rgba(255,255,255,0.6)',
                  }}
                />
                
                {/* Floating badge */}
                {floatingBadgeTitle && (
                  <div style={{
                    position: 'absolute', bottom: '-12px', left: '-12px',
                    background: '#fff',
                    padding: '0.875rem 1.25rem',
                    borderRadius: '16px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                    border: '1px solid #F1F5F9',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}>
                    <div style={{
                      width: '44px', height: '44px',
                      background: 'rgba(255,107,53,0.1)',
                      borderRadius: '12px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.5rem',
                    }}>
                      {floatingBadgeIcon}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0F172A', fontSize: '0.9rem' }}>{floatingBadgeTitle}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{floatingBadgeSubtitle}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* About Section */}
      <section style={{ 
        padding: '5rem 1.25rem', 
        backgroundColor: aboutBgImage ? 'transparent' : '#FFFFFF',
        backgroundImage: aboutBgImage ? `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.85)), url(${aboutBgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="container">
          <div style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <div className="section-divider" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ 
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
              marginBottom: '1.5rem', 
              color: aboutBgImage ? '#FFF' : '#0F172A',
              lineHeight: 1.2,
            }}>
              {aboutTitle}
            </h2>
            <p style={{ 
              fontSize: '1.05rem', 
              lineHeight: 1.8, 
              color: aboutBgImage ? '#E2E8F0' : '#334155', 
              marginBottom: '1.25rem', 
              whiteSpace: 'pre-line',
            }}>
              {aboutText1}
            </p>
            <p style={{ 
              fontSize: '1rem', 
              color: aboutBgImage ? '#CBD5E1' : '#64748B', 
              whiteSpace: 'pre-line',
              lineHeight: 1.7,
            }}>
              {aboutText2}
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Marquee */}
      {showSponsors && (
        <section style={{ padding: '4rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div className="container" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
            <div className="section-divider" />
            <h2 style={{ color: '#0F172A', fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, marginTop: '1rem' }}>{sponsorsTitle}</h2>
          </div>
          
          <div style={{ 
            display: 'flex', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap',
            width: '100%',
            position: 'relative'
          }}>
            {/* Gradient masks */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #F8FAFC, transparent)', zIndex: 2 }} />
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #F8FAFC, transparent)', zIndex: 2 }} />

            <div className="sponsor-track" style={{ display: 'flex', animation: 'scroll 25s linear infinite' }}>
              {renderSponsors()}
              {renderSponsors()}
            </div>
          </div>
        </section>
      )}

      {/* Embedded Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .sponsor-card {
          flex: 0 0 240px;
          height: 110px;
          background: white;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.25rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.03);
        }
        .sponsor-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        }
        .sponsor-track:hover {
          animation-play-state: paused !important;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .hero-grid { grid-template-columns: 1fr 1fr !important; }
          .hero-buttons { flex-direction: row !important; }
          .hero-text { text-align: left !important; }
        }
      `}} />
    </div>
  );
}
