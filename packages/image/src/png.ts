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
    try {
      return !!new PNG(data);
    } catch {
      return false;
    }
  }
}

export default PNG;
