import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'İletişim | Puzzle Derneği',
};

export default async function Iletisim() {
  const payload = await getPayload({ config: configPromise });
  const contactPage = await payload.findGlobal({
    slug: 'contactPage',
  });

  const address = contactPage.address || `Tersane Caddesi Abdüsallah Sokak\nİzzet Baysal İş Hanı No:1 Kat:7\nKaraköy / İstanbul`;
  const phone = contactPage.phone || '(0553) 158 84 38';
  const email = contactPage.email || 'turkiyepuzzleyarismasi@gmail.com';
  const facebookUrl = contactPage.facebookUrl || 'https://www.facebook.com/puzzledernegi/';

  // Clean phone for tel: link (remove spaces and non-digits except +)
  const phoneLink = phone.replace(/[^\d+]/g, '');

  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>İLETİŞİM</h1>

        <div style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          border: '1px solid var(--border-color)',
          display: 'grid',
          gridTemplateColumns: '1fr lg:1fr', // Mobile: stacked, Desktop: side by side
          gap: '3rem'
        }}>

          <div className="space-y-8">

            <div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📍 Adres
              </h3>
              <p className="text-muted whitespace-pre-line">
                {address}
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                📞 Telefon
              </h3>
              <p className="text-muted">
                <a href={`tel:${phoneLink}`} className="text-primary">{phone}</a>
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                ✉️ Mail
              </h3>
              <p className="text-muted">
                <a href={`mailto:${email}`} className="text-primary">{email}</a>
              </p>
            </div>

            <div>
              <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                👥 Sosyal Medya
              </h3>
              <p className="text-muted">
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-primary">
                  Facebook Sayfamız
                </a>
              </p>
            </div>

          </div>

          <div>
            <ContactForm />
          </div>

        </div>
      </div>
    </div>
  );
}
