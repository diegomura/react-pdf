import { describe, expect, it } from 'vitest';

import { fromBase64, fromBinaryString, toBinaryString } from '../src/binary.js';

describe('binary helpers', () => {
  it('converts a binary string to bytes', () => {
    expect(fromBinaryString('\x00\x7f\x80\xff')).toEqual(
      new Uint8Array([0x00, 0x7f, 0x80, 0xff]),
    );
  });

  it('round-trips through toBinaryString', () => {
    const bytes = new Uint8Array(256).map((_, i) => i);

    expect(fromBinaryString(toBinaryString(bytes))).toEqual(bytes);
  });

  it('decodes base64 to the same bytes as Buffer', () => {
    const b64 = Buffer.from('héllo pdfkit ✨').toString('base64');

    expect(fromBase64(b64)).toEqual(new Uint8Array(Buffer.from(b64, 'base64')));
  });
});
