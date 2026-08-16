import { describe, expect, test } from 'vitest';
import enUs from 'hyphen/patterns/en-us.js';
import es from 'hyphen/patterns/es.js';

import createHyphenator from '../src';

const english = createHyphenator(enUs);
const spanish = createHyphenator(es);

describe('hyphenate', () => {
  test('should split a word into syllables', () => {
    expect(english.syllables('extraordinary')).toEqual([
      'ex',
      'tra',
      'or',
      'di',
      'nary',
    ]);
  });

  test('should join syllables with soft hyphens', () => {
    expect(english.hyphenate('something')).toEqual('some­thing');
  });

  test('should leave short words alone', () => {
    expect(english.syllables('cat')).toEqual(['cat']);
    expect(english.syllables('idea')).toEqual(['idea']);
  });

  test('should never leave less than two characters on a line', () => {
    for (const word of ['ability', 'against', 'oxygen']) {
      const parts = english.syllables(word);

      expect(parts[0].length).toBeGreaterThan(1);
      expect(parts[parts.length - 1].length).toBeGreaterThan(1);
    }
  });

  test('should keep punctuation attached to the word', () => {
    expect(english.syllables('something.')).toEqual(['some', 'thing.']);
    expect(english.syllables('(something)')).toEqual(['(some', 'thing)']);
  });

  test('should not hyphenate punctuation on its own', () => {
    expect(english.syllables(' ')).toEqual([' ']);
    expect(english.syllables('')).toEqual(['']);
    expect(english.syllables('—')).toEqual(['—']);
  });

  test('should break repeated syllables', () => {
    expect(english.syllables('possesses')).toEqual(['pos', 'sess', 'es']);
  });

  test('should use the patterns of the given language', () => {
    expect(spanish.syllables('caballero')).toEqual(['ca', 'ba', 'lle', 'ro']);
    expect(spanish.syllables('hidalgo')).toEqual(['hi', 'dal', 'go']);
  });

  test('should cache results per hyphenator', () => {
    expect(english.syllables('programming')).toBe(
      english.syllables('programming'),
    );
  });

  test('should keep languages independent', () => {
    expect(english.syllables('national')).toEqual(['na', 'tion', 'al']);
    expect(spanish.syllables('national')).toEqual(['na', 'tio', 'nal']);
  });
});
