import { cbc, ecb } from '@noble/ciphers/aes';

export function aesCbcEncrypt(data, key, iv, padding = true) {
  return cbc(key, iv, { disablePadding: !padding }).encrypt(data);
}

export function aesEcbEncrypt(data, key) {
  return ecb(key, { disablePadding: true }).encrypt(data);
}
