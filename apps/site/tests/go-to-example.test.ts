import { describe, expect, test } from 'vitest';
import { playgroundHref } from '../components/go-to-example';

describe('playgroundHref', () => {
  test('links to the named example', () => {
    expect(playgroundHref('fractals')).toBe('/playground?example=fractals');
  });

  test('falls back to the plain playground when no name is given', () => {
    expect(playgroundHref()).toBe('/playground');
    expect(playgroundHref('')).toBe('/playground');
  });

  test('encodes names', () => {
    expect(playgroundHref('a b')).toBe('/playground?example=a%20b');
  });
});
