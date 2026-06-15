"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function NewsletterForm() {
  const t = useTranslations('newsletter');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        // If it's a duplicate email error from Payload CMS
        if (errorData.errors?.[0]?.data?.[0]?.field === 'email') {
            throw new Error(t('error'));
        }
        throw new Error(t('error'));
      }

      setStatus('success');
      setMessage(t('success'));
      setEmail('');
    } catch (err: any) {
      setStatus('error');
      setMessage(t('error'));
    }
  };

  return (
    <div>
      <h4 className="text-lg font-bold text-slate-800 mb-3 text-[var(--primary)]">{t('title')}</h4>
      <p className="text-sm text-slate-500 mb-4">
        {t('description')}
      </p>
      
      <form onSubmit={handleSubmit} className="relative max-w-md">
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('placeholder')}
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm disabled:bg-slate-100 disabled:text-slate-500"
            required
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="px-5 py-2.5 bg-gradient-to-r from-[#FF6B35] to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm whitespace-nowrap"
          >
            {status === 'loading' ? '...' : t('subscribe')}
          </button>
        </div>
        
        {status === 'success' && (
          <p className="absolute -bottom-6 left-0 text-xs font-medium text-green-600 animate-fade-in">
            {message}
          </p>
        )}
        {status === 'error' && (
          <p className="absolute -bottom-6 left-0 text-xs font-medium text-red-500 animate-fade-in">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
