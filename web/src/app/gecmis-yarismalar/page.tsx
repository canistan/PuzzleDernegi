import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Geçmiş Yarışmalar | Puzzle Derneği',
};

export default function GecmisYarismalar() {
  return (
    <div className="animate-fade-in container" style={{ padding: '4rem 2rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="text-center" style={{ marginBottom: '2rem', color: 'var(--primary)' }}>GEÇMİŞ PUZZLE YARIŞMALARI</h1>
        
        <div style={{ 
          backgroundColor: 'var(--bg-surface)', 
          padding: '3rem', 
          borderRadius: '16px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}>
          
          <div>
            <h2 style={{ color: 'var(--text-main)', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
              1. TÜRKİYE PUZZLE HIZ YARIŞMASI ENGİN ÇELİK ANISINA
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p>
                22 Mart 2015 tarihinde Türkiye İş Güvenliği İş Adamları Derneği (TİGİAD) ve Özensan A.Ş. tarafından Olivium Outlet Center’da <b>1. Türkiye Puzzle Hız Yarışması</b> düzenlendi. İş Sağlığı ve Güvenliği’ne dikkat çekmek amacı ile, Çalışma ve Sosyal Güvenlik Bakanlığı tarafından 25.7.2012’de yayınlanan Kişisel Koruyucu Donanımlarla ilgili Uyumlaştırılmış Ulusal Standartlara ilişkin özel bir çalışmanın yarışmanın ana unsuru olduğu, <b>Sabır ve Dikkat Sanatı olan 1000 parçalık Yap-Boz (Puzzle)</b>’ı en kısa sürede yapmak üzere toplam 20 ilden 35 yarışmacı zamanla yarıştı. Avusturya’da hazırlanan özel bir program ile internet üzerinden de yarışmacılar hem yarışmaya katılabildiler hem de rakiplerinin sürekli olarak takip edebildiler. TİGİAD’ın 3. Yönetim Kurulu Başkanı ve Ombudsman’ı rahmetli Engin Çelik’e ithaf edilen 1. Türkiye Puzzle Hız Yarışması’nda birincilik Yalova’dan 5 saat 34 saniye ile İlknur Sürmeli’nin oldu. İstanbul’dan Nilgün Darga’nın 6 saat 20 dakika  ile ikinci ve Ankara’dan Seçil Öztürel’in  8 saat 22 dakika 10 saniye ile üçüncü olduğu yarışma toplam 10 saat sürdü.
              </p>
              <p>
                Türkiye’nin dört bir yanından, Avusturya’da hazırlanan özel bir program ile canlı olarak internet üzerinden takip edilebilen yarışmaya, Olivium’daki ziyaretçilerin ilgisi de büyüktü. Olivium Birincisi 8 saat 37 dakika 40 saniye ile İstanbul’dan Dilara Düğmeci oldu. Son puzzle parçalarını koyarken, Olivium ziyaretçilerinden büyük tezahürat olan Düğmeci, alkışlar eşliğinde yarışmayı tamamladı ve 200 TL değerindeki Olivium Center hediye çekinin de sahibi oldu.
              </p>
              <p>
                Olivium’da aynı zamanda küçük yaştaki çocuklar da 54 parçalık puzzle’ı önce bitirebilmek için ikili gruplar halinde yarıştılar. Çocukların yoğun ilgi gösterdiği yarışmalarda, büyüklerin heyecanı da oldukça fazlaydı.
              </p>
              <p>
                1. Türkiye Puzzle Hız Yarışması, 7’den 70’e her yaşta insanın severek yaptığı Yap-Boz (Puzzle) ile ilgili Türkiye çapında ilk ve tek yarışma olması özelliğinin yanı sıra, ‘Sabır ve Dikkat Sanatı Yap-boz’ oyunu ile, keyifli ve zevkli bir şekilde tüm Türkiye’de İş Sağlığı ve Güvenliği konusunda bilgi paylaşımını sağladı.
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/olivium.jpg" alt="1. Türkiye Puzzle Hız Yarışması" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/295.jpg" alt="1. Türkiye Puzzle Hız Yarışması Detay" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />

          <div>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>2. Türkiye Puzzle Hız Yarışması Finali'nde Dereceye Giren Yarışmacılar</h2>
            <ol style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Dilara Düğmeci (6.43'35")</li>
              <li>Semiha Güngör (9.15'041)</li>
              <li>Nalan Muratbay (9.31'42")</li>
            </ol>
            <h3 style={{ color: 'var(--primary)', marginTop: '1rem' }}>Engin Çelik Özel Ödülü Sahibi</h3>
            <ol style={{ paddingLeft: '2rem' }}>
              <li>Emine Taphasan</li>
            </ol>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />

          <div>
            <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>3. Türkiye Puzzle Hız Yarışması Finali'nde Dereceye Giren Yarışmacılar</h2>
            <ol style={{ paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Nalan Muratbay</li>
              <li>Dilara Düğmeci</li>
              <li>Meryem Toprak</li>
            </ol>
            <h3 style={{ color: 'var(--primary)', marginTop: '1rem' }}>Engin Çelik Özel Ödülü Sahibi</h3>
            <ol style={{ paddingLeft: '2rem' }}>
              <li>Nezih Rodoplu</li>
            </ol>
            <h3 style={{ color: 'var(--primary)', marginTop: '1rem' }}>Selin Çelik Özel Ödülü Sahibi</h3>
            <ol style={{ paddingLeft: '2rem' }}>
              <li>Emine Taphasan</li>
            </ol>
          </div>

          <hr style={{ borderColor: 'var(--border-color)', margin: '1rem 0' }} />

          <div className="text-center">
            <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>DÜNYA PUZZLE YARIŞMASI</h2>
            <p className="text-muted" style={{ marginBottom: '1rem' }}>Aşağıdaki tabloda dünya genelinde yapılan puzzle yarışmasında ilk 10'a giren yarışmacılar listelenmektedir.</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/ERGEBNIS.JPG" alt="Dünya Puzzle Yarışması Sonuçları" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
          </div>

        </div>
      </div>
    </div>
  );
}
