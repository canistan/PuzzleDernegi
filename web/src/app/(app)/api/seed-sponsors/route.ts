import { getPayload } from 'payload'
import configPromise from '../../../../../payload.config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    let homePage = await payload.findGlobal({
      slug: 'homePage' as any,
    });

    const defaultSponsors = [
      { name: 'Yeşilay (Yatay Metin)', type: 'preset', presetType: 'yesilay_text' },
      { name: 'Yeşilay Spor Kulübü', type: 'preset', presetType: 'yesilay_spor' },
      { name: 'Anatolian', type: 'preset', presetType: 'anatolian' },
      { name: 'ECJP', type: 'preset', presetType: 'ecjp' },
      { name: 'The Idea Factory', type: 'preset', presetType: 'ideafactory' },
      { name: 'Özensan A.Ş.', type: 'preset', presetType: 'ozensan' },
    ];

    await payload.updateGlobal({
      slug: 'homePage' as any,
      data: {
        ...homePage,
        sponsors: defaultSponsors as any,
        heroTitle: homePage?.heroTitle || 'Avrupa Puzzle Şampiyonası',
        heroSubtitle: homePage?.heroSubtitle || 'Türkiye Elemeleri',
        heroDescription: homePage?.heroDescription || 'Türkiye Puzzle Derneği (YAPBOZ DERNEĞİ) öncülüğünde düzenlenen Avrupa Puzzle Şampiyonası...',
      },
    })
    
    return NextResponse.json({ success: true, message: 'Seeded' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
