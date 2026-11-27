import { describe, expect, test } from 'vitest';

import SVGDocument from '../src/index';

const pageContent = (doc: SVGDocument) => {
  doc.end();
  return doc.pages[0].replace(/^<svg[^>]*>/, '').replace(/<\/svg>$/, '');
};

const makeDoc = () => new SVGDocument().addPage({ size: [100, 100] });

describe('_fieldDict', () => {
  test('returns a fresh copy of the options plus name and type', () => {
    const doc = new SVGDocument();
    const options = { value: 'hi' };
    const dict = doc._fieldDict('field', 'text', options);
    expect(dict).toEqual({ value: 'hi', name: 'field', type: 'text' });
    expect(dict).not.toBe(options);
  });
});

describe('annotate: checkbox', () => {
  const checkboxDict = (as: string, extra: Record<string, any> = {}) => ({
    AP: { N: { Yes: {}, Off: {} } },
    AS: as,
    ...extra,
  });

  test('checked checkbox draws a check mark path and an annotation carrying checked=true', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 20, 20, checkboxDict('Yes', { name: 'agree' }));
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M4 11L8.4 16L16 4" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<rect x="0" y="0" width="20" height="20" fill="none" pointer-events="none" data-rpdf-field="checkbox" data-rpdf-field-name="agree" data-rpdf-field-checked="true"/>',
    );
  });

  test('unchecked checkbox draws no mark, but still gets an annotation carrying checked=false', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 20, 20, checkboxDict('Off'));
    expect(pageContent(doc)).toBe(
      '<defs/><rect x="0" y="0" width="20" height="20" fill="none" pointer-events="none" data-rpdf-field="checkbox" data-rpdf-field-checked="false"/>',
    );
  });

  test('a wide checkbox keeps the mark square and centred', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, checkboxDict('Yes'));
    expect(pageContent(doc)).toBe(
      '<defs/><path d="M44 11L48.4 16L56 4" fill="none" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
        '<rect x="0" y="0" width="100" height="20" fill="none" pointer-events="none" data-rpdf-field="checkbox" data-rpdf-field-checked="true"/>',
    );
  });

  test('checkbox annotation never carries a data-rpdf-field-value', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 20, 20, checkboxDict('Yes'));
    expect(pageContent(doc)).not.toContain('data-rpdf-field-value');
  });
});

describe('annotate: text-valued fields', () => {
  test('value renders as clipped, centred text, plus a matching annotation', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, {
      value: 'Hello',
      name: 'field1',
      type: 'text',
    });
    expect(pageContent(doc)).toBe(
      '<defs><clipPath id="clip-1"><path d="M0 0H100V20H0Z"/></clipPath></defs>' +
        '<g clip-path="url(#clip-1)">' +
        '<text x="2" y="15.6" font-family="sans-serif" font-size="16" fill="black" xml:space="preserve">Hello</text>' +
        '</g>' +
        '<rect x="0" y="0" width="100" height="20" fill="none" pointer-events="none" data-rpdf-field="text" data-rpdf-field-name="field1" data-rpdf-field-value="Hello"/>',
    );
  });

  test('multiline holds a flowing size and starts at the top of the box, and the annotation carries multiline=true', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 60, {
      value: 'Hello',
      multiline: true,
      type: 'text',
    });
    const content = pageContent(doc);
    expect(content).toContain('font-size="12"');
    expect(content).toContain('y="10.4"');
    expect(content).toContain('data-rpdf-field-multiline="true"');
  });

  test('non-multiline fields omit data-rpdf-field-multiline', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'Hello', type: 'text' });
    expect(pageContent(doc)).not.toContain('data-rpdf-field-multiline');
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

  test('readOnly draws normally and the annotation carries readonly=true; omitted when not set', () => {
    const readOnlyDoc = makeDoc();
    readOnlyDoc.annotate(0, 0, 100, 20, { value: 'Hello', readOnly: true });
    expect(pageContent(readOnlyDoc)).toContain(
      'data-rpdf-field-readonly="true"',
    );

    const editableDoc = makeDoc();
    editableDoc.annotate(0, 0, 100, 20, { value: 'Hello' });
    expect(pageContent(editableDoc)).not.toContain('data-rpdf-field-readonly');
  });

  test('defaultValue alone renders no visible text but still emits an annotation without a value', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { defaultValue: 'ignored', type: 'text' });
    expect(pageContent(doc)).toBe(
      '<defs/><rect x="0" y="0" width="100" height="20" fill="none" pointer-events="none" data-rpdf-field="text"/>',
    );
  });

  test('password masks every character with an asterisk, in both the drawn text and the annotation value', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { value: 'secret', password: true });
    const content = pageContent(doc);
    expect(content).toContain('>******</text>');
    expect(content).toContain('data-rpdf-field-value="******"');
    expect(content).not.toContain('secret');
  });

  test('password fields carry data-rpdf-field-password="true"; plain text fields omit it', () => {
    const passwordDoc = makeDoc();
    passwordDoc.annotate(0, 0, 100, 20, { value: 'secret', password: true });
    expect(pageContent(passwordDoc)).toContain(
      'data-rpdf-field-password="true"',
    );

    const textDoc = makeDoc();
    textDoc.annotate(0, 0, 100, 20, { value: 'Hello' });
    expect(pageContent(textDoc)).not.toContain('data-rpdf-field-password');
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

  test('empty select array renders no visible text but still emits an annotation', () => {
    const doc = makeDoc();
    doc.annotate(0, 0, 100, 20, { select: [] });
    expect(pageContent(doc)).toBe(
      '<defs/><rect x="0" y="0" width="100" height="20" fill="none" pointer-events="none" data-rpdf-field="text"/>',
    );
  });
});

