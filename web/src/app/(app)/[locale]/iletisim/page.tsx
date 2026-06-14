import { Metadata } from 'next';
import { getPayload } from 'payload';
import configPromise from '@payload-config';
import ContactForm from '@/components/ContactForm';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'İletişim | Puzzle Derneği',
};

export default async function Iletisim(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const payload = await getPayload({ config: configPromise });
  const t = await getTranslations('contact');
  
  const contactPage = await payload.findGlobal({
    slug: 'contactPage',
    locale: locale as any,
  });

  const address = contactPage.address || `Tersane Caddesi Abdüsallah Sokak\nİzzet Baysal İş Hanı No:1 Kat:7\nKaraköy / İstanbul`;
  const phone = contactPage.phone || '(0553) 158 84 38';
  const email = contactPage.email || 'turkiyepuzzleyarismasi@gmail.com';
  const facebookUrl = contactPage.facebookUrl || 'https://www.facebook.com/puzzledernegi/';
  const instagramUrl = (contactPage as any).instagramUrl || 'https://www.instagram.com/puzzledernegi/';
  const twitterUrl = (contactPage as any).twitterUrl || '';
  const phoneLink = phone.replace(/[^\d+]/g, '');

  return (
    <div className="animate-fade-in bg-slate-50 min-h-screen">
      {/* Header — matches tarihce / gecmis-yarismalar style */}
      <div className="pt-16 pb-10 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Left: Contact Form (wider) */}
            <div className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-slate-100 p-8 lg:p-10 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FF8E53] flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{t('sendMessage')}</h2>
                  <p className="text-sm text-slate-400">{t('sendMessageDesc')}</p>
                </div>
              </div>
              <ContactForm />
            </div>

            {/* Right: Info Cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              
              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{t('address')}</h3>
                    <p className="text-sm text-slate-500 whitespace-pre-line leading-relaxed">{address}</p>
                  </div>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{t('phone')}</h3>
                    <a href={`tel:${phoneLink}`} className="text-sm text-slate-500 hover:text-[#FF6B35] transition-colors">{phone}</a>
                  </div>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                    <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-1">{t('emailLabel')}</h3>
                    <a href={`mailto:${email}`} className="text-sm text-slate-500 hover:text-[#FF6B35] transition-colors break-all">{email}</a>
                  </div>
                </div>
              </div>

              {/* Social Media Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <h3 className="text-sm font-bold text-slate-800 mb-4">{t('socialMedia')}</h3>
                <div className="flex items-center gap-3">
                  {facebookUrl && (
                    <a href={facebookUrl} target="_blank" rel="noopener noreferrer" title="Facebook"
                       className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/20 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {instagramUrl && (
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" title="Instagram"
                       className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-gradient-to-br hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {twitterUrl && (
                    <a href={twitterUrl} target="_blank" rel="noopener noreferrer" title="X (Twitter)"
                       className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white hover:border-black hover:shadow-lg hover:shadow-black/10 transition-all duration-300">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                </div>
              </div>

              {/* Map Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-[#FF6B35]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">{t('map')}</h3>
                  </div>
                </div>
                <div className="h-48">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.9196556535515!2d28.973461!3d41.0253456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab9e71ab8527d%3A0x6b4a3c1dd86299d6!2zS2FyYWvDtnksIMSwenpldCBCYXlzYWwgxLDFnyBIYW7EsSwgVGVyc2FuZSBDZC4gTm86MSBLYXQ6NywgMzQ0MjAgQmV5b8SfbHUvxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1718361234567!5m2!1str!2str" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Puzzle Derneği Harita"
                  ></iframe>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
