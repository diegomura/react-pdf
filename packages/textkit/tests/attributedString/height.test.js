import empty from '../../src/attributedString/empty';
import height from '../../src/attributedString/height';

const font = { descent: 10, ascent: 15, lineGap: 5, unitsPerEm: 2 };

describe('attributeString height operator', () => {
  test('should return 0 for empty string', () => {
    expect(height(empty())).toBe(0);
  });

  test('should return 0 if runs dont have font', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5 },
        { start: 5, end: 8 },
      ],
    };

    expect(height(string)).toBe(0);
  });

  test('should max runs height', () => {
    const runs = [
      { start: 2, end: 4, attributes: { fontSize: 10, font } }, // 50
      { start: 4, end: 6, attributes: { fontSize: 12, font } }, // 60
    ];
    const string = { string: '', runs };

    expect(height(string)).toBe(60);
  });

  test('should sum up runs height with lineHeight', () => {
    const runs = [
      { start: 2, end: 4, attributes: { fontSize: 10, font } }, // 50
      { start: 4, end: 6, attributes: { fontSize: 12, lineHeight: 70, font } }, // 70
    ];
    const string = { string: '', runs };

    expect(height(string)).toBe(70);
  });
});
