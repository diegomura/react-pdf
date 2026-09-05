import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import url from 'url';
import './types';

import resolveImage, { IMAGE_CACHE } from '../src/resolve';
import WEBP, { registerWebpTranscoder } from '../src/webp';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const localWEBPImage = fs.readFileSync(
  path.join(__dirname, './assets/test.webp'),
);
const localPNGImage = fs.readFileSync(
  path.join(__dirname, './assets/test.png'),
);
const localJPGImage = fs.readFileSync(
  path.join(__dirname, './assets/test.jpg'),
);
const localSVGImage = fs.readFileSync(
  path.join(__dirname, './assets/test.svg'),
);

const webpImageUrl = 'https://react-pdf.org/static/images/quijote.webp';

// PDF cannot embed WebP, so the resolver hands the bytes to a transcoder and embeds the PNG it
// returns. Node has no image decoder, so tests stand in for one with a known PNG.
const transcodeToTestPng = vi.fn(async () => localPNGImage);

describe('image webp', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    IMAGE_CACHE.reset();
    transcodeToTestPng.mockClear();
    registerWebpTranscoder(transcodeToTestPng);
  });

  afterEach(() => {
    registerWebpTranscoder(null);
  });

  describe('isValid', () => {
    test('Should accept a RIFF container whose form type is WEBP', () => {
      expect(WEBP.isValid(localWEBPImage)).toBe(true);
    });

    test('Should reject other image formats', () => {
      expect(WEBP.isValid(localPNGImage)).toBe(false);
      expect(WEBP.isValid(localJPGImage)).toBe(false);
      expect(WEBP.isValid(localSVGImage)).toBe(false);
    });

    test('Should reject a RIFF container that is not WEBP', () => {
      const wav = Buffer.from('RIFF\0\0\0\0WAVEfmt ', 'latin1');

      expect(WEBP.isValid(wav)).toBe(false);
    });

    test('Should reject a buffer too short to hold the magic bytes', () => {
      expect(WEBP.isValid(Buffer.from('RIFF', 'latin1'))).toBe(false);
    });
  });

  describe('resolve', () => {
    test('Should detect webp from the buffer and embed the transcoded png', async () => {
      const image = await resolveImage(localWEBPImage);

      expect(image?.format).toBe('png');
      expect(image?.data).toBe(localPNGImage);
      expect(image?.width).toBe(700);
      expect(image?.height).toBe(420);
    });

    test('Should hand the original webp bytes to the transcoder', async () => {
      await resolveImage(localWEBPImage);

      expect(transcodeToTestPng).toHaveBeenCalledTimes(1);
      expect(transcodeToTestPng).toHaveBeenCalledWith(localWEBPImage);
    });

    test('Should resolve a base64 webp data uri', async () => {
      const uri = `data:image/webp;base64,${localWEBPImage.toString('base64')}`;

      const image = await resolveImage({ uri });

      expect(image?.format).toBe('png');
      expect(image?.width).toBe(700);
    });

    test('Should resolve a webp blob', async () => {
      const blob = new Blob([localWEBPImage], { type: 'image/webp' });

      const image = await resolveImage(blob);

      expect(image?.format).toBe('png');
      expect(image?.width).toBe(700);
    });

    test('Should resolve a webp blob with no type by sniffing its bytes', async () => {
      const blob = new Blob([localWEBPImage]);

      const image = await resolveImage(blob);

      expect(image?.format).toBe('png');
      expect(image?.width).toBe(700);
    });

    test('Should resolve a webp passed through the data key', async () => {
      const image = await resolveImage({
        data: localWEBPImage,
        format: 'webp',
      });

      expect(image?.format).toBe('png');
      expect(image?.width).toBe(700);
    });

    test('Should resolve a remote webp image', async () => {
      fetchMock.once(localWEBPImage);

      const image = await resolveImage({ uri: webpImageUrl });

      expect(image?.format).toBe('png');
      expect(image?.width).toBe(700);
    });

    test('Should resolve a local webp file', async () => {
      const image = await resolveImage({
        uri: path.join(__dirname, './assets/test.webp'),
      });

      expect(image?.format).toBe('png');
      expect(image?.width).toBe(700);
    });

    test('Should accept a jpeg from the transcoder', async () => {
      registerWebpTranscoder(() => localJPGImage);

      const image = await resolveImage(localWEBPImage);

      expect(image?.format).toBe('jpeg');
      expect(image?.width).toBe(700);
    });

    test('Should fail loudly when no transcoder is available', async () => {
      registerWebpTranscoder(null);

      await expect(resolveImage(localWEBPImage)).rejects.toThrow(
        /registerWebpTranscoder/,
      );
    });
  });
});
