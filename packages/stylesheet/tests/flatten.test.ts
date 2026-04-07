import { describe, expect, test } from 'vitest';

import flatten from '../src/flatten';

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

  test('should return empty object for empty object', () => {
    const style = {};
    const result = flatten(style);

    expect(result).toEqual({});
  });

  test('should return empty object for empty array', () => {
    const style: [] = [];
    const result = flatten(style);

    expect(result).toEqual({});
  });

  test('should return identity for single style object', () => {
    const style = { color: 'red', textAlign: 'center' as const };
    const result = flatten(style);

    expect(result).toEqual(style);
  });

  test('should return identity for single style object array', () => {
    const style = [{ color: 'red', textAlign: 'center' as const }];
    const result = flatten(style);

    expect(result).toEqual(style[0]);
  });

  test('should return identity for single style object array with nil values', () => {
    const style = [
      null,
      { color: 'red', textAlign: 'center' as const },
      undefined,
    ];
    const result = flatten(style);

    expect(result).toEqual(style[1]);
  });

  test('should return flatten several style objects', () => {
    const style = [
      { backgroundColor: 'black' },
      { color: 'red', textAlign: 'center' as const },
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
      { color: 'red', textAlign: 'center' as const },
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
      [{ color: 'red', textAlign: 'center' as const }],
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
      [null, { color: 'red', textAlign: 'center' as const }, undefined],
    ];
    const result = flatten(style);

    expect(result).toEqual({
      backgroundColor: 'black',
      color: 'red',
      textAlign: 'center',
    });
  });

  test('should return empty object for array with only nil values', () => {
    const style = [null, undefined, null];
    const result = flatten(style);

    expect(result).toEqual({});
  });

  test('should flatten deeply nested style arrays', () => {
    const style = [
      { color: 'red' },
      [[{ fontSize: 12 }], [{ backgroundColor: 'blue' }]],
      [[[{ margin: 10 }]]],
    ];
    const result = flatten(style);

    expect(result).toEqual({
      color: 'red',
      fontSize: 12,
      backgroundColor: 'blue',
      margin: 10,
    });
  });

  test('should ignore null values inside style objects', () => {
    const style = [{ color: 'red', fontSize: null as unknown as number }];
    const result = flatten(style);

    expect(result).toEqual({ color: 'red' });
  });

  test('should ignore undefined values inside style objects', () => {
    const style = [{ color: 'red', fontSize: undefined }];
    const result = flatten(style);

    expect(result).toEqual({ color: 'red' });
  });

  test('should not override with null values from later styles', () => {
    const style = [
      { color: 'red', fontSize: 12 },
      { color: null as unknown as string },
    ];
    const result = flatten(style);

    expect(result).toEqual({ color: 'red', fontSize: 12 });
  });

  test('should preserve falsy values like 0', () => {
    const style = [{ margin: 10 }, { margin: 0 }];
    const result = flatten(style);

    expect(result).toEqual({ margin: 0 });
  });

  test('should preserve empty string values', () => {
    const style = [{ color: 'red' }, { color: '' }];
    const result = flatten(style);

    expect(result).toEqual({ color: '' });
  });

  test('should handle complex merge with multiple overlapping keys', () => {
    const style = [
      { color: 'red', fontSize: 12, margin: 5 },
      { color: 'blue', padding: 10 },
      { fontSize: 14, margin: 10 },
    ];
    const result = flatten(style);

    expect(result).toEqual({
      color: 'blue',
      fontSize: 14,
      margin: 10,
      padding: 10,
    });
  });

  test('should handle nested arrays with overlapping keys', () => {
    const style = [
      { color: 'red' },
      [{ color: 'blue' }, { color: 'green' }],
      { color: 'yellow' },
    ];
    const result = flatten(style);

    expect(result).toEqual({ color: 'yellow' });
  });
});
