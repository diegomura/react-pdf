import fs from 'fs';
import path from 'path';

import getRatio from '../../src/image/getRatio';
import resolveImage, { IMAGE_CACHE } from '../../src/image/resolveImage';

const jpgLogalPath = path.join(__dirname, '../assets/test.jpg');
const localJPGImage = fs.readFileSync(jpgLogalPath);
const pngLogalPath = path.join(__dirname, '../assets/test.png');
const localPNGImage = fs.readFileSync(pngLogalPath);

describe('image getRatio', () => {
  beforeEach(() => {
    IMAGE_CACHE.reset();
  });

  test('Should return 1 as default if no data available', () => {
    const node = { type: 'IMAGE' };

    expect(getRatio(node)).toEqual(1);
  });

  test('Should return correct ratio for jpg image', async () => {
    const image = await resolveImage(localJPGImage);
    const node = { type: 'IMAGE', image };

    expect(getRatio(node)).toBeCloseTo(1.666);
  });

  test('Should return correct ratio for png image', async () => {
    const image = await resolveImage(localPNGImage);
    const node = { type: 'IMAGE', image };

    expect(getRatio(node)).toBeCloseTo(1.666);
  });
});
