import _JPEG from 'jay-peg';

class JPEG {
  data = null;

  width = null;

  height = null;

  constructor(data) {
    this.data = data;

    if (data.readUInt16BE(0) !== 0xffd8) {
      throw new Error('SOI not found in JPEG');
    }

    const markers = _JPEG.decode(this.data);

    for (let i = 0; i < markers.length; i += 1) {
      const marker = markers[i];

      if (marker.name === 'EXIF' && marker.entries.orientation) {
        this.orientation = marker.entries.orientation;
      }

      if (marker.name === 'SOF') {
        this.width ||= marker.width;
        this.height ||= marker.height;
      }
    }

    if (this.orientation > 4) {
      [this.width, this.height] = [this.height, this.width];
    }
  }
}

JPEG.isValid = (data) => {
  return data && Buffer.isBuffer(data) && data.readUInt16BE(0) === 0xffd8;
};

export default JPEG;
