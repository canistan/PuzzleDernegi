const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const envContent = fs.readFileSync('.env.local', 'utf8');
let apiKey = '';
for (const line of envContent.split('\n')) {
  if (line.startsWith('GEMINI_API_KEY=')) {
    apiKey = line.split('=')[1].trim();
  }
}

const genAI = new GoogleGenerativeAI(apiKey);

const directories = [
  '2018_all_star_puzzle_h_z_yar__mas_',
  '2019_world_jigsaw_puzzle_championship',
  '2023_world_jigsaw_puzzle_championship',
  '2025_denmark_championship'
];

const eventNames = {
  '2018_all_star_puzzle_h_z_yar__mas_': '2018 All Star Puzzle Hız Yarışması',
  '2019_world_jigsaw_puzzle_championship': '2019 Dünya Yapboz Şampiyonası',
  '2023_world_jigsaw_puzzle_championship': '2023 Dünya Yapboz Şampiyonası',
  '2025_denmark_championship': '2025 Danimarka Yapboz Şampiyonası'
};

function fileToGenerativePart(filePath, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(filePath)).toString("base64"),
      mimeType
    },
  };
}

async function run() {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
  const results = [];

  for (const dir of directories) {
    const dirPath = path.join(process.cwd(), 'public', 'yarisbul-images', dir);
    if (!fs.existsSync(dirPath)) continue;

    const files = fs.readdirSync(dirPath).filter(f => !f.startsWith('.'));
    const eventName = eventNames[dir];

    for (const file of files) {
      if (file.includes('-seo-')) continue;
      
      const filePath = path.join(dirPath, file);
      const ext = path.extname(file).toLowerCase();
      const mimeType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
      
      const imagePart = fileToGenerativePart(filePath, mimeType);
      
      const prompt = `Bu görsel "${eventName}" etkinliğinden alınmış bir fotoğraf. 
Lütfen bu görseli analiz et ve bana SEO kurallarına uygun olarak şu iki bilgiyi JSON formatında dön:
1. filename: Görselin içeriğini anlatan, arama motoru optimizasyonu (SEO) için uygun, sadece küçük harf, rakam ve tire (-) içeren, Türkçe karakter (ı,ğ,ü,ş,ö,ç) İÇERMEYEN bir dosya adı. (uzantı dahil etme). Örnek: "danimarka-puzzle-sampiyonasi-yarisgan-kadin"
2. altText: Görselin içeriğini anlatan, görme engelliler ve arama motorları için anlamlı, 10-15 kelimeyi geçmeyen Türkçe Alt Bilgisi (Alt Text).

Sadece JSON formatında cevap ver. Örnek:
{
  "filename": "avrupa-puzzle-sampiyonasi-ekip-yarismasi",
  "altText": "Avrupa Puzzle Şampiyonası'nda birbiriyle yarışan ekip üyeleri."
}
`;

      try {
        console.log(`Analyzing: ${dir}/${file}`);
        const result = await model.generateContent([prompt, imagePart]);
        const response = await result.response;
        let text = response.text().trim();
        if (text.startsWith('```json')) text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        const data = JSON.parse(text);
        
        // Add random suffix to avoid duplicates
        const randomStr = Math.random().toString(36).substring(2, 6);
        const newFilename = `${data.filename}-${randomStr}${ext}`;
        const newFilePath = path.join(dirPath, newFilename);
        
        fs.renameSync(filePath, newFilePath);
        
        results.push({
          event: eventName,
          oldFile: file,
          newFile: newFilename,
          altText: data.altText
        });
        
        console.log(`  -> Renamed to: ${newFilename}`);
        console.log(`  -> Alt text: ${data.altText}`);
        
        await new Promise(r => setTimeout(r, 2000));
        
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  }

  let md = `# SEO Görsel Bilgileri\n\nBu dosya galerideki görsellerin yeni isimlerini ve SEO uyumlu Alt Text bilgilerini içerir. Panele yüklerken bu alt metinleri kopyalayıp "Alt" kısmına yapıştırabilirsiniz.\n\n`;
  
  for (const dir of directories) {
    const eventName = eventNames[dir];
    const eventResults = results.filter(r => r.event === eventName);
    if (eventResults.length === 0) continue;
    
    md += `## ${eventName}\n\n`;
    md += `| Eski Dosya | Yeni Dosya Adı | Alt Text (Alternatif Metin) |\n`;
    md += `|---|---|---|\n`;
    
    for (const r of eventResults) {
      md += `| ${r.oldFile} | \`${r.newFile}\` | ${r.altText} |\n`;
    }
    md += `\n`;
  }
  
  fs.writeFileSync(path.join(process.cwd(), 'seo-images-data.md'), md);
  console.log('Finished. Results written to seo-images-data.md');
}

run();
