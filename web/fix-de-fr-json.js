const fs = require('fs');
const path = require('path');

const dePath = path.join(__dirname, 'src', 'messages', 'de.json');
let deData = JSON.parse(fs.readFileSync(dePath, 'utf8'));

deData.cookieBanner = {
  "text": "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und sicherzustellen, dass unsere Website effizient funktioniert. Sie können unsere Cookie-Nutzung und die <link>Datenschutzerklärung</link> überprüfen. Sie können nicht wesentliche Cookies ablehnen.",
  "accept": "Akzeptieren",
  "reject": "Ablehnen"
};

deData.newsletter = {
  "title": "Bleiben Sie informiert",
  "description": "Abonnieren Sie unseren Newsletter, um sofort über neue Wettbewerbe, Veranstaltungen und Ankündigungen informiert zu werden.",
  "placeholder": "E-Mail-Adresse:",
  "subscribe": "Abonnieren",
  "success": "Sie haben sich erfolgreich angemeldet!",
  "error": "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut."
};

deData.membership = {
  "title": "Mitgliedschaftsformular",
  "subtitle": "Bitte füllen Sie das folgende Formular vollständig aus, um unserer Familie beizutreten.",
  "personalInfo": "1. Persönliche Informationen",
  "contactAndEducation": "2. Kontakt & Bildung",
  "workInfo": "3. Arbeitsdaten",
  "membershipDetails": "4. Details zur Mitgliedschaft",
  "firstName": "Vorname *",
  "lastName": "Nachname *",
  "idNumber": "Ausweis- / Passnummer",
  "birthDate": "Geburtsdatum",
  "gender": "Geschlecht",
  "genderSelect": "Auswählen...",
  "genderMale": "Männlich",
  "genderFemale": "Weiblich",
  "bloodGroup": "Blutgruppe",
  "motherName": "Name der Mutter",
  "fatherName": "Name des Vaters",
  "birthPlace": "Geburtsort",
  "email": "E-Mail Adresse *",
  "phone": "Mobiltelefon *",
  "address": "Wohnadresse *",
  "education": "Bildungsstand",
  "educationSelect": "Auswählen...",
  "educationPrimary": "Grundschule",
  "educationHigh": "Gymnasium",
  "educationBachelor": "Bachelor-Abschluss",
  "educationMaster": "Master-Abschluss",
  "profession": "Beruf",
  "institution": "Institution/Firma",
  "titleLabel": "Berufsbezeichnung",
  "puzzlesCount": "Anzahl der eigenen Puzzles",
  "heardFrom": "Wie haben Sie von uns erfahren?",
  "socialMedia": "Soziale Medien",
  "friend": "Empfehlung eines Freundes",
  "searchEngine": "Suchmaschine",
  "other": "Andere",
  "hasParticipated": "Haben Sie schon einmal an unseren Wettbewerben teilgenommen?",
  "yes": "Ja",
  "no": "Nein",
  "declaration1": "Ich habe die Vereinsstatuten gelesen und akzeptiere sie.",
  "declaration2": "Ich stimme der Verarbeitung meiner personenbezogenen Daten zu.",
  "submit": "Registrierung abschließen"
};

fs.writeFileSync(dePath, JSON.stringify(deData, null, 2));

const frPath = path.join(__dirname, 'src', 'messages', 'fr.json');
let frData = JSON.parse(fs.readFileSync(frPath, 'utf8'));

frData.cookieBanner = {
  "text": "Nous utilisons des cookies pour améliorer votre expérience et garantir le bon fonctionnement de notre site. Vous pouvez consulter notre utilisation des cookies et notre <link>Politique de confidentialité</link>. Vous pouvez refuser les cookies non essentiels.",
  "accept": "Accepter",
  "reject": "Refuser"
};

frData.newsletter = {
  "title": "Restez informé",
  "description": "Abonnez-vous à notre newsletter pour être instantanément informé des nouveaux concours, événements et annonces.",
  "placeholder": "Adresse e-mail :",
  "subscribe": "S'abonner",
  "success": "Vous vous êtes abonné avec succès !",
  "error": "Une erreur s'est produite, veuillez réessayer."
};

frData.membership = {
  "title": "Formulaire d'adhésion",
  "subtitle": "Veuillez remplir entièrement le formulaire ci-dessous pour rejoindre notre famille.",
  "personalInfo": "1. Informations personnelles",
  "contactAndEducation": "2. Contact et Éducation",
  "workInfo": "3. Détails sur l'emploi",
  "membershipDetails": "4. Détails de l'adhésion",
  "firstName": "Prénom *",
  "lastName": "Nom de famille *",
  "idNumber": "N° de carte d'identité / Passeport",
  "birthDate": "Date de naissance",
  "gender": "Genre",
  "genderSelect": "Sélectionner...",
  "genderMale": "Homme",
  "genderFemale": "Femme",
  "bloodGroup": "Groupe sanguin",
  "motherName": "Nom de la mère",
  "fatherName": "Nom du père",
  "birthPlace": "Lieu de naissance",
  "email": "Adresse e-mail *",
  "phone": "Téléphone mobile *",
  "address": "Adresse de résidence *",
  "education": "Niveau d'études",
  "educationSelect": "Sélectionner...",
  "educationPrimary": "École primaire",
  "educationHigh": "Lycée",
  "educationBachelor": "Licence",
  "educationMaster": "Master",
  "profession": "Profession",
  "institution": "Institution/Entreprise",
  "titleLabel": "Titre du poste",
  "puzzlesCount": "Nombre de puzzles possédés",
  "heardFrom": "Comment avez-vous entendu parler de nous ?",
  "socialMedia": "Réseaux sociaux",
  "friend": "Recommandation d'un ami",
  "searchEngine": "Moteur de recherche",
  "other": "Autre",
  "hasParticipated": "Avez-vous déjà participé à nos concours ?",
  "yes": "Oui",
  "no": "Non",
  "declaration1": "J'ai lu et j'accepte les statuts de l'association.",
  "declaration2": "Je consens au traitement de mes données personnelles.",
  "submit": "Terminer l'inscription"
};

fs.writeFileSync(frPath, JSON.stringify(frData, null, 2));

console.log('Fixed de.json and fr.json');
