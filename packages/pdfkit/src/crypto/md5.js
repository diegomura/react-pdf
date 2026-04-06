import md5 from 'js-md5';

export function md5Hash(data) {
  return new Uint8Array(md5.arrayBuffer(data));
}

export function md5Hex(data) {
  return md5(data);
}
