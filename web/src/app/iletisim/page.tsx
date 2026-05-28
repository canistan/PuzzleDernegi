import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'İletişim | Puzzle Derneği',
};

export default function Iletisim() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>İLETİŞİM</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem'
        }}>
          
          <div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📍 Adres
            </h3>
            <p className="text-muted">
              Tersane Caddesi Abdüsallah Sokak<br />
              İzzet Baysal İş Hanı No:1 Kat:7<br />
              Karaköy / İstanbul
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              📞 Telefon
            </h3>
            <p className="text-muted">
              <a href="tel:+905531588438" className="text-primary">(0553) 158 84 38</a>
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              ✉️ Mail
            </h3>
            <p className="text-muted">
              <a href="mailto:turkiyepuzzlederneyi@gmail.com" className="text-primary">turkiyepuzzlederneyi@gmail.com</a>
              <br />
              <a href="mailto:turkiyepuzzleyarismasi@gmail.com" className="text-primary" style={{ fontSize: '0.9em' }}>turkiyepuzzleyarismasi@gmail.com</a>
            </p>
          </div>

          <div>
            <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              👥 Sosyal Medya
            </h3>
            <p className="text-muted">
              <a href="https://www.facebook.com/puzzledernegi/" target="_blank" rel="noopener noreferrer" className="text-primary">
                Facebook Sayfamız
              </a>
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
