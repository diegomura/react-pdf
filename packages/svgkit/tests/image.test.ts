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

describe('image helpers', () => {
  test('sniffs png dimensions', () => {
    expect(imageDimensions(PNG)).toEqual({ width: 1, height: 1 });
  });

  test('builds a data url from bytes', () => {
    expect(toHref(PNG)).toMatch(/^data:image\/png;base64,iVBOR/);
  });

  test('passes string sources through', () => {
    expect(toHref('data:image/png;base64,abc')).toBe(
      'data:image/png;base64,abc',
    );
    expect(toHref('https://x.test/a.png')).toBe('https://x.test/a.png');
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
