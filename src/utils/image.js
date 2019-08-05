import fs from 'fs';
import url from 'url';
import path from 'path';
import fetch from 'cross-fetch';

import PNG from './png';
import JPEG from './jpeg';
import createCache from './cache';

export const IMAGE_CACHE = createCache({ limit: 30 });

export const getAbsoluteLocalPath = src => {
  if (BROWSER) {
    throw new Error('Cannot check local paths in client-side environment');
  }

  const { protocol, auth, host, port, hostname, path: pathname } = url.parse(
    src,
  );
  const absolutePath = path.resolve(pathname);
  if ((protocol && protocol !== 'file:') || auth || host || port || hostname) {
    return undefined;
  }
  return absolutePath;
};

export const isDangerousLocalPath = (
  filename,
  { safePath = './public' } = {},
) => {
  if (BROWSER) {
    throw new Error(
      'Cannot check dangerous local path in client-side environemnt',
    );
  }
  const absoluteSafePath = path.resolve(safePath);
  const absoluteFilePath = path.resolve(filename);
  return !absoluteFilePath.startsWith(absoluteSafePath);
};

const fetchLocalFile = (src, { safePath, allowDangerousPaths = false } = {}) =>
  new Promise((resolve, reject) => {
    try {
      if (BROWSER) {
        return reject(new Error('Cannot fetch local file in this environemnt'));
      }
      const absolutePath = getAbsoluteLocalPath(src);
      if (!absolutePath) {
        return reject(new Error(`Cannot fetch non-local path: ${src}`));
      }
      if (
        !allowDangerousPaths &&
        isDangerousLocalPath(absolutePath, { safePath })
      ) {
        return reject(new Error(`Cannot fetch dangerous local path: ${src}`));
      }
      fs.readFile(absolutePath, (err, data) =>
        err ? reject(err) : resolve(data),
      );
    } catch (err) {
      reject(err);
    }
  });

const fetchRemoteFile = async (uri, options) => {
  const response = await fetch(uri, options);

  const buffer = await (response.buffer
    ? response.buffer()
    : response.arrayBuffer());

  return buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer);
};

const isValidFormat = format => {
  const lower = format.toLowerCase();
  return lower === 'jpg' || lower === 'jpeg' || lower === 'png';
};

const guessFormat = buffer => {
  let format;

  if (JPEG.isValid(buffer)) {
    format = 'jpg';
  } else if (PNG.isValid(buffer)) {
    format = 'png';
  }

  return format;
};

const isCompatibleBase64 = ({ uri }) =>
  /^data:image\/[a-zA-Z]*;base64,[^"]*/g.test(uri);

function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);
    case 'png':
      return PNG.load(body);
    default:
      return null;
  }
}

const resolveBase64Image = ({ uri }) => {
  const match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(uri);
  const format = match[1];
  const data = match[2];

  if (!isValidFormat(format)) {
    throw new Error(`Base64 image invalid format: ${format}`);
  }

  return new Promise(resolve => {
    return resolve(getImage(Buffer.from(data, 'base64'), format));
  });
};

const resolveImageFromData = src => {
  if (src.data && src.format) {
    return new Promise(resolve => resolve(getImage(src.data, src.format)));
  }

  throw new Error(`Invalid data given for local file: ${JSON.stringify(src)}`);
};

const resolveBufferImage = buffer => {
  const format = guessFormat(buffer);

  if (format) {
    return new Promise(resolve => resolve(getImage(buffer, format)));
  }
};

const getImageFormat = body => {
  const isPng =
    body[0] === 137 &&
    body[1] === 80 &&
    body[2] === 78 &&
    body[3] === 71 &&
    body[4] === 13 &&
    body[5] === 10 &&
    body[6] === 26 &&
    body[7] === 10;

  const isJpg = body[0] === 255 && body[1] === 216 && body[2] === 255;

  let extension = '';
  if (isPng) {
    extension = 'png';
  } else if (isJpg) {
    extension = 'jpg';
  } else {
    throw new Error('Not valid image extension');
  }

  return extension;
};

const resolveImageFromUrl = async (src, options) => {
  const { uri, body, headers, method = 'GET' } = src;

  const data =
    !BROWSER && getAbsoluteLocalPath(uri)
      ? await fetchLocalFile(uri, options)
      : await fetchRemoteFile(uri, { body, headers, method });

  const extension = getImageFormat(data);

  return getImage(data, extension);
};

export const resolveImage = (src, { cache = true, ...options } = {}) => {
  const cacheKey = src.data ? src.data.toString() : src.uri;

  if (cache && IMAGE_CACHE.get(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  }

  let image;
  if (isCompatibleBase64(src)) {
    image = resolveBase64Image(src);
  } else if (Buffer.isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (typeof src === 'object' && src.data) {
    image = resolveImageFromData(src);
  } else {
    image = resolveImageFromUrl(src, options);
  }

  if (!image) {
    throw new Error('Cannot resolve image');
  }

  if (cache) {
    IMAGE_CACHE.set(cacheKey, image);
  }

  return image;
};
