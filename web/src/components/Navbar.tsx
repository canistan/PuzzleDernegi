import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <Link href="/" className="logo">
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>Puzzle</span>
          <span style={{ fontSize: '1.5rem', fontWeight: 300, marginLeft: '4px' }}>Derneği</span>
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/tarihce">Tarihçe</Link></li>
            <li><Link href="/kurallar">Kurallar</Link></li>
            <li><Link href="/gecmis-yarismalar">Geçmiş Yarışmalar</Link></li>
            <li><Link href="/tuzuk">Tüzük</Link></li>
            <li><Link href="/uyelik">Üyelik Formu</Link></li>
            <li><Link href="/iletisim">İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
