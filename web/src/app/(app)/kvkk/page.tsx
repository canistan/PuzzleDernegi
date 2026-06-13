import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Puzzle Derneği',
};

export default function KVKK() {
  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4 text-[var(--primary)]">
              Kişisel Verilerin Korunması Hakkında Aydınlatma Metni
            </h1>
            <p className="text-slate-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
          </div>

          <div className="prose prose-slate max-w-none prose-headings:text-slate-800 prose-a:text-orange-500 hover:prose-a:text-orange-600">
            <p>
              <strong>Puzzle Derneği</strong> olarak kişisel verilerinizin güvenliğine büyük önem vermekteyiz. 
              Bu bilinçle, derneğimizle ilişkili tüm şahıslara ait her türlü kişisel verinin 
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")'na uygun olarak işlenmesine 
              ve muhafaza edilmesine özen gösteriyoruz.
            </p>

            <h3>1. Veri Sorumlusu</h3>
            <p>
              6698 sayılı KVKK uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Puzzle Derneği tarafından 
              aşağıda açıklanan amaçlar kapsamında işlenebilecektir.
            </p>

            <h3>2. Kişisel Verilerin İşlenme Amacı</h3>
            <p>
              Toplanan kişisel verileriniz, derneğimizin tüzüğünde belirtilen amaçların gerçekleştirilmesi, 
              üyelik işlemlerinin yürütülmesi, etkinlik ve yarışmaların organizasyonu, 
              dernek faaliyetleri hakkında bilgilendirme yapılması ve yasal yükümlülüklerimizin 
              yerine getirilmesi amaçlarıyla işlenmektedir.
            </p>

            <h3>3. İşlenen Kişisel Veriler</h3>
            <p>
              Üyelik başvurusu ve etkinlik katılımı sırasında paylaştığınız ad, soyad, TC kimlik no, 
              iletişim bilgileri (telefon, e-posta, adres), doğum tarihi, meslek bilgisi, vesikalık fotoğraf 
              ve kimlik belgesi örneği gibi verileriniz işlenmektedir.
            </p>

            <h3>4. Kişisel Verilerin Aktarılması</h3>
            <p>
              Kişisel verileriniz, kanuni zorunluluklar gereği yetkili kamu kurum ve kuruluşları dışında 
              hiçbir üçüncü şahıs veya kurumla paylaşılmamaktadır. Dernek içi etkinlik organizasyonlarında 
              sadece süreçle ilgili görevli personeller/üyeler ile sınırlı olarak paylaşılabilir.
            </p>

            <h3>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
            <p>
              Kişisel verileriniz, internet sitemiz üzerinden doldurduğunuz elektronik formlar, 
              fiziki üyelik başvuru formları ve basılı/elektronik belgeler aracılığıyla; 
              Kanun'un 5. ve 6. maddelerinde belirtilen "kanunlarda açıkça öngörülmesi" ve 
              "veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" 
              hukuki sebeplerine dayanarak toplanmaktadır.
            </p>

            <h3>6. KVKK'nın 11. Maddesi Kapsamındaki Haklarınız</h3>
            <p>
              Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi derneğimize iletmeniz durumunda 
              derneğimiz, talebin niteliğine göre en kısa sürede ve en geç otuz gün içinde talebinizi ücretsiz olarak sonuçlandıracaktır.
            </p>

            <p className="mt-8 pt-8 border-t border-slate-100 text-sm text-slate-500 text-center">
              Bu metin genel bir bilgilendirme amacıyla hazırlanmıştır. Detaylı bilgi için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
