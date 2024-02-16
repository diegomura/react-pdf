import _JPEG from 'jay-peg';

const COLOR_SPACE_MAP = {
  1: 'DeviceGray',
  3: 'DeviceRGB',
  4: 'DeviceCMYK'
};

class JPEG {
  constructor(data, label) {
    this.data = data;
    this.label = label;
    this.orientation = 1;

    if (this.data.readUInt16BE(0) !== 0xffd8) {
      throw 'SOI not found in JPEG';
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
        this.colorSpace ||= COLOR_SPACE_MAP[marker.numberOfComponents];
      }
    }

    this.obj = null;
  }

  embed(document) {
    if (this.obj) {
      return;
    }

    this.obj = document.ref({
      Type: 'XObject',
      Subtype: 'Image',
      BitsPerComponent: 8,
      Width: this.width,
      Height: this.height,
      ColorSpace: this.colorSpace,
      Filter: 'DCTDecode'
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
