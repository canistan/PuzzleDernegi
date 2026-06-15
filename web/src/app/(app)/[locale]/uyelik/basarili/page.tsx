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
        
        <p className="text-lg text-slate-600 mb-6">
          Üyelik başvurunuz dernek yönetimimize başarıyla iletilmiştir. 
          Değerlendirme süreci tamamlandıktan sonra iletişim bilgileriniz üzerinden size geri dönüş yapılacaktır. 
          Ailemize gösterdiğiniz ilgi için teşekkür ederiz.
        </p>

        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 md:p-6 mb-8 text-left">
          <h3 className="text-lg font-bold text-orange-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Önemli Hatırlatma
          </h3>
          <p className="text-orange-700 text-sm md:text-base mb-4 leading-relaxed">
            Ön başvurunuz başarıyla sistemimize kaydedilmiştir. Ancak resmi üyeliğinizin onaylanabilmesi için aşağıdaki <strong>Üyelik Başvuru Formunu</strong> indirip çıktısını almanız ve <strong className="underline decoration-orange-400 decoration-2">ıslak imzalı</strong> bir şekilde derneğimize (posta veya elden) teslim etmeniz gerekmektedir.
          </p>
          <a 
            href="/uyelik-formu.pdf" 
            download
            target="_blank"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg text-sm transition-colors shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Üyelik Formunu İndir (PDF)
          </a>
        </div>
        
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
