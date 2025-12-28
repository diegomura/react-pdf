import _PNG from '@react-pdf/png-js';

import { Image } from './types';

class PNG implements Image {
  data: Buffer;
  width: number;
  height: number;
  format: 'png';

  constructor(data: Buffer) {
    const png = new _PNG(data);

    this.data = data;
    this.width = png.width;
    this.height = png.height;
    this.format = 'png';
  }

  static isValid(data: Buffer): boolean {
    return (
      data &&
      Buffer.isBuffer(data) &&
      data[0] === 137 &&
      data[1] === 80 &&
      data[2] === 78 &&
      data[3] === 71 &&
      data[4] === 13 &&
      data[5] === 10 &&
      data[6] === 26 &&
      data[7] === 10
    );
  }
}

export default PNG;
