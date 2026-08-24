import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

describe('gradients', () => {
  test('linear gradient fills via defs', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const grad = doc.linearGradient(0, 0, 100, 0);
    grad.stop(0, '#ff0000', 1).stop(1, '#0000ff', 0.5);
    doc.rect(0, 0, 100, 100).fill(grad);
    doc.end();

    expect(doc.pages[0]).toContain(
      '<defs><linearGradient id="grad-1" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="100" y2="0">' +
        '<stop offset="0" stop-color="#ff0000"/>' +
        '<stop offset="1" stop-color="#0000ff" stop-opacity="0.5"/>' +
        '</linearGradient></defs>',
    );
    expect(doc.pages[0]).toContain('fill="url(#grad-1)"');
  });

  test('radial gradient maps pdfkit args to svg focal/center', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const grad = doc.radialGradient(50, 60, 0, 55, 65, 40);
    grad.stop(0, 'white');
    doc.rect(0, 0, 100, 100).fill(grad);
    doc.end();

    expect(doc.pages[0]).toContain(
      '<radialGradient id="grad-1" gradientUnits="userSpaceOnUse" fx="50" fy="60" cx="55" cy="65" r="40">',
    );
  });

  test('a gradient is emitted into defs only once', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const grad = doc.linearGradient(0, 0, 1, 0);
    grad.stop(0, 'red');
    doc.rect(0, 0, 1, 1).fill(grad);
    doc.rect(2, 0, 1, 1).fill(grad);
    doc.end();

    expect(doc.pages[0].match(/<linearGradient/g)).toHaveLength(1);
  });

  test('setTransform emits gradientTransform', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const grad = doc.linearGradient(0, 0, 1, 0);
    grad.stop(0, 'red').setTransform(2, 0, 0, 2, 5, 6);
    doc.rect(0, 0, 1, 1).fill(grad);
    doc.end();
    expect(doc.pages[0]).toContain('gradientTransform="matrix(2 0 0 2 5 6)"');
  });

  test('identity setTransform is omitted', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const grad = doc.linearGradient(0, 0, 1, 0);
    grad.stop(0, 'red').setTransform(1, 0, 0, 1, 0, 0);
    doc.rect(0, 0, 1, 1).fill(grad);
    doc.end();
    expect(doc.pages[0]).not.toContain('gradientTransform');
  });
});
