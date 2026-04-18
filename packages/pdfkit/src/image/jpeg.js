/**
 * Parse EXIF orientation from JPEG buffer
 * @param {Buffer} data - JPEG image data
 * @returns {number|null} Orientation value (1-8) or null if not found
 */
const parseExifOrientation = (data) => {
  if (!data || data.length < 20) return null;

  let pos = 2; // Skip SOI marker

  while (pos < data.length - 4) {
    // Skip padding bytes (some JPEG files have null bytes between segments)
    while (pos < data.length && data[pos] !== 0xff) pos++;
    if (pos >= data.length - 4) return null;

    const marker = data.readUInt16BE(pos);
    pos += 2;

    // SOS marker - image data starts, stop searching
    if (marker === 0xffda) return null;

    // Skip standalone markers
    if ((marker >= 0xffd0 && marker <= 0xffd9) || marker === 0xff01) continue;

    if (pos + 2 > data.length) return null;
    const segmentLength = data.readUInt16BE(pos);

    // APP1 (EXIF) marker
    if (marker === 0xffe1 && pos + 8 <= data.length) {
      const exifHeader = data.subarray(pos + 2, pos + 8).toString('binary');
      if (exifHeader === 'Exif\x00\x00') {
        const tiffStart = pos + 8;
        if (tiffStart + 8 > data.length) return null;

        // Byte order
        const byteOrder = data
          .subarray(tiffStart, tiffStart + 2)
          .toString('ascii');
        const isLittleEndian = byteOrder === 'II';
        if (!isLittleEndian && byteOrder !== 'MM') return null;

        const read16 = isLittleEndian
          ? (o) => data.readUInt16LE(o)
          : (o) => data.readUInt16BE(o);
        const read32 = isLittleEndian
          ? (o) => data.readUInt32LE(o)
          : (o) => data.readUInt32BE(o);

        // Verify TIFF magic number (42)
        if (read16(tiffStart + 2) !== 42) return null;

        // IFD0 offset
        const ifdPos = tiffStart + read32(tiffStart + 4);
        if (ifdPos + 2 > data.length) return null;

        const entryCount = read16(ifdPos);

        // Scan IFD entries for Orientation tag (0x0112)
        for (let i = 0; i < entryCount; i++) {
          const entryPos = ifdPos + 2 + i * 12;
          if (entryPos + 12 > data.length) return null;

          if (read16(entryPos) === 0x0112) {
            const value = read16(entryPos + 8);
            return value >= 1 && value <= 8 ? value : null;
          }
        }
        return null;
      }
    }

    pos += segmentLength;
  }

  return null;
};

const MARKERS = [
  0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc8, 0xffc9,
  0xffca, 0xffcb, 0xffcc, 0xffcd, 0xffce, 0xffcf,
];

const COLOR_SPACE_MAP = {
  1: 'DeviceGray',
  3: 'DeviceRGB',
  4: 'DeviceCMYK',
};

class JPEG {
  constructor(data, label) {
    let marker;
    this.data = data;
    this.label = label;
    if (this.data.readUInt16BE(0) !== 0xffd8) {
      throw 'SOI not found in JPEG';
    }

    // Parse the EXIF orientation
    this.orientation = parseExifOrientation(this.data) || 1;

    let pos = 2;
    while (pos < this.data.length) {
      // Skip padding bytes (some JPEG files have null bytes between segments)
      while (pos < this.data.length && this.data[pos] !== 0xff) pos++;
      if (pos >= this.data.length) break;

      marker = this.data.readUInt16BE(pos);
      pos += 2;
      if (MARKERS.includes(marker)) {
        break;
      }
      pos += this.data.readUInt16BE(pos);
    }

    if (!MARKERS.includes(marker)) {
      throw 'Invalid JPEG.';
    }
    pos += 2;

    this.bits = this.data[pos++];
    this.height = this.data.readUInt16BE(pos);
    pos += 2;

    this.width = this.data.readUInt16BE(pos);
    pos += 2;

    const channels = this.data[pos++];
    this.colorSpace = COLOR_SPACE_MAP[channels];

    this.obj = null;
  }

  embed(document) {
    if (this.obj) {
      return;
    }

    this.obj = document.ref({
      Type: 'XObject',
      Subtype: 'Image',
      BitsPerComponent: this.bits,
      Width: this.width,
      Height: this.height,
      ColorSpace: this.colorSpace,
      Filter: 'DCTDecode',
    });

    // add extra decode params for CMYK images. By swapping the
    // min and max values from the default, we invert the colors. See
    // section 4.8.4 of the spec.
    if (this.colorSpace === 'DeviceCMYK') {
      this.obj.data['Decode'] = [1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0];
    }

    this.obj.end(this.data);

    // free memory
    return (this.data = null);
  }
}

export default JPEG;
