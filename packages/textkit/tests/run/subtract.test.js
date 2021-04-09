import subtract from '../../src/run/subtract';

describe('run subtract operator', () => {
  test('should return equal run if 0', () => {
    const attributes = { something: 'blah' };
    const run = { start: 5, end: 15, attributes };
    const subtracted = subtract(0, run);

    expect(subtracted).not.toBe(run);
    expect(subtracted).toHaveProperty('start', 5);
    expect(subtracted).toHaveProperty('end', 15);
    expect(subtracted).toHaveProperty('attributes', attributes);
  });

  test('should return subtracted run', () => {
    const attributes = { something: 'blah' };
    const run = { start: 5, end: 15, attributes };
    const subtracted = subtract(5, run);

    expect(subtracted).not.toBe(run);
    expect(subtracted).toHaveProperty('start', 0);
    expect(subtracted).toHaveProperty('end', 10);
    expect(subtracted).toHaveProperty('attributes', attributes);
  });
});
