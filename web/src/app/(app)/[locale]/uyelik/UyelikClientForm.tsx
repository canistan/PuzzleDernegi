"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UyelikClientForm({ title, subtitle, formSettings }: { title: string, subtitle: string, formSettings: any[] }) {
  const router = useRouter();
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
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-xl text-slate-600">
            {subtitle}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in" style={{ animationDelay: '0.1s' }}>
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 mb-0 rounded-r">
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-12">
            
            {/* Section 1: Kişisel Bilgiler */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">1. Kişisel Bilgiler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Adınız *</label>
                  <input type="text" name="firstName" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Soyadınız *</label>
                  <input type="text" name="lastName" required className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                {isVisible('tcNo') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">TC Kimlik No {isRequired('tcNo') && '*'}</label>
                  <input type="text" name="tcNo" required={isRequired('tcNo')} maxLength={11} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('birthDate') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Doğum Tarihi {isRequired('birthDate') && '*'}</label>
                  <input type="date" name="birthDate" required={isRequired('birthDate')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('gender') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cinsiyet {isRequired('gender') && '*'}</label>
                  <select name="gender" required={isRequired('gender')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white">
                    <option value="">Seçiniz...</option>
                    <option value="female">Kadın</option>
                    <option value="male">Erkek</option>
                  </select>
                </div>
                )}
                {isVisible('bloodType') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Kan Grubu {isRequired('bloodType') && '*'}</label>
                  <input type="text" name="bloodType" required={isRequired('bloodType')} placeholder="Örn: 0 RH+" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('motherName') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Anne Adı {isRequired('motherName') && '*'}</label>
                  <input type="text" name="motherName" required={isRequired('motherName')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('fatherName') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Baba Adı {isRequired('fatherName') && '*'}</label>
                  <input type="text" name="fatherName" required={isRequired('fatherName')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('birthPlace') && (
                  <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Doğum Yeri {isRequired('birthPlace') && '*'}</label>
                  <input type="text" name="birthPlace" required={isRequired('birthPlace')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
              </div>
            </section>

            {/* Section 2: İletişim */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">2. İletişim & Eğitim</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVisible('email') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">E-Mail Adresi {isRequired('email') && '*'}</label>
                  <input type="email" name="email" required={isRequired('email')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('phone') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Cep Telefonu {isRequired('phone') && '*'}</label>
                  <input type="tel" name="phone" required={isRequired('phone')} placeholder="05XX XXX XX XX" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Yerleşim (İkametgah) Adresi {isRequired('address') && '*'}</label>
                  <textarea name="address" required={isRequired('address')} rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none resize-y"></textarea>
                </div>
                {isVisible('workAddress') && (
                  <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">İş Adresi {isRequired('workAddress') && '*'}</label>
                  <textarea name="workAddress" required={isRequired('workAddress')} rows={2} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none resize-y"></textarea>
                </div>
                )}
                {isVisible('profession') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Meslek {isRequired('profession') && '*'}</label>
                  <input type="text" name="profession" required={isRequired('profession')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
                {isVisible('educationStatus') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Öğrenim Durumu {isRequired('educationStatus') && '*'}</label>
                  <input type="text" name="educationStatus" required={isRequired('educationStatus')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none" />
                </div>
                )}
              </div>
            </section>

            {/* Section 3: Puzzle */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">3. Puzzle Deneyimi</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVisible('puzzleCount') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Şimdiye Kadar Yaptığınız Puzzle Sayısı {isRequired('puzzleCount') && '*'}</label>
                  <select name="puzzleCount" required={isRequired('puzzleCount')} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white">
                    <option value="">Seçiniz...</option>
                    <option value="1-5">1 - 5</option>
                    <option value="6-10">6 - 10</option>
                    <option value="11-20">11 - 20</option>
                    <option value="21-50">21 - 50</option>
                    <option value="51-100">51 - 100</option>
                    <option value="100+">100 ve Daha fazla</option>
                  </select>
                </div>
                )}
                {isVisible('favoritePuzzleBrands') && (
                  <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Tercih Ettiğiniz Puzzle Markaları {isRequired('favoritePuzzleBrands') && '*'}</label>
                  <textarea name="favoritePuzzleBrands" required={isRequired('favoritePuzzleBrands')} rows={2} placeholder="Örn: Educa, Ravensburger, Anatolian..." className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none resize-y"></textarea>
                </div>
                )}
              </div>
            </section>

            {/* Section 4: Dosya Yüklemeleri */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b border-slate-200">4. Gerekli Belgeler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isVisible('photo') && (
                  <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Vesikalık Fotoğraf {isRequired('photo') && '*'}</label>
                  <p className="text-xs text-slate-500 mb-2">Lütfen son 6 ay içinde çekilmiş net bir vesikalık fotoğraf yükleyin.</p>
                  <input type="file" name="photo" required={isRequired('photo')} accept="image/*" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all outline-none bg-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100" />
                </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Kimlik Görüntüsü (Ön Yüz) {isRequired('identityCard') && '*'}</label>
                  <p className="text-xs text-slate-500 mb-2">Resmi işlemler için kimlik belgenizin okunaklı bir fotoğrafını yükleyin.</p>
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
                    Kişisel verilerimin KVKK aydınlatma metni kapsamında işlenmesini onaylıyorum. *
                  </span>
                </label>
                <label className="flex items-start gap-4 cursor-pointer group">
                  <div className="flex-shrink-0 mt-1">
                    <input type="checkbox" name="agreementAccepted" required className="w-5 h-5 text-orange-500 rounded border-slate-300 focus:ring-orange-500 cursor-pointer" />
                  </div>
                  <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">
                    Dernek üyelik sözleşmesini ve tüzüğünü okudum, kabul ediyorum. *
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
                  Kaydediliyor...
                </>
              ) : (
                'Başvuruyu Tamamla'
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
