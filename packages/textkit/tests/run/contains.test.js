import contains from '../../src/run/contains';

describe('run contains operator', () => {
  test('should contain start value', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(contains(5)(run)).toBeTruthy();
  });

  test('should contain end value', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(contains(14)(run)).toBeTruthy();
  });

  test('should not contain real end value', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(contains(15)(run)).toBeFalsy();
  });

  test('should not contain trailing value', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(contains(4)(run)).toBeFalsy();
  });

  test('should not contain leading value', () => {
    const run = { start: 5, end: 15, attributes: {} };

    expect(contains(16)(run)).toBeFalsy();
  });
});
