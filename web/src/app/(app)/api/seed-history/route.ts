import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    let historyPage = await payload.findGlobal({
      slug: 'historyPage' as any,
    });

    const defaultEvents = [
      {
        year: "Aralık 2014",
        title: "1. Dünya Puzzle Hız Yarışması",
        description: "Yarışmaya Almanya, Rusya, Türkiye, Danimarka, İngiltere, Arjantin ve Singapur'dan dünyanın en hızlı puzzle severleri katıldı. Dünyanın her yerinde aynı anda başlayan yarışmada 1000 parçalık puzzle kullanıldı. Türkiye'den İlknur Sürmeli Dünya 3.'sü, Pelin Çelik ise Dünya 4.'sü olarak büyük bir başarıya imza attı.",
      },
      {
        year: "Mart 2015",
        title: "1. Türkiye Puzzle Hız Yarışması",
        description: "Sosyal medyada büyük ilgi toplayan yarışmanın farklı bir versiyonu, TİGİAD ve Özensan A.Ş. tarafından Türkiye'de ilk kez düzenlendi. Soma faciasından yola çıkılarak İş Sağlığı ve Güvenliğine dikkat çekmeyi amaçlayan bu organizasyonda, 19 ilden 35 yarışmacı bir araya geldi. Şampiyonluğu İlknur Sürmeli kazanarak Türkiye'nin ilk Puzzle Şampiyonu ünvanını aldı.",
      },
      {
        year: "Mart 2016",
        title: "2. Türkiye Puzzle Hız Yarışması",
        description: "İstanbul'daki terör saldırılarının gölgesinde gerçekleştirilen yarışmada, 90 kişiden ön elemeyi geçen 20 finalist KatsSahne'de yarıştı. Şampiyon Dilara Düğmeci olurken, Engin Çelik Özel Ödülü engel tanımayan azmiyle Emine Taphasan'a takdim edildi.",
      },
      {
        year: "Aralık 2016",
        title: "3. Türkiye Puzzle Hız Yarışması & Kelebek Selin",
        description: "Beşiktaş'taki hain terör saldırısında hayatını kaybeden 28 yaşındaki Selin Çelik'e ithaf edildi. Vücudundaki kelebek dövmesinden teşhis edilen Selin anısına özel 'Kelebek Selin' puzzle'ı üretildi ve gelirleri eğitim bursu olarak Avusturya Liseliler Derneğine aktarıldı.",
      },
      {
        year: "Mart 2018",
        title: "4. Türkiye Puzzle Hız Yarışması",
        description: "Sabır ve Dikkat Sanatı Yap-Boz'u daha geniş kitlelere duyurmayı amaçlayan 4. yarışma, vefat eden sevilen üyemiz Emine Taphasan'a ithaf edildi. Bu etkinlikte Dünya Puzzle Günleri organizatörlerinin de katıldığı 'Puzzle All Star' gösteri maçı yapıldı.",
      },
      {
        year: "Kasım 2018",
        title: "Yapboz Derneği'nin (PuzzleDer) Kuruluşu",
        description: "Pelin Çelik önderliğinde kurulan YAPBOZ DERNEĞİ (PuzzleDer), Türkiye Puzzle Hız Yarışmasını resmi bir çatı altında topladı. Kurumsal kimliğiyle İspanya'daki Dünya Puzzle Şampiyonasında Türkiye'yi başarıyla temsil etti. Dernek bünyesinde ayrıca, rahmetli Yusuf Aşuk anısına 500'den fazla puzzle barındıran ücretsiz bir Puzzle Kütüphanesi kuruldu.",
      },
      {
        year: "2020",
        title: "Corona Dönemi ve Online Etkinlikler",
        description: "Tüm dünyayı etkileyen pandemi sebebiyle yüz yüze yarışmalar ertelenmek zorunda kaldı. Ancak dernek hız kesmedi; 'BEAT CORONA' mottosuyla Facebook üzerinden düzenlenen 'CORONA PUZZLE GÜNLERİ', Meksika'dan Güney Kore'ye kadar 32 ülkeden 368 katılımcıyı online ortamda bir araya getirdi.",
      }
    ];

    await payload.updateGlobal({
      slug: 'historyPage' as any,
      data: {
        ...historyPage,
        events: defaultEvents as any,
        title: historyPage?.title || 'Derneğimizin Tarihçesi',
        subtitle: historyPage?.subtitle || 'Dünya şampiyonalarından Türkiye\'nin dört bir yanındaki puzzle severleri tek çatı altında toplamamıza uzanan o gurur verici yolculuğumuz.',
      },
    })
    
    return NextResponse.json({ success: true, message: 'Seeded History' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
