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
  
  // Default static events if not provided via panel
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

  // If panel has events, use them. Otherwise fallback to default.
  // Add colors dynamically
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
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-4">
            {pageTitle}
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto whitespace-pre-line">
            {pageSubtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative border-l-4 border-slate-200 ml-4 md:ml-8 space-y-12 pb-12">
          {events.map((event, index) => (
            <div key={index} className="relative pl-8 md:pl-12 group">
              {/* Timeline dot */}
              <div className={`absolute -left-[14px] top-1 h-6 w-6 rounded-full border-4 border-white shadow-sm transition-transform duration-300 group-hover:scale-125 ${event.color}`}></div>
              
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <span className={`inline-block px-4 py-1 rounded-full text-white text-sm font-bold tracking-wider mb-4 ${event.color}`}>
                  {event.year}
                </span>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  {event.title}
                </h3>
                
                <p className="text-slate-600 text-lg leading-relaxed text-justify mb-6">
                  {event.description}
                </p>

                {event.image && (
                  <div className="relative h-[300px] w-full rounded-xl overflow-hidden shadow-md mt-6">
                    <Image 
                      src={event.image} 
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
