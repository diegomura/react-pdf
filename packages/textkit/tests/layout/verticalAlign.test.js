import verticalAlignment from '../../src/layout/verticalAlign';

describe('verticalAlign', () => {
  test('should apply vertical alignment "super" to string', () => {
    const instance = verticalAlignment();
    const text = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { fontSize: 12, color: 'red', verticalAlign: 'super' },
        },
      ],
    };

    const result = instance(text);
    // expect yOffset to be 0.4
    expect(result.runs[0].attributes).toHaveProperty('yOffset', 0.4);
    // expect fontSize to be 9
    expect(result.runs[0].attributes).toHaveProperty('fontSize', 9);
    // expect characterSpacing to be between -1.22 and -1.23
    expect(result.runs[0].attributes).toHaveProperty('characterSpacing');
    expect(result.runs[0].attributes.characterSpacing).toBeLessThan(-1.22);
    expect(result.runs[0].attributes.characterSpacing).toBeGreaterThan(-1.23);
  });
  test('should apply vertical alignment "sub" to string', () => {
    const instance = verticalAlignment();
    const text = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { fontSize: 12, color: 'red', verticalAlign: 'sub' },
        },
      ],
    };

    const result = instance(text);
    // expect yOffset to be 0.4
    expect(result.runs[0].attributes).toHaveProperty('yOffset', -0.2);
    // expect fontSize to be 9
    expect(result.runs[0].attributes).toHaveProperty('fontSize', 9);
    // expect characterSpacing to be between -1.22 and -1.23
    expect(result.runs[0].attributes).toHaveProperty('characterSpacing');
    expect(result.runs[0].attributes.characterSpacing).toBeLessThan(-1.22);
    expect(result.runs[0].attributes.characterSpacing).toBeGreaterThan(-1.23);
  });

  test('should ignore vertical alignment value if it is not "sub" or "super"', () => {
    const instance = verticalAlignment();
    const text = {
      string: 'Lorem',
      runs: [
        {
          start: 0,
          end: 5,
          attributes: { fontSize: 12, color: 'red', verticalAlign: 'center' },
        },
      ],
    };

    const result = instance(text);
    // expect yOffset property to be undefined
    expect(result.runs[0].attributes).not.toHaveProperty('yOffset');
    // expect fontSize to be 12
    expect(result.runs[0].attributes).toHaveProperty('fontSize', 12);
    // expect characterSpacing to be undefined
    expect(result.runs[0].attributes).not.toHaveProperty('characterSpacing');
  });
});
