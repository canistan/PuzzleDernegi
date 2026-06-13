import { getPayload } from 'payload'
import configPromise from './payload.config'

async function seedSponsors() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    // Check existing homePage global data
    const homePage = await payload.findGlobal({
      slug: 'homePage' as any,
    });

    const defaultSponsors = [
      { name: 'Yeşilay (Metin)', type: 'preset', presetType: 'yesilay_text' },
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
        sponsors: defaultSponsors,
      },
    })
    
    console.log('Sponsors successfully seeded to the panel!')
  } catch (error) {
    console.error('Error seeding sponsors:', error)
  }
  process.exit(0)
}

seedSponsors()
