/* global File */

import jpegasus from 'jpegasus';
import toArrayBuffer from 'to-arraybuffer';
import toBufferCb from 'blob-to-buffer';
import sharp from 'sharp';
import JPEG from './jpeg';
import PNG from './png';

const toBuffer = blob =>
  new Promise((resolve, reject) =>
    toBufferCb(blob, (err, buffer) => (err ? reject(err) : resolve(buffer))),
  );

const renderGIF = async data => {
  if (!GIF.isValid(data)) {
    throw new TypeError(
      'Image passed to GIF decoder appears not to be in GIF format',
    );
  }

  if (!BROWSER) {
    const pngBuffer = await sharp(data).toBuffer();
    return new PNG(pngBuffer);
  }

  const jpegBlob = await jpegasus.compress(
    new File([toArrayBuffer(data)], 'image.gif', {
      type: 'image/gif',
    }),
    {
      quality: 0.8,
    },
  );
  const jpegBuffer = await toBuffer(jpegBlob);
  return new JPEG(jpegBuffer);
};

// Instantiate a “thenable” object — an object that behaves like a Promise
// https://samdanielson.com/blog/2016/09/15/subclassing-promises-not.html
// by implementing the Promise prototype’s public methods, and applying them to a real Promise
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise#Promise_prototype
class GIF {
  constructor(data) {
    this.imagePromise = renderGIF(data);
  }

  then(...args) {
    return this.imagePromise.then.apply(this.imagePromise, args);
  }

  catch(...args) {
    return this.imagePromise.catch.apply(this.imagePromise, args);
  }

  finally(...args) {
    return this.imagePromise.finally.apply(this.imagePromise, args);
  }
}

GIF.isValid = function(data) {
  try {
    return data[0] === 71 && data[1] === 73 && data[2] === 70;
  } catch (e) {
    return false;
  }
};

export default GIF;
