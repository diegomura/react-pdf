import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

const CTX_METHODS = [
  'end',
  'rect',
  'save',
  'fill',
  'image',
  'restore',
  'addPage',
  'fillColor',
  'fillOpacity',
  'roundedRect',
  'registerFont',
  'lineWidth',
  'moveTo',
  'quadraticCurveTo',
  'lineTo',
  'strokeColor',
  'strokeOpacity',
  'stroke',
  'dash',
  'note',
  'rotate',
  'scale',
  'translate',
  'link',
  'goTo',
  'addNamedDestination',
  'clip',
  'bezierCurveTo',
  'closePath',
  'undash',
  'path',
  'radialGradient',
  'linearGradient',
  'miterLimit',
  'fontSize',
  'lineJoin',
  'polygon',
  'circle',
  'ellipse',
  'opacity',
  'lineCap',
  'text',
  'font',
  'textInput',
  'formField',
  'formCombo',
  'formList',
  'formText',
  'initForm',
  'annotate',
  'transform',
  'fillAndStroke',
  'openImage',
  'addContent',
  'ref',
  'glyphs',
];

describe('ctx surface', () => {
  test('implements every method render can call', () => {
    const doc: any = new SVGDocument();
    CTX_METHODS.forEach((method) => {
      // eslint-disable-next-line vitest/valid-expect -- message arg identifies the failing method in CI output
      expect(typeof doc[method], method).toBe('function');
    });
    expect(typeof doc._fieldDict).toBe('function');
    expect(typeof doc._addToParent).toBe('function');
    expect(doc.info).toEqual({});
    expect(doc._root.data).toEqual({});
    expect(doc._imageRegistry).toEqual({});
    expect(doc._acroform.fonts).toEqual({});
    const chapter = doc.outline.addItem('title', {});
    const section = chapter.addItem('nested', {});
    expect(typeof chapter.addItem).toBe('function');
    expect(typeof section.addItem).toBe('function');
    const ref = (doc as any).ref({});
    expect(typeof ref.write).toBe('function');
    expect(typeof ref.end).toBe('function');
  });

  test('stubs are chainable', () => {
    const doc: any = new SVGDocument().addPage({ size: [10, 10] });
    expect(
      doc
        .registerFont('x')
        .note(0, 0, 0, 0, 'v', {})
        .initForm()
        .annotate(0, 0, 1, 1, {})
        .addContent('BT'),
    ).toBe(doc);
  });

  test('link emits an inert annotation rect, not an anchor', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.link(0, -10, 50, 10, 'https://react-pdf.org');
    doc.end();
    expect(doc.pages[0]).toContain(
      '<rect x="0" y="-10" width="50" height="10" fill="none" pointer-events="none" data-rpdf-link="https://react-pdf.org"/>',
    );
    expect(doc.pages[0]).not.toContain('<a ');
  });

  test('goTo and addNamedDestination pair through fragment ids', () => {
    const doc = new SVGDocument({ idPrefix: 'p1-' }).addPage({
      size: [100, 100],
    });
    doc.addNamedDestination('chapter', 'XYZ', 0, 0, null);
    doc.goTo(0, 0, 10, 10, 'chapter');
    doc.addNamedDestination('section', 'XYZ', 12, 34, null);
    doc.end();
    expect(doc.pages[0]).toContain(
      '<g id="p1-dest-chapter" data-rpdf-dest="chapter"/>',
    );
    expect(doc.pages[0]).toContain(
      '<rect x="0" y="0" width="10" height="10" fill="none" pointer-events="none" data-rpdf-link="#p1-dest-chapter"/>',
    );
    expect(doc.pages[0]).toContain(
      '<g id="p1-dest-section" data-rpdf-dest="section" transform="translate(12 34)"/>',
    );
  });

  test('link annotation appears in document order, not hoisted after content', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.link(0, 0, 50, 10, 'https://react-pdf.org');
    doc.rect(0, 0, 10, 10).fill();
    doc.end();
    expect(doc.pages[0]).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs/><rect x="0" y="0" width="50" height="10" fill="none" pointer-events="none" data-rpdf-link="https://react-pdf.org"/><path d="M0 0H10V10H0Z" fill="black"/></svg>',
    );
  });

  test('goTo annotation appears in document order, not hoisted after content', () => {
    const doc = new SVGDocument({ idPrefix: 'p1-' }).addPage({
      size: [100, 100],
    });
    doc.goTo(0, 0, 50, 10, 'chapter');
    doc.rect(0, 0, 10, 10).fill();
    doc.end();
    expect(doc.pages[0]).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100"><defs/><rect x="0" y="0" width="50" height="10" fill="none" pointer-events="none" data-rpdf-link="#p1-dest-chapter"/><path d="M0 0H10V10H0Z" fill="black"/></svg>',
    );
  });

  test('link inside a nested transform group lands in that group', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.translate(10, 20);
    doc.link(0, 0, 5, 5, 'https://example.com');
    doc.end();
    expect(doc.pages[0]).toContain(
      '<g transform="translate(10 20)"><rect x="0" y="0" width="5" height="5" fill="none" pointer-events="none" data-rpdf-link="https://example.com"/></g>',
    );
  });

  test('calling end() twice does not duplicate annotations', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.link(0, 0, 10, 10, 'https://react-pdf.org');
    doc.end();
    const first = doc.pages[0];
    doc.end();
    expect(doc.pages[0]).toBe(first);
    expect(doc.pages[0].match(/data-rpdf-link/g)).toHaveLength(1);
  });
});
