import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

describe('outline (bookmarks)', () => {
  test('nested addItem builds a tree that nests in the emitted XML', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    const chapter = doc.outline.addItem('Chapter 1', { pageNumber: 0 });
    chapter.addItem('Section 1.1', { pageNumber: 0 });
    doc.end();

    const [page] = doc.pages;
    expect(page).toContain(
      '<rpdf:outline xmlns:rpdf="https://react-pdf.org/ns">',
    );

    const chapterMatch = page.match(
      /<rpdf:item title="Chapter 1"[^>]*>(.*)<\/rpdf:item><\/rpdf:outline>/,
    );
    expect(chapterMatch).not.toBeNull();
    expect(chapterMatch![1]).toContain('<rpdf:item title="Section 1.1"');

    const chapterIndex = page.indexOf('<rpdf:item title="Chapter 1"');
    const sectionIndex = page.indexOf('<rpdf:item title="Section 1.1"');
    const chapterCloseIndex = page.lastIndexOf('</rpdf:item>');
    expect(chapterIndex).toBeLessThan(sectionIndex);
    expect(sectionIndex).toBeLessThan(chapterCloseIndex);
  });

  test('places a positioned marker on the item page and the outline href points at it', () => {
    const doc = new SVGDocument({ idPrefix: 'doc1-' }).addPage({
      size: [100, 100],
    });
    doc.outline.addItem('Chapter 1', {
      pageNumber: 0,
      top: 12,
      left: 34,
    });
    doc.end();

    const [page] = doc.pages;
    const markerMatch = page.match(/<g id="(doc1-bookmark-\d+)"[^/]*\/>/);
    expect(markerMatch).not.toBeNull();
    const id = markerMatch![1];

    expect(page).toContain(`<g id="${id}" transform="translate(34 12)"/>`);
    expect(page).toContain(`href="#${id}"`);
  });

  test('omits the transform when top and left are both 0', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.outline.addItem('Chapter 1', { pageNumber: 0, top: 0, left: 0 });
    doc.end();

    const markerMatch = doc.pages[0].match(/<g id="(bookmark-\d+)"\/>/);
    expect(markerMatch).not.toBeNull();
  });

  test('markers on a page other than the first land on the correct page root', () => {
    const doc = new SVGDocument()
      .addPage({ size: [100, 100] })
      .addPage({ size: [100, 100] });
    doc.outline.addItem('Chapter 2', { pageNumber: 1, top: 5, left: 6 });
    doc.end();

    expect(doc.pages[0]).not.toMatch(/<g id="bookmark-\d+"/);
    expect(doc.pages[1]).toContain('transform="translate(6 5)"');
  });

  test('a bookmark for a non-existent page number does not throw', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    expect(() => {
      doc.outline.addItem('Ghost', { pageNumber: 7 });
      doc.end();
    }).not.toThrow();

    // outline entry is still recorded even though no marker could be placed
    expect(doc.pages[0]).toContain('<rpdf:item title="Ghost" page="7"');
  });

  test('expanded="true" is emitted only when the item set it', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.outline.addItem('Expanded', { pageNumber: 0, expanded: true });
    doc.outline.addItem('Collapsed', { pageNumber: 0 });
    doc.end();

    expect(doc.pages[0]).toContain(
      '<rpdf:item title="Expanded" page="0" href=',
    );
    expect(doc.pages[0]).toMatch(
      /<rpdf:item title="Expanded"[^>]*expanded="true"/,
    );
    expect(doc.pages[0]).not.toMatch(
      /<rpdf:item title="Collapsed"[^>]*expanded=/,
    );
  });

  test('titles with quotes and ampersands are attribute-escaped', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.outline.addItem('Foo "Bar" & Baz', { pageNumber: 0 });
    doc.end();

    expect(doc.pages[0]).toContain('title="Foo &quot;Bar&quot; &amp; Baz"');
    expect(doc.pages[0]).not.toContain('"Foo "Bar"');
  });

  test('the outline only appears on the first page svg', () => {
    const doc = new SVGDocument()
      .addPage({ size: [100, 100] })
      .addPage({ size: [100, 100] });
    doc.outline.addItem('Chapter 1', { pageNumber: 0 });
    doc.end();

    expect(doc.pages[0]).toContain('<rpdf:outline');
    expect(doc.pages[1]).not.toContain('<rpdf:outline');
  });
});

