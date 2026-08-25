import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

const pageContent = (doc: SVGDocument) => {
  doc.end();
  return doc.pages[0]
    .replace(/^<svg[^>]*><defs\/>/, '')
    .replace(/<\/svg>$/, '');
};

const outlineGlyph = (d: string, codePoint: number) => ({
  id: codePoint,
  codePoints: [codePoint],
  advanceWidth: 500,
  path: { toSVG: () => d },
});

const standardGlyph = (codePoint: number) => ({
  id: codePoint,
  codePoints: [codePoint],
  advanceWidth: 500,
});

const position = (xAdvance: number, xOffset = 0, yOffset = 0) => ({
  xAdvance,
  yAdvance: 0,
  xOffset,
  yOffset,
  advanceWidth: 500,
});

describe('glyphs — embedded fonts', () => {
  test('emits outline paths scaled to font units with y-flip', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font({ unitsPerEm: 1000 }, 20);
    doc.fillColor('#112233');
    doc.glyphs(
      [outlineGlyph('M0 0L1 1Z', 65), outlineGlyph('M2 2L3 3Z', 66)],
      [position(10), position(12)],
      5,
      50,
    );
    expect(pageContent(doc)).toBe(
      '<g fill="#112233">' +
        '<path d="M0 0L1 1Z" transform="translate(5 50) scale(0.02 -0.02)"/>' +
        '<path d="M2 2L3 3Z" transform="translate(15 50) scale(0.02 -0.02)"/>' +
        '</g>' +
        '<text x="5 15" y="50" font-family="sans-serif" font-size="20" fill-opacity="0" xml:space="preserve">AB</text>',
    );
  });

  test('emits a selectable overlay <text> after the outline group', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font({ unitsPerEm: 1000 }, 20);
    doc.glyphs(
      [outlineGlyph('M0 0Z', 65), outlineGlyph('M1 1Z', 66)],
      [position(10), position(12)],
      0,
      0,
    );
    const content = pageContent(doc);
    expect(content).toMatch(
      /<g[^>]*>.*<\/g><text[^>]*fill-opacity="0"[^>]*>AB<\/text>$/,
    );
  });

  test('overlay carries font size and xml:space, invisible via fill-opacity', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font({ unitsPerEm: 1000 }, 24);
    doc.glyphs([outlineGlyph('M0 0Z', 65)], [position(10)], 0, 0);
    const content = pageContent(doc);
    expect(content).toContain('font-size="24"');
    expect(content).toContain('xml:space="preserve"');
    expect(content).toContain('fill-opacity="0"');
    expect(content).not.toContain('fill="none"');
  });

  test('replicates PDF offset math', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font({ unitsPerEm: 1000 }, 10);
    doc.glyphs([outlineGlyph('M0 0Z', 65)], [position(10, 100, 200)], 0, 0);
    // xOffset 100 * 10/1000 = 1; yOffset 200 * 10/1000 = 2, upward
    expect(pageContent(doc)).toContain('translate(1 -2)');
  });

  test('skips empty outlines but still advances', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font({ unitsPerEm: 2048 }, 16);
    doc.glyphs(
      [outlineGlyph('', 32), outlineGlyph('M0 0Z', 65)],
      [position(8), position(10)],
      0,
      0,
    );
    const content = pageContent(doc);
    expect(content.match(/<path/g)).toHaveLength(1);
    expect(content).toContain('translate(8 0)');
  });

  test('outline glyphs honor fill opacity', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font({ unitsPerEm: 1000 }, 10).fillOpacity(0.5);
    doc.glyphs([outlineGlyph('M0 0Z', 65)], [position(10)], 0, 0);
    expect(pageContent(doc)).toContain('fill-opacity="0.5"');
  });
});

describe('glyphs — standard fonts', () => {
  test('falls back to a positioned <text> element', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Helvetica-Bold', 12);
    doc.fillColor('red');
    doc.glyphs(
      [standardGlyph(72), standardGlyph(105)], // "Hi"
      [position(7), position(3)],
      10,
      30,
    );
    expect(pageContent(doc)).toBe(
      '<text x="10 17" y="30" font-family="Helvetica, Arial, sans-serif" font-size="12" font-weight="bold" fill="red" xml:space="preserve">Hi</text>',
    );
  });

  test('maps italic and monospace families', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Courier-Oblique', 12);
    doc.glyphs([standardGlyph(97)], [position(7)], 0, 0);
    const content = pageContent(doc);
    expect(content).toContain(
      'font-family="&quot;Courier New&quot;, Courier, monospace"',
    );
    expect(content).toContain('font-style="italic"');
  });

  test('honors fill opacity', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Helvetica', 12).fillOpacity(0.5);
    doc.glyphs([standardGlyph(72)], [position(7)], 0, 0);
    const content = pageContent(doc);
    expect(content).toContain('<text ');
    expect(content).toContain('fill-opacity="0.5"');
  });

  test('emits exactly one <text> element, no extra overlay', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Helvetica', 12);
    doc.glyphs(
      [standardGlyph(72), standardGlyph(105)],
      [position(7), position(3)],
      0,
      0,
    );
    const content = pageContent(doc);
    expect(content.match(/<text/g)).toHaveLength(1);
  });
});

describe('glyphs — empty runs', () => {
  test('emits nothing for an empty glyph list', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Helvetica', 12);
    doc.glyphs([], [], 0, 0);
    expect(pageContent(doc)).toBe('');
  });
});

describe('canvas text()', () => {
  test('emits a basic text element', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Times-Roman').fontSize(14);
    doc.text('hello', 5, 10);
    expect(pageContent(doc)).toContain(
      '<text x="5" y="10" font-family="&quot;Times New Roman&quot;, Times, serif" font-size="14"',
    );
  });

  test('honors fill opacity', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.font('Times-Roman').fontSize(14).fillOpacity(0.5);
    doc.text('hi', 0, 0);
    expect(pageContent(doc)).toContain('fill-opacity="0.5"');
  });
});
