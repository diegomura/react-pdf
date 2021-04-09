import omit from '../../src/run/omit';

describe('run omit operator', () => {
  test('should omit passed attribute', () => {
    const run = { start: 5, end: 15, attributes: { something: 'blah' } };
    const ommited = omit('something', run);

    expect(ommited).toHaveProperty('start', 5);
    expect(ommited).toHaveProperty('end', 15);
    expect(ommited.attributes.something).toBeFalsy();
  });

  test('should not omit other attribute', () => {
    const run = { start: 5, end: 15, attributes: { something: 'blah' } };
    const ommited = omit('somethingElse', run);

    expect(ommited).toHaveProperty('start', 5);
    expect(ommited).toHaveProperty('end', 15);
    expect(ommited.attributes).toHaveProperty('something', 'blah');
  });

  test('should preserve other attributes', () => {
    const run = {
      start: 5,
      end: 15,
      attributes: { something: 'blah', somethingElse: 'bloh' },
    };
    const ommited = omit('something', run);

    expect(ommited).toHaveProperty('start', 5);
    expect(ommited).toHaveProperty('end', 15);
    expect(ommited.attributes.something).toBeFalsy();
    expect(ommited.attributes).toHaveProperty('somethingElse', 'bloh');
  });
});
