import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('common');
  const locale = useLocale();

  return (
    <header className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/${locale}`} className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Image src="/images/logo.png" alt="Puzzle Derneği" width={200} height={50} style={{ objectFit: 'contain' }} />
        </Link>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <nav>
            <ul className="nav-links" style={{ display: 'flex', alignItems: 'center', margin: 0, padding: 0 }}>
              <li><Link href={`/${locale}`}>{t('home')}</Link></li>
              <li><Link href={`/${locale}/tarihce`}>{t('history')}</Link></li>
              <li><Link href={`/${locale}/gecmis-yarismalar`}>{t('pastCompetitions')}</Link></li>
              <li><Link href={`/${locale}/tuzuk`}>{t('bylaws')}</Link></li>
              <li><Link href={`/${locale}/galeri`}>{t('gallery')}</Link></li>
              <li><Link href={`/${locale}/uyelik`}>{t('membership')}</Link></li>
              <li><Link href={`/${locale}/iletisim`}>{t('contact')}</Link></li>
            </ul>
          </nav>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
