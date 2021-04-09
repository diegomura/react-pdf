import wrapWords from '../../src/layout/wrapWords';

const emptyInstance = wrapWords({}, {});
const wordHyphenationEngine = jest.fn(x => [x]);
const defaultInstance = wrapWords(
  { wordHyphenation: () => wordHyphenationEngine },
  {},
);
const mutateWordHyphenationEngine = jest.fn(x => (x === ' ' ? [x] : [`${x}o`]));
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
          },
          {
            start: 5,
            end: 11,
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
          },
          {
            start: 5,
            end: 11,
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
});
