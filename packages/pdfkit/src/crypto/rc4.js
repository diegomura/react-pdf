// RC4 (for legacy PDF 1.3-1.5)
export default function rc4(data, key) {
  const s = new Uint8Array(256);
  for (let i = 0; i < 256; i++) {
    s[i] = i;
  }

  let j = 0;
  for (let i = 0; i < 256; i++) {
    j = (j + s[i] + key[i % key.length]) & 0xff;
    [s[i], s[j]] = [s[j], s[i]];
  }

  const output = new Uint8Array(data.length);
  for (let i = 0, j = 0, k = 0; k < data.length; k++) {
    i = (i + 1) & 0xff;
    j = (j + s[i]) & 0xff;
    [s[i], s[j]] = [s[j], s[i]];
    output[k] = data[k] ^ s[(s[i] + s[j]) & 0xff];
  }

  return output;
}
