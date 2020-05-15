const cache = {};

import Jimp from 'jimp';

export default function(url) {
  if (cache[url] === undefined) {
    throw new Promise(resolve => {
      Jimp.read(url).then(image => {
        image
          .greyscale()
          .getBufferAsync('image/jpeg')
          .then(buffer => {
            cache[url] = buffer;
            resolve();
          });
      });
    });
  }

  return cache[url];
}
