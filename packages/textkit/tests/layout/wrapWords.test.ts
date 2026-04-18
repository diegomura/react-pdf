import { beforeEach, describe, expect, test, vi } from 'vitest';
import wrapWords from '../../src/layout/wrapWords';

const emptyInstance = wrapWords({}, {});
const wordHyphenationEngine = vi.fn((x) => [x]);
const defaultInstance = wrapWords(
  { wordHyphenation: () => wordHyphenationEngine },
  {},
);
const mutateWordHyphenationEngine = vi.fn((x) => (x === ' ' ? [x] : [`${x}o`]));
const mutateInstance = wrapWords(
  { wordHyphenation: () => mutateWordHyphenationEngine },
  {},
);

describe('wrapWords', () => {
  describe('when engine provided', () => {
    beforeEach(() => {
      wordHyphenationEngine.mockClear();
      mutateWordHyphenationEngine.mockClear();
    });

    test('should return no syllables when empty string provided', () => {
      const result = defaultInstance({ string: '', runs: [] });

      expect(result.syllables).toEqual([]);
      expect(result.string).toEqual('');
      expect(wordHyphenationEngine.mock.calls).toHaveLength(0);
    });

    test('should return syllables when single run string', () => {
      const result = defaultInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual(['Lorem', ' ', 'ipsum']);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 11);

      expect(wordHyphenationEngine.mock.calls).toHaveLength(3);
      expect(wordHyphenationEngine.mock.calls[0][0]).toEqual('Lorem');
      expect(wordHyphenationEngine.mock.calls[1][0]).toEqual(' ');
      expect(wordHyphenationEngine.mock.calls[2][0]).toEqual('ipsum');
    });

    test('should return syllables when multipe runs string', () => {
      const result = defaultInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 5,
            attributes: {},
          },
          {
            start: 5,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual(['Lorem', ' ', 'ipsum']);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);

      expect(wordHyphenationEngine.mock.calls).toHaveLength(3);
      expect(wordHyphenationEngine.mock.calls[0][0]).toEqual('Lorem');
      expect(wordHyphenationEngine.mock.calls[1][0]).toEqual(' ');
      expect(wordHyphenationEngine.mock.calls[2][0]).toEqual('ipsum');
    });

    test('should return mutated string if engine changes string value', () => {
      const result = mutateInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual(['Loremo', ' ', 'ipsumo']);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 13);

      expect(mutateWordHyphenationEngine.mock.calls).toHaveLength(3);
      expect(mutateWordHyphenationEngine.mock.calls[0][0]).toEqual('Lorem');
      expect(mutateWordHyphenationEngine.mock.calls[1][0]).toEqual(' ');
      expect(mutateWordHyphenationEngine.mock.calls[2][0]).toEqual('ipsum');
    });
  });

  describe('when no engine provided', () => {
    test('should return no syllables when empty string provided', () => {
      const result = emptyInstance({ string: '', runs: [] });

      expect(result.syllables).toEqual([]);
      expect(result.string).toEqual('');
    });

    test('should return unhyphenated syllables when single run string', () => {
      const result = emptyInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual(['Lorem', ' ', 'ipsum']);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 11);
    });

    test('should return unhyphenated syllables when multipe runs string', () => {
      const result = emptyInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 5,
            attributes: {},
          },
          {
            start: 5,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual(['Lorem', ' ', 'ipsum']);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);
    });
  });

  describe('word-break option', () => {
    test('should split CJK characters individually with wordBreak: normal (default)', () => {
      const instance = wrapWords({}, {});
      const result = instance({
        string: '本当に長いテキスト',
        runs: [{ start: 0, end: 9, attributes: {} }],
      });

      // CJK characters should be split individually
      expect(result.syllables).toEqual([
        '本',
        '当',
        'に',
        '長',
        'い',
        'テ',
        'キ',
        'ス',
        'ト',
      ]);
    });

    test('should split CJK characters individually with wordBreak: normal (explicit)', () => {
      const instance = wrapWords({}, { wordBreak: 'normal' });
      const result = instance({
        string: '本当に長いテキスト',
        runs: [{ start: 0, end: 9, attributes: {} }],
      });

      expect(result.syllables).toEqual([
        '本',
        '当',
        'に',
        '長',
        'い',
        'テ',
        'キ',
        'ス',
        'ト',
      ]);
    });

    test('should not split Latin characters with wordBreak: normal', () => {
      const instance = wrapWords({}, { wordBreak: 'normal' });
      const result = instance({
        string: 'Hello world',
        runs: [{ start: 0, end: 11, attributes: {} }],
      });

      // Latin characters should stay grouped
      expect(result.syllables).toEqual(['Hello', ' ', 'world']);
    });

    test('should split mixed CJK and Latin with wordBreak: normal', () => {
      const instance = wrapWords({}, { wordBreak: 'normal' });
      const result = instance({
        string: 'Hello世界',
        runs: [{ start: 0, end: 7, attributes: {} }],
      });

      // Latin stays grouped, CJK splits
      expect(result.syllables).toEqual(['Hello', '世', '界']);
    });

    test('should split all characters with wordBreak: break-all', () => {
      const instance = wrapWords({}, { wordBreak: 'break-all' });
      const result = instance({
        string: 'Hello',
        runs: [{ start: 0, end: 5, attributes: {} }],
      });

      // All characters should be split
      expect(result.syllables).toEqual(['H', 'e', 'l', 'l', 'o']);
    });

    test('should not split CJK characters with wordBreak: keep-all', () => {
      const instance = wrapWords({}, { wordBreak: 'keep-all' });
      const result = instance({
        string: '本当に長いテキスト',
        runs: [{ start: 0, end: 9, attributes: {} }],
      });

      // CJK characters should stay grouped (not split)
      expect(result.syllables).toEqual(['本当に長いテキスト']);
    });

    test('should handle Hiragana correctly', () => {
      const instance = wrapWords({}, { wordBreak: 'normal' });
      const result = instance({
        string: 'あいうえお',
        runs: [{ start: 0, end: 5, attributes: {} }],
      });

      expect(result.syllables).toEqual(['あ', 'い', 'う', 'え', 'お']);
    });

    test('should handle Katakana correctly', () => {
      const instance = wrapWords({}, { wordBreak: 'normal' });
      const result = instance({
        string: 'アイウエオ',
        runs: [{ start: 0, end: 5, attributes: {} }],
      });

      expect(result.syllables).toEqual(['ア', 'イ', 'ウ', 'エ', 'オ']);
    });

    test('should handle Korean correctly', () => {
      const instance = wrapWords({}, { wordBreak: 'normal' });
      const result = instance({
        string: '한글테스트',
        runs: [{ start: 0, end: 5, attributes: {} }],
      });

      expect(result.syllables).toEqual(['한', '글', '테', '스', '트']);
    });
  });
});
