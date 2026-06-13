const fs = require('fs');

let config = fs.readFileSync('payload.config.ts', 'utf8');

// 1. Remove required: true from members collection fields (except firstName and lastName maybe, but let's just make everything except firstName optional to be safe, or even firstName can be optional in DB if frontend handles it)
// We'll replace `required: true,` with `// required: true,` ONLY inside the `slug: 'members'` block.
const membersStart = config.indexOf("slug: 'members'");
const membersEnd = config.indexOf("slug: 'media'");
if (membersStart !== -1 && membersEnd !== -1) {
    let membersBlock = config.substring(membersStart, membersEnd);
    membersBlock = membersBlock.replace(/required:\s*true/g, 'required: false');
    config = config.substring(0, membersStart) + membersBlock + config.substring(membersEnd);
}

// 2. Add formFields to membershipPage
const membershipPageStart = config.indexOf("slug: 'membershipPage'");
const fieldsArrayMatch = config.substring(membershipPageStart).match(/fields:\s*\[/);

if (fieldsArrayMatch) {
    const insertPos = membershipPageStart + fieldsArrayMatch.index + fieldsArrayMatch[0].length;
    
    const formFieldsString = `
        {
          name: 'formSettings',
          type: 'array',
          label: 'Form Alanları Ayarları (Görünürlük & Zorunluluk)',
          admin: {
            description: 'Buraya formda göstermek istediğiniz alanları ekleyin. Eklenmeyen alanlar formda GİZLENECEKTİR.',
          },
          fields: [
            {
              name: 'fieldName',
              type: 'select',
              label: 'Alan Adı',
              required: true,
              options: [
                { label: 'TC Kimlik No', value: 'tcNo' },
                { label: 'Doğum Tarihi', value: 'birthDate' },
                { label: 'Cinsiyet', value: 'gender' },
                { label: 'Kan Grubu', value: 'bloodType' },
                { label: 'Anne Adı', value: 'motherName' },
                { label: 'Baba Adı', value: 'fatherName' },
                { label: 'Doğum Yeri', value: 'birthPlace' },
                { label: 'Cep Telefonu', value: 'phone' },
                { label: 'E-Mail Adresi', value: 'email' },
                { label: 'Yerleşim Yeri Adresi', value: 'address' },
                { label: 'İş Adresi', value: 'workAddress' },
                { label: 'Meslek', value: 'profession' },
                { label: 'Öğrenim Durumu', value: 'educationStatus' },
                { label: 'Puzzle Sayısı', value: 'puzzleCount' },
                { label: 'Favori Markalar', value: 'favoritePuzzleBrands' },
                { label: 'Vesikalık Fotoğraf', value: 'photo' },
                { label: 'Kimlik Görüntüsü', value: 'identityCard' },
              ]
            },
            {
              name: 'required',
              type: 'checkbox',
              label: 'Zorunlu Olsun mu?',
              defaultValue: false,
            }
          ]
        },`;
    
    config = config.substring(0, insertPos) + formFieldsString + config.substring(insertPos);
}

fs.writeFileSync('payload.config.ts', config);
console.log("Config patched!");
