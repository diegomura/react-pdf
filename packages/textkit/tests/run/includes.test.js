import empty from '../../src/run/empty';
import includes from '../../src/run/includes';

describe('run includes operator', () => {
  test('should return false if no run provided', () => {
    expect(includes(76, null)).toBeFalsy();
  });

  test('should return false for empty run', () => {
    expect(includes(76, empty())).toBeFalsy();
  });

  test('should return false if run does not contain code point', () => {
    const run = { start: 0, end: 0, attributes: { something: 'blah' } };
    expect(includes(76, run)).toBeFalsy();
  });

  test('should return false if run does not contain code point', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 114, codePoints: [114] }, // r
        { id: 101, codePoints: [101] }, // e
        { id: 109, codePoints: [109] }, // m
      ],
    };

    expect(includes(77, run)).toBeFalsy();
  });

  test('should return true for code points present', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 114, codePoints: [114] }, // r
        { id: 101, codePoints: [101] }, // e
        { id: 109, codePoints: [109] }, // m
      ],
    };

    expect(includes(76, run)).toBeTruthy();
    expect(includes(111, run)).toBeTruthy();
    expect(includes(114, run)).toBeTruthy();
    expect(includes(101, run)).toBeTruthy();
    expect(includes(109, run)).toBeTruthy();
  });

  test('should return true for code points present using hex numbers', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 114, codePoints: [114] }, // r
        { id: 101, codePoints: [101] }, // e
        { id: 109, codePoints: [109] }, // m
      ],
    };

    expect(includes(0x4c, run)).toBeTruthy();
    expect(includes(0x6f, run)).toBeTruthy();
    expect(includes(0x72, run)).toBeTruthy();
    expect(includes(0x65, run)).toBeTruthy();
    expect(includes(0x6d, run)).toBeTruthy();
  });

  test('should return true for ligature code points', () => {
    const run = {
      start: 0,
      end: 5,
      glyphs: [
        { id: 76, codePoints: [76] }, // l
        { id: 111, codePoints: [111] }, // o
        { id: 64257, codePoints: [102, 105] }, // fi
        { id: 109, codePoints: [109] }, // m
      ],
    };

    expect(includes(102, run)).toBeTruthy();
    expect(includes(105, run)).toBeTruthy();
  });
});
