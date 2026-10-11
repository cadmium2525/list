// Optional authoring utility. Deployment has no sharp or npm dependency.
const fs = require('node:fs');
const path = require('node:path');
const sharp = require(process.env.CADMIUM_SHARP || 'sharp');
const assets = path.resolve(__dirname, '../dist/assets');
(async () => {
  const names = ['atelier-hero.png','sumaraku-cover.png','mic-cover.png','sumamama-icon.png','giftntool-icon.png','endless-monsters-cover.jpg','infographic-cover.jpg','c-tools-cover.jpg'];
  for (const name of names) {
    const input = path.join(assets, name);
    if (!fs.existsSync(input)) continue;
    const output = path.join(assets, name.replace(/\.(png|jpg)$/, '.webp'));
    await sharp(input).resize({width:name==='atelier-hero.png'?1100:960,withoutEnlargement:true}).webp({quality:83,effort:5}).toFile(output);
    console.log(`${name}: ${fs.statSync(input).size} → ${fs.statSync(output).size} bytes`);
  }
  const svg=fs.readFileSync(path.join(assets,'favicon.svg'));
  const icons=path.join(assets,'icons');
  fs.mkdirSync(icons,{recursive:true});
  for (const size of [180,192,512]) await sharp(svg,{density:384}).resize(size,size).png().toFile(path.join(icons,size===180?'apple-touch-icon.png':`icon-${size}.png`));
  const maskable=svg.toString().replace('rx="17"','rx="0"');
  await sharp(Buffer.from(maskable),{density:384}).resize(512,512).png().toFile(path.join(icons,'maskable-512.png'));
})();
