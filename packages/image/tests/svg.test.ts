import { beforeEach, describe, expect, test } from 'vitest';
import fs from 'fs';
import path from 'path';
import url from 'url';
import './types';

import resolveImage, { IMAGE_CACHE } from '../src/resolve';
import { SvgImage } from '../src/types';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const svgLocalPath = path.join(__dirname, './assets/test.svg');
const localSVGImage = fs.readFileSync(svgLocalPath);

describe('SVG resolveImage', () => {
  beforeEach(() => {
    IMAGE_CACHE.reset();
  });

  test('Should resolve local SVG file', async () => {
    const image = await resolveImage({ uri: svgLocalPath });

    expect(image).not.toBeNull();
    expect((image as SvgImage).format).toBe('svg');
    expect((image as SvgImage).width).toBe(100);
    expect((image as SvgImage).height).toBe(100);
  });

  test('Should resolve SVG from buffer', async () => {
    const image = await resolveImage(localSVGImage);

    expect(image).not.toBeNull();
    expect((image as SvgImage).format).toBe('svg');
  });

  test('Should resolve SVG from data object', async () => {
    const image = await resolveImage({
      data: localSVGImage,
      format: 'svg',
    });

    expect(image).not.toBeNull();
    expect((image as SvgImage).format).toBe('svg');
  });

  test('Should resolve base64 SVG', async () => {
    const svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" fill="green"/></svg>';
    const base64 = Buffer.from(svgString).toString('base64');

    const image = await resolveImage({
      uri: `data:image/svg+xml;base64,${base64}`,
    });

    expect(image).not.toBeNull();
    expect((image as SvgImage).format).toBe('svg');
    expect((image as SvgImage).width).toBe(50);
    expect((image as SvgImage).height).toBe(50);
  });

  test('Should cache SVG images by default', async () => {
    const image1 = await resolveImage({ uri: svgLocalPath });
    const image2 = await resolveImage({ uri: svgLocalPath });

    expect(image1).toBe(image2);
  });

  test('Should not cache SVG images when cache is false', async () => {
    const image1 = await resolveImage({ uri: svgLocalPath }, { cache: false });
    const image2 = await resolveImage({ uri: svgLocalPath }, { cache: false });

    expect(image1).not.toBe(image2);
  });

  test('Should resolve SVG blob', async () => {
    const blob = new Blob([localSVGImage], { type: 'image/svg+xml' });
    const image = await resolveImage(blob);

    expect(image).not.toBeNull();
    expect((image as SvgImage).format).toBe('svg');
  });
});
