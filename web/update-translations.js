const fs = require('fs');
const path = require('path');

const dir = './src/messages';
const files = fs.readdirSync(dir);

const newKeys = {
  tr: { chooseFile: 'Dosya Seç', noFileChosen: 'Dosya seçilmedi' },
  en: { chooseFile: 'Choose File', noFileChosen: 'No file chosen' },
  fr: { chooseFile: 'Choisir le fichier', noFileChosen: 'Aucun fichier choisi' },
  ru: { chooseFile: 'Выберите файл', noFileChosen: 'Файл не выбран' },
  de: { chooseFile: 'Datei auswählen', noFileChosen: 'Keine Datei ausgewählt' }
};

for (const file of files) {
  if (file.endsWith('.json')) {
    const lang = file.replace('.json', '');
    const filepath = path.join(dir, file);
    const content = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    
    if (newKeys[lang]) {
      content.common.chooseFile = newKeys[lang].chooseFile;
      content.common.noFileChosen = newKeys[lang].noFileChosen;
      fs.writeFileSync(filepath, JSON.stringify(content, null, 2));
      console.log(`Updated ${lang}`);
    }
  }
}
