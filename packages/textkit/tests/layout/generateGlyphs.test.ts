import { describe, expect, test, vi } from 'vitest';

import font from '../internal/font';
import pluck from '../internal/pluck';
import generateGlyphs from '../../src/layout/generateGlyphs';

const instance = generateGlyphs();

describe('generateGlyphs', () => {
  test('should pass features to font layout', () => {
    const features = { liga: false };
    const layout = vi.fn(font.layout);

    instance({
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font: [{ ...font, layout }], features },
        },
      ],
    });

    expect(layout).toHaveBeenCalledWith(
      'Lorem',
      features,
      undefined,
      undefined,
      'ltr',
    );
  });

  test('should return empty glyphs if font not provided', () => {
    const result = instance({
      string: 'Lorem ipsum',
      runs: [
        {
          start: 0,
          end: 11,
          attributes: {},
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorem ipsum');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
    expect(result.runs[0]).toHaveProperty('glyphs', []);
    expect(result.runs[0]).toHaveProperty('stringIndices', []);
    expect(result.runs[0]).toHaveProperty('glyphIndices', []);
    expect(result.runs[0]).toHaveProperty('positions', []);
  });

  test('should return correctly generate simple string glyphs', () => {
    const result = instance({
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorem');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2, 3, 4]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 114, 101, 109,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      8, 8, 8, 8, 8,
    ]);
  });

  test('should return correctly generate multi-run simple string glyphs', () => {
    const result = instance({
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: { font: [font], fontSize: 2 },
        },
        {
          start: 3,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorem');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8, 8, 8]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].stringIndices).toEqual([0, 1]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([101, 109]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 8]);
  });

  test('should return correctly generate ligature glyphs', () => {
    const result = instance({
      string: 'Lofim',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofim');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2, 2, 3]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 4]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 64257, 109]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8, 8, 10, 8]);
  });

  test('should return correctly generate multi ligature glyphs', () => {
    const result = instance({
      string: 'Lofimffido',
      runs: [
        {
          start: 0,
          end: 10,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofimffido');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 10);
    expect(result.runs[0].stringIndices).toEqual([
      0, 1, 2, 2, 3, 4, 4, 4, 5, 6,
    ]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 4, 5, 8, 9]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([
      76, 111, 64257, 109, 64259, 100, 111,
    ]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([
      8, 8, 10, 8, 10, 8, 8,
    ]);
  });

  test('should return correctly generate multi-run breaking ligature glyphs', () => {
    const result = instance({
      string: 'Lofim',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: { font: [font], fontSize: 2 },
        },
        {
          start: 3,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofim');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 102]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8, 8, 8]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].stringIndices).toEqual([0, 1]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([105, 109]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 8]);
  });

  test('should return correctly generate multi-run ligature glyphs', () => {
    const result = instance({
      string: 'Lofim',
      runs: [
        {
          start: 0,
          end: 4,
          attributes: { font: [font], fontSize: 2 },
        },
        {
          start: 4,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofim');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2, 2]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 64257]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8, 8, 10]);

    expect(result.runs[1]).toHaveProperty('start', 4);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].stringIndices).toEqual([0]);
    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([109]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8]);
  });

  test('should return correctly generate glyphs starting with ligature', () => {
    const result = instance({
      string: 'filom',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'filom');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].stringIndices).toEqual([0, 0, 1, 2, 3]);
    expect(result.runs[0].glyphIndices).toEqual([0, 2, 3, 4]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([64257, 108, 111, 109]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([10, 8, 8, 8]);
  });

  test('should return correctly generate glyphs breaking ligature at start', () => {
    const result = instance({
      string: 'filom',
      runs: [
        {
          start: 0,
          end: 1,
          attributes: { font: [font], fontSize: 2 },
        },
        {
          start: 1,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'filom');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
    expect(result.runs[0].stringIndices).toEqual([0]);
    expect(result.runs[0].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([102]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8]);

    expect(result.runs[1]).toHaveProperty('start', 1);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].stringIndices).toEqual([0, 1, 2, 3]);
    expect(result.runs[1].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([105, 108, 111, 109]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8, 8, 8, 8]);
  });

  test('should return correctly generate glyphs ending with ligature', () => {
    const result = instance({
      string: 'Lorfi',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorfi');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2, 3, 3]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114, 64257]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8, 8, 8, 10]);
  });

  test('should return correctly generate glyphs breaking ligature at the end', () => {
    const result = instance({
      string: 'Lorfi',
      runs: [
        {
          start: 0,
          end: 4,
          attributes: { font: [font], fontSize: 2 },
        },
        {
          start: 4,
          end: 5,
          attributes: { font: [font], fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorfi');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[0].stringIndices).toEqual([0, 1, 2, 3]);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(pluck('id', result.runs[0].glyphs!)).toEqual([76, 111, 114, 102]);
    expect(pluck('xAdvance', result.runs[0].positions!)).toEqual([8, 8, 8, 8]);

    expect(result.runs[1]).toHaveProperty('start', 4);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].stringIndices).toEqual([0]);
    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(pluck('id', result.runs[1].glyphs!)).toEqual([105]);
    expect(pluck('xAdvance', result.runs[1].positions!)).toEqual([8]);
  });

  test('gives a cached glyph the code points it was asked for', () => {
    // fontkit keeps ONE glyph object per glyph id and the first caller decides
    // what it knows. Subsetting a composite glyph asks for its components by id
    // alone, so "O" is cached without a code point - and the font outlives the
    // document, so every later one gets that empty glyph.
    //
    // Two things break at once when it does: glyphIndices counts characters by
    // code points, so the mapping stops advancing and every line break after it
    // sits a letter off, and the glyph reaches the ToUnicode map with nothing
    // behind it, which makes the text impossible to copy or search.
    const cache = new Map();

    const getGlyph = (id, codePoints = []) => {
      if (!cache.has(id)) cache.set(id, { id, codePoints, advanceWidth: 8 });
      return cache.get(id);
    };

    // layout() goes through the font's own getGlyph, the way fontkit does -
    // that is what lets the cache be repaired from the outside.
    const cachingFont = {
      ...font,
      getGlyph,
      layout(string: string) {
        return {
          ...font.layout(string),
          glyphs: Array.from(string, (character) => {
            const codePoint = character.codePointAt(0)!;
            return this.getGlyph(codePoint, [codePoint]);
          }),
        };
      },
    };

    // What the subsetter does: ask for "o" by id, without saying which
    // character it stands for.
    getGlyph('o'.codePointAt(0)!);

    const result = instance({
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font: [cachingFont], fontSize: 2 },
        },
      ],
    });

    // One glyph per character, and every one of them still knows its character.
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(result.runs[0].glyphs!.map((glyph) => glyph.codePoints)).toEqual([
      ['L'.codePointAt(0)],
      ['o'.codePointAt(0)],
      ['r'.codePointAt(0)],
      ['e'.codePointAt(0)],
      ['m'.codePointAt(0)],
    ]);
  });
});
