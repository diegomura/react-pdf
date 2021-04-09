import empty from '../../src/attributedString/empty';
import end from '../../src/attributedString/end';

describe('attributeString end operator', () => {
  test('should return 0 for empty string', () => {
    expect(end(empty())).toBe(0);
  });

  test('should return first run end value', () => {
    const string = {
      string: '',
      runs: [
        { start: 2, end: 5 },
        { start: 5, end: 8 },
      ],
    };
    expect(end(string)).toBe(8);
  });
});
