import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const svg = readFileSync('public/icons/icon.svg');
const sizes = [16, 48, 128];

await Promise.all(
  sizes.map((size) =>
    sharp(svg).resize(size, size).png().toFile(`public/icons/icon-${size}.png`),
  ),
);

console.log('✅ Icons generated: 16x16, 48x48, 128x128');
