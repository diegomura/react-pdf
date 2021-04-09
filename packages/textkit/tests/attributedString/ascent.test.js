import empty from '../../src/attributedString/empty';
import ascent from '../../src/attributedString/ascent';

const font = { ascent: 10, unitsPerEm: 2 };

describe('attributeString ascent operator', () => {
  test('should return 0 for empty string', () => {
    expect(ascent(empty())).toBe(0);
  });

  test('should return 0 if runs dont have font', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5 },
        { start: 5, end: 8 },
      ],
    };

    expect(ascent(string)).toBe(0);
  });

  test('should max runs ascent', () => {
    const runs = [
      { start: 2, end: 4, attributes: { fontSize: 10, font } }, // 50
      { start: 4, end: 6, attributes: { fontSize: 12, font } }, // 60
    ];
    const string = { string: '', runs };

    expect(ascent(string)).toBe(60);
  });

  test('should sum up runs ascent with attachments', () => {
    const runs = [
      { start: 4, end: 6, attributes: { fontSize: 12, font } }, // 60
      {
        start: 2,
        end: 4,
        attributes: { fontSize: 10, font, attachment: { height: 70 } },
      }, // 70
    ];
    const string = { string: '', runs };

    expect(ascent(string)).toBe(70);
  });
});
