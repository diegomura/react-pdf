/*
Binary helpers — Uint8Array-native replacements for Node Buffer operations.
*/

const HEX = '0123456789abcdef';

export const fromBinaryString = (str) => {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) out[i] = str.charCodeAt(i) & 0xff;
  return out;
};

export const toBinaryString = (bytes) => {
  const chunkSize = 0x8000;
  let out = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, bytes.length);
    out += String.fromCharCode.apply(null, bytes.subarray(i, end));
  }
  return out;
};

export const fromUtf8String = (str) => new TextEncoder().encode(str);

// Matches Buffer.from(`\ufeff${str}`, 'utf16le') + byte swap: UTF-16BE with BOM.
export const fromUtf16BEWithBOM = (str) => {
  const withBom = `\ufeff${str}`;
  const out = new Uint8Array(withBom.length * 2);
  for (let i = 0; i < withBom.length; i++) {
    const code = withBom.charCodeAt(i);
    out[i * 2] = (code >> 8) & 0xff;
    out[i * 2 + 1] = code & 0xff;
  }
  return out;
};

export const fromBase64 = (str) => fromBinaryString(atob(str));

export const toHex = (bytes) => {
  let out = '';
  for (let i = 0; i < bytes.length; i++) {
    out += HEX[bytes[i] >> 4] + HEX[bytes[i] & 0xf];
  }
  return out;
};

export const concat = (arrays) => {
  let total = 0;
  for (const a of arrays) total += a.length;
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrays) {
    out.set(a, offset);
    offset += a.length;
  }
  return out;
};

export const readUInt16BE = (bytes, offset = 0) =>
  ((bytes[offset] << 8) | bytes[offset + 1]) >>> 0;

export const readUInt16LE = (bytes, offset = 0) =>
  ((bytes[offset + 1] << 8) | bytes[offset]) >>> 0;

export const readUInt32BE = (bytes, offset = 0) =>
  (bytes[offset] * 0x1000000 +
    ((bytes[offset + 1] << 16) |
      (bytes[offset + 2] << 8) |
      bytes[offset + 3])) >>>
  0;

export const readUInt32LE = (bytes, offset = 0) =>
  ((bytes[offset] |
    (bytes[offset + 1] << 8) |
    (bytes[offset + 2] << 16)) +
    bytes[offset + 3] * 0x1000000) >>>
  0;
