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

export const fromBinaryString = (string) => {
  const out = new Uint8Array(string.length);
  for (let i = 0; i < string.length; i++) {
    out[i] = string.charCodeAt(i);
  }
  return out;
};

export const toUTF16BE = (string) => {
  const out = new Uint8Array(string.length * 2);
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);
    out[i * 2] = code >> 8;
    out[i * 2 + 1] = code & 0xff;
  }
  return out;
};

// Takes an array rather than varargs like @noble's: a stream's chunk list can
// exceed the spread limit on vector-heavy pages
export const concatBytes = (chunks) => {
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

export const fromBase64 = (b64) => {
  const binary = atob(b64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    out[i] = binary.charCodeAt(i);
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
