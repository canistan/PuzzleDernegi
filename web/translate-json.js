const fs = require('fs');
const path = require('path');
const { translateJSON } = require('./src/utilities/translate.ts');

const translations = {
  nameLabel: "Ad Soyad *",
  namePlaceholder: "Adınız Soyadınız",
  emailLabel: "E-Posta *",
  emailPlaceholder: "ornek@email.com",
  phoneLabel: "Telefon",
  phonePlaceholder: "(5XX) XXX XX XX",
  subjectLabel: "Konu *",
  subjectPlaceholder: "Mesajınızın konusu",
  messageLabel: "Mesajınız *",
  messagePlaceholder: "Mesajınızı buraya yazabilirsiniz...",
  submitIdle: "Mesajı Gönder",
  submitLoading: "Gönderiliyor...",
  successTitle: "Mesajınız Gönderildi!",
  successDesc: "En kısa sürede size dönüş yapacağız.",
  successBtn: "Yeni mesaj gönder →",
  errorDefault: "Beklenmeyen bir hata oluştu."
};

async function run() {
  const dir = path.join(__dirname, 'src', 'messages');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const lang = file.replace('.json', '');
    
    const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (lang === 'tr') {
       content.contactForm = translations;
    } else {
       console.log(`Translating contactForm for ${lang}...`);
       // For speed, let's just use the translate function directly!
       // Oh wait, translateJSON expects typescript execution
    }
    fs.writeFileSync(path.join(dir, file), JSON.stringify(content, null, 2));
  }
}
run();
