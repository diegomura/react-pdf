import { describe, expect, it } from 'vitest';

import PDFDocument from '../src/document.js';

const separationName = (doc, name) =>
  String(doc.spotColors[name].ref.data[1]);

describe('spot colors', () => {
  it('escapes names that are not valid PDF names', () => {
    const doc = new PDFDocument({ compress: false });

    doc.addSpotColor('Plain', 0, 100, 100, 0);
    doc.addSpotColor('PANTONE 123 C', 0, 20, 100, 0);
    doc.addSpotColor('Weird/Name#(1)', 10, 20, 30, 40);

    expect(separationName(doc, 'Plain')).toBe('Plain');
    expect(separationName(doc, 'PANTONE 123 C')).toBe('PANTONE#20123#20C');
    expect(separationName(doc, 'Weird/Name#(1)')).toBe(
      'Weird#2FName#23#281#29',
    );
  });

  it('resolves colors by their unescaped name', () => {
    const doc = new PDFDocument({ compress: false });
    doc.addSpotColor('PANTONE 123 C', 0, 20, 100, 0);

    const color = doc._normalizeColor('PANTONE 123 C');

    expect(color).toBe(doc.spotColors['PANTONE 123 C']);
    expect(color.id).toBe('CS0');
  });
});
