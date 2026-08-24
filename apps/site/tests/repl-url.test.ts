import { expect, test } from 'vitest';

import { compress } from '../src/repl/compress';
import { examples } from '../src/repl/examples';
import { initialState, DEFAULT_EXAMPLE } from '../src/repl/url';

const params = (query: string) => new URLSearchParams(query);

test('code param wins over example param', () => {
  const code = '<Document />';
  const query = `code=${compress(code)}&example=resume`;

  expect(initialState(params(query))).toEqual({ code, example: '' });
});

test('malformed code falls back to the example param', () => {
  expect(initialState(params('code=zzzz&example=resume'))).toEqual({
    code: examples.resume,
    example: 'resume',
  });
});

test('malformed code with no example falls back to the default example', () => {
  expect(initialState(params('code=zzzz')).code).toBe(
    examples[DEFAULT_EXAMPLE],
  );
});

test('unknown example falls back to the default example', () => {
  expect(initialState(params('example=nope')).example).toBe(DEFAULT_EXAMPLE);
});

test('an inherited property name is not treated as an example', () => {
  expect(initialState(params('example=constructor'))).toEqual({
    code: examples[DEFAULT_EXAMPLE],
    example: DEFAULT_EXAMPLE,
  });
  expect(initialState(params('example=toString')).example).toBe(
    DEFAULT_EXAMPLE,
  );
});

test('no params yields the default example', () => {
  expect(initialState(params(''))).toEqual({
    code: examples[DEFAULT_EXAMPLE],
    example: DEFAULT_EXAMPLE,
  });
});
