import { describe, expect, test } from 'vitest';

import resolveTypoMetrics from '../../src/run/typoMetrics';
import { Font } from '../../src/types';

describe('run typoMetrics helper', () => {
  test('returns zeroed metrics for an undefined font', () => {
    expect(resolveTypoMetrics(undefined)).toEqual({
      ascent: 0,
      descent: 0,
      lineGap: 0,
    });
  });

  test('falls back to hhea metrics when no OS/2 table is present', () => {
    const font = { ascent: 800, descent: -200, lineGap: 0 } as Font;

    expect(resolveTypoMetrics(font)).toEqual({
      ascent: 800,
      descent: -200,
      lineGap: 0,
    });
  });

  test('falls back to hhea when OS/2 lacks numeric typo metrics', () => {
    const font = {
      ascent: 800,
      descent: -200,
      lineGap: 0,
      'OS/2': {} as never,
    } as Font;

    expect(resolveTypoMetrics(font)).toEqual({
      ascent: 800,
      descent: -200,
      lineGap: 0,
    });
  });

  test('prefers OS/2 typo metrics when fully populated', () => {
    const font = {
      ascent: 1160,
      descent: -288,
      lineGap: 0,
      'OS/2': {
        typoAscender: 880,
        typoDescender: -120,
        typoLineGap: 0,
      } as never,
    } as Font;

    expect(resolveTypoMetrics(font)).toEqual({
      ascent: 880,
      descent: -120,
      lineGap: 0,
    });
  });

  test('falls back to hhea lineGap when OS/2 typoLineGap is missing', () => {
    const font = {
      ascent: 1000,
      descent: -200,
      lineGap: 50,
      'OS/2': {
        typoAscender: 800,
        typoDescender: -150,
      } as never,
    } as Font;

    expect(resolveTypoMetrics(font)).toEqual({
      ascent: 800,
      descent: -150,
      lineGap: 50,
    });
  });
});
