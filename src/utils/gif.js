// import { GifReader } from 'omggif';

class GIF {
  data = null;
  width = null;
  height = null;

  constructor(data) {
    if (data[0] !== 71 || data[1] !== 73 || data[2] !== 70) {
      throw new TypeError(
        'Image passed to GIF decoder appears not to be in GIF format',
      );
    }
    /*
    const reader = new GifReader(Buffer.from(data));
    const pixels = new Uint8Array(reader.width * reader.height * 4);
    reader.decodeAndBlitFrameRGBA(0, pixels);

    this.data = pixels;
    this.width = reader.width;
    this.height = reader.height; */
  }
}

GIF.isValid = function(data) {
  try {
    return (
      data[0] === 71 &&
      data[1] === 73 &&
      data[2] === 70 /* && !!new GIF(data) */
    );
  } catch (e) {
    return false;
  }
};

export default GIF;
