import { getPayload } from 'payload';
import configPromise from './payload.config';

async function seed() {
  const payload = await getPayload({ config: configPromise });
  
  const defaultSponsors = [
    { name: 'Puzzle Derneği', type: 'preset', presetType: 'dernek' },
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
      sponsors: defaultSponsors as any,
      heroTitle: 'AVRUPA PUZZLE ŞAMPİYONASI',
      heroSubtitle: 'HEYECANI BAŞLADI!',
      heroDescription: 'Yarışmaya katıl, yeteneğini göster ve Türkiye\'nin dört bir yanındaki binlerce puzzle tutkunuyla aynı çatı altında buluş.',
    },
  });
  console.log("Seeded successfully");
  process.exit(0);
}

seed().catch(console.error);
