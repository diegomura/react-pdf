import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

const pageContent = (doc: SVGDocument) => {
  doc.end();
  return doc.pages[0].replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
};

const makeDoc = () => new SVGDocument().addPage({ size: [100, 100] });

describe('_fieldDict', () => {
  test('returns a fresh copy of the options', () => {
    const doc = new SVGDocument();
    const options = { value: 'hi' };
    const dict = doc._fieldDict('field', 'text', options);
    expect(dict).toEqual({ value: 'hi' });
    expect(dict).not.toBe(options);
  });
});

describe('annotate: checkbox', () => {
  const checkboxDict = (as: string) => ({
    AP: { N: { Yes: {}, Off: {} } },
    AS: as,
  });

  test('checked checkbox draws a check mark path', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 20, 20, checkboxDict('Yes'));
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M4 11L8.4 16L16 4" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
    );
  });

  test('unchecked checkbox draws nothing', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 20, 20, checkboxDict('Off'));
    expect(pageContent(doc)).toBe('<defs/>');
  });

  test('a wide checkbox keeps the mark square and centred', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, checkboxDict('Yes'));
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M44 11L48.4 16L56 4" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>',
    );
  });
});

describe('annotate: text-valued fields', () => {
  test('value renders as clipped, centred text', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'Hello' });
    expect(pageContent(doc)).toBe(
      '<defs><clipPath id="clip-1"><path d="M0 0H100V20H0Z"/></clipPath></defs>' +
        '<g clip-path="url(#clip-1)">' +
        '<text x="2" y="15.6" font-family="sans-serif" font-size="16" fill="black" xml:space="preserve">Hello</text>' +
        '</g>',
    );
  });

  test('multiline holds a flowing size and starts at the top of the box', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 60, { value: 'Hello', multiline: true });
    const content = pageContent(doc);
    expect(content).toContain('font-size="12"');
    expect(content).toContain('y="10.4"');
  });

  test('multiline still honours an explicit fontSize', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 60, {
      value: 'Hello',
      multiline: true,
      fontSize: 8,
    });
    expect(pageContent(doc)).toContain('font-size="8"');
  });

  test('defaultValue alone renders nothing (not a display value in PDF)', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { defaultValue: 'ignored' });
    expect(pageContent(doc)).toBe('<defs/>');
  });

  test('password masks every character with an asterisk', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'secret', password: true });
    expect(pageContent(doc)).toContain('>******</text>');
    expect(pageContent(doc)).not.toContain('secret');
  });

  test('align center centres the text and anchors on it', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'X', align: 'center' });
    const content = pageContent(doc);
    expect(content).toContain('x="50"');
    expect(content).toContain('text-anchor="middle"');
  });

  test('align right anchors the text at the right edge', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'X', align: 'right' });
    const content = pageContent(doc);
    expect(content).toContain('x="98"');
    expect(content).toContain('text-anchor="end"');
  });

  test('fontSize is respected when set', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'X', fontSize: 10 });
    expect(pageContent(doc)).toContain('font-size="10"');
  });

  test('auto-sizes to 80% of the box height when fontSize is absent', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'X' });
    expect(pageContent(doc)).toContain('font-size="16"');
  });

  test('falls back to the first select option when there is no value', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { select: ['Option A', 'Option B'] });
    expect(pageContent(doc)).toContain('Option A');
  });

  test('empty select array renders nothing', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { select: [] });
    expect(pageContent(doc)).toBe('<defs/>');
  });
});

describe('annotate: safe no-op', () => {
  test('empty dict draws nothing and stays chainable', () => {
    const doc = makeDoc();
    expect(doc.annotate(0, 0, 1, 1, {})).toBe(doc);
    expect(pageContent(doc)).toBe('<defs/>');
  });
});

describe('formCombo', () => {
  test('renders the selected value', () => {
    const doc = makeDoc();
    expect(doc.formCombo('sel', 0, 0, 100, 20, { value: 'Beta' })).toBe(doc);
    expect(pageContent(doc)).toContain('>Beta</text>');
  });

  test('falls back to the first select option when there is no value', () => {
    const doc = makeDoc();
    doc.formCombo('sel', 0, 0, 100, 20, { select: ['Alpha', 'Beta'] });
    expect(pageContent(doc)).toContain('>Alpha</text>');
  });

  test('draws nothing when neither value nor select yield text', () => {
    const doc = makeDoc();
    doc.formCombo('sel', 0, 0, 100, 20, {});
    expect(pageContent(doc)).toBe('<defs/>');
  });
});

describe('formList', () => {
  test('renders the selected value', () => {
    const doc = makeDoc();
    expect(doc.formList('list', 0, 0, 100, 44, { value: 'Two' })).toBe(doc);
    expect(pageContent(doc)).toContain('>Two</text>');
  });

  test('falls back to the first select option when there is no value', () => {
    const doc = makeDoc();
    doc.formList('list', 0, 0, 100, 44, {
      select: ['One', 'Two', 'Three'],
    });
    expect(pageContent(doc)).toContain('>One</text>');
  });

  test('draws nothing when neither value nor select yield text', () => {
    const doc = makeDoc();
    doc.formList('list', 0, 0, 100, 44, {});
    expect(pageContent(doc)).toBe('<defs/>');
  });
});

describe('note', () => {
  test('draws a fixed comment-bubble icon with a title tooltip', () => {
    const doc = makeDoc();
    doc.note(0, 0, 0, 0, 'My note', { color: '#123456' });
    expect(pageContent(doc)).toBe(
      '<defs/><g>' +
        '<rect x="0" y="0" width="20" height="20" rx="4" fill="#123456"/>' +
        '<path d="M4 4H16V12H10L6 17V12H4Z" fill="#ffffff"/>' +
        '<title>My note</title>' +
        '</g>',
    );
  });

  test('defaults to yellow when no color is given', () => {
    const doc = makeDoc();
    doc.note(0, 0, 0, 0, 'note', {});
    expect(pageContent(doc)).toContain('fill="#ffcc00"');
  });
});
