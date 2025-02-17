import { describe, expect, test } from 'vitest';

import resolve from '../src/index';

describe('stylesheet resolve', () => {
  test('should return empty object for undefined', () => {
    const style = undefined;
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual({});
  });

  test('should return empty object for null', () => {
    const style = null;
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual({});
  });

  test('should return empty object for empty object', () => {
    const style = {};
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual({});
  });

  test('should return identity for single style object', () => {
    const style = { color: 'red', textAlign: 'center' as const };
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual(style);
  });

  test('should return identity for single style object array', () => {
    const style = [{ color: 'red', textAlign: 'center' as const }];
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual(style[0]);
  });

  test('should return identity for single style object array with nil values', () => {
    const style = [
      null,
      { color: 'red', textAlign: 'center' as const },
      undefined,
    ];
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual(style[1]);
  });

  test('should return several style objects flatten', () => {
    const style = [
      { backgroundColor: 'black' },
      { color: 'red', textAlign: 'center' as const },
    ];
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return object of merged values from array', () => {
    const styles = [{ fontSize: 16, color: 'white' }, { color: 'green' }];
    const result = resolve({ width: 10, height: 10 }, styles);

    return expect(result).toEqual({ fontSize: 16, color: 'green' });
  });

  test('should return flatten several style objects with nil values', () => {
    const style = [
      null,
      { backgroundColor: 'black' },
      undefined,
      { color: 'red', textAlign: 'center' as const },
      null,
    ];
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return flatten nested style objects', () => {
    const style = [
      { backgroundColor: 'black' },
      [{ color: 'red', textAlign: 'center' as const }],
    ];
    const result = resolve({ width: 10, height: 10 }, style as any);

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
      [null, { color: 'red', textAlign: 'center' as const }, undefined],
    ];
    const result = resolve({ width: 10, height: 10 }, style as any);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });
});
