import { Metadata } from 'next';
import Image from 'next/image';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

export const metadata: Metadata = {
  title: 'Tarihçe | Puzzle Derneği',
};

export default async function Tarihce(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  const payload = await getPayload({ config: configPromise });
  let historyPage: any = null;
  
  try {
    historyPage = await payload.findGlobal({ slug: 'historyPage', locale: locale as any });
  } catch (error) {
    console.error('Failed to load historyPage', error);
  }

  const pageTitle = historyPage?.title || 'Derneğimizin Tarihçesi';
  const pageSubtitle = historyPage?.subtitle || 'Dünya şampiyonalarından Türkiye\'nin dört bir yanındaki puzzle severleri tek çatı altında toplamamıza uzanan o gurur verici yolculuğumuz.';
  
  const defaultEvents = [
    {
      year: "Aralık 2014",
      title: "1. Dünya Puzzle Hız Yarışması",
      description: "Yarışmaya Almanya, Rusya, Türkiye, Danimarka, İngiltere, Arjantin ve Singapur'dan dünyanın en hızlı puzzle severleri katıldı. Dünyanın her yerinde aynı anda başlayan yarışmada 1000 parçalık puzzle kullanıldı. Türkiye'den İlknur Sürmeli Dünya 3.'sü, Pelin Çelik ise Dünya 4.'sü olarak büyük bir başarıya imza attı.",
      color: "bg-blue-500",
    },
    {
      year: "Mart 2015",
      title: "1. Türkiye Puzzle Hız Yarışması",
      description: "Sosyal medyada büyük ilgi toplayan yarışmanın farklı bir versiyonu, TİGİAD ve Özensan A.Ş. tarafından Türkiye'de ilk kez düzenlendi. Soma faciasından yola çıkılarak İş Sağlığı ve Güvenliğine dikkat çekmeyi amaçlayan bu organizasyonda, 19 ilden 35 yarışmacı bir araya geldi. Şampiyonluğu İlknur Sürmeli kazanarak Türkiye'nin ilk Puzzle Şampiyonu ünvanını aldı.",
      color: "bg-green-500",
      image: null
    },
    {
      year: "Mart 2016",
      title: "2. Türkiye Puzzle Hız Yarışması",
      description: "İstanbul'daki terör saldırılarının gölgesinde gerçekleştirilen yarışmada, 90 kişiden ön elemeyi geçen 20 finalist KatsSahne'de yarıştı. Şampiyon Dilara Düğmeci olurken, Engin Çelik Özel Ödülü engel tanımayan azmiyle Emine Taphasan'a takdim edildi.",
      color: "bg-purple-500",
      image: null
    },
    {
      year: "Aralık 2016",
      title: "3. Türkiye Puzzle Hız Yarışması & Kelebek Selin",
      description: "Beşiktaş'taki hain terör saldırısında hayatını kaybeden 28 yaşındaki Selin Çelik'e ithaf edildi. Vücudundaki kelebek dövmesinden teşhis edilen Selin anısına özel 'Kelebek Selin' puzzle'ı üretildi ve gelirleri eğitim bursu olarak Avusturya Liseliler Derneğine aktarıldı.",
      color: "bg-pink-500",
      image: "/images/butterfly.png"
    },
    {
      year: "Mart 2018",
      title: "4. Türkiye Puzzle Hız Yarışması",
      description: "Sabır ve Dikkat Sanatı Yap-Boz'u daha geniş kitlelere duyurmayı amaçlayan 4. yarışma, vefat eden sevilen üyemiz Emine Taphasan'a ithaf edildi. Bu etkinlikte Dünya Puzzle Günleri organizatörlerinin de katıldığı 'Puzzle All Star' gösteri maçı yapıldı.",
      color: "bg-orange-500",
      image: "/images/competition.png"
    },
    {
      year: "Kasım 2018",
      title: "Yapboz Derneği'nin (PuzzleDer) Kuruluşu",
      description: "Pelin Çelik önderliğinde kurulan YAPBOZ DERNEĞİ (PuzzleDer), Türkiye Puzzle Hız Yarışmasını resmi bir çatı altında topladı. Kurumsal kimliğiyle İspanya'daki Dünya Puzzle Şampiyonasında Türkiye'yi başarıyla temsil etti. Dernek bünyesinde ayrıca, rahmetli Yusuf Aşuk anısına 500'den fazla puzzle barındıran ücretsiz bir Puzzle Kütüphanesi kuruldu.",
      color: "bg-teal-500",
      image: "/images/library.png"
    },
    {
      year: "2020",
      title: "Corona Dönemi ve Online Etkinlikler",
      description: "Tüm dünyayı etkileyen pandemi sebebiyle yüz yüze yarışmalar ertelenmek zorunda kaldı. Ancak dernek hız kesmedi; 'BEAT CORONA' mottosuyla Facebook üzerinden düzenlenen 'CORONA PUZZLE GÜNLERİ', Meksika'dan Güney Kore'ye kadar 32 ülkeden 368 katılımcıyı online ortamda bir araya getirdi.",
      color: "bg-red-500",
      image: null
    }
  ];

  const colorPalette = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500', 'bg-teal-500', 'bg-red-500'];
  let events = defaultEvents;
  
  if (historyPage?.events && historyPage.events.length > 0) {
    events = historyPage.events.map((ev: any, index: number) => ({
      ...ev,
      image: ev.image?.url || null,
      color: colorPalette[index % colorPalette.length],
    }));
  }

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh', padding: '3rem 1rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div className="section-header animate-fade-in" style={{ marginBottom: '3.5rem', paddingTop: '1rem' }}>
          <div className="section-divider" />
          <h1 style={{ marginTop: '1rem' }}>{pageTitle}</h1>
          <p style={{ whiteSpace: 'pre-line' }}>{pageSubtitle}</p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', paddingLeft: '2rem', paddingBottom: '2rem' }}>
          {/* Timeline line */}
          <div style={{
            position: 'absolute',
            left: '11px',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, #FF6B35, #E2E8F0 30%, #E2E8F0 70%, transparent)',
            borderRadius: '2px',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {events.map((event, index) => (
              <div key={index} className="animate-fade-in" style={{ position: 'relative', animationDelay: `${index * 0.08}s` }}>
                {/* Timeline dot */}
                <div className={event.color} style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '1.5rem',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  border: '4px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  zIndex: 1,
                  marginLeft: '0px',
                }} />
                
                <div className="card" style={{ 
                  padding: '1.5rem',
                  borderRadius: '16px',
                  marginLeft: '0.75rem',
                }}>
                  <span className={`${event.color}`} style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.875rem',
                    borderRadius: '9999px',
                    color: 'white',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.03em',
                    marginBottom: '0.875rem',
                  }}>
                    {event.year}
                  </span>
                  
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                    {event.title}
                  </h3>
                  
                  <p style={{ color: '#475569', fontSize: '0.95rem', lineHeight: 1.7, textAlign: 'justify' }}>
                    {event.description}
                  </p>

                  {event.image && (
                    <div style={{ position: 'relative', height: '240px', width: '100%', borderRadius: '12px', overflow: 'hidden', marginTop: '1.25rem' }}>
                      <Image 
                        src={event.image} 
                        alt={event.title}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
