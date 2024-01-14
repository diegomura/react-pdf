import PNG from '@react-pdf/png-js';

PNG.isValid = function isValid(data) {
  try {
    return !!new PNG(data);
  } catch (e) {
    return false;
  }
};

export default PNG;
