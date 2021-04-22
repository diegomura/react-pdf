import fs from 'fs';
import zlib from 'zlib';
import range from './range';

class PNG {
  static decode(path, fn) {
    if (BROWSER) {
      throw new Error('PNG.decode not available in browser build');
    } else {
      return fs.readFile(path, function(err, file) {
        const png = new PNG(file);
        return png.decode(pixels => fn(pixels));
      });
    }
  }

  static load(path) {
    if (BROWSER) {
      throw new Error('PNG.load not available in browser build');
    } else {
      const file = fs.readFileSync(path);
      return new PNG(file);
    }
  }

  constructor(data) {
    let i;
    this.data = data;
    this.pos = 8; // Skip the default header

    this.palette = [];
    this.imgData = [];
    this.transparency = {};
    this.text = {};

    while (true) {
      var end;
      const chunkSize = this.readUInt32();
      const section = (() => {
        const result = [];
        for (i = 0; i < 4; i++) {
          result.push(String.fromCharCode(this.data[this.pos++]));
        }
        return result;
      })().join('');

      switch (section) {
        case 'IHDR':
          // we can grab  interesting values from here (like width, height, etc)
          this.width = this.readUInt32();
          this.height = this.readUInt32();
          this.bits = this.data[this.pos++];
          this.colorType = this.data[this.pos++];
          this.compressionMethod = this.data[this.pos++];
          this.filterMethod = this.data[this.pos++];
          this.interlaceMethod = this.data[this.pos++];
          break;

        case 'PLTE':
          this.palette = this.read(chunkSize);
          break;

        case 'IDAT':
          for (i = 0, end = chunkSize; i < end; i++) {
            this.imgData.push(this.data[this.pos++]);
          }
          break;

        case 'tRNS':
          // This chunk can only occur once and it must occur after the
          // PLTE chunk and before the IDAT chunk.
          this.transparency = {};
          switch (this.colorType) {
            case 3:
              // Indexed color, RGB. Each byte in this chunk is an alpha for
              // the palette index in the PLTE ("palette") chunk up until the
              // last non-opaque entry. Set up an array, stretching over all
              // palette entries which will be 0 (opaque) or 1 (transparent).
              this.transparency.indexed = this.read(chunkSize);
              var short = 255 - this.transparency.indexed.length;
              if (short > 0) {
                var asc;
                var end1;
                for (
                  i = 0, end1 = short, asc = 0 <= end1;
                  asc ? i < end1 : i > end1;
                  asc ? i++ : i--
                ) {
                  this.transparency.indexed.push(255);
                }
              }
              break;
            case 0:
              // Greyscale. Corresponding to entries in the PLTE chunk.
              // Grey is two bytes, range 0 .. (2 ^ bit-depth) - 1
              this.transparency.grayscale = this.read(chunkSize)[0];
              break;
            case 2:
              // True color with proper alpha channel.
              this.transparency.rgb = this.read(chunkSize);
              break;
          }
          break;

        case 'tEXt':
          var text = this.read(chunkSize);
          var index = text.indexOf(0);
          var key = String.fromCharCode(
            ...Array.from(text.slice(0, index) || []),
          );
          this.text[key] = String.fromCharCode(
            ...Array.from(text.slice(index + 1) || []),
          );
          break;

        case 'IEND':
          // we've got everything we need!
          this.colors = (() => {
            switch (this.colorType) {
              case 0:
              case 3:
              case 4:
                return 1;
              case 2:
              case 6:
                return 3;
            }
          })();

          this.hasAlphaChannel = [4, 6].includes(this.colorType);
          var colors = this.colors + (this.hasAlphaChannel ? 1 : 0);
          this.pixelBitlength = this.bits * colors;

          this.colorSpace = (() => {
            switch (this.colors) {
              case 1:
                return 'DeviceGray';
              case 3:
                return 'DeviceRGB';
            }
          })();

          this.imgData = new Buffer(this.imgData);
          return;

        default:
          // unknown (or unimportant) section, skip it
          this.pos += chunkSize;
      }

      this.pos += 4; // Skip the CRC

      if (this.pos > this.data.length) {
        throw new Error('Incomplete or corrupt PNG file');
      }
    }
  }

  read(bytes) {
    return range(0, bytes, false).map(() => this.data[this.pos++]);
  }

  readUInt32() {
    const b1 = this.data[this.pos++] << 24;
    const b2 = this.data[this.pos++] << 16;
    const b3 = this.data[this.pos++] << 8;
    const b4 = this.data[this.pos++];
    return b1 | b2 | b3 | b4;
  }

  readUInt16() {
    const b1 = this.data[this.pos++] << 8;
    const b2 = this.data[this.pos++];
    return b1 | b2;
  }

