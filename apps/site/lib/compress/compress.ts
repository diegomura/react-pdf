import LZString from 'lz-string';

const decimalToHex = (d: number) => d.toString(16).padStart(2, '0');
const hexToDecimal = (h: string) => parseInt(h, 16);

export const compress = (str: string): string =>
  LZString.compressToUint8Array(str).reduce(
    (acc, value) => `${acc}${decimalToHex(value)}`,
    '',
  );

export const decompress = (str: string): string => {
  if (!/^([0-9a-f]{2})+$/i.test(str)) return '';

  const bytes = str.match(/.{2}/g)!.map(hexToDecimal);
  return LZString.decompressFromUint8Array(Uint8Array.from(bytes)) ?? '';
};
