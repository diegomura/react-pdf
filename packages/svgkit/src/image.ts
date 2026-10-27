const BASE64_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

const toBase64Manual = (bytes: Uint8Array) => {
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const a = bytes[i];
    const b = bytes[i + 1] ?? 0;
    const c = bytes[i + 2] ?? 0;
    out += BASE64_CHARS[a >> 2];
    out += BASE64_CHARS[((a & 3) << 4) | (b >> 4)];
    out +=
      i + 1 < bytes.length ? BASE64_CHARS[((b & 15) << 2) | (c >> 6)] : '=';
    out += i + 2 < bytes.length ? BASE64_CHARS[c & 63] : '=';
  }
  return out;
};

// Buffer is a Node global, not a dependency; browser builds fall back to the manual loop
const toBase64 = (bytes: Uint8Array) =>
  typeof Buffer !== 'undefined'
    ? Buffer.from(bytes.buffer, bytes.byteOffset, bytes.byteLength).toString(
        'base64',
      )
    : toBase64Manual(bytes);

const asBytes = (data: unknown): Uint8Array | null => {
  if (data instanceof Uint8Array) return data;
  if (data instanceof ArrayBuffer) return new Uint8Array(data);
  return null;
};

const isPng = (bytes: Uint8Array) =>
  bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e;

const isJpeg = (bytes: Uint8Array) => bytes[0] === 0xff && bytes[1] === 0xd8;

// Keyed on the source bytes object so a logo repeated across pages/attachments
// (which never goes through render's imageCache) is only base64-encoded once.
const hrefCache = new WeakMap<object, string>();

export const toHref = (data: unknown): string => {
  if (typeof data === 'string') return data;
  const bytes = asBytes(data);
  if (!bytes) return '';

  // Cache on the original object (data), not the derived `bytes` view: an
  // ArrayBuffer source gets a fresh Uint8Array wrapper on every call.
  const cacheKey = data as object;
  if (hrefCache.has(cacheKey)) return hrefCache.get(cacheKey)!;

  const mime = isPng(bytes) ? 'image/png' : isJpeg(bytes) ? 'image/jpeg' : null;
  const href = mime ? `data:${mime};base64,${toBase64(bytes)}` : '';
  hrefCache.set(cacheKey, href);
  return href;
};

const readUInt32BE = (bytes: Uint8Array, offset: number) =>
  ((bytes[offset] << 24) |
    (bytes[offset + 1] << 16) |
    (bytes[offset + 2] << 8) |
    bytes[offset + 3]) >>>
  0;

const readUInt16BE = (bytes: Uint8Array, offset: number) =>
  (bytes[offset] << 8) | bytes[offset + 1];

// SOF0-SOF15 mark frame dimensions, except DHT/JPG/DAC which share the range
const JPEG_NON_SOF_MARKERS = new Set([0xc4, 0xc8, 0xcc]);

export const imageDimensions = (
  data: unknown,
): { width: number; height: number } | null => {
  const bytes = asBytes(data);
  if (!bytes) return null;

  if (isPng(bytes)) {
    return {
      width: readUInt32BE(bytes, 16),
      height: readUInt32BE(bytes, 20),
    };
  }

  if (isJpeg(bytes)) {
    let offset = 2;
    while (offset < bytes.length - 8) {
      if (bytes[offset] !== 0xff) break;
      const marker = bytes[offset + 1];
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        !JPEG_NON_SOF_MARKERS.has(marker)
      ) {
        return {
          height: readUInt16BE(bytes, offset + 5),
          width: readUInt16BE(bytes, offset + 7),
        };
      }
      offset += 2 + readUInt16BE(bytes, offset + 2);
    }
  }

  return null;
};
