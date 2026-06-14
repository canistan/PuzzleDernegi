import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Puzzle Derneği',
};

export default function KVKK() {
  return (
    <div style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="section-header animate-fade-in">
          <div className="section-divider" />
          <h1 style={{ marginTop: '1rem' }}>
            Kişisel Verilerin Korunması Hakkında Aydınlatma Metni
          </h1>
          <p>Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
        </div>

        <div className="card animate-fade-in" style={{ padding: '2.5rem', animationDelay: '0.1s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem', textAlign: 'justify' }}>
            <p>
              <strong>Puzzle Derneği</strong> olarak kişisel verilerinizin güvenliğine büyük önem vermekteyiz. 
              Bu bilinçle, derneğimizle ilişkili tüm şahıslara ait her türlü kişisel verinin 
              6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK")'na uygun olarak işlenmesine 
              ve muhafaza edilmesine özen gösteriyoruz.
            </p>

            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '1rem' }}>1. Veri Sorumlusu</h3>
            <p>
              6698 sayılı KVKK uyarınca, kişisel verileriniz veri sorumlusu sıfatıyla Puzzle Derneği tarafından 
              aşağıda açıklanan amaçlar kapsamında işlenebilecektir.
            </p>

            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '1rem' }}>2. Kişisel Verilerin İşlenme Amacı</h3>
            <p>
              Toplanan kişisel verileriniz, derneğimizin tüzüğünde belirtilen amaçların gerçekleştirilmesi, 
              üyelik işlemlerinin yürütülmesi, etkinlik ve yarışmaların organizasyonu, 
              dernek faaliyetleri hakkında bilgilendirme yapılması ve yasal yükümlülüklerimizin 
              yerine getirilmesi amaçlarıyla işlenmektedir.
            </p>

            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '1rem' }}>3. İşlenen Kişisel Veriler</h3>
            <p>
              Üyelik başvurusu ve etkinlik katılımı sırasında paylaştığınız ad, soyad, TC kimlik no, 
              iletişim bilgileri (telefon, e-posta, adres), doğum tarihi, meslek bilgisi, vesikalık fotoğraf 
              ve kimlik belgesi örneği gibi verileriniz işlenmektedir.
            </p>

            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '1rem' }}>4. Kişisel Verilerin Aktarılması</h3>
            <p>
              Kişisel verileriniz, kanuni zorunluluklar gereği yetkili kamu kurum ve kuruluşları dışında 
              hiçbir üçüncü şahıs veya kurumla paylaşılmamaktadır. Dernek içi etkinlik organizasyonlarında 
              sadece süreçle ilgili görevli personeller/üyeler ile sınırlı olarak paylaşılabilir.
            </p>

            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '1rem' }}>5. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h3>
            <p>
              Kişisel verileriniz, internet sitemiz üzerinden doldurduğunuz elektronik formlar, 
              fiziki üyelik başvuru formları ve basılı/elektronik belgeler aracılığıyla; 
              Kanun'un 5. ve 6. maddelerinde belirtilen "kanunlarda açıkça öngörülmesi" ve 
              "veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması" 
              hukuki sebeplerine dayanarak toplanmaktadır.
            </p>

            <h3 style={{ color: 'var(--text-main)', fontSize: '1.3rem', marginTop: '1rem' }}>6. KVKK'nın 11. Maddesi Kapsamındaki Haklarınız</h3>
            <p>
              Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi derneğimize iletmeniz durumunda 
              derneğimiz, talebin niteliğine göre en kısa sürede ve en geç otuz gün içinde talebinizi ücretsiz olarak sonuçlandıracaktır.
            </p>

            <p style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--border-light)', fontSize: '0.9rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              Bu metin genel bir bilgilendirme amacıyla hazırlanmıştır. Detaylı bilgi için bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
