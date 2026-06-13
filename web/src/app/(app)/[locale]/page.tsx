import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import Image from 'next/image';

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const payload = await getPayload({ config: configPromise });
  let homePage: any = null;
  
  try {
    homePage = await payload.findGlobal({ slug: 'homePage' as any, locale: locale as any });
  } catch (error) {
    console.error('Failed to load homePage', error);
  }

  // Fallbacks if not set in panel
  const heroTitle = homePage?.heroTitle || 'AVRUPA PUZZLE ŞAMPİYONASI';
  const heroSubtitle = homePage?.heroSubtitle || 'HEYECANI BAŞLADI!';
  const heroDescription = homePage?.heroDescription || 'Yarışmaya katıl, yeteneğini göster ve Türkiye\'nin dört bir yanındaki binlerce puzzle tutkunuyla aynı çatı altında buluş.';
  const primaryBtnText = homePage?.primaryButtonText || 'Yarışmaya Kayıt Ol';
  const primaryBtnLink = homePage?.primaryButtonLink || 'https://yarisbul.com/event-details/yesilay-avrupa-puzzle-sampiyonasi';
  const secondaryBtnText = homePage?.secondaryButtonText || 'Derneğe Üye Ol';
  const secondaryBtnLink = homePage?.secondaryButtonLink || '/uyelik';
  const heroImageUrl = homePage?.heroImage?.url || '/images/puzzle_hero_bg.png';
  const heroBadgeText = homePage?.heroBadgeText || "🧩 TÜRKİYE'NİN İLK VE TEK RESMİ PUZZLE DERNEĞİ";
  const floatingBadgeIcon = homePage?.floatingBadgeIcon || '🏆';
  const floatingBadgeTitle = homePage?.floatingBadgeTitle || 'Ödüllü Yarışmalar';
  const floatingBadgeSubtitle = homePage?.floatingBadgeSubtitle || 'Sürpriz hediyeler!';

  const aboutTitle = homePage?.aboutTitle || 'Avrupa Puzzle Şampiyonası Hakkında';
  const aboutText1 = homePage?.aboutText1 || 'Türkiye Puzzle Derneği (YAPBOZ DERNEĞİ) öncülüğünde düzenlenen Avrupa Puzzle Şampiyonası, her yıl yüzlerce puzzle tutkununu bir araya getiriyor. Bireysel ve takım kategorilerinde düzenlenen heyecan dolu yarışmalarda hızınızı test edin, yeteneklerinizi sergileyin ve sürpriz ödülleri kazanın!';
  const aboutText2 = homePage?.aboutText2 || 'Kurallar, puanlama sistemi ve detaylı yarışma programı hakkında bilgi almak için yukarıdaki "Yarışmaya Kayıt Ol" butonundan resmi biletleme sayfamızı ziyaret edebilirsiniz.';
  const aboutBgImage = homePage?.aboutBgImage?.url || null;
  const showSponsors = homePage?.showSponsors !== false;
  const sponsorsTitle = homePage?.sponsorsTitle || 'Sponsorlar';
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
      return (
        <div style={{ display: 'flex', gap: '1.5rem', paddingRight: '1.5rem', alignItems: 'center' }}>
          {customSponsors.map((sponsor: any, idx: number) => {
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
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-slate-50">
        
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-orange-100/40 blur-3xl"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-100/40 blur-3xl"></div>
        </div>

        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Text Content */}
            <div className="text-center lg:text-left">
              {heroBadgeText && (
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-orange-100 text-orange-600 font-semibold text-sm tracking-wide border border-orange-200">
                  {heroBadgeText}
                </div>
              )}
              
              <h1 className="text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[1.1] mb-6 text-slate-800 tracking-tight">
                {heroTitle} <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400">
                  {heroSubtitle}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-light whitespace-pre-line">
                {heroDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={primaryBtnLink} target={primaryBtnLink.startsWith('http') ? '_blank' : '_self'}
                  className="px-8 py-4 bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:-translate-y-1 transition-all text-lg text-center"
                >
                  {primaryBtnText}
                </Link>
                <Link href={secondaryBtnLink} target={secondaryBtnLink.startsWith('http') ? '_blank' : '_self'}
                  className="px-8 py-4 bg-white text-slate-800 font-bold rounded-2xl border-2 border-slate-200 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-1 transition-all text-lg text-center"
                >
                  {secondaryBtnText}
                </Link>
              </div>
            </div>

            {/* Shaped Image Content */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square w-full">
                {/* Decorative border shape */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-[#FF6B35] rounded-[30%_70%_70%_30%/30%_30%_70%_70%] transform rotate-3 scale-105 animate-[spin_30s_linear_infinite] opacity-20 blur-lg"></div>
                
                {/* The actual image with a cool shape */}
                <Image 
                  src={heroImageUrl} 
                  alt="Puzzle Derneği Etkinlikleri" 
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover rounded-[30%_70%_70%_30%/30%_30%_70%_70%] shadow-2xl border-8 border-white/50 backdrop-blur-sm transition-transform duration-700 hover:scale-[1.02]"
                />
                
                {/* Floating badge */}
                {floatingBadgeTitle && (
                  <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-[bounce_3s_ease-in-out_infinite]">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl">
                      {floatingBadgeIcon}
                    </div>
                    <div>
                      <div className="text-slate-800 font-bold">{floatingBadgeTitle}</div>
                      <div className="text-sm text-slate-500">{floatingBadgeSubtitle}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section style={{ 
        padding: '6rem 2rem', 
        backgroundColor: aboutBgImage ? 'transparent' : 'var(--bg-color)',
        backgroundImage: aboutBgImage ? `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${aboutBgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem', color: aboutBgImage ? '#FFF' : 'var(--primary)' }}>{aboutTitle}</h2>
            <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: aboutBgImage ? '#E2E8F0' : 'var(--text-main)', marginBottom: '1.5rem', fontWeight: 600, whiteSpace: 'pre-line' }}>
              {aboutText1}
            </p>
            <p style={{ fontSize: '1.1rem', color: aboutBgImage ? '#CBD5E1' : 'var(--text-muted)', whiteSpace: 'pre-line' }}>
              {aboutText2}
            </p>
          </div>
        </div>
      </section>

      {/* Sponsors Marquee */}
      {showSponsors && (
        <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFC', borderTop: '1px solid #E2E8F0', overflow: 'hidden' }}>
          <div className="container" style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <h2 style={{ color: '#1E293B', fontSize: '2.5rem', fontWeight: 800 }}>{sponsorsTitle}</h2>
          </div>
          
          <div style={{ 
            display: 'flex', 
            overflow: 'hidden', 
            whiteSpace: 'nowrap',
            width: '100%',
            position: 'relative'
          }}>
            {/* Gradient masks for smooth edges */}
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to right, #F8FAFC, transparent)', zIndex: 2 }}></div>
            <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '150px', background: 'linear-gradient(to left, #F8FAFC, transparent)', zIndex: 2 }}></div>

            <div className="sponsor-track" style={{ display: 'flex', animation: 'scroll 25s linear infinite' }}>
              {/* 1. Set */}
              {renderSponsors()}

              {/* 2. Set (for seamless loop) */}
              {renderSponsors()}
            </div>
          </div>
        </section>
      )}

      {/* Embedded Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .hover-scale-btn:hover {
          transform: translateY(-3px) scale(1.02);
        }
        .btn-primary:hover {
          background-color: #C2410C !important;
          box-shadow: 0 15px 30px rgba(234, 88, 12, 0.5) !important;
        }
        .btn-secondary:hover {
          border-color: #CBD5E1 !important;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
        }
        .sponsor-card {
          flex: 0 0 280px;
          height: 130px;
          background: white;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          transition: all 0.3s ease;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        .sponsor-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0,0,0,0.08);
          border-color: #CBD5E1;
        }
        .sponsor-track:hover {
          animation-play-state: paused !important;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
}
