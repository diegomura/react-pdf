/*
Binary helpers — Uint8Array-native replacements for Node Buffer operations.
*/

export const toBinaryString = (bytes) => {
  const chunkSize = 0x8000;
  let out = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, bytes.length);
    out += String.fromCharCode.apply(null, bytes.subarray(i, end));
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
  ((bytes[offset] | (bytes[offset + 1] << 8) | (bytes[offset + 2] << 16)) +
    bytes[offset + 3] * 0x1000000) >>>
  0;
