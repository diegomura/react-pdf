import { beforeEach, describe, expect, test, vi } from 'vitest';
import wrapWords from '../../src/layout/wrapWords';
import wordHyphenation from '../../src/engines/wordHyphenation';

const emptyInstance = wrapWords({}, {});
const noopWordHyphenationEngine = vi.fn((x) => [x]);
const noopInstance = wrapWords(
  { wordHyphenation: () => noopWordHyphenationEngine },
  {},
);
const mutateWordHyphenationEngine = vi.fn((x) => (x === ' ' ? [x] : [`${x}o`]));
const mutateInstance = wrapWords(
  { wordHyphenation: () => mutateWordHyphenationEngine },
  {},
);
const builtinInstance = wrapWords({ wordHyphenation }, {});
const customizedInstance = (hyphenationCallback) =>
  wrapWords({ wordHyphenation }, { hyphenationCallback });

describe('wrapWords', () => {
  describe('when engine provided', () => {
    beforeEach(() => {
      noopWordHyphenationEngine.mockClear();
      mutateWordHyphenationEngine.mockClear();
    });

    test('should return no syllables when empty string provided', () => {
      const result = noopInstance({ string: '', runs: [] });

      expect(result.syllables).toEqual([]);
      expect(result.string).toEqual('');
      expect(noopWordHyphenationEngine.mock.calls).toHaveLength(0);
    });

    test('should return syllables when single run string', () => {
      const result = noopInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 11);

      expect(noopWordHyphenationEngine.mock.calls).toHaveLength(3);
      expect(noopWordHyphenationEngine.mock.calls[0][0]).toEqual('Lorem');
      expect(noopWordHyphenationEngine.mock.calls[1][0]).toEqual(' ');
      expect(noopWordHyphenationEngine.mock.calls[2][0]).toEqual('ipsum');
    });

    test('should return syllables when multipe runs string', () => {
      const result = noopInstance({
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

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);

      expect(noopWordHyphenationEngine.mock.calls).toHaveLength(3);
      expect(noopWordHyphenationEngine.mock.calls[0][0]).toEqual('Lorem');
      expect(noopWordHyphenationEngine.mock.calls[1][0]).toEqual(' ');
      expect(noopWordHyphenationEngine.mock.calls[2][0]).toEqual('ipsum');
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

      expect(result.syllables).toEqual([
        { string: 'Loremo', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ipsumo', hyphen: null },
      ]);
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

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 11);
    });

    test('should return unhyphenated syllables when multiple runs string', () => {
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

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);
    });
  });

  describe('with builtin engine', () => {
    test('should return no syllables when empty string provided', () => {
      const result = builtinInstance({ string: '', runs: [] });

      expect(result.syllables).toEqual([]);
      expect(result.string).toEqual('');
    });

    test('should return hyphenated syllables when single run string', () => {
      const result = builtinInstance({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 11);
    });

    test('should return hyphenated syllables when multiple runs string', () => {
      const result = builtinInstance({
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

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);
    });

    test('should split at hyphen and not duplicate hyphen in hyphenation', () => {
      const result = builtinInstance({
        string: 'Lo-rem ipsum-',
        runs: [
          {
            start: 0,
            end: 13,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lo-', hyphen: null },
        { string: 'rem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum-', hyphen: null },
      ]);
    });

    test('should not apply default english syllable split to word containing soft hyphen', () => {
      const result = builtinInstance({
        string: 'Lorem ips\u00adum',
        runs: [
          {
            start: 0,
            end: 12,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ips', hyphen: '-' },
        { string: 'um', hyphen: null },
      ]);
    });
  });

  describe('with custom hyphenation callback', () => {
    const customHyphenation = (word, original) => {
      return {
        parts: original(word).parts.flatMap((part) => part.split(/(?<=[./])/g)),
        hyphen: '-',
      };
    };
    test('should return no syllables when empty string provided', () => {
      const result = customizedInstance(customHyphenation)({
        string: '',
        runs: [],
      });

      expect(result.syllables).toEqual([]);
      expect(result.string).toEqual('');
    });

    test('should return hyphenated syllables when single run string', () => {
      const result = customizedInstance(customHyphenation)({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(1);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 11);
    });

    test('should return hyphenated syllables when multiple runs string', () => {
      const result = customizedInstance(customHyphenation)({
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

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: null },
      ]);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);
    });

    test('should be able to turn off hyphenation', () => {
      const hyphenationCallback = (word, original) => {
        return { parts: original(word).parts, hyphen: null };
      };
      const result = customizedInstance(hyphenationCallback)({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: null },
        { string: 'sum', hyphen: null },
      ]);
    });

    test('should tolerate missing hyphen specification', () => {
      const hyphenationCallback = (word, original) => {
        return { parts: original(word).parts };
      };
      const result = customizedInstance(hyphenationCallback)({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: null },
      ]);
    });

    test('should work when returning simple string array', () => {
      const hyphenationCallback = (word) => {
        return word.split(/(?<=[aeiou])/g);
      };
      const result = customizedInstance(hyphenationCallback)({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lo', hyphen: '-' },
        { string: 're', hyphen: '-' },
        { string: 'm', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'i', hyphen: '-' },
        { string: 'psu', hyphen: '-' },
        { string: 'm', hyphen: null },
      ]);
    });

    test('should work when returning specific hyphenation instructions', () => {
      const hyphenationCallback = (word) => {
        if (word === 'Lor-em') {
          return [
            { string: 'Lor-', hyphen: '-' },
            { string: 'em', hyphen: '-' },
          ];
        }
        if (word === 'ipsum') {
          return [
            { string: 'ip', hyphen: null },
            { string: 'sum', hyphen: null },
          ];
        }
        return [word];
      };
      const result = customizedInstance(hyphenationCallback)({
        string: 'Lor-em ipsum',
        runs: [
          {
            start: 0,
            end: 12,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lor-', hyphen: '-' }, // can force adding hyphen on part ending in dash
        { string: 'em', hyphen: null }, // last hyphen of the word is forced to null
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: null }, // can force omitting hyphen inside word
        { string: 'sum', hyphen: null },
      ]);
    });

    test('should force hyphen character to be a dash', () => {
      const hyphenationCallback = (word) => {
        if (word === 'Lorem') {
          return [
            { string: 'Lor', hyphen: '.' },
            { string: 'e', hyphen: '' },
            { string: 'm', hyphen: null },
          ];
        }
        if (word === 'ipsum') {
          return [
            { string: 'ip', hyphen: 'p' },
            { string: 'su', hyphen: undefined },
            { string: 'm', hyphen: null },
          ];
        }
        return [word];
      };
      const result = customizedInstance(hyphenationCallback)({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 11,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lor', hyphen: '-' },
        { string: 'e', hyphen: '-' },
        { string: 'm', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'su', hyphen: '-' },
        { string: 'm', hyphen: null },
      ]);
    });

    test('should be able to split at additional special characters', () => {
      const result = customizedInstance(customHyphenation)({
        string: 'Lo.re/m ipsum',
        runs: [
          {
            start: 0,
            end: 13,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lo.', hyphen: '-' },
        { string: 're/', hyphen: '-' },
        { string: 'm', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: null },
      ]);
    });

    test('should not apply default english syllable split to word containing soft hyphen', () => {
      const result = customizedInstance(customHyphenation)({
        string: 'Lorem ips\u00adum.um',
        runs: [
          {
            start: 0,
            end: 15,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lorem', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ips', hyphen: '-' },
        { string: 'um.', hyphen: '-' },
        { string: 'um', hyphen: null },
      ]);
    });

    test('should remove soft hyphens left over after hyphenation', () => {
      const hyphenationCallback = (word) => {
        if (word === 'Lorem') {
          return [
            { string: 'Lor\u00ad', hyphen: '-' },
            { string: 'em', hyphen: null },
          ];
        }
        if (word === 'ipsum') {
          return [
            { string: 'ip\u00ad', hyphen: null },
            { string: 'sum', hyphen: null },
          ];
        }
        return [word];
      };
      const result = customizedInstance(hyphenationCallback)({
        string: 'Lorem ipsum',
        runs: [
          {
            start: 0,
            end: 15,
            attributes: {},
          },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'Lor', hyphen: '-' },
        { string: 'em', hyphen: null },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: null },
        { string: 'sum', hyphen: null },
      ]);
    });
  });
});
