import Link from 'next/link';
import NewsletterForm from './NewsletterForm';
import CookieSettingsLink from './CookieSettingsLink';
import { useLocale, useTranslations } from 'next-intl';

export default function Footer() {
  const locale = useLocale();
  const t = useTranslations('common');

  return (
    <footer>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem' }}>
          
          {/* Brand */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Puzzle Derneği</h3>
            <p style={{ color: '#94A3B8', lineHeight: 1.7, fontSize: '0.95rem' }}>
              {t('footerDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', color: '#94A3B8' }}>{t('quickLinks')}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href={`/${locale}/tarihce`} style={{ color: '#CBD5E1', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('about')} & {t('history')}</Link></li>
              <li><Link href={`/${locale}/gecmis-yarismalar`} style={{ color: '#CBD5E1', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('pastCompetitions')}</Link></li>
              <li><Link href={`/${locale}/galeri`} style={{ color: '#CBD5E1', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('gallery')}</Link></li>
              <li><Link href={`/${locale}/kvkk`} style={{ color: '#CBD5E1', fontSize: '0.95rem', transition: 'color 0.2s' }}>{t('kvkk')}</Link></li>
              <CookieSettingsLink />
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterForm />
          </div>

          {/* Contact & Social */}
          <div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', color: '#94A3B8' }}>{t('contactAndSocial')}</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li style={{ color: '#CBD5E1', fontSize: '0.95rem' }}>{t('email')}: turkiyepuzzleyarismasi@gmail.com</li>
              <li><Link href={`/${locale}/iletisim`} style={{ color: '#FF6B35', fontWeight: 600, fontSize: '0.95rem' }}>{t('contact')} →</Link></li>
            </ul>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
              <a href="https://www.facebook.com/puzzledernegi" target="_blank" rel="noopener noreferrer"
                 style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/puzzledernegi" target="_blank" rel="noopener noreferrer"
                 style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="https://youtube.com/@turkiyepuzzle" target="_blank" rel="noopener noreferrer"
                 style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8', transition: 'all 0.2s' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
          <p style={{ color: '#64748B', fontSize: '0.875rem' }}>
            &copy; {new Date().getFullYear()} Puzzle Derneği. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
}
