import PNG from 'png-js';
import JPEG from './jpeg';
const request = require('request');

function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);
    case 'png':
      return new PNG(body);
    default:
      throw new Error(`Image type not supported: ${extension}`);
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

  const extension = src.split('.').pop();
  return new Promise((resolve, reject) => {
    request(
      {
        url: src,
        method: 'GET',
        encoding: null,
      },
      (error, response, body) => {
        if (error) {
          return reject(error);
        }

        const image = getImage(body, extension);
        return resolve(image);
      },
    );
  });
};
