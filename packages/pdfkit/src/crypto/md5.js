// This file is ran directly with Node - needs to have .js extension
import CryptoJS from 'crypto-js/core.js';
import 'crypto-js/md5.js';
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

export function md5Hash(data) {
  return wordArrayToUint8Array(CryptoJS.MD5(toWordArray(data)));
}
