import JPEG from './jpeg';

const PNG = require('png-js');
require('isomorphic-fetch');

const Buffer = require('buffer/').Buffer;

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

export const fetchImage = src => {
  if (typeof src === 'object') {
    if (src.data && src.format) {
      // Local file given
      return new Promise((resolve, reject) =>
        resolve(getImage(src.data, src.format)),
      );
    }
    throw new Error(
      `Invalid data given for local file: ${JSON.stringify(src)}`,
    );
  }

  return fetch(src)
    .then(response => {
      if (response.buffer) {
        return response.buffer();
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => Buffer.from(arrayBuffer))
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
    })
    .catch(() => {
      throw new Error(`Couldn't fetch image: ${src}`);
    });
};
