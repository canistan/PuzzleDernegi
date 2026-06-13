import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Başvuru Başarılı | Puzzle Derneği',
  robots: 'noindex, nofollow', // Prevent search engines from indexing the success page
};

export default function UyelikBasarili() {
  return (
    <div className="bg-slate-50 min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-10 text-center rounded-3xl shadow-2xl border border-slate-100 animate-fade-in">
        
        {/* Success Icon */}
        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 animate-[bounce_1s_ease-in-out]">
          <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
          Başvurunuz Alındı!
        </h1>
        
        <p className="text-lg text-slate-600 mb-8">
          Üyelik başvurunuz dernek yönetimimize başarıyla iletilmiştir. 
          Değerlendirme süreci tamamlandıktan sonra iletişim bilgileriniz üzerinden size geri dönüş yapılacaktır. 
          Ailemize gösterdiğiniz ilgi için teşekkür ederiz.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/" 
            className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl transition-colors"
          >
            Ana Sayfaya Dön
          </Link>
          <Link 
            href="/tarihce" 
            className="px-8 py-3 bg-gradient-to-r from-[#FF6B35] to-orange-500 hover:shadow-lg hover:shadow-orange-500/30 text-white font-bold rounded-xl transition-all hover:-translate-y-1"
          >
            Tarihçemizi Okuyun
          </Link>
        </div>

      </div>
    </div>
  );
}
