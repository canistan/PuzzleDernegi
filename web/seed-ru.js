const { getPayload } = require('payload');
const configPromise = require('./payload.config');

const ru = {
  heroBadgeText: "🧩 ПЕРВАЯ И ЕДИНСТВЕННАЯ ОФИЦИАЛЬНАЯ АССОЦИАЦИЯ ПАЗЛОВ В ТУРЦИИ",
  heroTitle: "ЧЕМПИОНАТ ЕВРОПЫ ПО ПАЗЛАМ",
  heroSubtitle: "ВОЛНЕНИЕ НАЧАЛОСЬ!",
  heroDescription: "Присоединяйтесь к соревнованиям, покажите свои навыки и встретьтесь с тысячами энтузиастов пазлов со всей Турции под одной крышей.",
  primaryButtonText: "Зарегистрироваться на соревнование",
  secondaryButtonText: "Присоединиться к ассоциации",
  floatingBadgeTitle: "Призовые соревнования",
  floatingBadgeSubtitle: "Сюрпризы и подарки!",
  aboutTitle: "О Чемпионате Европы по пазлам",
  aboutText1: "Организованный под руководством Турецкой ассоциации пазлов (YAPBOZ DERNEĞİ), Чемпионат Европы по пазлам каждый год собирает сотни энтузиастов. Проверьте свою скорость, покажите свои навыки и выиграйте призы-сюрпризы в захватывающих соревнованиях в индивидуальных и командных категориях!",
  aboutText2: "Для получения информации о правилах, системе подсчета очков и подробном расписании соревнований, вы можете посетить нашу официальную страницу продажи билетов, нажав кнопку 'Зарегистрироваться на соревнование' выше.",
  sponsorsTitle: "Спонсоры"
};

async function run() {
  const payload = await getPayload({ config: configPromise.default });
  
  console.log(`Updating homePage for ru...`);
  try {
      await payload.updateGlobal({
        slug: 'homePage',
        locale: 'ru',
        data: {
            heroBadgeText: ru.heroBadgeText,
            heroTitle: ru.heroTitle,
            heroSubtitle: ru.heroSubtitle,
            heroDescription: ru.heroDescription,
            primaryButtonText: ru.primaryButtonText,
            secondaryButtonText: ru.secondaryButtonText,
            floatingBadgeTitle: ru.floatingBadgeTitle,
            floatingBadgeSubtitle: ru.floatingBadgeSubtitle,
            aboutTitle: ru.aboutTitle,
            aboutText1: ru.aboutText1,
            aboutText2: ru.aboutText2,
            sponsorsTitle: ru.sponsorsTitle
        }
      });
      console.log(`Success for ru`);
  } catch(err) {
      console.error(err);
  }
  process.exit(0);
}
run();
