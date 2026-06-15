const fs = require('fs');
const path = require('path');

const tr = {
  nameLabel: "Ad Soyad *", namePlaceholder: "Adınız Soyadınız", emailLabel: "E-Posta *", emailPlaceholder: "ornek@email.com",
  phoneLabel: "Telefon", phonePlaceholder: "(5XX) XXX XX XX", subjectLabel: "Konu *", subjectPlaceholder: "Mesajınızın konusu",
  messageLabel: "Mesajınız *", messagePlaceholder: "Mesajınızı buraya yazabilirsiniz...", submitIdle: "Mesajı Gönder",
  submitLoading: "Gönderiliyor...", successTitle: "Mesajınız Gönderildi!", successDesc: "En kısa sürede size dönüş yapacağız.",
  successBtn: "Yeni mesaj gönder →", errorDefault: "Beklenmeyen bir hata oluştu."
};

const en = {
  nameLabel: "Full Name *", namePlaceholder: "Your Full Name", emailLabel: "Email *", emailPlaceholder: "example@email.com",
  phoneLabel: "Phone", phonePlaceholder: "+1 (555) 000-0000", subjectLabel: "Subject *", subjectPlaceholder: "Subject of your message",
  messageLabel: "Your Message *", messagePlaceholder: "Write your message here...", submitIdle: "Send Message",
  submitLoading: "Sending...", successTitle: "Message Sent!", successDesc: "We will get back to you as soon as possible.",
  successBtn: "Send another message →", errorDefault: "An unexpected error occurred."
};

const de = {
  nameLabel: "Vor- und Nachname *", namePlaceholder: "Ihr vollständiger Name", emailLabel: "E-Mail *", emailPlaceholder: "beispiel@email.com",
  phoneLabel: "Telefon", phonePlaceholder: "+49 151 0000000", subjectLabel: "Betreff *", subjectPlaceholder: "Betreff Ihrer Nachricht",
  messageLabel: "Ihre Nachricht *", messagePlaceholder: "Schreiben Sie hier Ihre Nachricht...", submitIdle: "Nachricht senden",
  submitLoading: "Wird gesendet...", successTitle: "Nachricht gesendet!", successDesc: "Wir werden uns so schnell wie möglich bei Ihnen melden.",
  successBtn: "Neue Nachricht senden →", errorDefault: "Ein unerwarteter Fehler ist aufgetreten."
};

const fr = {
  nameLabel: "Nom et Prénom *", namePlaceholder: "Votre nom complet", emailLabel: "E-mail *", emailPlaceholder: "exemple@email.com",
  phoneLabel: "Téléphone", phonePlaceholder: "+33 6 00 00 00 00", subjectLabel: "Sujet *", subjectPlaceholder: "Sujet de votre message",
  messageLabel: "Votre Message *", messagePlaceholder: "Écrivez votre message ici...", submitIdle: "Envoyer le message",
  submitLoading: "Envoi en cours...", successTitle: "Message envoyé !", successDesc: "Nous vous répondrons dans les plus brefs délais.",
  successBtn: "Envoyer un autre message →", errorDefault: "Une erreur inattendue s'est produite."
};

const ru = {
  nameLabel: "ФИО *", namePlaceholder: "Ваше полное имя", emailLabel: "Электронная почта *", emailPlaceholder: "example@email.com",
  phoneLabel: "Телефон", phonePlaceholder: "+7 900 000-00-00", subjectLabel: "Тема *", subjectPlaceholder: "Тема вашего сообщения",
  messageLabel: "Ваше сообщение *", messagePlaceholder: "Напишите ваше сообщение здесь...", submitIdle: "Отправить сообщение",
  submitLoading: "Отправка...", successTitle: "Сообщение отправлено!", successDesc: "Мы свяжемся с вами как можно скорее.",
  successBtn: "Отправить еще одно сообщение →", errorDefault: "Произошла непредвиденная ошибка."
};

const translations = { tr, en, de, fr, ru };

function run() {
  const dir = path.join(__dirname, 'src', 'messages');
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const lang = file.replace('.json', '');
    
    if (translations[lang]) {
        const content = JSON.parse(fs.readFileSync(path.join(dir, file), 'utf8'));
        content.contactForm = translations[lang];
        fs.writeFileSync(path.join(dir, file), JSON.stringify(content, null, 2));
        console.log(`Updated contactForm in ${lang}.json`);
    }
  }
}
run();
