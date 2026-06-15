import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
envContent.split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    const key = match[1].trim();
    let val = match[2].trim();
    if (val.startsWith('"') && val.endsWith('"')) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
});

async function run() {
  const { getPayload } = await import('payload');
  const configPromise = (await import('./payload.config')).default;
  const payload = await getPayload({ config: configPromise });

  await payload.updateGlobal({
    slug: 'homePage' as any,
    locale: 'en',
    data: {
      hero: {
        title: 'EUROPEAN PUZZLE CHAMPIONSHIP',
        subtitle: 'EXCITEMENT HAS BEGUN!',
        description: "Join the competition, show your skills and meet thousands of puzzle enthusiasts from all over Turkey under the same roof.",
        primaryButton: {
          text: 'Register for Competition',
          url: '/register'
        },
        secondaryButton: {
          text: 'Become a Member',
          url: '/uyelik'
        },
        badge: "🧩 TURKEY'S FIRST AND ONLY OFFICIAL PUZZLE ASSOCIATION"
      },
      floatingCard: {
        title: 'Award-Winning Competitions',
        subtitle: 'Surprise gifts!',
        icon: 'trophy'
      },
      about: {
        title: 'About European Puzzle Championship',
        paragraphs: [
          { text: "Organized under the leadership of the Puzzle Association (YAPBOZ DERNEĞİ), the European Puzzle Championship brings together hundreds of puzzle enthusiasts every year. Test your speed, show your skills and win surprise awards in exciting competitions held in individual and team categories!" },
          { text: "You can visit our official ticketing page from the 'Register for Competition' button above to get information about the rules, scoring system and detailed competition program." }
        ]
      }
    },
  });

  console.log("English home page seeded successfully!");
  process.exit(0);
}

run().catch(console.error);
