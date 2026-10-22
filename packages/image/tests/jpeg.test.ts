import { describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import url from 'url';

import JPEG from '../src/jpeg';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

// 40x20 JPEG with little-endian EXIF orientation 6 (rotated 90°)
const orientedJPEG = fs.readFileSync(
  path.join(__dirname, './assets/orientation.jpg'),
);

describe('image jpeg', () => {
  test('Should swap dimensions of rotated images', () => {
    const image = new JPEG(Buffer.from(orientedJPEG));

    expect(image.width).toBe(20);
    expect(image.height).toBe(40);
  });

  test('Should not mutate image data', () => {
    const data = Buffer.from(orientedJPEG);
    const image = new JPEG(data);

    expect(image.data.equals(orientedJPEG)).toBe(true);
  });

  test('Should read orientation again from the same data', () => {
    const data = Buffer.from(orientedJPEG);
    new JPEG(data);
    const image = new JPEG(data);

    expect(image.width).toBe(20);
    expect(image.height).toBe(40);
  });
});
