import PNG from 'png-js';
import JPEG from './jpeg';
const request = require('request');

export const fetchImage = src => {
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

        let image;
        switch (extension.toLowerCase()) {
          case 'jpg':
          case 'jpeg':
            image = new JPEG(body);
            break;
          case 'png':
            image = new PNG(body);
            break;
          default:
            throw new Error(`Image type not supported: ${extension}`);
        }

        return resolve(image);
      },
    );
  });
};
