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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: '-' },
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
        { string: 'Loremo', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ipsumo', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ipsum', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: '-' },
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
        { string: 'rem', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ips', hyphen: '-' },
        { string: 'um', hyphen: '-' },
      ]);
    });
  });

  describe('with custom hyphenation callback', () => {
    const customHyphenation = (word, original) => {
      return original(word).flatMap((part) => part.split(/(?<=[./])/g));
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: '-' },
      ]);
      expect(result.runs).toHaveLength(2);
      expect(result.runs[0]).toHaveProperty('start', 0);
      expect(result.runs[0]).toHaveProperty('end', 5);
      expect(result.runs[1]).toHaveProperty('start', 5);
      expect(result.runs[1]).toHaveProperty('end', 11);
    });

    test('should be able to turn off hyphenation', () => {
      const hyphenationCallback = (word, original) => {
        return original(word).map((string) => ({ string, hyphen: null }));
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
        return original(word).map((string) => ({ string }));
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: '-' },
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
        { string: 'm', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'i', hyphen: '-' },
        { string: 'psu', hyphen: '-' },
        { string: 'm', hyphen: '-' },
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
        { string: 'em', hyphen: '-' }, // explicit hyphens are kept on the last part too
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

      // UAX #14 allows a break after '/', so it needs no hyphen
      expect(result.syllables).toEqual([
        { string: 'Lo.', hyphen: '-' },
        { string: 're/', hyphen: null },
        { string: 'm', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ip', hyphen: '-' },
        { string: 'sum', hyphen: '-' },
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
        { string: 'Lorem', hyphen: '-' },
        { string: ' ', hyphen: null },
        { string: 'ips', hyphen: '-' },
        { string: 'um.', hyphen: '-' },
        { string: 'um', hyphen: '-' },
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

  describe('with ideographic scripts', () => {
    const hanString = (string: string) => ({
      string,
      runs: [{ start: 0, end: string.length, attributes: { script: 'Han' } }],
    });

    test('should break between ideographs without hyphens by default', () => {
      const result = builtinInstance(hanString('日本語'));

      expect(result.syllables).toEqual([
        { string: '日', hyphen: null },
        { string: '本', hyphen: null },
        { string: '語', hyphen: null },
      ]);
    });

    test('should keep closing punctuation with the previous ideograph', () => {
      const result = builtinInstance(hanString('東京。2024年'));

      expect(result.syllables.map((part) => part.string)).toEqual([
        '東',
        '京。',
        '2024',
        '年',
      ]);
    });

    test('should not hyphenate plain strings from custom callbacks', () => {
      const result = customizedInstance((word: string) => Array.from(word))(
        hanString('日本語'),
      );

      expect(result.syllables).toEqual([
        { string: '日', hyphen: null },
        { string: '本', hyphen: null },
        { string: '語', hyphen: null },
      ]);
    });

    test('should keep explicit hyphens from custom callbacks', () => {
      const result = customizedInstance(() => [
        { string: '日', hyphen: '-' },
        { string: '本', hyphen: '-' },
      ])(hanString('日本'));

      expect(result.syllables).toEqual([
        { string: '日', hyphen: '-' },
        { string: '本', hyphen: '-' },
      ]);
    });

    test('should break ideographs the fallback keeps whole', () => {
      const result = customizedInstance(
        (word: string, fallback: (word: string) => string[]) => fallback(word),
      )(hanString('日本'));

      expect(result.syllables).toEqual([
        { string: '日', hyphen: null },
        { string: '本', hyphen: null },
      ]);
    });

    test('should still hyphenate latin runs', () => {
      const result = builtinInstance({
        string: 'something',
        runs: [{ start: 0, end: 9, attributes: { script: 'Latin' } }],
      });

      expect(result.syllables).toEqual([
        { string: 'some', hyphen: '-' },
        { string: 'thing', hyphen: '-' },
      ]);
    });
  });

  describe('word-break option', () => {
    const strings = (string: string, options = {}) =>
      wrapWords(
        {},
        options,
      )({
        string,
        runs: [{ start: 0, end: string.length, attributes: {} }],
      }).syllables.map((part) => part.string);

    test('should split CJK characters individually by default', () => {
      expect(strings('本当に長いテキスト')).toEqual([
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

    test('should split CJK characters individually with wordBreak: normal', () => {
      expect(strings('本当に長い', { wordBreak: 'normal' })).toEqual([
        '本',
        '当',
        'に',
        '長',
        'い',
      ]);
    });

    test('should not split Latin characters with wordBreak: normal', () => {
      expect(strings('Hello world', { wordBreak: 'normal' })).toEqual([
        'Hello',
        ' ',
        'world',
      ]);
    });

    test('should split mixed CJK and Latin with wordBreak: normal', () => {
      expect(strings('Hello世界', { wordBreak: 'normal' })).toEqual([
        'Hello',
        '世',
        '界',
      ]);
    });

    test('should split all characters with wordBreak: break-all', () => {
      expect(strings('Hello', { wordBreak: 'break-all' })).toEqual([
        'H',
        'e',
        'l',
        'l',
        'o',
      ]);
    });

    test('should not split CJK characters with wordBreak: keep-all', () => {
      expect(strings('本当に長いテキスト', { wordBreak: 'keep-all' })).toEqual([
        '本当に長いテキスト',
      ]);
    });

    test('should split Hiragana, Katakana and Korean', () => {
      expect(strings('あいう')).toEqual(['あ', 'い', 'う']);
      expect(strings('アイウ')).toEqual(['ア', 'イ', 'ウ']);
      expect(strings('한글테스트')).toEqual(['한', '글', '테', '스', '트']);
    });
  });

  describe('break kinds', () => {
    const run = (string: string) => ({
      string,
      runs: [{ start: 0, end: string.length, attributes: {} }],
    });

    const splitter = vi.fn((word: string) =>
      word === 'reallylong' ? ['really', 'long'] : [word],
    );

    test('should break after a hyphen-minus without another hyphen', () => {
      const result = emptyInstance(run('state-of-the-art'));

      expect(result.syllables).toEqual([
        { string: 'state-', hyphen: null },
        { string: 'of-', hyphen: null },
        { string: 'the-', hyphen: null },
        { string: 'art', hyphen: '-' },
      ]);
    });

    test('should not hyphenate with hyphens: none, even at soft hyphens', () => {
      const instance = wrapWords(
        { wordHyphenation: () => splitter },
        { hyphens: 'none' },
      );
      const result = instance(run('really­long'));

      expect(result.string).toEqual('reallylong');
      expect(result.syllables).toEqual([
        { string: 'reallylong', hyphen: null },
      ]);
    });

    test('should hyphenate only at soft hyphens with hyphens: manual', () => {
      const instance = wrapWords(
        { wordHyphenation: () => (word: string) => [...word] },
        { hyphens: 'manual' },
      );
      const result = instance(run('really­long'));

      expect(result.syllables).toEqual([
        { string: 'really', hyphen: '-' },
        { string: 'long', hyphen: '-' },
      ]);
    });

    test('should not hyphenate with wordBreak: break-all', () => {
      const hyphenate = vi.fn((word: string) => [word]);
      const instance = wrapWords(
        { wordHyphenation: () => hyphenate },
        { wordBreak: 'break-all' },
      );
      const result = instance(run('123'));

      expect(hyphenate).not.toHaveBeenCalled();
      expect(result.syllables).toEqual([
        { string: '1', hyphen: null },
        { string: '2', hyphen: null },
        { string: '3', hyphen: null },
      ]);
    });

    test('should keep punctuation and combining marks attached with wordBreak: break-all', () => {
      const instance = wrapWords({}, { wordBreak: 'break-all' });
      const strings = (string: string) =>
        instance(run(string)).syllables.map((part) => part.string);

      expect(strings('(ab).')).toEqual(['(a', 'b).']);
      expect(strings('éé')).toEqual(['é', 'é']);
    });

    test('should break after punctuation with wordBreak: keep-all', () => {
      const instance = wrapWords({}, { wordBreak: 'keep-all' });
      const result = instance(run('日本語、テスト'));

      expect(result.syllables.map((part) => part.string)).toEqual([
        '日本語、',
        'テスト',
      ]);
    });

    test('should drop hyphenation points that UAX #14 forbids', () => {
      const instance = wrapWords(
        { wordHyphenation: () => (word: string) => [...word] },
        {},
      );
      const result = instance(run('あ、い'));

      expect(result.syllables).toEqual([
        { string: 'あ、', hyphen: null },
        { string: 'い', hyphen: '-' },
      ]);
    });

    test('should keep explicit breaks where UAX #14 forbids one', () => {
      const result = customizedInstance(() => [
        { string: 'あ', hyphen: null },
        { string: '、い', hyphen: null },
      ])(run('あ、い'));

      expect(result.syllables).toEqual([
        { string: 'あ', hyphen: null },
        { string: '、', hyphen: null },
        { string: 'い', hyphen: null },
      ]);
    });

    test('should break between runs only where UAX #14 allows', () => {
      const result = emptyInstance({
        string: 'word.日本',
        runs: [
          { start: 0, end: 4, attributes: {} },
          { start: 4, end: 5, attributes: {} },
          { start: 5, end: 6, attributes: { script: 'Han' } },
          { start: 6, end: 7, attributes: { script: 'Han' } },
        ],
      });

      expect(result.syllables).toEqual([
        { string: 'word.', hyphen: null },
        { string: '日', hyphen: null },
        { string: '本', hyphen: null },
      ]);
    });

    test('should not break between CJK runs with wordBreak: keep-all', () => {
      const instance = wrapWords({}, { wordBreak: 'keep-all' });
      const result = instance({
        string: '句読点の後ろ',
        runs: [
          { start: 0, end: 3, attributes: {} },
          { start: 3, end: 4, attributes: {} },
          { start: 4, end: 5, attributes: {} },
          { start: 5, end: 6, attributes: {} },
        ],
      });

      expect(result.syllables.map((part) => part.string)).toEqual([
        '句読点の後ろ',
      ]);
    });
  });
});
