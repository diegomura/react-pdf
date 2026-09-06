import { WebpTranscoder } from './types';

/**
 * A PDF image XObject can carry JPEG (DCTDecode) or raw pixels (FlateDecode, which is what a
 * PNG decodes into) — there is no filter for a VP8/VP8L bitstream. WebP therefore cannot be
 * embedded as-is: it has to be decoded and re-encoded to PNG before it reaches pdfkit.
 *
 * Browsers already ship libwebp, so there the transcode is free. Node has no image decoder at
 * all, so the consumer injects one (sharp, @cwasm/webp, …) through `registerWebpTranscoder`.
 */
let transcoder: WebpTranscoder | null = null;

/**
 * Teach the resolver how to turn WebP bytes into PNG (or JPEG) bytes. Required on Node, where
 * there is nothing to decode WebP with; optional in the browser, where it overrides the
 * built-in canvas transcode.
 *
 * @example
 * import sharp from 'sharp';
 * registerWebpTranscoder((data) => sharp(data).png().toBuffer());
 */
export const registerWebpTranscoder = (fn: WebpTranscoder | null) => {
  transcoder = fn;
};

const NO_TRANSCODER_ERROR =
  'Cannot decode WebP image: PDF has no WebP format, so it must be transcoded to PNG first, ' +
  'and this environment provides no decoder. Register one with ' +
  "`import { registerWebpTranscoder } from '@react-pdf/renderer'` — for example " +
  '`registerWebpTranscoder((data) => sharp(data).png().toBuffer())`.';

const asBlob = (data: Buffer) => {
  const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
  return new Blob([bytes], { type: 'image/webp' });
};

const drawToCanvas = (bitmap: ImageBitmap): Promise<Blob> => {
  const { width, height } = bitmap;

  if (typeof OffscreenCanvas !== 'undefined') {
    const canvas = new OffscreenCanvas(width, height);
    canvas.getContext('2d')!.drawImage(bitmap, 0, 0);
    return canvas.convertToBlob({ type: 'image/png' });
  }

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d')!.drawImage(bitmap, 0, 0);

  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else
        reject(
          new Error('Cannot transcode WebP image: canvas produced no blob'),
        );
    }, 'image/png');
  });
};

const canTranscodeNatively = () =>
  typeof createImageBitmap !== 'undefined' &&
  (typeof OffscreenCanvas !== 'undefined' || typeof document !== 'undefined');

const transcodeNatively = async (data: Buffer) => {
  const bitmap = await createImageBitmap(asBlob(data));

  try {
    const png = await drawToCanvas(bitmap);
    return Buffer.from(await png.arrayBuffer());
  } finally {
    bitmap.close();
  }
};

class WEBP {
  /** A WebP file is a RIFF container whose form type is `WEBP`: `RIFF....WEBP`. */
  static isValid(data: Buffer): boolean {
    return (
      Buffer.isBuffer(data) &&
      data.length >= 12 &&
      data.readUInt32BE(0) === 0x52494646 &&
      data.readUInt32BE(8) === 0x57454250
    );
  }

  /** Returns bytes in a format a PDF can embed — PNG from the built-in browser path. */
  static async transcode(data: Buffer): Promise<Buffer> {
    if (transcoder) return transcoder(data);
    if (canTranscodeNatively()) return transcodeNatively(data);
    throw new Error(NO_TRANSCODER_ERROR);
  }
}

export default WEBP;
