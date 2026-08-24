import { describe, it, expect } from 'vitest';

import { compress, decompress } from '../src/repl/compress';

describe('compress', () => {
  it('round-trips', () => {
    const code = 'const Doc = () => <Document />;';
    expect(decompress(compress(code))).toBe(code);
  });

  it('produces hex output', () => {
    expect(compress('hello')).toMatch(/^[0-9a-f]+$/);
  });

  it('returns empty string on malformed input', () => {
    expect(decompress('zz')).toBe('');
    expect(decompress('abc')).toBe('');
    expect(decompress('')).toBe('');
  });
});

describe('legacy ?code= compatibility', () => {
  const LEGACY_SOURCE =
    'const doc = (<Document><Page><Text>Hello</Text></Page></Document>);\nReactPDF.render(doc);';

  // Captured from react-pdf.org/repl?code=... — thousands of issue links use this encoding.
  const LEGACY_HEX =
    '3187b0760ce02e004026260c0bc30050078022882b816c05330a00f83001404301cd0f20154200f320094201b4e40c07a26adc9f6a7584e6005899009401b8014002542558140a58018803a004ec4e213d6813079400';

  it('decodes a URL captured from the legacy REPL', () => {
    expect(decompress(LEGACY_HEX)).toBe(LEGACY_SOURCE);
  });

  it('encodes byte-for-byte like the legacy REPL', () => {
    expect(compress(LEGACY_SOURCE)).toBe(LEGACY_HEX);
  });
});
