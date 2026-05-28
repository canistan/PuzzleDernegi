import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kurallar | Puzzle Derneği',
};

export default function Kurallar() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>KATILIM KOŞULLARI VE KURALLAR</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          
          <h2 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>12 Saat Puzzle Maratonu</h2>
          <h3 style={{ color: 'var(--primary)' }}>KURALLAR</h3>
          
          <ul style={{ paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li>12 Saat Puzzle Maratonu’na 18 yaşını dolduran herkes katılabilir.</li>
            <li><strong>Tarih & Yer:</strong> 28 NİSAN 2019 - Pazar – Deniz Müzesi – Beşiktaş / İstanbul</li>
            <li>Amaç 12 saat (oniki saat) içinde en fazla sayıda puzzle’ı yapmaktır.</li>
            <li>Tüm yarışmacılar aynı puzzle modeli ile yarışacaktır.</li>
            <li>12 Saat Puzzle Maratonu bireysel bir yarıştır. Takım halinde yarışılamaz.</li>
            <li>Organizasyon tarafından puzzle’ını bitiren yarışmacılara hemen akibinde sıradaki puzzle verilecektir. Sırasıyla:
              <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
                <li>1. Puzzle 500 parça</li>
                <li>2. Puzzle 1000 parça</li>
                <li>3. Puzzle 1500 parça</li>
                <li>4. Puzzle 2000 parça</li>
                <li>5. Puzzle 3000 parça</li>
              </ul>
            </li>
            <li>Yarışmacıların puzzle atlama hakkı yoktur.</li>
            <li>Yarıştıkları puzzle’lar yarışmacılara hediye olarak verilecektir.</li>
            <li>Yarışmacı sayısı 30 (otuz) ile sınırlandırılmıştır.</li>
            <li>Yarışmaya katılım ücreti 100.- TL (Yüz Türk Lirası)’dır. YAPBOZ (Puzzle) Derneği üyelerine katılım ücreti 50.- TL’dir (Elli Türk Lirası).</li>
            <li>Web sayfasından başvurusunu yapıp Dernek hesabına katılım ücretini yatıran kişi yarışmacı listesine girer. Başvurusunu yapıp katılım ücreti ödemeyenler ‘Yarışmacı’ olarak adledilmezler ve yarışamazlar.</li>
            <li>Yarışmacılar 28 Nisan Pazar günü saat en geç 10.15’de yarışmanın yapılacağı Deniz Müzesi – Çaka Bey salonunda olmalıdır.</li>
            <li>Her yarışmacı için ayrı masa hazırlanacaktır.</li>
            <li>Yarışmacılara, yarışma puzzle’ı Yarışın Başlangıcından önce masalarına kutuların üst tarafı görünmeyecek şekilde ters olarak dağıtılacaktır.</li>
            <li>Yarışma Puzzle’ı, Organizasyon’un vereceği START ile açılacaktır. Yarışma Puzzle’ının kutusunu önceden açan yarışmacılar diskalifiye edilecektir.</li>
            <li>Yarışmanın Başlangıç saati 10.30’dır. Organizasyonun başlangıç talimatıyla yarış başlar.</li>
            <li>Her oyuncu bireysel olarak yarışacaktır. Yarışmacıların dışardan, 2. Şahıslardan puzzle parçalarının ayrıştırılması, dizilmesi, birleştirilmesi vs. gibi bir konuda destek alması kesinlikle yasaktır. Bu tür destek alan yarışmacı diskalifiye edilecektir.</li>
            <li>12 saatlik Puzzle Maratonu’nun süresi 12 (oniki) saattir.</li>
            <li>Süre sonunda yarışmacıların bitirdikleri puzzle’lar ve bitiremedikleri puzzle olması durumunda kalan puzzle parçaları sayılacak ve sıralama buna göre yapılacaktır.</li>
          </ul>

          <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid var(--primary)', borderRadius: '4px' }}>
            <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
              Sevgili Yarışmacılar, yarışmanın herhangi bir bölümünde bir problemle karşılaşmanız durumunda ve/veya bitirdiğiniz Puzzle’ı yapıştırmak istediğinizde, kısaca her konuda Destek Masası'ndan faydalanabilirsiniz.
            </p>
            <h4 style={{ color: 'var(--primary)', textAlign: 'center', marginBottom: 0 }}>HERKESE BAŞARILAR VE EN ÖNEMLİSİ KEYİFLİ BİR MARATON DİLERİZ</h4>
          </div>
          
        </div>
      </div>
    </div>
  );
}
