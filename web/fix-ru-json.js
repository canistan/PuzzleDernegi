const fs = require('fs');
const path = require('path');

const ruPath = path.join(__dirname, 'src', 'messages', 'ru.json');
let ruData = JSON.parse(fs.readFileSync(ruPath, 'utf8'));

ruData.cookieBanner = {
  "text": "Мы используем файлы cookie для улучшения вашего опыта и обеспечения эффективной работы нашего сайта. Вы можете ознакомиться с использованием cookie и нашей <link>Политикой конфиденциальности</link>. Вы можете отклонить несущественные файлы cookie.",
  "accept": "Принять",
  "reject": "Отклонить"
};

ruData.newsletter = {
  "title": "Будьте в курсе",
  "description": "Подпишитесь на нашу рассылку, чтобы мгновенно получать информацию о новых соревнованиях, мероприятиях и объявлениях.",
  "placeholder": "Адрес электронной почты:",
  "subscribe": "Подписаться",
  "success": "Вы успешно подписались!",
  "error": "Произошла ошибка, пожалуйста, попробуйте еще раз."
};

ruData.membership = {
  "title": "Форма членства",
  "subtitle": "Пожалуйста, полностью заполните форму ниже, чтобы присоединиться к нашей семье.",
  "personalInfo": "1. Личная информация",
  "contactAndEducation": "2. Контакты и образование",
  "workInfo": "3. Данные о работе",
  "membershipDetails": "4. Детали членства",
  "firstName": "Имя *",
  "lastName": "Фамилия *",
  "idNumber": "Номер удостоверения / паспорта",
  "birthDate": "Дата рождения",
  "gender": "Пол",
  "genderSelect": "Выбрать...",
  "genderMale": "Мужской",
  "genderFemale": "Женский",
  "bloodGroup": "Группа крови",
  "motherName": "Имя матери",
  "fatherName": "Имя отца",
  "birthPlace": "Место рождения",
  "email": "Адрес эл. почты *",
  "phone": "Мобильный телефон *",
  "address": "Адрес проживания *",
  "education": "Образование",
  "educationSelect": "Выбрать...",
  "educationPrimary": "Начальная школа",
  "educationHigh": "Старшая школа",
  "educationBachelor": "Бакалавриат",
  "educationMaster": "Магистратура",
  "profession": "Профессия",
  "institution": "Учреждение/Компания",
  "titleLabel": "Должность",
  "puzzlesCount": "Количество имеющихся пазлов",
  "heardFrom": "Откуда вы о нас узнали?",
  "socialMedia": "Социальные сети",
  "friend": "Рекомендация друга",
  "searchEngine": "Поисковая система",
  "other": "Другое",
  "hasParticipated": "Участвовали ли вы ранее в наших соревнованиях?",
  "yes": "Да",
  "no": "Нет",
  "declaration1": "Я прочитал(а) и принимаю устав ассоциации.",
  "declaration2": "Я даю согласие на обработку моих персональных данных.",
  "submit": "Завершить регистрацию"
};

fs.writeFileSync(ruPath, JSON.stringify(ruData, null, 2));
console.log('Fixed ru.json');
