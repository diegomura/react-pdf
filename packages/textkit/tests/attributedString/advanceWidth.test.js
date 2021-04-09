import empty from '../../src/attributedString/empty';
import advanceWidth from '../../src/attributedString/advanceWidth';

describe('attributeString advanceWidth operator', () => {
  test('should return 0 for empty string', () => {
    expect(advanceWidth(empty())).toBe(0);
  });

  test('should return 0 if runs dont have positions', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5 },
        { start: 5, end: 8 },
      ],
    };

    expect(advanceWidth(string)).toBe(0);
  });

  test('should sum up runs advance width', () => {
    const runs = [
      { start: 2, end: 4, positions: [{ xAdvance: 5 }, { xAdvance: 10 }] },
      { start: 4, end: 6, positions: [{ xAdvance: 15 }, { xAdvance: 20 }] },
    ];
    const string = { string: '', runs };

    expect(advanceWidth(string)).toBe(50);
  });
});
