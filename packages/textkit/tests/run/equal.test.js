import equal from '../../src/run/equal';

describe('run equal operator', () => {
  test('should equal when no attributes', () => {
    const runA = { start: 5, end: 15, attributes: {} };
    const runB = { start: 5, end: 15, attributes: {} };

    expect(equal(runA)(runB)).toBeTruthy();
  });

  test('should equal with attributes', () => {
    const runA = { start: 5, end: 15, attributes: { something: 'blah' } };
    const runB = { start: 5, end: 15, attributes: { something: 'blah' } };

    expect(equal(runA)(runB)).toBeTruthy();
  });

  test('should not equal when different start', () => {
    const runA = { start: 5, end: 15, attributes: { something: 'blah' } };
    const runB = { start: 10, end: 15, attributes: { something: 'blah' } };

    expect(equal(runA)(runB)).toBeFalsy();
  });

  test('should not equal when different end', () => {
    const runA = { start: 5, end: 15, attributes: { something: 'blah' } };
    const runB = { start: 5, end: 10, attributes: { something: 'blah' } };

    expect(equal(runA)(runB)).toBeFalsy();
  });

  test('should not equal when different attributes', () => {
    const runA = { start: 5, end: 15, attributes: { something: 'blah' } };
    const runB = { start: 5, end: 10, attributes: { something: 'else' } };

    expect(equal(runA)(runB)).toBeFalsy();
  });
});
