import { describe, expect, test } from 'vitest';
import { replHref } from '../components/go-to-example';

describe('replHref', () => {
  test('links to the named example', () => {
    expect(replHref('fractals')).toBe('/repl?example=fractals');
  });

  test('falls back to the plain repl when no name is given', () => {
    expect(replHref()).toBe('/repl');
    expect(replHref('')).toBe('/repl');
  });

  test('encodes names', () => {
    expect(replHref('a b')).toBe('/repl?example=a%20b');
  });
});
