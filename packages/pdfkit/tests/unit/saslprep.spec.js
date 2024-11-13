import { expect, test } from 'vitest';

import saslprep from '../../src/saslprep';

const chr = String.fromCodePoint;

test('should work with liatin letters', () => {
  const str = 'user';
  expect(saslprep(str)).toEqual(str);
});

test('should work be case preserved', () => {
  const str = 'USER';
  expect(saslprep(str)).toEqual(str);
});

test('should work with high code points (> U+FFFF)', () => {
  const str = '\uD83D\uDE00';
  expect(saslprep(str, { allowUnassigned: true })).toEqual(str);
});

test('should remove `mapped to nothing` characters', () => {
  expect(saslprep('I\u00ADX')).toEqual('IX');
});

test('should replace `Non-ASCII space characters` with space', () => {
  expect(saslprep('a\u00A0b')).toEqual('a\u0020b');
});

test('should normalize as NFKC', () => {
  expect(saslprep('\u00AA')).toEqual('a');
  expect(saslprep('\u2168')).toEqual('IX');
});

test('should throws when prohibited characters', () => {
  // C.2.1 ASCII control characters
  expect(() => saslprep('a\u007Fb')).toThrow();

  // C.2.2 Non-ASCII control characters
  expect(() => saslprep('a\u06DDb')).toThrow();

  // C.3 Private use
  expect(() => saslprep('a\uE000b')).toThrow();

  // C.4 Non-character code points
  expect(() => saslprep(`a${chr(0x1fffe)}b`)).toThrow();

  // C.5 Surrogate codes
  expect(() => saslprep('a\uD800b')).toThrow();

  // C.6 Inappropriate for plain text
  expect(() => saslprep('a\uFFF9b')).toThrow();

  // C.7 Inappropriate for canonical representation
  expect(() => saslprep('a\u2FF0b')).toThrow();

  // C.8 Change display properties or are deprecated
  expect(() => saslprep('a\u200Eb')).toThrow();

  // C.9 Tagging characters
  expect(() => saslprep(`a${chr(0xe0001)}b`)).toThrow();
});

test('should not containt RandALCat and LCat bidi', () => {
  expect(() => saslprep('a\u06DD\u00AAb')).toThrow();
});

test('RandALCat should be first and last', () => {
  expect(() => saslprep('\u0627\u0031\u0628')).not.toThrow();
  expect(() => saslprep('\u0627\u0031')).toThrow();
});

test('should handle unassigned code points', () => {
  expect(() => saslprep('a\u0487')).toThrow();
  expect(() => saslprep('a\u0487', { allowUnassigned: true })).not.toThrow();
});
