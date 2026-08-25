import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';
import { imageDimensions, toHref } from '../src/image';

// 1x1 red PNG
const PNG = Uint8Array.from(
  atob(
    'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==',
  ),
  (c) => c.charCodeAt(0),
);

// Minimal hand-crafted JPEG: SOI + APP0 (JFIF stub) + SOF0 declaring 8x4
const JPEG = Uint8Array.from([
  0xff,
  0xd8, // SOI
  0xff,
  0xe0,
  0x00,
  0x10,
  0x4a,
  0x46,
  0x49,
  0x46,
  0x00,
  0x01,
  0x01,
  0x00,
  0x00,
  0x01,
  0x00,
  0x01,
  0x00,
  0x00, // APP0 (JFIF)
  0xff,
  0xc0,
  0x00,
  0x0b,
  0x08,
  0x00,
  0x04,
  0x00,
  0x08,
  0x01,
  0x01,
  0x11,
  0x00, // SOF0: precision 8, height 4, width 8
]);

describe('image helpers', () => {
  test('sniffs png dimensions', () => {
    expect(imageDimensions(PNG)).toEqual({ width: 1, height: 1 });
  });

  test('sniffs jpeg dimensions from the SOF0 marker', () => {
    expect(imageDimensions(JPEG)).toEqual({ width: 8, height: 4 });
  });

  test('builds a data url from bytes', () => {
    expect(toHref(PNG)).toMatch(/^data:image\/png;base64,iVBOR/);
  });

  test('builds a data url for jpeg bytes', () => {
    expect(toHref(JPEG)).toMatch(/^data:image\/jpeg;base64,/);
  });

  test('passes string sources through', () => {
    expect(toHref('data:image/png;base64,abc')).toBe(
      'data:image/png;base64,abc',
    );
    expect(toHref('https://x.test/a.png')).toBe('https://x.test/a.png');
  });

  test('returns empty string for unrecognized bytes', () => {
    expect(toHref(new Uint8Array([1, 2, 3]))).toBe('');
  });
});

describe('ctx.image', () => {
  test('openImage + image emits an <image> element', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const embedded = doc.openImage(PNG);
    embedded.embed(doc); // render calls this when .obj is falsy — must be a no-op
    doc.image(embedded, 10, 20, { width: 30, height: 40 });
    doc.end();

    expect(doc.pages[0]).toContain(
      '<image x="10" y="20" width="30" height="40" preserveAspectRatio="none" href="data:image/png;base64,',
    );
  });

  test('fit option scales and aligns like pdfkit', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    // 1x1 image into a 10x20 box, centered horizontally, bottom-aligned
    doc.image(PNG, 0, 0, { fit: [10, 20], align: 'center', valign: 'bottom' });
    doc.end();

    expect(doc.pages[0]).toContain(
      '<image x="0" y="10" width="10" height="10"',
    );
  });
});
