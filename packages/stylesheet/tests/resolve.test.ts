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

  test('should return empty object for empty array', () => {
    const style: any[] = [];
    const result = resolve({ width: 10, height: 10 }, style);

    expect(result).toEqual({});
  });

  test('should ignore false values in array', () => {
    const condition = false;
    const style = [
      { backgroundColor: 'black' },
      condition && { color: 'red' },
      { fontSize: 12 },
    ];
    const result = resolve({ width: 10, height: 10 }, style as any);

    expect(result).toEqual({
      backgroundColor: 'black',
      fontSize: 12,
    });
  });

  test('should handle deeply nested arrays', () => {
    const style = [
      { backgroundColor: 'black' },
      [[{ color: 'red' }, [{ fontSize: 12 }]]],
    ];
    const result = resolve({ width: 10, height: 10 }, style as any);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      fontSize: 12,
    });
  });

  test('should resolve unit values', () => {
    const style = { width: '1in', height: '2in' };
    const result = resolve({ width: 200, height: 400 }, style);

    expect(result).toEqual({
      width: 72,
      height: 144,
    });
  });

  test('should resolve shorthand values', () => {
    const style = { margin: '10 20 30 40' };
    const result = resolve({ width: 200, height: 400 }, style);

    expect(result).toEqual({
      marginTop: 10,
      marginRight: 20,
      marginBottom: 30,
      marginLeft: 40,
    });
  });

  test('should resolve vw and vh units based on container', () => {
    const style = { width: '50vw', height: '25vh' };
    const result = resolve({ width: 200, height: 400 }, style);

    expect(result).toEqual({
      width: 100,
      height: 100,
    });
  });

  test('should resolve rem units based on container remBase', () => {
    const style = { width: '2rem', height: '3rem' };
    const result = resolve({ width: 200, height: 400, remBase: 16 }, style);

    expect(result).toEqual({
      width: 32,
      height: 48,
    });
  });

  test('should resolve combined flattening and style resolution', () => {
    const style = [{ margin: '10px' }, { padding: '20px', width: '1in' }];
    const result = resolve({ width: 200, height: 400 }, style);

    expect(result).toEqual({
      marginTop: 10,
      marginRight: 10,
      marginBottom: 10,
      marginLeft: 10,
      paddingTop: 20,
      paddingRight: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      width: 72,
    });
  });
});
