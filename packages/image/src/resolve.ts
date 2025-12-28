import fs from 'fs';
import url from 'url';
import path from 'path';

import PNG from './png';
import JPEG from './jpeg';
import createCache from './cache.js';
import {
  Base64ImageSrc,
  DataImageSrc,
  Image,
  ImageFormat,
  ImageSrc,
  LocalImageSrc,
  RemoteImageSrc,
} from './types';

export const IMAGE_CACHE = createCache<Promise<Image | null>>({ limit: 30 });

const isBuffer = Buffer.isBuffer;

const isBlob = (src: ImageSrc): src is Blob => {
  return typeof Blob !== 'undefined' && src instanceof Blob;
};

const isDataImageSrc = (src: ImageSrc): src is DataImageSrc => {
  return 'data' in src;
};

const isDataUri = (imageSrc: ImageSrc): imageSrc is Base64ImageSrc =>
  'uri' in imageSrc && imageSrc.uri.startsWith('data:');

const getAbsoluteLocalPath = (src: string) => {
  if (BROWSER) {
    throw new Error('Cannot check local paths in client-side environment');
  }

  const {
    protocol,
    auth,
    host,
    port,
    hostname,
    path: pathname,
  } = url.parse(src);

  const absolutePath = pathname ? path.resolve(src) : undefined;

  if ((protocol && protocol !== 'file:') || auth || host || port || hostname) {
    return undefined;
  }

  return absolutePath;
};

const fetchLocalFile = (src: LocalImageSrc): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    try {
      if (BROWSER) {
        reject(new Error('Cannot fetch local file in this environment'));
        return;
      }

      const absolutePath = getAbsoluteLocalPath(src.uri);

      if (!absolutePath) {
        reject(new Error(`Cannot fetch non-local path: ${src.uri}`));
        return;
      }

      fs.readFile(absolutePath, (err, data) =>
        err ? reject(err) : resolve(data),
      );
    } catch (err) {
      reject(err);
    }
  });

const fetchRemoteFile = async (src: RemoteImageSrc) => {
  const { method = 'GET', headers, body, credentials } = src;

  const response = await fetch(src.uri, {
    method,
    headers,
    body,
    credentials,
  });

  const buffer = await response.arrayBuffer();

  return Buffer.from(buffer);
};

const isValidFormat = (format: string): format is ImageFormat => {
  const lower = format.toLowerCase();
  return lower === 'jpg' || lower === 'jpeg' || lower === 'png';
};

const getImageFormat = (buffer: Buffer) => {
  let format;

  if (JPEG.isValid(buffer)) {
    format = 'jpg' as const;
  } else if (PNG.isValid(buffer)) {
    format = 'png' as const;
  }

  return format;
};

function getImage(body: Buffer, format: string): Image | null {
  switch (format.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);
    case 'png':
      return new PNG(body);
    default:
      return null;
  }
}

const resolveBase64Image = async ({ uri }: Base64ImageSrc) => {
  const match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(uri);

  if (!match) throw new Error(`Invalid base64 image: ${uri}`);

  const format = match[1];
  const data = match[2];

  if (!isValidFormat(format))
    throw new Error(`Base64 image invalid format: ${format}`);

  return getImage(Buffer.from(data, 'base64'), format);
};

const resolveImageFromData = async (src: DataImageSrc) => {
  if (src.data && src.format) {
    return getImage(src.data, src.format);
  }

  throw new Error(`Invalid data given for local file: ${JSON.stringify(src)}`);
};

const resolveBufferImage = async (buffer: Buffer) => {
  const format = getImageFormat(buffer);

  if (format) {
    return getImage(buffer, format);
  }

  return null;
};

const resolveBlobImage = async (blob: Blob) => {
  const { type } = blob;
  if (!type || type === 'application/octet-stream') {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return resolveBufferImage(buffer);
  }

  if (!type.startsWith('image/')) {
    throw new Error(`Invalid blob type: ${type}`);
  }

  const format = type.replace('image/', '');

  if (!isValidFormat(format)) {
    throw new Error(`Invalid blob type: ${type}`);
  }

  const buffer = await blob.arrayBuffer();

  return getImage(Buffer.from(buffer), format);
};

const resolveImageFromUrl = async (src: LocalImageSrc | RemoteImageSrc) => {
  const data =
    !BROWSER && getAbsoluteLocalPath(src.uri)
      ? await fetchLocalFile(src)
      : await fetchRemoteFile(src);

  const format = getImageFormat(data);

  if (!format) {
    throw new Error('Not valid image extension');
  }

  return getImage(data, format);
};

const getCacheKey = (src: ImageSrc): string | null => {
  if (isBlob(src) || isBuffer(src)) return null;

  if (isDataImageSrc(src)) return src.data?.toString('base64') ?? null;

  return src.uri;
};

const resolveImage = (src: ImageSrc, { cache = true } = {}) => {
  let image: Promise<Image | null>;

  const cacheKey = getCacheKey(src);

  if (isBlob(src)) {
    image = resolveBlobImage(src);
  } else if (isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (cache && IMAGE_CACHE.get(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  } else if (isDataUri(src)) {
    image = resolveBase64Image(src);
  } else if (isDataImageSrc(src)) {
    image = resolveImageFromData(src);
  } else {
    image = resolveImageFromUrl(src);
  }

  if (cache && cacheKey) {
    IMAGE_CACHE.set(cacheKey, image);
  }

  return image;
};

export default resolveImage;
