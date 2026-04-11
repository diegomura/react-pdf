import { beforeEach, describe, expect, test, vi } from 'vitest';
import fs from 'fs';
import path from 'path';
import url from 'url';
import './types';

import resolveImage, { IMAGE_CACHE } from '../src/resolve';
import SVG from '../src/svg';
import { SvgImage } from '../src/types';

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const svgLocalPath = path.join(__dirname, './assets/test.svg');
const localSVGImage = fs.readFileSync(svgLocalPath);

describe('SVG image detection', () => {
  test('Should detect valid SVG starting with <svg>', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
    );
    expect(SVG.isValid(buffer)).toBe(true);
  });

  test('Should detect valid SVG starting with <?xml>', () => {
    const buffer = Buffer.from(
      '<?xml version="1.0"?><svg xmlns="http://www.w3.org/2000/svg"></svg>',
    );
    expect(SVG.isValid(buffer)).toBe(true);
  });

  test('Should detect valid SVG with whitespace prefix', () => {
    const buffer = Buffer.from(
      '   \n\t<svg xmlns="http://www.w3.org/2000/svg"></svg>',
    );
    expect(SVG.isValid(buffer)).toBe(true);
  });

  test('Should return false for non-SVG content', () => {
    const buffer = Buffer.from('<html><body>Not SVG</body></html>');
    expect(SVG.isValid(buffer)).toBe(false);
  });

  test('Should return false for empty buffer', () => {
    const buffer = Buffer.from('');
    expect(SVG.isValid(buffer)).toBe(false);
  });

  test('Should return false for null/undefined', () => {
    expect(SVG.isValid(null as any)).toBe(false);
    expect(SVG.isValid(undefined as any)).toBe(false);
  });

  test('Should return false for JPEG buffer', () => {
    const jpgPath = path.join(__dirname, './assets/test.jpg');
    const buffer = fs.readFileSync(jpgPath);
    expect(SVG.isValid(buffer)).toBe(false);
  });

  test('Should return false for PNG buffer', () => {
    const pngPath = path.join(__dirname, './assets/test.png');
    const buffer = fs.readFileSync(pngPath);
    expect(SVG.isValid(buffer)).toBe(false);
  });
});

describe('SVG parsing', () => {
  test('Should parse SVG and extract dimensions', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.format).toBe('svg');
    expect(svg.width).toBe(200);
    expect(svg.height).toBe(150);
  });

  test('Should parse SVG with viewBox', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.viewBox).toEqual({
      minX: 0,
      minY: 0,
      maxX: 100,
      maxY: 100,
    });
  });

  test('Should use viewBox dimensions when width/height not specified', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.width).toBe(300);
    expect(svg.height).toBe(200);
  });

  test('Should parse width/height with px unit (1px = 0.75pt)', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="96px" height="48px"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.width).toBe(72); // 96px * 0.75 = 72pt
    expect(svg.height).toBe(36); // 48px * 0.75 = 36pt
  });

  test('Should parse width/height with pt unit (1pt = 1)', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="72pt" height="36pt"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.width).toBe(72);
    expect(svg.height).toBe(36);
  });

  test('Should parse width/height with in unit (1in = 72pt)', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1in" height="2in"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.width).toBe(72);
    expect(svg.height).toBe(144);
  });

  test('Should parse width/height with cm unit (1cm ≈ 28.35pt)', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="2.54cm" height="5.08cm"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.width).toBeCloseTo(72, 1);
    expect(svg.height).toBeCloseTo(144, 1);
  });

  test('Should parse width/height with mm unit (1mm ≈ 2.835pt)', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" width="25.4mm" height="50.8mm"></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.width).toBeCloseTo(72, 1);
    expect(svg.height).toBeCloseTo(144, 1);
  });

  test('Should parse SVG children elements', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80"/></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children.length).toBe(1);
    expect(svg.children[0].type).toBe('RECT');
    expect(svg.children[0].props.x).toBe('10');
  });

  test('Should parse nested SVG elements', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><g><rect/><circle/></g></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children.length).toBe(1);
    expect(svg.children[0].type).toBe('G');
    expect(svg.children[0].children?.length).toBe(2);
  });

  test('Should convert attribute names to camelCase', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect stroke-width="2" fill-opacity="0.5"/></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children[0].props.strokeWidth).toBe('2');
    expect(svg.children[0].props.fillOpacity).toBe('0.5');
  });

  test('Should parse style attribute into individual properties', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><stop style="stop-color:#ff6b6b;stop-opacity:1"/></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children[0].props.stopColor).toBe('#ff6b6b');
    expect(svg.children[0].props.stopOpacity).toBe('1');
  });

  test('Should parse style attribute with various CSS properties', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect style="fill:red;stroke:blue;stroke-width:2px"/></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children[0].props.fill).toBe('red');
    expect(svg.children[0].props.stroke).toBe('blue');
    expect(svg.children[0].props.strokeWidth).toBe('2px');
  });

  test('Should merge style properties with direct attributes', () => {
    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><rect fill="green" style="stroke:blue"/></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children[0].props.fill).toBe('green');
    expect(svg.children[0].props.stroke).toBe('blue');
  });

  test('Should skip unsupported elements with warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const buffer = Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script><rect/></svg>',
    );
    const svg = new SVG(buffer);

    expect(svg.children.length).toBe(1);
    expect(svg.children[0].type).toBe('RECT');
    expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('script'));

    warnSpy.mockRestore();
  });
});

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
