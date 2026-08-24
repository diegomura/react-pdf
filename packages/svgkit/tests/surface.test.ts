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
      expect(typeof doc[method]).toBe('function');
    });
    expect(typeof doc._fieldDict).toBe('function');
    expect(typeof doc._addToParent).toBe('function');
    expect(doc.info).toEqual({});
    expect(doc._root.data).toEqual({});
    expect(doc._imageRegistry).toEqual({});
    expect(doc.outline.addItem('title', {}).addItem('nested', {})).toBe(
      doc.outline,
    );
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

  test('link wraps a transparent hit rect in an anchor', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.link(0, -10, 50, 10, 'https://react-pdf.org');
    doc.end();
    expect(doc.pages[0]).toContain(
      '<a href="https://react-pdf.org"><rect x="0" y="-10" width="50" height="10" fill="black" fill-opacity="0"/></a>',
    );
  });

  test('goTo and addNamedDestination pair through fragment ids', () => {
    const doc = new SVGDocument({ idPrefix: 'p1-' }).addPage({
      size: [100, 100],
    });
    doc.addNamedDestination('chapter', 'XYZ', 0, 0, null);
    doc.goTo(0, 0, 10, 10, 'chapter');
    doc.end();
    expect(doc.pages[0]).toContain('<g id="p1-dest-chapter"/>');
    expect(doc.pages[0]).toContain('<a href="#p1-dest-chapter">');
  });
});
