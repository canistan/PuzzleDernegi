import Link from 'next/link';
import { Inter } from "next/font/google";
import "./(app)/globals.css"; // Ensure CSS is imported for global 404

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "404 - Sayfa Bulunamadı | Puzzle Derneği",
};

export default function NotFound() {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-slate-50 text-center relative overflow-hidden">
          {/* Decorative background pieces */}
          <div className="absolute top-10 left-10 opacity-10 blur-sm pointer-events-none transform -rotate-12">
            <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-[#FF6B35]">
              <path d="M22.3,10.6c-0.2-1.2-1.3-2-2.5-1.9c-0.7,0.1-1.3,0.5-1.7,1.1c-1.3,1.6-3.7,1.9-5.3,0.5 C11.3,8.9,11,6.5,12.5,4.9c0.6-0.6,0.8-1.5,0.6-2.3c-0.3-1.2-1.5-1.9-2.7-1.6L8,1.6C7,1.8,6.2,2.7,6.1,3.7c0,0.1,0,0.2,0,0.3 c-0.1,1.5-1.2,2.7-2.7,2.9C1.9,7.1,0.6,8.2,0.4,9.7c-0.1,1.2,0.5,2.3,1.5,2.7C2.5,12.8,3,13.4,3.2,14c0.2,0.7,0,1.5-0.5,2.1 c-1.2,1.5-0.9,3.8,0.6,4.9c1.5,1.2,3.8,0.9,4.9-0.6c0.5-0.6,1.4-0.8,2.1-0.6c0.7,0.2,1.2,0.7,1.4,1.4c0.4,1.4,1.6,2.3,3.1,2.2 c1.2-0.1,2.2-0.9,2.5-2l0.4-1.5c0.2-1,1.1-1.7,2.1-1.6c0.1,0,0.2,0,0.3,0c1.5-0.1,2.7-1.2,2.9-2.7c0.2-1.5-0.9-2.8-2.4-3 c-1.2-0.1-2.2-0.9-2.5-2C17.6,12.2,18,11.3,18.8,10.9C19.9,10.3,20.4,9.2,20.2,8z"/>
            </svg>
          </div>
          <div className="absolute bottom-20 right-20 opacity-10 blur-sm pointer-events-none transform rotate-45">
            <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500">
              <path d="M22.3,10.6c-0.2-1.2-1.3-2-2.5-1.9c-0.7,0.1-1.3,0.5-1.7,1.1c-1.3,1.6-3.7,1.9-5.3,0.5 C11.3,8.9,11,6.5,12.5,4.9c0.6-0.6,0.8-1.5,0.6-2.3c-0.3-1.2-1.5-1.9-2.7-1.6L8,1.6C7,1.8,6.2,2.7,6.1,3.7c0,0.1,0,0.2,0,0.3 c-0.1,1.5-1.2,2.7-2.7,2.9C1.9,7.1,0.6,8.2,0.4,9.7c-0.1,1.2,0.5,2.3,1.5,2.7C2.5,12.8,3,13.4,3.2,14c0.2,0.7,0,1.5-0.5,2.1 c-1.2,1.5-0.9,3.8,0.6,4.9c1.5,1.2,3.8,0.9,4.9-0.6c0.5-0.6,1.4-0.8,2.1-0.6c0.7,0.2,1.2,0.7,1.4,1.4c0.4,1.4,1.6,2.3,3.1,2.2 c1.2-0.1,2.2-0.9,2.5-2l0.4-1.5c0.2-1,1.1-1.7,2.1-1.6c0.1,0,0.2,0,0.3,0c1.5-0.1,2.7-1.2,2.9-2.7c0.2-1.5-0.9-2.8-2.4-3 c-1.2-0.1-2.2-0.9-2.5-2C17.6,12.2,18,11.3,18.8,10.9C19.9,10.3,20.4,9.2,20.2,8z"/>
            </svg>
          </div>

          <div className="z-10 animate-fade-in" style={{ animationDuration: '0.8s' }}>
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-orange-400 mb-2 drop-shadow-sm">
              404
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Aradığınız Parçayı Bulamadık!
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-lg mx-auto">
              Görünüşe göre bu puzzle parçası kutudan çıkmadı. Yanlış bir bağlantıya tıklamış olabilir veya sayfa kaldırılmış olabilir.
            </p>
            
            <Link 
              href="/" 
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-900 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
