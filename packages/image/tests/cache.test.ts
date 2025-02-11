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
});
