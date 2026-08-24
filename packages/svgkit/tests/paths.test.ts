import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

const pageContent = (doc: SVGDocument) => {
  doc.end();
  return doc.pages[0].replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
};

const makeDoc = () => new SVGDocument().addPage({ size: [100, 100] });

describe('paths', () => {
  test('curves accumulate into one path', () => {
    const doc = makeDoc();
    doc
      .moveTo(0, 0)
      .lineTo(10, 0)
      .bezierCurveTo(11, 1, 12, 2, 13, 3)
      .quadraticCurveTo(14, 4, 15, 5)
      .closePath()
      .stroke();
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M0 0L10 0C11 1 12 2 13 3Q14 4 15 5Z" fill="none" stroke="black" stroke-width="1"/>',
    );
  });

  test('fill uses current fill state and resets the path', () => {
    const doc = makeDoc();
    doc.fillColor('#ff0000').fillOpacity(0.5);
    doc.rect(1, 2, 3, 4).fill();
    doc.stroke(); // no path accumulated → no element
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M1 2H4V6H1Z" fill="#ff0000" fill-opacity="0.5"/>',
    );
  });

  test('fill accepts a color argument like pdfkit', () => {
    const doc = makeDoc();
    doc.rect(0, 0, 1, 1).fill('#00ff00');
    expect(pageContent(doc)).toContain('fill="#00ff00"');
  });

  test('fill accepts a winding rule', () => {
    const doc = makeDoc();
    doc.rect(0, 0, 1, 1).fill('even-odd');
    expect(pageContent(doc)).toContain('fill-rule="evenodd"');
  });

  test('fillAndStroke emits both paints with line style', () => {
    const doc = makeDoc();
    doc
      .strokeColor('#0000ff')
      .strokeOpacity(0.25)
      .lineWidth(2)
      .lineCap('round')
      .lineJoin('bevel')
      .miterLimit(4)
      .dash(3, { space: 1 });
    doc.rect(0, 0, 1, 1).fillAndStroke();
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M0 0H1V1H0Z" fill="black" stroke="#0000ff" stroke-opacity="0.25" stroke-width="2" stroke-linecap="round" stroke-linejoin="bevel" stroke-miterlimit="4" stroke-dasharray="3 1"/>',
    );
  });

  test('fillAndStroke with a color paints both sides', () => {
    const doc = makeDoc();
    doc.rect(0, 0, 1, 1).fillAndStroke('#123456');
    const content = pageContent(doc);
    expect(content).toContain('fill="#123456"');
    expect(content).toContain('stroke="#123456"');
  });

  test('undash clears the dash pattern', () => {
    const doc = makeDoc();
    doc.dash([1, 2]).undash();
    doc.rect(0, 0, 1, 1).stroke();
    expect(pageContent(doc)).not.toContain('dasharray');
  });

  test('opacity multiplies into both paints', () => {
    const doc = makeDoc();
    doc.opacity(0.5).fillOpacity(0.5);
    doc.rect(0, 0, 1, 1).fillAndStroke();
    const content = pageContent(doc);
    expect(content).toContain('fill-opacity="0.25"');
    expect(content).toContain('stroke-opacity="0.5"');
  });

  test('shapes build path data', () => {
    const doc = makeDoc();
    doc.circle(10, 10, 5).fill();
    doc.ellipse(10, 10, 5, 3).fill();
    doc.polygon([0, 0], [10, 0], [5, 5]).fill();
    doc.roundedRect(0, 0, 10, 10, 2).fill();
    doc.path('M1 1L2 2').stroke();
    expect(pageContent(doc)).toMatchSnapshot();
  });

  test('clip wraps subsequent content until restore', () => {
    const doc = makeDoc();
    doc.save();
    doc.rect(0, 0, 50, 50).clip();
    doc.rect(0, 0, 100, 100).fill();
    doc.restore();
    expect(pageContent(doc)).toBe(
      '<defs><clipPath id="clip-1"><path d="M0 0H50V50H0Z"/></clipPath></defs>' +
        '<g clip-path="url(#clip-1)"><path d="M0 0H100V100H0Z" fill="black"/></g>',
    );
  });
});
