import flatten from '../../src/stylesheet/flatten';

describe('stylesheet flatten', () => {
  test('should return empty object for undefined', () => {
    const style = undefined;
    const result = flatten(style);

    expect(result).toEqual({});
  });

  test('should return empty object for null', () => {
    const style = null;
    const result = flatten(style);

    expect(result).toEqual({});
  });

  test('should return empty object for empty array', () => {
    const style = {};
    const result = flatten(style);

    expect(result).toEqual({});
  });

  test('should return identity for single style object', () => {
    const style = { color: 'red', textAlign: 'center' };
    const result = flatten(style);

    expect(result).toEqual(style);
  });

  test('should return identity for single style object array', () => {
    const style = [{ color: 'red', textAlign: 'center' }];
    const result = flatten(style);

    expect(result).toEqual(style[0]);
  });

  test('should return identity for single style object array with nil values', () => {
    const style = [null, { color: 'red', textAlign: 'center' }, undefined];
    const result = flatten(style);

    expect(result).toEqual(style[1]);
  });

  test('should return flatten several style objects', () => {
    const style = [
      { backgroundColor: 'black' },
      { color: 'red', textAlign: 'center' },
    ];
    const result = flatten(style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return object of merged values from array', () => {
    const styles = [{ fontSize: 16, color: 'white' }, { color: 'green' }];
    const result = flatten(styles);

    return expect(result).toEqual({ fontSize: 16, color: 'green' });
  });

  test('should return flatten several style objects with nil values', () => {
    const style = [
      null,
      { backgroundColor: 'black' },
      undefined,
      { color: 'red', textAlign: 'center' },
      null,
    ];
    const result = flatten(style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return flatten nested style objects', () => {
    const style = [
      { backgroundColor: 'black' },
      [{ color: 'red', textAlign: 'center' }],
    ];
    const result = flatten(style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return flatten nested style objects with nil values', () => {
    const style = [
      null,
      { backgroundColor: 'black' },
      undefined,
      [null, { color: 'red', textAlign: 'center' }, undefined],
    ];
    const result = flatten(style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });
});
