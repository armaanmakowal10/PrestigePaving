// One-off image optimizer. Run: node scripts/optimize-images.mjs
// Recompresses oversized raster assets in public/media. Originals of the
// giant before/after PNGs are moved to _media-originals/ (kept, not deleted).
import sharp from 'sharp';
import { promises as fs } from 'node:fs';
import path from 'node:path';

const MEDIA = path.resolve('public/media');
const BACKUP = path.resolve('_media-originals');

// Photos saved as full-res PNG -> resized JPEG. Returns {png -> jpg} renames.
const PNG_PHOTOS = [
  'IMG_1226.png', 'IMG_1235.png', 'IMG_1327.png', 'IMG_1331.png',
  'IMG_4625.png', 'IMG_4626.png', 'IMG_4627.png', 'IMG_4629.png',
];

// JPEGs recompressed in place (same filename).
const JPEGS = [
  'asphalt-paving-guide.jpg', 'pavement-marking-guide.jpg',
  '20190330_115127-e1554151664764.jpg', 'pexels-snapwire-6998.jpg',
  '167_3_0900_jpeg_6507e740-9c05-46e9-933a-5d52f39f15a8.jpg',
  'SuburbsPic2.jpg', 'Toronto-Sign.jpg', 'brampton.jpg',
  'nacsupplyinc-seotool-52134-howasealcoat-blogbanner3_2048x.jpg',
  'blog-4-commercial-paving-repair.jpg',
];

const kb = (n) => (n / 1024).toFixed(0) + ' KB';

async function sizeOf(p) {
  try { return (await fs.stat(p)).size; } catch { return 0; }
}

async function run() {
  await fs.mkdir(BACKUP, { recursive: true });
  let before = 0, after = 0;

  for (const name of PNG_PHOTOS) {
    const src = path.join(MEDIA, name);
    const orig = await sizeOf(src);
    if (!orig) { console.log('skip (missing):', name); continue; }
    const outName = name.replace(/\.png$/i, '.jpg');
    const out = path.join(MEDIA, outName);
    const buf = await sharp(src)
      .rotate() // honor EXIF orientation
      .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await fs.writeFile(out, buf);
    // move original PNG to backup so it doesn't ship in the build
    await fs.rename(src, path.join(BACKUP, name));
    before += orig; after += buf.length;
    console.log(`${name}  ${kb(orig)} -> ${outName} ${kb(buf.length)}`);
  }

  for (const name of JPEGS) {
    const src = path.join(MEDIA, name);
    const orig = await sizeOf(src);
    if (!orig) { console.log('skip (missing):', name); continue; }
    // Read bytes first so sharp never holds a handle on the file we overwrite.
    const input = await fs.readFile(src);
    const buf = await sharp(input)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toBuffer();
    if (buf.length < orig) {
      const tmp = src + '.tmp';
      await fs.writeFile(tmp, buf);
      await fs.rename(tmp, src);
      before += orig; after += buf.length;
      console.log(`${name}  ${kb(orig)} -> ${kb(buf.length)}`);
    } else {
      console.log(`${name}  kept (${kb(orig)}, already smaller)`);
    }
  }

  console.log(`\nTotal: ${kb(before)} -> ${kb(after)}  (saved ${kb(before - after)})`);
}

run().catch((e) => { console.error(e); process.exit(1); });
