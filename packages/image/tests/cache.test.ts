import { describe, expect, test } from 'vitest';

import createCache from '../src/cache.js';

describe('Background', () => {
  test('should have length 0 by default', () => {
    const cache = createCache();
    expect(cache.length()).toBe(0);
  });

  test('should return undefined for invalid key', () => {
    const cache = createCache();
    expect(cache.get('somekey')).toBe(undefined);
  });

  test('should be able to set pair key-value', () => {
    const cache = createCache();
    expect(() => cache.set('somekey', 'somevalue')).not.toThrow();
  });

  test('should get key value', () => {
    const cache = createCache();
    cache.set('somekey', 'somevalue');
    expect(cache.get('somekey')).toEqual('somevalue');
  });

  test('should reset cache', () => {
    const cache = createCache();
    cache.set('somekey', 'somevalue');

    expect(cache.get('somekey')).toEqual('somevalue');

    cache.reset();

    expect(cache.length()).toBe(0);
    expect(cache.get('somekey')).toBeFalsy();
  });

  test('remove elements FIFO if limit exceeded', () => {
    const cache = createCache({ limit: 3 });

    cache.set('1', '1');
    cache.set('2', '2');
    cache.set('3', '3');
    cache.set('4', '4');
    cache.set('5', '5');

    expect(cache.length()).toBe(3);
    expect(cache.get('1')).toBe(undefined);
    expect(cache.get('2')).toBe(undefined);
    expect(cache.get('3')).toBe('3');
    expect(cache.get('4')).toBe('4');
    expect(cache.get('5')).toBe('5');
  });

  test('should return null when getting with null key', () => {
    const cache = createCache();
    cache.set('somekey', 'somevalue');
    expect(cache.get(null)).toBeNull();
  });

  test('should use default limit of 100', () => {
    const cache = createCache();

    for (let i = 0; i < 105; i++) {
      cache.set(`key${i}`, `value${i}`);
    }

    expect(cache.length()).toBe(100);
    expect(cache.get('key0')).toBe(undefined);
    expect(cache.get('key4')).toBe(undefined);
    expect(cache.get('key5')).toBe('value5');
    expect(cache.get('key104')).toBe('value104');
  });

  test('should overwrite existing key without increasing length', () => {
    const cache = createCache({ limit: 3 });

    cache.set('key1', 'value1');
    cache.set('key2', 'value2');
    cache.set('key1', 'updatedValue1');

    expect(cache.get('key1')).toBe('updatedValue1');
    expect(cache.length()).toBe(2);
  });

  test('should handle limit of 1', () => {
    const cache = createCache({ limit: 1 });

    cache.set('key1', 'value1');
    expect(cache.get('key1')).toBe('value1');
    expect(cache.length()).toBe(1);

    cache.set('key2', 'value2');
    expect(cache.get('key1')).toBe(undefined);
    expect(cache.get('key2')).toBe('value2');
    expect(cache.length()).toBe(1);
  });
});
