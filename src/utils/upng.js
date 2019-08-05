import PNG from 'upng-js';

PNG.isValid = function(data) {
  try {
    return !!PNG.decode(data);
  } catch (e) {
    return false;
  }
};

PNG.load = function(data) {
  try {
    const decodedData = PNG.decode(data);

    decodedData.palette = [];
    decodedData.transparency = {};
    decodedData.animation = null;
    decodedData.text = {};

    decodedData.imgData = decodedData.data;
    decodedData.data = data;
    decodedData.colorType = decodedData.ctype;

    decodedData.colors = function() {
      switch (decodedData.colorType) {
        case 0:
        case 3:
        case 4:
          return 1;
        case 2:
        case 6:
          return 3;
        default:
      }
    }.call(this);

    decodedData.colorSpace = function() {
      switch (decodedData.colors) {
        case 1:
          return 'DeviceGray';
        case 3:
          return 'DeviceRGB';
        default:
      }
    }.call(this);

    decodedData.bits = decodedData.depth;
    decodedData.compressionMethod = decodedData.compress;
    decodedData.filterMethod = decodedData.filter;
    decodedData.interlaceMethod = decodedData.interlace;

    if (decodedData.tabs['PLTE'])
      decodedData.palette = decodedData.tabs['PLTE'];

    decodedData.pixelBitlength = decodedData.bits * decodedData.colors;
    decodedData.hasAlphaChannel =
      decodedData.colorType === 4 || decodedData.colorType === 6;

    return decodedData;
  } catch (e) {
    return false;
  }
};

export default PNG;
