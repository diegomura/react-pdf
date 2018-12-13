import { isNode } from 'browser-or-node';
import fetch from 'isomorphic-fetch';
import PNG from './png';
import JPEG from './jpeg';
import createCache from './cache';

export const isDangerousLocalPath = (
  filename,
  { safePath = './public' } = {},
) => {
  const path = require('path');
  const absoluteSafePath = path.resolve(safePath);
  const absoluteFilePath = path.resolve(filename);
  return !absoluteFilePath.startsWith(absoluteSafePath);
};

const fetchLocalFile = (src, { safePath, allowDangerousPaths = false } = {}) =>
  new Promise((resolve, reject) => {
    try {
      const {
        protocol,
        auth,
        host,
        port,
        hostname,
        path,
      } = require('url').parse(src);
      const absolutePath = require('path').resolve(path);
      const fs = require('fs');
      if (
        (protocol && protocol !== 'file:') ||
        auth ||
        host ||
        port ||
        hostname
      ) {
        return reject(
          new Error(
            'Cannot fetch local file with non-file protocol, host or auth credentials',
          ),
        );
      }
      if (
        !allowDangerousPaths &&
        isDangerousLocalPath(absolutePath, { safePath })
      ) {
        return reject(new Error(`Cannot fetch dangerous local path: ${path}`));
      }
      fs.readFile(absolutePath, (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });

const imagesCache = createCache({ limit: 30 });

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

const isCompatibleBase64 = src =>
  /^data:image\/[a-zA-Z]*;base64,[^"]*/g.test(src);

function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);
    case 'png':
      return new PNG(body);
    default:
      return null;
  }
}

const resolveBase64Image = src => {
  const match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(src);
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
  let body;
  if (isNode && (src.substr(0, 5) === 'file:' || !/^https?:\/\//.exec(src))) {
    body = await fetchLocalFile(src, options);
  } else {
    const response = await fetch(src);
    const buffer = await (response.buffer
      ? response.buffer()
      : response.arrayBuffer());
    body = await (buffer.constructor.name === 'Buffer'
      ? buffer
      : Buffer.from(buffer));
  }

  const extension = getImageFormat(body);

  return getImage(body, extension);
};

export const resolveImage = (src, { cache = true, ...options } = {}) => {
  const cacheKey = src.data ? src.data.toString() : src;

  if (cache && imagesCache.get(cacheKey)) {
    return imagesCache.get(cacheKey);
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
    imagesCache.set(cacheKey, image);
  }

  return image;
};
