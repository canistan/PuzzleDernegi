"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function UyelikClientForm({ title, subtitle, formSettings }: { title: string, subtitle: string, formSettings: any[] }) {
  const router = useRouter();
  const t = useTranslations('membership');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isVisible = (name: string) => {
    // If formSettings is empty, default to true for backward compatibility or simple fallback
    if (!formSettings || formSettings.length === 0) return true;
    return formSettings.some(s => s.fieldName === name);
  };
  
  const isRequired = (name: string) => {
    if (!formSettings || formSettings.length === 0) return false;
    const field = formSettings.find(s => s.fieldName === name);
    return field ? field.required : false;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Format boolean values correctly for FormData (must be string 'true' or 'false' for the API route to parse properly)
    formData.set('kvkkAccepted', data.kvkkAccepted === 'on' ? 'true' : 'false');
    formData.set('agreementAccepted', data.agreementAccepted === 'on' ? 'true' : 'false');

    try {
      const response = await fetch('/api/submit-membership', {
        method: 'POST',
        body: formData, // Send FormData directly for multipart/form-data
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.errors?.[0]?.message || 'Kayıt sırasında bir hata oluştu.');
      }

      // Success - Redirect for GTM tracking
      router.push('/uyelik/basarili');
    } catch (err: any) {
      setError(err.message || 'Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.');
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header animate-fade-in">
          <div className="section-divider" />
          <h1 style={{ marginTop: '1rem' }}>
            {title || t('title')}
          </h1>
          <p>
            {subtitle || t('subtitle')}
          </p>
        </div>

        <div className="card animate-fade-in" style={{ padding: '2.5rem', animationDelay: '0.1s' }}>
          {error && (
            <div style={{ backgroundColor: '#FEF2F2', borderLeft: '4px solid #EF4444', padding: '1rem', marginBottom: '1.5rem', borderRadius: '0 8px 8px 0' }}>
              <p style={{ color: '#B91C1C', fontWeight: 500 }}>{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            
            {/* Section 1: Kişisel Bilgiler */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">{t('personalInfo')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('firstName')}</label>
                  <input type="text" name="firstName" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('lastName')}</label>
                  <input type="text" name="lastName" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                {isVisible('tcNo') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('idNumber')} {isRequired('tcNo') && '*'}</label>
                  <input type="text" name="tcNo" required={isRequired('tcNo')} maxLength={11} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('birthDate') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('birthDate')} {isRequired('birthDate') && '*'}</label>
                  <input type="date" name="birthDate" required={isRequired('birthDate')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('gender') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('gender')} {isRequired('gender') && '*'}</label>
                  <select name="gender" required={isRequired('gender')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white">
                    <option value="">{t('genderSelect')}</option>
                    <option value="female">{t('genderFemale')}</option>
                    <option value="male">{t('genderMale')}</option>
                  </select>
                </div>
                )}
                {isVisible('bloodType') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('bloodGroup')} {isRequired('bloodType') && '*'}</label>
                  <input type="text" name="bloodType" required={isRequired('bloodType')} placeholder="Örn: 0 RH+" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('motherName') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('motherName')} {isRequired('motherName') && '*'}</label>
                  <input type="text" name="motherName" required={isRequired('motherName')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('fatherName') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('fatherName')} {isRequired('fatherName') && '*'}</label>
                  <input type="text" name="fatherName" required={isRequired('fatherName')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('birthPlace') && (
                  <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('birthPlace')} {isRequired('birthPlace') && '*'}</label>
                  <input type="text" name="birthPlace" required={isRequired('birthPlace')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
              </div>
            </section>

            {/* Section 2: İletişim */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">{t('contactAndEducation')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVisible('email') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('email')} {isRequired('email') && '*'}</label>
                  <input type="email" name="email" required={isRequired('email')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('phone') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('phone')} {isRequired('phone') && '*'}</label>
                  <input type="tel" name="phone" required={isRequired('phone')} placeholder="05XX XXX XX XX" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('address')} {isRequired('address') && '*'}</label>
                  <textarea name="address" required={isRequired('address')} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none resize-y"></textarea>
                </div>
                {isVisible('workAddress') && (
                  <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('workInfo')} {isRequired('workAddress') && '*'}</label>
                  <textarea name="workAddress" required={isRequired('workAddress')} rows={2} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none resize-y"></textarea>
                </div>
                )}
                {isVisible('profession') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('profession')} {isRequired('profession') && '*'}</label>
                  <input type="text" name="profession" required={isRequired('profession')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('educationStatus') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('education')} {isRequired('educationStatus') && '*'}</label>
                  <input type="text" name="educationStatus" required={isRequired('educationStatus')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
              </div>
            </section>

            {/* Section 3: Puzzle */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">{t('puzzleExperience')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVisible('puzzleCount') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('puzzlesCount')} {isRequired('puzzleCount') && '*'}</label>
                  <select name="puzzleCount" required={isRequired('puzzleCount')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white">
                    <option value="">{t('genderSelect')}</option>
                    <option value="1-5">1 - 5</option>
                    <option value="6-10">6 - 10</option>
                    <option value="11-20">11 - 20</option>
                    <option value="21-50">21 - 50</option>
                    <option value="51-100">51 - 100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>
                )}
                {isVisible('favoritePuzzleBrands') && (
                  <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('favoritePuzzleBrandsLabel')} {isRequired('favoritePuzzleBrands') && '*'}</label>
                  <textarea name="favoritePuzzleBrands" required={isRequired('favoritePuzzleBrands')} rows={2} placeholder={t('favoritePuzzleBrandsPlaceholder')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none resize-y"></textarea>
                </div>
                )}
              </div>
            </section>

            {/* Section 4: Dosya Yüklemeleri */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">{t('requiredDocuments')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVisible('photo') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('photoLabel')} {isRequired('photo') && '*'}</label>
                  <p className="text-xs text-slate-500 mb-2">{t('photoDesc')}</p>
                  <input type="file" name="photo" required={isRequired('photo')} accept="image/*" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
                </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">{t('identityCardLabel')} {isRequired('identityCard') && '*'}</label>
                  <p className="text-xs text-slate-500 mb-2">{t('identityCardDesc')}</p>
                  <input type="file" name="identityCard" required={isRequired('identityCard')} accept="image/*,application/pdf" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
                </div>
              </div>
            </section>

            {/* Section 5: Onay */}
            <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
              <div className="space-y-4">
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="flex-shrink-0 mt-1">
                    <input type="checkbox" name="kvkkAccepted" required className="w-5 h-5 text-orange-500 rounded border-slate-300 focus:ring-orange-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    {t('declaration2')} *
                  </span>
                </label>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="flex-shrink-0 mt-1">
                    <input type="checkbox" name="agreementAccepted" required className="w-5 h-5 text-orange-500 rounded border-slate-300 focus:ring-orange-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    {t('declaration1')} *
                  </span>
                </label>
              </div>
            </section>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                isSubmitting 
                  ? 'bg-slate-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:shadow-orange-500/30 hover:-translate-y-1'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  ...
                </>
              ) : (
                t('submit')
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
