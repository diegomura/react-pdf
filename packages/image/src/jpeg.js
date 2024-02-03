import exif from 'jpeg-exif';

const MARKERS = [
  0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc8, 0xffc9,
  0xffca, 0xffcb, 0xffcc, 0xffcd, 0xffce, 0xffcf,
];

class JPEG {
  data = null;

  width = null;

  height = null;

  constructor(data) {
    this.data = data;

    if (data.readUInt16BE(0) !== 0xffd8) {
      throw new Error('SOI not found in JPEG');
    }

    let marker;
    let pos = 2;

    // Parse the EXIF orientation
    this.orientation = exif.fromBuffer(this.data).Orientation || 1;

    while (pos < data.length) {
      marker = data.readUInt16BE(pos);
      pos += 2;
      if (MARKERS.includes(marker)) {
        break;
      }
      pos += data.readUInt16BE(pos);
    }

    if (!MARKERS.includes(marker)) {
      throw new Error('Invalid JPEG.');
    }

    pos += 3;
    this.height = data.readUInt16BE(pos);

    pos += 2;
    this.width = data.readUInt16BE(pos);

    if (this.orientation > 4) {
      [this.width, this.height] = [this.height, this.width];
    }
  }
}

JPEG.isValid = (data) => {
  if (!data || !Buffer.isBuffer(data) || data.readUInt16BE(0) !== 0xffd8) {
    return false;
  }

  let marker;
  let pos = 2;

  while (pos < data.length) {
    marker = data.readUInt16BE(pos);
    pos += 2;
    if (MARKERS.includes(marker)) {
      break;
    }
    pos += data.readUInt16BE(pos);
  }

  if (!MARKERS.includes(marker)) {
    return false;
  }

  return true;
};

export default JPEG;
