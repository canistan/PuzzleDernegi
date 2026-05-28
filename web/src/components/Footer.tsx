import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--primary)' }}>Puzzle Derneği</h3>
            <p className="text-muted" style={{ marginTop: '1rem' }}>
              Türkiye'deki tüm puzzle severleri bir araya getiren ve yarışmalar düzenleyen resmi dernek.
            </p>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>Hızlı Bağlantılar</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="text-muted">
              <li><Link href="/tarihce">Hakkımızda & Tarihçe</Link></li>
              <li><Link href="/kurallar">Yarışma Kuralları</Link></li>
              <li><Link href="/gecmis-yarismalar">Geçmiş Yarışmalar</Link></li>
            </ul>
          </div>
          <div>
            <h4 style={{ marginBottom: '1.5rem' }}>İletişim</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }} className="text-muted">
              <li>E-posta: info@puzzledernegi.com</li>
              <li><Link href="/iletisim" className="text-primary">Bize Ulaşın</Link></li>
            </ul>
          </div>
        </div>
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }} className="text-muted">
          <p>&copy; {new Date().getFullYear()} Puzzle Derneği. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
