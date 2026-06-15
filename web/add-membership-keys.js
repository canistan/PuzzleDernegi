const fs = require('fs');
const path = require('path');

const newKeys = {
  tr: {
    "puzzleExperience": "3. Puzzle Deneyimi",
    "favoritePuzzleBrandsLabel": "Tercih Ettiğiniz Puzzle Markaları",
    "favoritePuzzleBrandsPlaceholder": "Örn: Educa, Ravensburger, Anatolian...",
    "requiredDocuments": "4. Gerekli Belgeler",
    "photoLabel": "Vesikalık Fotoğraf",
    "photoDesc": "Lütfen son 6 ay içinde çekilmiş net bir vesikalık fotoğraf yükleyin.",
    "identityCardLabel": "Kimlik Görüntüsü (Ön Yüz)",
    "identityCardDesc": "Resmi işlemler için kimlik belgenizin okunaklı bir fotoğrafını yükleyin."
  },
  en: {
    "puzzleExperience": "3. Puzzle Experience",
    "favoritePuzzleBrandsLabel": "Preferred Puzzle Brands",
    "favoritePuzzleBrandsPlaceholder": "E.g. Educa, Ravensburger, Anatolian...",
    "requiredDocuments": "4. Required Documents",
    "photoLabel": "Passport Size Photo",
    "photoDesc": "Please upload a clear passport photo taken within the last 6 months.",
    "identityCardLabel": "Identity Card (Front)",
    "identityCardDesc": "Please upload a legible photo of your ID for official procedures."
  },
  de: {
    "puzzleExperience": "3. Puzzle Erfahrung",
    "favoritePuzzleBrandsLabel": "Bevorzugte Puzzle-Marken",
    "favoritePuzzleBrandsPlaceholder": "z.B. Educa, Ravensburger, Anatolian...",
    "requiredDocuments": "4. Erforderliche Dokumente",
    "photoLabel": "Passfoto",
    "photoDesc": "Bitte laden Sie ein deutliches Passfoto hoch, das in den letzten 6 Monaten aufgenommen wurde.",
    "identityCardLabel": "Personalausweis (Vorderseite)",
    "identityCardDesc": "Bitte laden Sie ein lesbares Foto Ihres Ausweises für offizielle Verfahren hoch."
  },
  fr: {
    "puzzleExperience": "3. Expérience des puzzles",
    "favoritePuzzleBrandsLabel": "Marques de puzzles préférées",
    "favoritePuzzleBrandsPlaceholder": "Ex. Educa, Ravensburger, Anatolian...",
    "requiredDocuments": "4. Documents requis",
    "photoLabel": "Photo d'identité",
    "photoDesc": "Veuillez télécharger une photo d'identité claire prise au cours des 6 derniers mois.",
    "identityCardLabel": "Carte d'identité (recto)",
    "identityCardDesc": "Veuillez télécharger une photo lisible de votre pièce d'identité pour les procédures officielles."
  },
  ru: {
    "puzzleExperience": "3. Опыт сборки пазлов",
    "favoritePuzzleBrandsLabel": "Предпочитаемые бренды пазлов",
    "favoritePuzzleBrandsPlaceholder": "Например: Educa, Ravensburger, Anatolian...",
    "requiredDocuments": "4. Необходимые документы",
    "photoLabel": "Фотография на паспорт",
    "photoDesc": "Пожалуйста, загрузите четкую фотографию на паспорт, сделанную не позднее 6 месяцев назад.",
    "identityCardLabel": "Удостоверение личности (лицевая сторона)",
    "identityCardDesc": "Пожалуйста, загрузите разборчивое фото вашего удостоверения личности для официальных процедур."
  }
};

const dir = path.join(__dirname, 'src', 'messages');

for (const lang of Object.keys(newKeys)) {
  const file = path.join(dir, `${lang}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!data.membership) data.membership = {};
    Object.assign(data.membership, newKeys[lang]);
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
}
console.log('Done adding membership keys');
