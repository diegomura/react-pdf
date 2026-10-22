import _JPEG from 'jay-peg';

import { RasterImage } from './types';

class JPEG implements RasterImage {
  data: Buffer;
  width: number;
  height: number;
  format: 'jpeg';

  constructor(data: Buffer) {
    this.data = data;
    this.format = 'jpeg';
    this.width = 0;
    this.height = 0;

    if (data.readUInt16BE(0) !== 0xffd8) {
      throw new Error('SOI not found in JPEG');
    }

    // jay-peg reverses the tag bytes of little-endian EXIF data in place. Decode
    // a copy, so the orientation tag stays readable for pdfkit and for later
    // renders of the same cached image.
    const markers = _JPEG.decode(Buffer.from(this.data));

    let orientation;

    for (let i = 0; i < markers.length; i += 1) {
      const marker = markers[i];

      if (marker.name === 'EXIF' && marker.entries.orientation) {
        orientation = marker.entries.orientation;
      }

      if (marker.name === 'SOF') {
        this.width ||= marker.width;
        this.height ||= marker.height;
      }
    }

    if (orientation > 4) {
      [this.width, this.height] = [this.height, this.width];
    }
  }

  static isValid(data: Buffer) {
    return data && Buffer.isBuffer(data) && data.readUInt16BE(0) === 0xffd8;
  }
}

export default JPEG;
