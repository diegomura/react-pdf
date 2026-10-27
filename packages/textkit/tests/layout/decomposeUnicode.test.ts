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

  test('should not decompose Latin precomposed character with custom font', () => {
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('\u00E9');
    expect(result.string).toHaveLength(1);
    expect(result.runs).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
  });

  test('should not decompose Latin precomposed character without font', () => {
    const string = fromFragments([{ string: '\u00E9' }]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('\u00E9');
    expect(result.string).toHaveLength(1);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
  });

  test('should not decompose Latin precomposed character with standard font', () => {
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

  test('should not decompose Latin string with custom font', () => {
    const string = fromFragments([
      { string: 'caf\u00E9', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('caf\u00E9');
    expect(result.string).toHaveLength(4);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
  });

  test('should not decompose Latin with multiple precomposed characters', () => {
    const string = fromFragments([
      { string: 'r\u00E9sum\u00E9', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('r\u00E9sum\u00E9');
    expect(result.string).toHaveLength(6);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 6);
  });

  test('should not decompose Latin across multiple runs', () => {
    const string = fromFragments([
      { string: '\u00E9', attributes: { font: [customFont] } },
      { string: '\u00E9', attributes: { font: [customFont] } },
      { string: 'abc', attributes: { font: [customFont] } },
    ]);
    const result = decomposeUnicodeInstance(string);

    expect(result.string).toEqual('\u00E9\u00E9abc');
    expect(result.runs).toHaveLength(3);
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
    expect(result.runs[1]).toHaveProperty('start', 1);
    expect(result.runs[1]).toHaveProperty('end', 2);
    expect(result.runs[2]).toHaveProperty('start', 2);
    expect(result.runs[2]).toHaveProperty('end', 5);
  });

  describe('Complex scripts', () => {
    test('should decompose Bengali precomposed character with custom font', () => {
      // Bengali ো (U+09CB) decomposes to ে (U+09C7) + া (U+09BE)
      const string = fromFragments([
        { string: '\u09CB', attributes: { font: [customFont] } },
      ]);
      const result = decomposeUnicodeInstance(string);

      expect(result.string).toEqual('\u09C7\u09BE');
      expect(result.string).toHaveLength(2);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 2);
    });

    test('should not decompose Bengali with standard font', () => {
      const string = fromFragments([
        { string: '\u09CB', attributes: { font: [standardFont] } },
      ]);
      const result = decomposeUnicodeInstance(string);

      expect(result.string).toEqual('\u09CB');
      expect(result.string).toHaveLength(1);
    });

    test('should decompose Bengali but not Latin in mixed string', () => {
      const string = fromFragments([
        {
          string: 'caf\u00E9 \u0995\u09CB\u09A1',
          attributes: { font: [customFont] },
        },
      ]);
      const result = decomposeUnicodeInstance(string);

      // café stays NFC, Bengali কোড decomposes
      expect(result.string).toEqual('caf\u00E9 \u0995\u09C7\u09BE\u09A1');
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 9);
    });

    test('should adjust run offsets when Bengali decomposition occurs', () => {
      const string = fromFragments([
        { string: '\u09CB', attributes: { font: [customFont] } },
        { string: 'abc', attributes: { font: [customFont] } },
      ]);
      const result = decomposeUnicodeInstance(string);

      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 2);
      expect(result.runs[1]).toHaveProperty('start', 2);
      expect(result.runs[1]).toHaveProperty('end', 5);
    });

    test('should decompose Devanagari precomposed character', () => {
      // Devanagari ऩ (U+0929) decomposes to न (U+0928) + nukta (U+093C)
      const string = fromFragments([
        { string: '\u0929', attributes: { font: [customFont] } },
      ]);
      const result = decomposeUnicodeInstance(string);

      expect(result.string).toEqual('\u0928\u093C');
      expect(result.string).toHaveLength(2);
    });
  });
});
