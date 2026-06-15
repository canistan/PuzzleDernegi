"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function CookieBanner() {
  const t = useTranslations('cookieBanner');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted cookies
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());
    setIsVisible(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    localStorage.setItem('cookie-consent-timestamp', new Date().toISOString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in" style={{ animationDuration: '0.5s' }}>
      <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 text-sm md:text-base text-slate-700">
          <p>
            {t.rich('text', {
              link: (chunks) => <Link href="/kvkk" className="text-orange-500 font-semibold hover:underline">{chunks}</Link>
            })}
          </p>
        </div>
        <div className="flex-shrink-0 flex gap-3 w-full md:w-auto">
          <button 
            onClick={rejectCookies}
            className="w-full md:w-auto px-6 py-3 bg-slate-100 text-slate-700 font-semibold rounded-xl hover:bg-slate-200 transition-all text-sm whitespace-nowrap"
          >
            {t('reject')}
          </button>
          <button 
            onClick={acceptCookies}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm whitespace-nowrap"
          >
            {t('accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