  decodePixels(fn) {
    return zlib.inflate(this.imgData, (err, data) => {
      if (err) {
        throw err;
      }

      const pixelBytes = this.pixelBitlength / 8;
      const scanlineLength = pixelBytes * this.width;

      const pixels = new Buffer(scanlineLength * this.height);
      const { length } = data;
      let row = 0;
      let pos = 0;
      let c = 0;

      while (pos < length) {
        var byte;
        var col;
        var i;
        var left;
        var upper;
        var end;
        var end1;
        var end2;
        var end3;
        var end4;
        switch (data[pos++]) {
          case 0: // None
            for (i = 0, end = scanlineLength; i < end; i++) {
              pixels[c++] = data[pos++];
            }
            break;

          case 1: // Sub
            for (i = 0, end1 = scanlineLength; i < end1; i++) {
              byte = data[pos++];
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              pixels[c++] = (byte + left) % 256;
            }
            break;

          case 2: // Up
            for (i = 0, end2 = scanlineLength; i < end2; i++) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              upper =
                row &&
                pixels[
                  (row - 1) * scanlineLength +
                    col * pixelBytes +
                    (i % pixelBytes)
                ];
              pixels[c++] = (upper + byte) % 256;
            }
            break;

          case 3: // Average
            for (i = 0, end3 = scanlineLength; i < end3; i++) {
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];
              upper =
                row &&
                pixels[
                  (row - 1) * scanlineLength +
                    col * pixelBytes +
                    (i % pixelBytes)
                ];
              pixels[c++] = (byte + Math.floor((left + upper) / 2)) % 256;
            }
            break;

          case 4: // Paeth
            for (i = 0, end4 = scanlineLength; i < end4; i++) {
              var paeth;
              var upperLeft;
              byte = data[pos++];
              col = (i - (i % pixelBytes)) / pixelBytes;
              left = i < pixelBytes ? 0 : pixels[c - pixelBytes];

              if (row === 0) {
                upper = upperLeft = 0;
              } else {
                upper =
                  pixels[
                    (row - 1) * scanlineLength +
                      col * pixelBytes +
                      (i % pixelBytes)
                  ];
                upperLeft =
                  col &&
                  pixels[
                    (row - 1) * scanlineLength +
                      (col - 1) * pixelBytes +
                      (i % pixelBytes)
                  ];
              }

              const p = left + upper - upperLeft;
              const pa = Math.abs(p - left);
              const pb = Math.abs(p - upper);
              const pc = Math.abs(p - upperLeft);

              if (pa <= pb && pa <= pc) {
                paeth = left;
              } else if (pb <= pc) {
                paeth = upper;
              } else {
                paeth = upperLeft;
              }

              pixels[c++] = (byte + paeth) % 256;
            }
            break;

          default:
            throw new Error(`Invalid filter algorithm: ${data[pos - 1]}`);
        }

        row++;
      }

      return fn(pixels);
    });
  }

  decodePalette() {
    const { palette } = this;
    const transparency = this.transparency.indexed || [];
    const ret = new Buffer(transparency.length + palette.length);
    let pos = 0;
    let c = 0;

    for (let i = 0, end = palette.length; i < end; i += 3) {
      var left;
      ret[pos++] = palette[i];
      ret[pos++] = palette[i + 1];
      ret[pos++] = palette[i + 2];
      ret[pos++] = (left = transparency[c++]) != null ? left : 255;
    }

    return ret;
  }

  copyToImageData(imageData, pixels) {
    let j;
    let k;
    let { colors } = this;
    let palette = null;
    let alpha = this.hasAlphaChannel;

    if (this.palette.length) {
      palette =
        this._decodedPalette != null
          ? this._decodedPalette
          : (this._decodedPalette = this.decodePalette());
      colors = 4;
      alpha = true;
    }

    const data = (imageData != null ? imageData.data : undefined) || imageData;
    const { length } = data;
    const input = palette || pixels;
    let i = (j = 0);

    if (colors === 1) {
      while (i < length) {
        k = palette ? pixels[i / 4] * 4 : j;
        const v = input[k++];
        data[i++] = v;
        data[i++] = v;
        data[i++] = v;
        data[i++] = alpha ? input[k++] : 255;
        j = k;
      }
    } else {
      while (i < length) {
        k = palette ? pixels[i / 4] * 4 : j;
        data[i++] = input[k++];
        data[i++] = input[k++];
        data[i++] = input[k++];
        data[i++] = alpha ? input[k++] : 255;
        j = k;
      }
    }
  }

  decode(fn) {
    const ret = new Buffer(this.width * this.height * 4);
    return this.decodePixels(pixels => {
      this.copyToImageData(ret, pixels);
      return fn(ret);
    });
  }
}

export default PNG;
