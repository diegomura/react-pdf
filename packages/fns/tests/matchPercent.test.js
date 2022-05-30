import matchPercent from '../src/matchPercent';

describe('match percent', () => {
  test('should return null for null input', () => {
    expect(matchPercent(null)).toBeNull();
  });

  test('should return null for numeric inputs', () => {
    expect(matchPercent(40)).toBeNull();
  });

  test('should return null for wrong string inputs', () => {
    expect(matchPercent('hey%')).toBeNull();
  });

  test('should return value for positive integer percents', () => {
    const match = matchPercent('35%');

    expect(match.value).toBe(35);
    expect(match.percent).toBe(0.35);
  });

  test('should return value for positive real percents', () => {
    const match = matchPercent('35.5%');

    expect(match.value).toBe(35.5);
    expect(match.percent).toBe(0.355);
  });

  test('should return value for negative integer percents', () => {
    const match = matchPercent('-35%');

    expect(match.value).toBe(-35);
    expect(match.percent).toBe(-0.35);
  });

  test('should return value for negative real percents', () => {
    const match = matchPercent('-35.5%');

    expect(match.value).toBe(-35.5);
    expect(match.percent).toBe(-0.355);
  });
});