describe('document metadata', () => {
  test('emits <title> and <desc> from info.Title/info.Subject on every page', () => {
    const doc = new SVGDocument()
      .addPage({ size: [100, 100] })
      .addPage({ size: [100, 100] });
    doc.info.Title = 'My Document';
    doc.info.Subject = 'A subject line';
    doc.end();

    doc.pages.forEach((page) => {
      expect(page).toContain('<title>My Document</title>');
      expect(page).toContain('<desc>A subject line</desc>');
    });
  });

  test('emits Dublin Core terms from info', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.info.Title = 'My Document';
    doc.info.Author = 'Jane Doe';
    doc.info.Keywords = 'pdf, svg';
    doc.info.Subject = 'A subject line';
    doc.end();

    const [page] = doc.pages;
    expect(page).toContain(
      '<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    );
    expect(page).toContain('<dc:title>My Document</dc:title>');
    expect(page).toContain('<dc:creator>Jane Doe</dc:creator>');
    expect(page).toContain('<dc:subject>pdf, svg</dc:subject>');
    expect(page).toContain('<dc:description>A subject line</dc:description>');
  });

  test('serializes CreationDate Date objects as ISO strings', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.info.CreationDate = new Date('2024-01-02T03:04:05.000Z');
    doc.end();

    expect(doc.pages[0]).toContain(
      '<dc:date>2024-01-02T03:04:05.000Z</dc:date>',
    );
  });

  test('serializes CreationDate strings as-is', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.info.CreationDate = '2024-01-02T03:04:05.000Z';
    doc.end();

    expect(doc.pages[0]).toContain(
      '<dc:date>2024-01-02T03:04:05.000Z</dc:date>',
    );
  });

  test('omits individual terms when unset', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.info.Title = 'Only Title';
    doc.end();

    const [page] = doc.pages;
    expect(page).toContain('<dc:title>Only Title</dc:title>');
    expect(page).not.toContain('<dc:creator>');
    expect(page).not.toContain('<dc:subject>');
    expect(page).not.toContain('<dc:description>');
    expect(page).not.toContain('<dc:date>');
    expect(page).not.toContain('<desc>');
  });

  test('emits nothing extra when info is empty and there are no bookmarks (byte-identical)', () => {
    const doc = new SVGDocument();
    doc.addPage({ size: [200, 100] });
    doc.end();

    expect(doc.pages[0]).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="200" height="100"><defs/></svg>',
    );
  });

  test('constructor accepts an info option', () => {
    const doc = new SVGDocument({ info: { Title: 'Ctor Title' } }).addPage({
      size: [100, 100],
    });
    doc.end();

    expect(doc.pages[0]).toContain('<title>Ctor Title</title>');
    expect(doc.info.Title).toBe('Ctor Title');
  });

  test('orders title, desc, dc metadata, outline metadata, then defs', () => {
    const doc = new SVGDocument().addPage({ size: [100, 100] });
    doc.info.Title = 'T';
    doc.info.Subject = 'S';
    doc.outline.addItem('Chapter 1', { pageNumber: 0 });
    doc.end();

    const page = doc.pages[0];
    const titleIndex = page.indexOf('<title>');
    const descIndex = page.indexOf('<desc>');
    const dcIndex = page.indexOf('<rdf:RDF');
    const outlineIndex = page.indexOf('<rpdf:outline');
    const defsIndex = page.indexOf('<defs/>');

    expect(titleIndex).toBeGreaterThanOrEqual(0);
    expect(titleIndex).toBeLessThan(descIndex);
    expect(descIndex).toBeLessThan(dcIndex);
    expect(dcIndex).toBeLessThan(outlineIndex);
    expect(outlineIndex).toBeLessThan(defsIndex);
  });
});
