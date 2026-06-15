const { getPayload } = require('payload');
const configPromise = require('./payload.config');


const en = {
  heroBadgeText: "🧩 TURKEY'S FIRST AND ONLY OFFICIAL PUZZLE ASSOCIATION",
  heroTitle: "EUROPEAN PUZZLE CHAMPIONSHIP",
  heroSubtitle: "THE EXCITEMENT HAS BEGUN!",
  heroDescription: "Join the competition, show your skills and meet thousands of puzzle enthusiasts from all over Turkey under the same roof.",
  primaryButtonText: "Register for the Competition",
  secondaryButtonText: "Join the Association",
  floatingBadgeTitle: "Award-Winning Competitions",
  floatingBadgeSubtitle: "Surprise gifts!",
  aboutTitle: "About the European Puzzle Championship",
  aboutText1: "Organized under the leadership of the Turkish Puzzle Association (YAPBOZ DERNEĞİ), the European Puzzle Championship brings together hundreds of puzzle enthusiasts every year. Test your speed, show off your skills and win surprise prizes in thrilling competitions held in individual and team categories!",
  aboutText2: "For information about the rules, scoring system, and detailed competition schedule, you can visit our official ticketing page by clicking the 'Register for the Competition' button above.",
  sponsorsTitle: "Sponsors"
};

const de = {
  heroBadgeText: "🧩 TÜRKISCHER ERSTER UND EINZIGER OFFIZIELLER PUZZLEVERBAND",
  heroTitle: "EUROPÄISCHE PUZZLE-MEISTERSCHAFT",
  heroSubtitle: "DIE SPANNUNG HAT BEGONNEN!",
  heroDescription: "Nehmen Sie am Wettbewerb teil, zeigen Sie Ihr Können und treffen Sie tausende Puzzle-Enthusiasten aus der ganzen Türkei unter einem Dach.",
  primaryButtonText: "Für den Wettbewerb registrieren",
  secondaryButtonText: "Dem Verband beitreten",
  floatingBadgeTitle: "Preisgekrönte Wettbewerbe",
  floatingBadgeSubtitle: "Überraschungsgeschenke!",
  aboutTitle: "Über die Europäische Puzzle-Meisterschaft",
  aboutText1: "Unter der Leitung des türkischen Puzzle-Verbandes (YAPBOZ DERNEĞİ) bringt die Europäische Puzzle-Meisterschaft jedes Jahr Hunderte von Puzzle-Enthusiasten zusammen. Testen Sie Ihre Geschwindigkeit, zeigen Sie Ihr Können und gewinnen Sie Überraschungspreise in spannenden Wettbewerben, die in Einzel- und Teamkategorien ausgetragen werden!",
  aboutText2: "Für Informationen zu den Regeln, dem Punktesystem und dem detaillierten Wettbewerbsplan können Sie unsere offizielle Ticketseite besuchen, indem Sie oben auf die Schaltfläche 'Für den Wettbewerb registrieren' klicken.",
  sponsorsTitle: "Sponsoren"
};

const fr = {
  heroBadgeText: "🧩 PREMIÈRE ET UNIQUE ASSOCIATION OFFICIELLE DE PUZZLES EN TURQUIE",
  heroTitle: "CHAMPIONNAT D'EUROPE DE PUZZLES",
  heroSubtitle: "L'EXCITATION A COMMENCÉ !",
  heroDescription: "Rejoignez la compétition, montrez vos compétences et rencontrez des milliers de passionnés de puzzles de toute la Turquie sous le même toit.",
  primaryButtonText: "S'inscrire à la compétition",
  secondaryButtonText: "Rejoindre l'association",
  floatingBadgeTitle: "Compétitions Primées",
  floatingBadgeSubtitle: "Cadeaux surprises !",
  aboutTitle: "À propos du Championnat d'Europe de Puzzles",
  aboutText1: "Organisé sous la direction de l'Association Turque de Puzzles (YAPBOZ DERNEĞİ), le Championnat d'Europe de Puzzles rassemble chaque année des centaines de passionnés. Testez votre vitesse, montrez vos compétences et gagnez des prix surprises lors de compétitions palpitantes organisées en catégories individuelles et par équipes !",
  aboutText2: "Pour obtenir des informations sur les règles, le système de notation et le calendrier détaillé des compétitions, vous pouvez visiter notre page officielle de billetterie en cliquant sur le bouton 'S'inscrire à la compétition' ci-dessus.",
  sponsorsTitle: "Sponsors"
};

async function run() {
  const payload = await getPayload({ config: configPromise.default });
  
  const translations = { en, de, fr };
  
  for (const [locale, data] of Object.entries(translations)) {
    console.log(`Updating homePage for ${locale}...`);
    try {
        await payload.updateGlobal({
          slug: 'homePage',
          locale: locale,
          data: {
              heroBadgeText: data.heroBadgeText,
              heroTitle: data.heroTitle,
              heroSubtitle: data.heroSubtitle,
              heroDescription: data.heroDescription,
              primaryButtonText: data.primaryButtonText,
              secondaryButtonText: data.secondaryButtonText,
              floatingBadgeTitle: data.floatingBadgeTitle,
              floatingBadgeSubtitle: data.floatingBadgeSubtitle,
              aboutTitle: data.aboutTitle,
              aboutText1: data.aboutText1,
              aboutText2: data.aboutText2,
              sponsorsTitle: data.sponsorsTitle
          }
        });
        console.log(`Success for ${locale}`);
    } catch(err) {
        console.error(err);
    }
  }
  process.exit(0);
}
run();
