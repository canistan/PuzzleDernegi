import Link from 'next/link';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        position: 'relative',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--bg-color) 0%, var(--bg-surface) 100%)',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'url("/images/puzzle-bg.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
        
        <div className="container text-center" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', background: 'linear-gradient(to right, #f8fafc, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            ANATOLİAN’I SEVİYORUZ<br />
            PUZZLE HIZ YARIŞMASI
          </h1>
          <p style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
            İÇİN <span className="text-primary" style={{ fontWeight: 600 }}>TÜRKİYE PUZZLE</span>
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
            <Link href="/kurallar" className="btn btn-primary">
              Kuralları İncele
            </Link>
            <Link href="/uyelik" className="btn" style={{ backgroundColor: 'transparent', border: '1px solid var(--border-color)' }}>
              Üyelik Formu
            </Link>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section style={{ padding: '6rem 0', backgroundColor: 'var(--bg-surface)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '4rem' }}>
            <h2>SPONSORLAR</h2>
            <p className="text-muted">Değerli sponsorlarımıza, katkılarından dolayı çok teşekkür ederiz.</p>
          </div>
          
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            justifyContent: 'center', 
            gap: '3rem',
            alignItems: 'center',
            opacity: 0.7
          }}>
            <div style={{ width: '150px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Özensan</div>
            <div style={{ width: '150px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Heye</div>
            <div style={{ width: '150px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Torium</div>
            <div style={{ width: '150px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Hobby Galeri</div>
            <div style={{ width: '150px', height: '60px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Takvim</div>
          </div>
        </div>
      </section>
    </div>
  );
}
