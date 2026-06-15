import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { NextResponse } from 'next/server'
import { tuzukData } from '../../[locale]/tuzuk/tuzukData'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // 1. Seed History Page
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
        title: 'Derneğimizin Tarihçesi',
        subtitle: "Dünya şampiyonalarından Türkiye'nin dört bir yanındaki puzzle severleri tek çatı altında toplamamıza uzanan o gurur verici yolculuğumuz.",
        events: defaultEvents as any,
      },
    });

    // 2. Seed Bylaws Page
    const blocks = tuzukData.map((madde: any) => ({
      blockType: 'madde',
      maddeNo: madde.maddeNo || madde.number || '',
      content: madde.content,
    }));

    await payload.updateGlobal({
      slug: 'bylawsPage' as any,
      data: {
        title: 'Dernek Tüzüğü',
        blocks: blocks as any,
      },
    });

    // 3. Seed Gallery Settings
    await payload.updateGlobal({
      slug: 'gallerySettings' as any,
      data: {
        title: 'DERNEK GALERİSİ',
        subtitle: 'Geçmiş yarışmalardan ve etkinliklerimizden unutulmaz anlar.',
      },
    });

    // 4. Seed Past Competitions
    const defaultCompetitions = [
      {
        type: 'details',
        title: 'İlk Yüz Yüze Yarışmalarımız',
        paragraphs: [
          { text: "Derneğimizin ilk yıllarında Türkiye'nin dört bir yanından gelen katılımcılarla yüz yüze puzzle şampiyonaları düzenledik. Bu şampiyonalar, hem yarışma heyecanını yaşamak hem de puzzle severleri bir araya getirmek için harika bir fırsat oldu." }
        ]
      }
    ];

    await payload.updateGlobal({
      slug: 'pastCompetitionsPage' as any,
      data: {
        title: 'GEÇMİŞ PUZZLE YARIŞMALARI',
        description: 'Derneğimizin kuruluşundan bu yana düzenlediğimiz etkinlikler ve yarışmalar.',
        competitions: defaultCompetitions as any,
      },
    });
    
    return NextResponse.json({ success: true, message: 'All sections seeded' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
