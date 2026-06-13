import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    let page = await payload.findGlobal({
      slug: 'pastCompetitionsPage' as any,
    });

    const defaultComps = [
      {
        type: 'details',
        title: '1. TÜRKİYE PUZZLE HIZ YARIŞMASI ENGİN ÇELİK ANISINA',
        paragraphs: [
          { text: '22 Mart 2015 tarihinde Türkiye İş Güvenliği İş Adamları Derneği (TİGİAD) ve Özensan A.Ş. tarafından Olivium Outlet Center’da 1. Türkiye Puzzle Hız Yarışması düzenlendi. İş Sağlığı ve Güvenliği’ne dikkat çekmek amacı ile, Çalışma ve Sosyal Güvenlik Bakanlığı tarafından 25.7.2012’de yayınlanan Kişisel Koruyucu Donanımlarla ilgili Uyumlaştırılmış Ulusal Standartlara ilişkin özel bir çalışmanın yarışmanın ana unsuru olduğu, Sabır ve Dikkat Sanatı olan 1000 parçalık Yap-Boz (Puzzle)’ı en kısa sürede yapmak üzere toplam 20 ilden 35 yarışmacı zamanla yarıştı. Avusturya’da hazırlanan özel bir program ile internet üzerinden de yarışmacılar hem yarışmaya katılabildiler hem de rakiplerinin sürekli olarak takip edebildiler. TİGİAD’ın 3. Yönetim Kurulu Başkanı ve Ombudsman’ı rahmetli Engin Çelik’e ithaf edilen 1. Türkiye Puzzle Hız Yarışması’nda birincilik Yalova’dan 5 saat 34 saniye ile İlknur Sürmeli’nin oldu. İstanbul’dan Nilgün Darga’nın 6 saat 20 dakika ile ikinci ve Ankara’dan Seçil Öztürel’in 8 saat 22 dakika 10 saniye ile üçüncü olduğu yarışma toplam 10 saat sürdü.' },
          { text: 'Türkiye’nin dört bir yanından, Avusturya’da hazırlanan özel bir program ile canlı olarak internet üzerinden takip edilebilen yarışmaya, Olivium’daki ziyaretçilerin ilgisi de büyüktü. Olivium Birincisi 8 saat 37 dakika 40 saniye ile İstanbul’dan Dilara Düğmeci oldu. Son puzzle parçalarını koyarken, Olivium ziyaretçilerinden büyük tezahürat olan Düğmeci, alkışlar eşliğinde yarışmayı tamamladı ve 200 TL değerindeki Olivium Center hediye çekinin de sahibi oldu.' },
          { text: 'Olivium’da aynı zamanda küçük yaştaki çocuklar da 54 parçalık puzzle’ı önce bitirebilmek için ikili gruplar halinde yarıştılar. Çocukların yoğun ilgi gösterdiği yarışmalarda, büyüklerin heyecanı da oldukça fazlaydı.' },
          { text: '1. Türkiye Puzzle Hız Yarışması, 7’den 70’e her yaşta insanın severek yaptığı Yap-Boz (Puzzle) ile ilgili Türkiye çapında ilk ve tek yarışma olması özelliğinin yanı sıra, ‘Sabır ve Dikkat Sanatı Yap-boz’ oyunu ile, keyifli ve zevkli bir şekilde tüm Türkiye’de İş Sağlığı ve Güvenliği konusunda bilgi paylaşımını sağladı.' }
        ]
      },
      {
        type: 'winners',
        title: '2. Türkiye Puzzle Hız Yarışması Finali\'nde Dereceye Giren Yarışmacılar',
        winnersList: [
          { name: 'Dilara Düğmeci (6.43\'35\")' },
          { name: 'Semiha Güngör (9.15\'041)' },
          { name: 'Nalan Muratbay (9.31\'42\")' }
        ],
        specialAwards: [
          { awardName: 'Engin Çelik Özel Ödülü Sahibi', winner: 'Emine Taphasan' }
        ]
      },
      {
        type: 'winners',
        title: '3. Türkiye Puzzle Hız Yarışması Finali\'nde Dereceye Giren Yarışmacılar',
        winnersList: [
          { name: 'Nalan Muratbay' },
          { name: 'Dilara Düğmeci' },
          { name: 'Meryem Toprak' }
        ],
        specialAwards: [
          { awardName: 'Engin Çelik Özel Ödülü Sahibi', winner: 'Nezih Rodoplu' },
          { awardName: 'Selin Çelik Özel Ödülü Sahibi', winner: 'Emine Taphasan' }
        ]
      },
      {
        type: 'image',
        title: 'DÜNYA PUZZLE YARIŞMASI',
        imageDescription: 'Aşağıdaki tabloda dünya genelinde yapılan puzzle yarışmasında ilk 10\'a giren yarışmacılar listelenmektedir.',
      }
    ];

    await payload.updateGlobal({
      slug: 'pastCompetitionsPage' as any,
      data: {
        ...page,
        competitions: defaultComps as any,
        title: page?.title || 'GEÇMİŞ PUZZLE YARIŞMALARI',
      },
    })
    
    return NextResponse.json({ success: true, message: 'Seeded Competitions' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
