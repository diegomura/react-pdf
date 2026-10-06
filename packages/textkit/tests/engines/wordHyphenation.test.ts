import { describe, expect, test } from 'vitest';

import wordHyphenation from '../../src/engines/wordHyphenation';

const instance = wordHyphenation();

describe('wordHyphenation', () => {
  test('should return empty array if null param', () => {
    expect(instance(null)).toEqual([]);
  });

  test('should return empty part for empty string', () => {
    expect(instance('')).toEqual(['']);
  });

  test('should hyphenate word', () => {
    expect(instance('something')).toEqual(['some', 'thing']);
  });

  test('should hyphenate word in many parts', () => {
    expect(instance('neumonia')).toEqual(['neu', 'mo', 'nia']);
  });

  test('should not hyphenate words below the minimum length', () => {
    expect(instance('cat')).toEqual(['cat']);
    expect(instance('fino')).toEqual(['fino']);
  });

  test('should never leave less than two characters on a line', () => {
    for (const parts of [instance('ability'), instance('idea')]) {
      expect(parts[0].length).toBeGreaterThan(1);
      expect(parts[parts.length - 1].length).toBeGreaterThan(1);
    }
  });

  test('should keep punctuation attached to the word', () => {
    expect(instance('viernes,')).toEqual(['viernes,']);
    expect(instance('something.')).toEqual(['some', 'thing.']);
  });

  test('should break repeated syllables', () => {
    expect(instance('possesses')).toEqual(['pos', 'sess', 'es']);
    expect(instance('alababa')).toEqual(['al', 'aba', 'ba']);
  });

  test('should hyphenate word with soft hyphen', () => {
    expect(instance('so­mething')).toEqual(['so', 'mething']);
  });

  test('should hyphenate word with many soft hyphen', () => {
    expect(instance('so­me­thing')).toEqual(['so', 'me', 'thing']);
  });

  test('should get previously hyphenated word from cache', () => {
    expect(instance('programming')).toEqual(['pro', 'gram', 'ming']);
    expect(instance('programming')).toBe(instance('programming'));
  });
});
