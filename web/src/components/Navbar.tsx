import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container">
        <Link href="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.png" alt="Puzzle Derneği" width={200} height={50} style={{ objectFit: 'contain' }} />
        </Link>
        <nav>
          <ul className="nav-links">
            <li><Link href="/">Ana Sayfa</Link></li>
            <li><Link href="/tarihce">Tarihçe</Link></li>

            <li><Link href="/gecmis-yarismalar">Geçmiş Yarışmalar</Link></li>
            <li><Link href="/tuzuk">Tüzük</Link></li>
            <li><Link href="/galeri">Galeri</Link></li>
            <li><Link href="/uyelik">Üyelik Formu</Link></li>
            <li><Link href="/iletisim">İletişim</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
