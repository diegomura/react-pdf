import fetch from 'isomorphic-fetch';
import PNG from './png';
import JPEG from './jpeg';
import createCache from './cache';

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
  /data:image\/[a-zA-Z]*;base64,[^"]*/g.test(src);

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
  const match = /data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(src);
  const format = match[1];
  const data = match[2];

  if (!isValidFormat(format)) {
    throw new Error(`Base64 image invalid format: ${format}`);
  }

  return new Promise(resolve => {
    return resolve(getImage(Buffer.from(data, 'base64'), format));
  });
};

const resolveLocalImage = src => {
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

const resolveRemoteImage = src => {
  return fetch(src)
    .then(response => {
      if (response.buffer) {
        return response.buffer();
      }
      return response.arrayBuffer();
    })
    .then(buffer => {
      if (buffer.constructor.name === 'Buffer') {
        return buffer;
      }
      return Buffer.from(buffer);
    })
    .then(body => {
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

      return getImage(body, extension);
    });
};

export const resolveImage = (src, cache = true) => {
  const cacheKey = src.data ? src.data.toString() : src;

  if (cache && imagesCache.get(cacheKey)) {
    return imagesCache.get(cacheKey);
  }

  let image;
  if (isCompatibleBase64(src)) {
    image = resolveBase64Image(src);
  } else if (Buffer.isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (typeof src === 'object') {
    image = resolveLocalImage(src);
  } else {
    image = resolveRemoteImage(src);
  }

  if (cache) {
    imagesCache.set(cacheKey, image);
  }

  return image;
};
