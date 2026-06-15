"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contactForm');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || t('errorDefault'));
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err.message || t('errorDefault'));
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">{t('successTitle')}</h3>
        <p className="text-slate-500">{t('successDesc')}</p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm font-medium text-orange-500 hover:text-orange-600 transition-colors"
        >
          {t('successBtn')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
          <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('nameLabel')}</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
            placeholder={t('namePlaceholder')}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all outline-none text-slate-800 placeholder:text-slate-300" 
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('emailLabel')}</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder={t('emailPlaceholder')}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all outline-none text-slate-800 placeholder:text-slate-300" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('phoneLabel')}</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder={t('phonePlaceholder')}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all outline-none text-slate-800 placeholder:text-slate-300" 
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('subjectLabel')}</label>
          <input 
            type="text" 
            name="subject" 
            value={formData.subject} 
            onChange={handleChange} 
            required 
            placeholder={t('subjectPlaceholder')}
            disabled={status === 'loading'}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all outline-none text-slate-800 placeholder:text-slate-300" 
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">{t('messageLabel')}</label>
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          required 
          rows={5}
          placeholder={t('messagePlaceholder')}
          disabled={status === 'loading'}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-orange-400/30 focus:border-orange-400 transition-all outline-none resize-none text-slate-800 placeholder:text-slate-300" 
        ></textarea>
      </div>

      <button 
        type="submit" 
        disabled={status === 'loading'}
        className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF8E53] text-white font-bold text-base transition-all duration-300 shadow-[0_4px_14px_rgba(255,107,53,0.35)] flex items-center justify-center gap-2 hover:shadow-[0_6px_20px_rgba(255,107,53,0.5)] hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
      >
        {status === 'loading' ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('submitLoading')}
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
            {t('submitIdle')}
          </>
        )}
      </button>
    </form>
  );
}
