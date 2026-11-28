import { describe, expect, test } from 'vitest';
import { Font, Fragment } from '@react-pdf/textkit';

import synthesizeScripts from '../../src/text/synthesizeScripts';

const createFont = (chars: string) =>
  ({
    hasGlyphForCodePoint: (codePoint: number) =>
      chars.includes(String.fromCodePoint(codePoint)),
  }) as unknown as Font;

const latinFont = createFont('x0123456789+-=()ainh');

const fragment = (string: string, font = latinFont): Fragment => ({
  string,
  attributes: { font: [font], fontSize: 20 },
});

describe('synthesizeScripts', () => {
  test('should leave fragments without script characters untouched', () => {
    const input = fragment('x2');

    expect(synthesizeScripts([input])).toEqual([input]);
  });

  test('should synthesize a missing superscript', () => {
    const result = synthesizeScripts([fragment('x⁴')]);

    expect(result).toEqual([
      fragment('x'),
      {
        string: '4',
        attributes: { font: [latinFont], fontSize: 13, verticalAlign: 'super' },
      },
    ]);
  });

  test('should synthesize a missing subscript', () => {
    const result = synthesizeScripts([fragment('x₀')]);

    expect(result).toEqual([
      fragment('x'),
      {
        string: '0',
        attributes: { font: [latinFont], fontSize: 13, verticalAlign: 'sub' },
      },
    ]);
  });

  test('should merge consecutive characters of the same kind', () => {
    const result = synthesizeScripts([fragment('x¹⁰ⁿ')]);

    expect(result.map((f) => f.string)).toEqual(['x¹', '0n']);
  });

  test('should split adjacent superscripts and subscripts', () => {
    const result = synthesizeScripts([fragment('x₁²⁽')]);

    expect(result.map((f) => [f.string, f.attributes.verticalAlign])).toEqual([
      ['x', undefined],
      ['1', 'sub'],
      ['²', undefined],
      ['(', 'super'],
    ]);
  });

  test('should not merge into text already aligned the same way', () => {
    const input: Fragment = {
      string: 'x⁴',
      attributes: { font: [latinFont], fontSize: 20, verticalAlign: 'super' },
    };

    const result = synthesizeScripts([input]);

    expect(result.map((f) => [f.string, f.attributes.fontSize])).toEqual([
      ['x', 20],
      ['4', 13],
    ]);
  });

  test('should keep characters the font can draw', () => {
    const font = createFont('x⁴');

    expect(synthesizeScripts([fragment('x⁴', font)])).toEqual([
      fragment('x⁴', font),
    ]);
  });

  test('should use any font in the stack that has the character', () => {
    const input: Fragment = {
      string: 'x⁴',
      attributes: { font: [latinFont, createFont('⁴')], fontSize: 20 },
    };

    expect(synthesizeScripts([input])).toEqual([input]);
  });

  test('should keep characters whose base the font cannot draw', () => {
    expect(synthesizeScripts([fragment('xₔ')])).toEqual([fragment('xₔ')]);
  });

  test('should fall back to a hyphen for superscript minus', () => {
    const result = synthesizeScripts([fragment('x⁻')]);

    expect(result[1].string).toBe('-');
  });

  test('should prefer the minus sign when the font has it', () => {
    const font = createFont('x−');
    const result = synthesizeScripts([fragment('x⁻', font)]);

    expect(result[1].string).toBe('−');
  });
});
