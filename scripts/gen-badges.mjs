import sharp from 'sharp';
import { readFileSync, readdirSync } from 'fs';
import { resolve, join } from 'path';

const BASE = resolve('./public/images/certifications');
const families = ['jamf', 'apple', 'microsoft'];

let count = 0;
for (const fam of families) {
  const dir = join(BASE, fam);
  let files;
  try { files = readdirSync(dir).filter(f => f.endsWith('.svg')); }
  catch { continue; }
  for (const svg of files) {
    const pngPath = join(dir, svg.replace('.svg', '.png'));
    await sharp(readFileSync(join(dir, svg)))
      .resize(320, 320)
      .png({ quality: 95 })
      .toFile(pngPath);
    console.log(`✅ ${fam}/${svg.replace('.svg', '.png')}`);
    count++;
  }
}
console.log(`\nTotal: ${count} PNG générés`);
