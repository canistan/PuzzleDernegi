const fs = require('fs');
const path = require('path');

const galleryAll = {
  tr: "Tümü",
  en: "All",
  de: "Alle",
  fr: "Tout",
  ru: "Все"
};

const dir = path.join(__dirname, 'src', 'messages');

for (const lang of Object.keys(galleryAll)) {
  const file = path.join(dir, `${lang}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!data.gallery) data.gallery = {};
    data.gallery.all = galleryAll[lang];
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
  }
}
console.log('Added gallery.all');
