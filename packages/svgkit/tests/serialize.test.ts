import { describe, expect, test } from 'vitest';

import { appendChild, createElement, setAttribute } from '../src/element';
import serialize from '../src/serialize';

describe('serialize', () => {
  test('self-closes empty elements', () => {
    const el = createElement('rect');
    setAttribute(el, 'width', 10);
    expect(serialize(el)).toBe('<rect width="10"/>');
  });

  test('nests children in order', () => {
    const g = createElement('g');
    const path = createElement('path');
    setAttribute(path, 'd', 'M0 0L10 10');
    appendChild(g, path);
    appendChild(g, 'hello');
    expect(serialize(g)).toBe('<g><path d="M0 0L10 10"/>hello</g>');
  });

  test('escapes attribute values and text content', () => {
    const a = createElement('a');
    setAttribute(a, 'href', 'https://x.test/?a=1&b="2"<3');
    appendChild(a, '<b> & "c"');
    expect(serialize(a)).toBe(
      '<a href="https://x.test/?a=1&amp;b=&quot;2&quot;&lt;3">&lt;b&gt; &amp; "c"</a>',
    );
  });
});
