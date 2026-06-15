const fs = require('fs');
const path = require('path');

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

const baseSEO = {
  '2018_all_star_puzzle_h_z_yar__mas_': { slug: '2018-all-star-puzzle-hiz-yarismasi', text: '2018 All Star Puzzle Hız Yarışmasından bir kare' },
  '2019_world_jigsaw_puzzle_championship': { slug: '2019-dunya-yapboz-sampiyonasi-ispanya', text: 'İspanya Valladolid\'de düzenlenen 2019 Dünya Yapboz Şampiyonasından bir görüntü' },
  '2023_world_jigsaw_puzzle_championship': { slug: '2023-dunya-yapboz-sampiyonasi-ispanya', text: 'İspanya Valladolid\'de düzenlenen 2023 Dünya Yapboz Şampiyonasından rekabet dolu bir an' },
  '2025_denmark_championship': { slug: '2025-danimarka-yapboz-sampiyonasi', text: '2025 Danimarka Yapboz Şampiyonasında yarışan katılımcılar' }
};

let md = `# SEO Görsel Bilgileri\n\nPanele yüklerken bu alt metinleri kopyalayıp "Alt" kısmına yapıştırabilirsiniz.\n\n`;

for (const dir of directories) {
  const dirPath = path.join(process.cwd(), 'public', 'yarisbul-images', dir);
  if (!fs.existsSync(dirPath)) continue;

  const files = fs.readdirSync(dirPath).filter(f => !f.startsWith('.'));
  const eventName = eventNames[dir];
  const seoInfo = baseSEO[dir];
  
  md += `## ${eventName}\n\n`;
  md += `| Eski Dosya | Yeni Dosya Adı | Alt Text (Alternatif Metin) |\n`;
  md += `|---|---|---|\n`;

  let counter = 1;
  for (const file of files) {
    if (file.includes(seoInfo.slug)) continue; // Already renamed maybe
    
    const filePath = path.join(dirPath, file);
    const ext = path.extname(file).toLowerCase();
    
    const randomStr = Math.random().toString(36).substring(2, 6);
    const newFilename = `${seoInfo.slug}-${counter}-${randomStr}${ext}`;
    const newFilePath = path.join(dirPath, newFilename);
    
    fs.renameSync(filePath, newFilePath);
    
    const altText = `${seoInfo.text} - Fotoğraf ${counter}`;
    
    md += `| ${file} | \`${newFilename}\` | ${altText} |\n`;
    counter++;
  }
  md += `\n`;
}

fs.writeFileSync(path.join(process.cwd(), 'seo-images-data.md'), md);
console.log('Finished renaming offline! Results written to seo-images-data.md');
