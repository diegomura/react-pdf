import { describe, expect, test } from 'vitest';

import { Font } from '../../src/types';
import decomposeUnicode from '../../src/layout/decomposeUnicode';
import fromFragments from '../../src/attributedString/fromFragments';

const decomposeUnicodeInstance = decomposeUnicode();

const customFont = { type: 'TTF' as const } as Font;
const standardFont = { type: 'STANDARD' as const } as Font;

describe('decomposeUnicode', () => {
  test('should handle empty string', () => {
    const string = fromFragments([{ string: '' }]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 0);
  });

  test('should not change ASCII string', () => {
    const string = fromFragments([
      { string: 'Lorem', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('Lorem');
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
  });

  test('should decompose precomposed character with custom font', () => {
    // é (U+00E9) decomposes to e (U+0065) + combining acute (U+0301)
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('e\u0301');
    expect(result.string).toHaveLength(2);
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
  });

  test('should not decompose precomposed character without font', () => {
    const string = fromFragments([{ string: '\u00E9' }]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('\u00E9');
    expect(result.string).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
  });

  test('should not decompose precomposed character with standard font', () => {
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [standardFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('\u00E9');
    expect(result.string).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
  });

  test('should not change already decomposed string', () => {
    const string = fromFragments([
      { string: 'e\u0301', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('e\u0301');
    expect(result.string).toHaveLength(2);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
  });

  test('should decompose precomposed character in mixed string with custom font', () => {
    // "caf\u00E9" → "cafe\u0301"
    const string = fromFragments([
      { string: 'caf\u00E9', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('cafe\u0301');
    expect(result.string).toHaveLength(5);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
  });

  test('should adjust run offsets for multiple runs', () => {
    const attrs = { color: 'red', font: [customFont] };
    const string = fromFragments([
      { string: 'caf\u00E9', attributes: attrs },
      { string: ' latte', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('cafe\u0301 latte');
    expect(result.runs).toHaveLength(2);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0]).toHaveProperty('attributes', attrs);
    expect(result.runs[1]).toHaveProperty('start', 5);
    expect(result.runs[1]).toHaveProperty('end', 11);
  });

  test('should only decompose custom font run in mixed font runs', () => {
    const string = fromFragments([
      { string: 'caf\u00E9', attributes: { font: [customFont] } },
      { string: ' caf\u00E9', attributes: { font: [standardFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('cafe\u0301 caf\u00E9');
    expect(result.runs).toHaveLength(2);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[1]).toHaveProperty('start', 5);
    expect(result.runs[1]).toHaveProperty('end', 10);
  });

  test('should adjust run offsets when decomposition occurs in earlier run', () => {
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [customFont] } },
      { string: 'abc', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('e\u0301abc');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 5);
  });

  test('should handle multiple precomposed characters with custom font', () => {
    // "résumé" has two é characters
    const string = fromFragments([
      { string: 'r\u00E9sum\u00E9', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('re\u0301sume\u0301');
    expect(result.string).toHaveLength(8);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 8);
  });

  test('should not decompose precomposed character for standard font', () => {
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [standardFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('\u00E9');
    expect(result.string).toHaveLength(1);
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
  });

  test('should not decompose mixed string for standard font', () => {
    const string = fromFragments([
      { string: 'caf\u00E9', attributes: { font: [standardFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('caf\u00E9');
    expect(result.string).toHaveLength(4);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
  });

  test('should decompose custom font run but not standard font run', () => {
    const string = fromFragments([
      { string: 'caf\u00E9', attributes: { font: [customFont] } },
      { string: ' cr\u00E8me', attributes: { font: [standardFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('cafe\u0301 cr\u00E8me');
    expect(result.runs).toHaveLength(2);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[1]).toHaveProperty('start', 5);
    expect(result.runs[1]).toHaveProperty('end', 11);
  });

  test('should handle decomposition across multiple runs', () => {
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [customFont] } },
      { string: '\u00E9', attributes: { font: [customFont] } },
      { string: 'abc', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('e\u0301e\u0301abc');
    expect(result.runs).toHaveLength(3);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 2);
    expect(result.runs[1]).toHaveProperty('start', 2);
    expect(result.runs[1]).toHaveProperty('end', 4);
    expect(result.runs[2]).toHaveProperty('start', 4);
    expect(result.runs[2]).toHaveProperty('end', 7);
  });
});
