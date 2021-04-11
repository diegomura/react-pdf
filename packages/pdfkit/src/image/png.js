import zlib from 'zlib';
import PNG from '@react-pdf/png-js';

class PNGImage {
  constructor(data, label) {
    this.label = label;
    this.image = new PNG(data);
    this.width = this.image.width;
    this.height = this.image.height;
    this.imgData = this.image.imgData;
    this.obj = null;
  }

  embed(document) {
    this.document = document;
    if (this.obj) {
      return;
    }

    this.obj = this.document.ref({
      Type: 'XObject',
      Subtype: 'Image',
      BitsPerComponent: this.image.bits,
      Width: this.width,
      Height: this.height,
      Filter: 'FlateDecode',
    });

    if (!this.image.hasAlphaChannel) {
      const params = this.document.ref({
        Predictor: 15,
        Colors: this.image.colors,
        BitsPerComponent: this.image.bits,
        Columns: this.width,
      });

      this.obj.data['DecodeParms'] = params;
      params.end();
    }

    if (this.image.palette.length === 0) {
      this.obj.data['ColorSpace'] = this.image.colorSpace;
    } else {
      // embed the color palette in the PDF as an object stream
      const palette = this.document.ref();
      palette.end(new Buffer(this.image.palette));

      // build the color space array for the image
      this.obj.data['ColorSpace'] = [
        'Indexed',
        'DeviceRGB',
        this.image.palette.length / 3 - 1,
        palette,
      ];
    }

    // For PNG color types 0, 2 and 3, the transparency data is stored in
    // a dedicated PNG chunk.
    if (this.image.transparency.grayscale) {
      // Use Color Key Masking (spec section 4.8.5)
      // An array with N elements, where N is two times the number of color components.
      const val = this.image.transparency.greyscale;
      return (this.obj.data['Mask'] = [val, val]);
    } else if (this.image.transparency.rgb) {
      // Use Color Key Masking (spec section 4.8.5)
      // An array with N elements, where N is two times the number of color components.
      const { rgb } = this.image.transparency;
      const mask = [];
      for (let x of Array.from(rgb)) {
        mask.push(x, x);
      }

      return (this.obj.data['Mask'] = mask);
    } else if (this.image.transparency.indexed) {
      // Create a transparency SMask for the image based on the data
      // in the PLTE and tRNS sections. See below for details on SMasks.
      return this.loadIndexedAlphaChannel();
    } else if (this.image.hasAlphaChannel) {
      // For PNG color types 4 and 6, the transparency data is stored as a alpha
      // channel mixed in with the main image data. Separate this data out into an
      // SMask object and store it separately in the PDF.
      return this.splitAlphaChannel();
    } else {
      return this.finalize();
    }
  }

  finalize() {
    if (this.alphaChannel) {
      const sMask = this.document.ref({
        Type: 'XObject',
        Subtype: 'Image',
        Height: this.height,
        Width: this.width,
        BitsPerComponent: 8,
        Filter: 'FlateDecode',
        ColorSpace: 'DeviceGray',
        Decode: [0, 1],
      });

      sMask.end(this.alphaChannel);
      this.obj.data['SMask'] = sMask;
    }

    // add the actual image data
    this.obj.end(this.imgData);

    // free memory
    this.image = null;
    return (this.imgData = null);
  }

  splitAlphaChannel() {
    return this.image.decodePixels(pixels => {
      let a, p;
      const colorByteSize = (this.image.colors * this.image.bits) / 8;
      const pixelCount = this.width * this.height;
      const imgData = new Buffer(pixelCount * colorByteSize);
      const alphaChannel = new Buffer(pixelCount);

      let i = (p = a = 0);
      const len = pixels.length;
      while (i < len) {
        imgData[p++] = pixels[i++];
        imgData[p++] = pixels[i++];
        imgData[p++] = pixels[i++];
        alphaChannel[a++] = pixels[i++];
      }

      let done = 0;
      zlib.deflate(imgData, (err, imgData1) => {
        this.imgData = imgData1;
        if (err) {
          throw err;
        }
        if (++done === 2) {
          return this.finalize();
        }
      });

      return zlib.deflate(alphaChannel, (err, alphaChannel1) => {
        this.alphaChannel = alphaChannel1;
        if (err) {
          throw err;
        }
        if (++done === 2) {
          return this.finalize();
        }
      });
    });
  }

  loadIndexedAlphaChannel(fn) {
    const transparency = this.image.transparency.indexed;
    return this.image.decodePixels(pixels => {
      const alphaChannel = new Buffer(this.width * this.height);

      let i = 0;
      for (let j = 0, end = pixels.length; j < end; j++) {
        alphaChannel[i++] = transparency[pixels[j]];
      }

      return zlib.deflate(alphaChannel, (err, alphaChannel1) => {
        this.alphaChannel = alphaChannel1;
        if (err) {
          throw err;
        }
        return this.finalize();
      });
    });
  }
}

export default PNGImage;