describe('annotate: safe no-op', () => {
  test('empty dict draws no visible content, stays chainable, and still emits a text-type annotation', () => {
    const doc = makeDoc();
    expect(doc.annotate(0, 0, 1, 1, {})).toBe(doc);
    expect(pageContent(doc)).toBe(
      '<defs/><rect x="0" y="0" width="1" height="1" fill="none" pointer-events="none" data-rpdf-field="text"/>',
    );
  });
});

describe('field annotations are inert', () => {
  test('annotation rect is unpainted and ignores pointer events, for every field type', () => {
    const textDoc = makeDoc();
    textDoc.annotate(0, 0, 10, 10, { value: 'x' });
    expect(pageContent(textDoc)).toContain('fill="none" pointer-events="none"');

    const checkboxDoc = makeDoc();
    checkboxDoc.annotate(0, 0, 10, 10, {
      AP: { N: { Yes: {}, Off: {} } },
      AS: 'Yes',
    });
    expect(pageContent(checkboxDoc)).toContain(
      'fill="none" pointer-events="none"',
    );

    const comboDoc = makeDoc();
    comboDoc.formCombo('c', 0, 0, 10, 10, { value: 'a' });
    expect(pageContent(comboDoc)).toContain(
      'fill="none" pointer-events="none"',
    );

    const listDoc = makeDoc();
    listDoc.formList('l', 0, 0, 10, 10, { value: 'a' });
    expect(pageContent(listDoc)).toContain('fill="none" pointer-events="none"');
  });
});

describe('formCombo', () => {
  test('renders the selected value, plus an annotation carrying name, value and options', () => {
    const doc = makeDoc();
    expect(
      doc.formCombo('sel', 0, 0, 100, 20, {
        value: 'Beta',
        select: ['Alpha', 'Beta'],
      }),
    ).toBe(doc);
    const content = pageContent(doc);
    expect(content).toContain('>Beta</text>');
    expect(content).toContain(
      '<rect x="0" y="0" width="100" height="20" fill="none" pointer-events="none" data-rpdf-field="combo" data-rpdf-field-name="sel" data-rpdf-field-value="Beta" data-rpdf-field-options="[&quot;Alpha&quot;,&quot;Beta&quot;]"/>',
    );
  });

  test('falls back to the first select option when there is no value', () => {
    const doc = makeDoc();
    doc.formCombo('sel', 0, 0, 100, 20, { select: ['Alpha', 'Beta'] });
    expect(pageContent(doc)).toContain('>Alpha</text>');
  });

  test('draws no visible text but still emits an annotation when neither value nor select yield text', () => {
    const doc = makeDoc();
    doc.formCombo('sel', 0, 0, 100, 20, {});
    expect(pageContent(doc)).toBe(
      '<defs/><rect x="0" y="0" width="100" height="20" fill="none" pointer-events="none" data-rpdf-field="combo" data-rpdf-field-name="sel"/>',
    );
  });
});

describe('formList', () => {
  test('renders the selected value, plus an annotation carrying name, value and options', () => {
    const doc = makeDoc();
    expect(
      doc.formList('list', 0, 0, 100, 44, {
        value: 'Two',
        select: ['One', 'Two', 'Three'],
      }),
    ).toBe(doc);
    const content = pageContent(doc);
    expect(content).toContain('>Two</text>');
    expect(content).toContain('data-rpdf-field="list"');
    expect(content).toContain('data-rpdf-field-name="list"');
    expect(content).toContain('data-rpdf-field-value="Two"');
    expect(content).toContain(
      'data-rpdf-field-options="[&quot;One&quot;,&quot;Two&quot;,&quot;Three&quot;]"',
    );
  });

  test('falls back to the first select option when there is no value', () => {
    const doc = makeDoc();
    doc.formList('list', 0, 0, 100, 44, {
      select: ['One', 'Two', 'Three'],
    });
    expect(pageContent(doc)).toContain('>One</text>');
  });

  test('draws no visible text but still emits an annotation when neither value nor select yield text', () => {
    const doc = makeDoc();
    doc.formList('list', 0, 0, 100, 44, {});
    expect(pageContent(doc)).toBe(
      '<defs/><rect x="0" y="0" width="100" height="44" fill="none" pointer-events="none" data-rpdf-field="list" data-rpdf-field-name="list"/>',
    );
  });
});

describe('note', () => {
  test('draws a fixed comment-bubble icon with a title tooltip and a data-rpdf-note annotation', () => {
    const doc = makeDoc();
    doc.note(0, 0, 0, 0, 'My note', { color: '#123456' });
    expect(pageContent(doc)).toBe(
      '<defs/><g data-rpdf-note="My note">' +
        '<rect x="0" y="0" width="20" height="20" rx="4" fill="#123456"/>' +
        '<path d="M4 4H16V12H10L6 17V12H4Z" fill="#ffffff"/>' +
        '<title>My note</title>' +
        '</g>',
    );
  });

  test('escapes quotes and ampersands in both the data-rpdf-note attribute and the title', () => {
    const doc = makeDoc();
    doc.note(0, 0, 0, 0, 'Say "hi" & bye', {});
    const content = pageContent(doc);
    expect(content).toContain('data-rpdf-note="Say &quot;hi&quot; &amp; bye"');
    expect(content).toContain('<title>Say "hi" &amp; bye</title>');
  });

  test('defaults to yellow when no color is given', () => {
    const doc = makeDoc();
    doc.note(0, 0, 0, 0, 'note', {});
    expect(pageContent(doc)).toContain('fill="#ffcc00"');
  });
});
