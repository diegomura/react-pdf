import CryptoJS from 'crypto-js/core.js';
import 'crypto-js/sha256.js';
import 'crypto-js/lib-typedarrays.js';

function toWordArray(data) {
  if (data instanceof Uint8Array) {
    return CryptoJS.lib.WordArray.create(data);
  }
  if (typeof data === 'string') {
    return data;
  }
  if (ArrayBuffer.isView(data)) {
    return CryptoJS.lib.WordArray.create(
      new Uint8Array(data.buffer, data.byteOffset, data.byteLength),
    );
  }
  return data;
}

function wordArrayToUint8Array(wordArray) {
  const { words, sigBytes } = wordArray;
  const result = new Uint8Array(sigBytes);
  for (let i = 0; i < sigBytes; i++) {
    result[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }
  return result;
}

export default function sha256Hash(data) {
  return wordArrayToUint8Array(CryptoJS.SHA256(toWordArray(data)));
}
