import CryptoJS from 'crypto-js/core.js';
import 'crypto-js/aes.js';
import 'crypto-js/mode-ecb.js';
import 'crypto-js/pad-nopadding.js';
import 'crypto-js/lib-typedarrays.js';

function toWordArray(data) {
  if (data instanceof Uint8Array) {
    return CryptoJS.lib.WordArray.create(data);
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

export function aesCbcEncrypt(data, key, iv, padding = true) {
  const encrypted = CryptoJS.AES.encrypt(toWordArray(data), toWordArray(key), {
    iv: toWordArray(iv),
    mode: CryptoJS.mode.CBC,
    padding: padding ? CryptoJS.pad.Pkcs7 : CryptoJS.pad.NoPadding,
  });
  return wordArrayToUint8Array(encrypted.ciphertext);
}

export function aesEcbEncrypt(data, key) {
  const encrypted = CryptoJS.AES.encrypt(toWordArray(data), toWordArray(key), {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.NoPadding,
  });
  return wordArrayToUint8Array(encrypted.ciphertext);
}
