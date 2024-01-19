import fs from 'fs';
import JPEG from './image/jpeg';
import PNG from './image/png';
import WEBP from './image/webp';

class PDFImage {
  static open(src, label) {
    let data;
    if (Buffer.isBuffer(src)) {
      data = src;
    } else if (src instanceof ArrayBuffer) {
      data = Buffer.from(new Uint8Array(src));
    } else {
      let match = /^data:.+;base64,(.*)$/.exec(src);
      if (match) {
        data = Buffer.from(match[1], 'base64');
      } else if (!BROWSER) {
        data = fs.readFileSync(src);
        if (!data) return;
      }
    }

    if (data[0] === 0xff && data[1] === 0xd8) {
      return new JPEG(data, label);
    }

    if (data[0] === 0x89 && data.toString('ascii', 1, 4) === 'PNG') {
      return new PNG(data, label);
    }

    if (data[0] === 0x52 && data[1] === 0x49 && data[2] === 0x46 && data[3] === 0x46 &&
      data[8] === 0x57 && data[9] === 0x45 && data[10] === 0x42 && data[11] === 0x50) {
      return new WEBP(data, label);
    }

    throw new Error('Unknown image format.');
  }
}

export default PDFImage;
