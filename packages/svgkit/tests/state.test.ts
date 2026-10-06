import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

const pageContent = (doc: SVGDocument) => {
  doc.end();
  return doc.pages[0]
    .replace(/^<svg[^>]*><defs\/>/, '')
    .replace(/<\/svg>$/, '');
};

describe('transforms', () => {
  test('translate opens a group', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.translate(10, 20);
    doc.rect(0, 0, 5, 5).fill();
    expect(pageContent(doc)).toBe(
      '<g transform="translate(10 20)"><path d="M0 0H5V5H0Z" fill="black"/></g>',
    );
  });

  test('restore returns to the container at save time', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.save();
    doc.translate(10, 0).rotate(90);
    doc.restore();
    doc.rect(0, 0, 5, 5).fill();
    // rect emitted outside the (empty, self-closing) transform groups
    expect(pageContent(doc)).toBe(
      '<g transform="translate(10 0)"><g transform="rotate(90)"/></g>' +
        '<path d="M0 0H5V5H0Z" fill="black"/>',
    );
  });

  test('rotate and scale support the origin option', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.rotate(45, { origin: [50, 60] });
    doc.scale(2, 3, { origin: [1, 2] });
    doc.scale(2);
    expect(pageContent(doc)).toBe(
      '<g transform="rotate(45 50 60)">' +
        '<g transform="translate(1 2) scale(2 3) translate(-1 -2)">' +
        '<g transform="scale(2 2)"/></g></g>',
    );
  });

  test('transform emits a matrix', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.transform(1, 0, 0, -1, 0, 100);
    expect(pageContent(doc)).toBe('<g transform="matrix(1 0 0 -1 0 100)"/>');
  });

  test('identity transforms do not open groups', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.translate(0, 0).rotate(0).scale(1).transform(1, 0, 0, 1, 0, 0);
    expect(pageContent(doc)).toBe('');
  });

  test('restore recovers style state', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.fillColor('red');
    doc.save();
    doc.fillColor('blue');
    doc.restore();
    doc.rect(0, 0, 5, 5).fill();
    expect(pageContent(doc)).toContain('fill="red"');
  });
});
