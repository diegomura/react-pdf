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

export const fromBinaryString = (str) => {
  const out = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    out[i] = str.charCodeAt(i) & 0xff;
  }
  return out;
};

export const fromBase64 = (b64) => {
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
};

export const toBase64 = (bytes) => {
  const chunkSize = 0x8000;
  let binary = '';
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const end = Math.min(i + chunkSize, bytes.length);
    binary += String.fromCharCode.apply(null, bytes.subarray(i, end));
  }
  return btoa(binary);
};

export const concat = (chunks) => {
  let length = 0;
  for (const chunk of chunks) length += chunk.length;

  const out = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    out.set(chunk, offset);
    offset += chunk.length;
  }
  return out;
};

export const toUTF16BE = (str) => {
  const out = new Uint8Array((str.length + 1) * 2);
  out[0] = 0xfe;
  out[1] = 0xff;
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    out[i * 2 + 2] = code >> 8;
    out[i * 2 + 3] = code & 0xff;
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
