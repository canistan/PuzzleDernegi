const fs = require('fs');

const formPath = 'src/app/(app)/uyelik/UyelikClientForm.tsx';
let content = fs.readFileSync(formPath, 'utf8');

// 1. Update Props
content = content.replace(
    /export default function UyelikClientForm\(\{ title, subtitle \}: \{ title: string, subtitle: string \}\) \{/,
    "export default function UyelikClientForm({ title, subtitle, formSettings }: { title: string, subtitle: string, formSettings: any[] }) {"
);

// 2. Add Helper Functions
const helpers = `
  const isVisible = (name: string) => {
    // If formSettings is empty, default to true for backward compatibility or simple fallback
    if (!formSettings || formSettings.length === 0) return true;
    return formSettings.some(s => s.fieldName === name);
  };
  
  const isRequired = (name: string) => {
    if (!formSettings || formSettings.length === 0) return false;
    const field = formSettings.find(s => s.fieldName === name);
    return field ? field.required : false;
  };
`;
content = content.replace(
    /const \[error, setError\] = useState\(''\);/,
    "const [error, setError] = useState('');\n" + helpers
);

// 3. Helper to replace inputs conditionally
function wrapField(content, fieldName, searchStr) {
    // Find the block for the field, starting from the div and ending at the closing div.
    // Since regex for nested divs is hard, we can just replace the required attributes first
    // and then we can wrap the whole div manually for each field if we want.
    // A simpler approach for the script: replace `required` with `required={isRequired('fieldName')}`
    // and for visibility, we can wrap the whole `<div>...label...input...</div>` block.
    return content;
}

// Actually, regex replacement for wrapping <div> is tricky because of nested divs.
// Let's replace the `required` attributes first.
const fields = [
    'tcNo', 'birthDate', 'gender', 'bloodType', 'motherName', 'fatherName', 'birthPlace',
    'email', 'phone', 'address', 'workAddress', 'profession', 'educationStatus',
    'puzzleCount', 'favoritePuzzleBrands', 'photo', 'identityCard'
];

fields.forEach(field => {
    // Replace `required` with `required={isRequired('FIELD')}` for this specific field
    // Note: Some fields don't have `required` written in the original code, we will add it.
    let re = new RegExp(`name="${field}"(?:\\s+required)?`);
    content = content.replace(re, `name="${field}" required={isRequired('${field}')}`);
});

// For labels, replace `Label *` with `Label {isRequired('FIELD') && '*'}`
const labelMap = {
    'tcNo': 'TC Kimlik No',
    'birthDate': 'Doğum Tarihi',
    'gender': 'Cinsiyet',
    'bloodType': 'Kan Grubu',
    'motherName': 'Anne Adı',
    'fatherName': 'Baba Adı',
    'birthPlace': 'Doğum Yeri',
    'email': 'E-Mail Adresi',
    'phone': 'Cep Telefonu',
    'address': 'Yerleşim \\(İkametgah\\) Adresi',
    'workAddress': 'İş Adresi',
    'profession': 'Meslek',
    'educationStatus': 'Öğrenim Durumu',
    'puzzleCount': 'Şimdiye Kadar Yaptığınız Puzzle Sayısı',
    'favoritePuzzleBrands': 'Tercih Ettiğiniz Puzzle Markaları',
    'photo': 'Vesikalık Fotoğraf',
    'identityCard': 'Kimlik Görüntüsü \\(Ön Yüz\\)'
};

Object.entries(labelMap).forEach(([field, labelText]) => {
    // Replace exactly ">Label *<" or ">Label<"
    let re1 = new RegExp(`>${labelText} \\*<`, 'g');
    content = content.replace(re1, `>${labelText.replace(/\\/g, '')} {isRequired('${field}') && '*'}<`);
    
    let re2 = new RegExp(`>${labelText}<`, 'g');
    content = content.replace(re2, `>${labelText.replace(/\\/g, '')} {isRequired('${field}') && '*'}<`);
});

// Now we wrap the divs with `{isVisible('field') && ( ... )}`
// This is best done by searching for the label and finding its parent div.
// We'll use a hacky but effective replacement:
Object.entries(labelMap).forEach(([field, labelText]) => {
    // The div usually looks like:
    // <div>
    //   <label ...>Label...</label>
    //   <input ...>
    // </div>
    // Let's replace `<div className="md:col-span-2">` or `<div>` that precedes the label!
    let escapedLabel = labelText.replace(/\\/g, '\\\\');
    let reBlock = new RegExp(`(<div(?: className="md:col-span-2")?>\\s*<label[^>]*>${labelText.replace(/\\/g, '')}[^<]*</label>[\\s\\S]*?</div>)`, 'g');
    content = content.replace(reBlock, `{isVisible('${field}') && (\n                  $1\n                )}`);
});

fs.writeFileSync(formPath, content);
console.log("Form patched!");
