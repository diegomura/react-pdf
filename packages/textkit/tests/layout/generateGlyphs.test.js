import * as R from 'ramda';

import font from '../internal/font';
import generateGlyphs from '../../src/layout/generateGlyphs';

const instance = generateGlyphs();

describe('generateGlyphs', () => {
  test('should return empty glyphs if font not provided', () => {
    const result = instance({
      string: 'Lorem ipsum',
      runs: [
        {
          start: 0,
          end: 11,
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorem ipsum');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 11);
    expect(result.runs[0]).toHaveProperty('glyphs', []);
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
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorem');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 4]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      114,
      101,
      109,
    ]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([
      8,
      8,
      8,
      8,
      8,
    ]);
  });

  test('should return correctly generate multi-run simple string glyphs', () => {
    const result = instance({
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: { font, fontSize: 2 },
        },
        {
          start: 3,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorem');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 114]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([8, 8, 8]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].glyphIndices).toEqual([0, 1]);
    expect(R.pluck('id', result.runs[1].glyphs)).toEqual([101, 109]);
    expect(R.pluck('xAdvance', result.runs[1].positions)).toEqual([8, 8]);
  });

  test('should return correctly generate ligature glyphs', () => {
    const result = instance({
      string: 'Lofim',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofim');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 2, 3]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 64257, 109]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([
      8,
      8,
      10,
      8,
    ]);
  });

  test('should return correctly generate multi ligature glyphs', () => {
    const result = instance({
      string: 'Lofimffido',
      runs: [
        {
          start: 0,
          end: 10,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofimffido');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 10);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 2, 3, 4, 4, 4, 5, 6]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([
      76,
      111,
      64257,
      109,
      64259,
      100,
      111,
    ]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([
      8,
      8,
      10,
      8,
      10,
      8,
      8,
    ]);
  });

  test('should return correctly generate multi-run breaking ligature glyphs', () => {
    const result = instance({
      string: 'Lofim',
      runs: [
        {
          start: 0,
          end: 3,
          attributes: { font, fontSize: 2 },
        },
        {
          start: 3,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofim');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 3);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 102]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([8, 8, 8]);

    expect(result.runs[1]).toHaveProperty('start', 3);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].glyphIndices).toEqual([0, 1]);
    expect(R.pluck('id', result.runs[1].glyphs)).toEqual([105, 109]);
    expect(R.pluck('xAdvance', result.runs[1].positions)).toEqual([8, 8]);
  });

  test('should return correctly generate multi-run ligature glyphs', () => {
    const result = instance({
      string: 'Lofim',
      runs: [
        {
          start: 0,
          end: 4,
          attributes: { font, fontSize: 2 },
        },
        {
          start: 4,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lofim');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 2]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 64257]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([8, 8, 10]);

    expect(result.runs[1]).toHaveProperty('start', 4);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(R.pluck('id', result.runs[1].glyphs)).toEqual([109]);
    expect(R.pluck('xAdvance', result.runs[1].positions)).toEqual([8]);
  });

  test('should return correctly generate glyphs starting with ligature', () => {
    const result = instance({
      string: 'filom',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'filom');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].glyphIndices).toEqual([0, 0, 1, 2, 3]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([
      64257,
      108,
      111,
      109,
    ]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([
      10,
      8,
      8,
      8,
    ]);
  });

  test('should return correctly generate glyphs breaking ligature at start', () => {
    const result = instance({
      string: 'filom',
      runs: [
        {
          start: 0,
          end: 1,
          attributes: { font, fontSize: 2 },
        },
        {
          start: 1,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'filom');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 1);
    expect(result.runs[0].glyphIndices).toEqual([0]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([102]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([8]);

    expect(result.runs[1]).toHaveProperty('start', 1);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(R.pluck('id', result.runs[1].glyphs)).toEqual([105, 108, 111, 109]);
    expect(R.pluck('xAdvance', result.runs[1].positions)).toEqual([8, 8, 8, 8]);
  });

  test('should return correctly generate glyphs ending with ligature', () => {
    const result = instance({
      string: 'Lorfi',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorfi');
    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 5);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3, 3]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 114, 64257]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([
      8,
      8,
      8,
      10,
    ]);
  });

  test('should return correctly generate glyphs breaking ligature at the end', () => {
    const result = instance({
      string: 'Lorfi',
      runs: [
        {
          start: 0,
          end: 4,
          attributes: { font, fontSize: 2 },
        },
        {
          start: 4,
          end: 5,
          attributes: { font, fontSize: 2 },
        },
      ],
    });

    expect(result).toHaveProperty('string', 'Lorfi');

    expect(result.runs[0]).toHaveProperty('start', 0);
    expect(result.runs[0]).toHaveProperty('end', 4);
    expect(result.runs[0].glyphIndices).toEqual([0, 1, 2, 3]);
    expect(R.pluck('id', result.runs[0].glyphs)).toEqual([76, 111, 114, 102]);
    expect(R.pluck('xAdvance', result.runs[0].positions)).toEqual([8, 8, 8, 8]);

    expect(result.runs[1]).toHaveProperty('start', 4);
    expect(result.runs[1]).toHaveProperty('end', 5);
    expect(result.runs[1].glyphIndices).toEqual([0]);
    expect(R.pluck('id', result.runs[1].glyphs)).toEqual([105]);
    expect(R.pluck('xAdvance', result.runs[1].positions)).toEqual([8]);
  });
});
