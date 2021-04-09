import extend from '../../src/run/extend';

describe('run extend operator', () => {
  test('should extend for lower values', () => {
    const run = { start: 5, end: 10 };
    const extended = extend(2)(run);

    expect(extended).toHaveProperty('start', 2);
    expect(extended).toHaveProperty('end', 10);
  });

  test('should extend for inner values', () => {
    const run = { start: 5, end: 10 };
    const extended = extend(7)(run);

    expect(extended).toHaveProperty('start', 5);
    expect(extended).toHaveProperty('end', 10);
  });

  test('should extend for upper values', () => {
    const run = { start: 5, end: 10 };
    const extended = extend(12)(run);

    expect(extended).toHaveProperty('start', 5);
    expect(extended).toHaveProperty('end', 12);
  });
});
