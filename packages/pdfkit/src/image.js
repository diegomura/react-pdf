import fs from 'fs';
import JPEG from './image/jpeg';
import PNG from './image/png';

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

    throw new Error('Unknown image format.');
  }
}

export default PDFImage;
