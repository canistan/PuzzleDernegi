import { getPayload } from 'payload';
import configPromise from './payload.config';
import fs from 'fs';

async function run() {
  const payload = await getPayload({ config: configPromise });
  const doc = await payload.findGlobal({ slug: 'bylawsPage', locale: 'tr', depth: 0 });
  
  let output = `# Dernek Tüzüğü Orijinal Türkçe Metni\n\nBu dosyayı çevirirken lütfen sadece köşeli parantez altındaki Türkçe metinleri çevirin. \n**DİKKAT:** Lütfen \`<!-- BLOCK_ID: xxxx -->\` kısımlarını ve köşeli parantez içindeki etiketleri (\`[BAŞLIK]\`, \`[PARAGRAF]\` vb.) **kesinlikle silmeyin ve çevirmeyin**. Veritabanına aktarım için onlara ihtiyacım var.\n\n---\n\n`;
  if (doc.blocks) {
    doc.blocks.forEach((block: any, index: number) => {
      output += `<!-- BLOCK_ID: ${block.id} -->\n`;
      if (block.blockType === 'section_title') {
         output += `[BAŞLIK]\n${block.content}\n\n`;
      } else if (block.blockType === 'madde') {
         output += `[MADDE ${block.maddeNo}]\n${block.content}\n\n`;
      } else if (block.blockType === 'list_item') {
         output += `[LİSTE_MADDESİ ${block.listMarker}]\n${block.content}\n\n`;
      } else if (block.blockType === 'paragraph') {
         output += `[PARAGRAF]\n${block.content}\n\n`;
      }
    });
  }

  fs.writeFileSync('/Users/canalbayrak/.gemini/antigravity-ide/brain/a9db596e-14a8-41d0-883d-c33142340639/tuzuk_orijinal_turkce.md', output);
  console.log('Exported');
  process.exit(0);
}
run().catch(console.error);
