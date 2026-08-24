import { expect, test } from 'vitest';

import { compress } from '../src/repl/compress';
import { examples } from '../src/repl/examples';
import { initialCode, DEFAULT_EXAMPLE } from '../src/repl/url';

const params = (query: string) => new URLSearchParams(query);

test('code param wins over example param', () => {
  const code = '<Document />';
  const query = `code=${compress(code)}&example=resume`;

  expect(initialCode(params(query))).toBe(code);
});

test('malformed code falls back to the example param', () => {
  expect(initialCode(params('code=zzzz&example=resume'))).toBe(examples.resume);
});

test('malformed code with no example falls back to the default example', () => {
  expect(initialCode(params('code=zzzz'))).toBe(examples[DEFAULT_EXAMPLE]);
});

test('unknown example falls back to the default example', () => {
  expect(initialCode(params('example=nope'))).toBe(examples[DEFAULT_EXAMPLE]);
});

test('no params yields the default example', () => {
  expect(initialCode(params(''))).toBe(examples[DEFAULT_EXAMPLE]);
});
