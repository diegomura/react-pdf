import toPairsIn from 'lodash/fp/toPairsIn';

const escapableRe = /[\n\r\t\b\f\(\)\\]/g;
const escapable = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  '\\': '\\\\',
  '(': '\\(',
  ')': '\\)',
};

// Convert little endian UTF-16 to big endian
function swapBytes(buff) {
  const length = buff.length;
  if (length & 0x01) {
    throw new Error('Buffer length must be even');
  } else {
    for (let i = 0, end = length - 1; i < end; i += 2) {
      const a = buff[i];
      buff[i] = buff[i + 1];
      buff[i + 1] = a;
    }
  }

  return buff;
}

function stringEncodeUTF16(object) {
  let isUnicode = false;

  // Escape characters as required by the spec
  let string = object.replace(escapableRe, match => escapable[match]);

  for (let i = 0, end = string.length; i < end; i++) {
    if (string.charCodeAt(i) > 0x7f) {
      isUnicode = true;
      break;
    }
  }

  // If so, encode it as big endian UTF-16
  if (isUnicode) {
    string = swapBytes(new Buffer('\ufeff' + string, 'utf16le')).toString(
      'binary',
    );
  }

  return '(' + string + ')';
}

// Convert JS primitves to PDF;
// Taken from https://github.com/devongovett/pdfkit/blob/63d6e5020f0b3efa3005286476a29905f8d5e843/lib/object.coffee
function convert(object) {
  if (typeof object === 'function') {
    return object();
  } else if (typeof object === 'string') {
    // String literals are converted to the PDF name type
    if (!object.startsWith('%PDF')) return `/${object}`;
    return object;
  }

  // String objects are converted to PDF strings (UTF-16)
  if (object instanceof String) {
    return stringEncodeUTF16(object);
  }

  if ({}.toString.call(object) === '[object Object]') {
    return [
      '<<',
      ...toPairsIn(object).map(([key, val]) => `/${key} ${val}`),
      '>>',
    ].join('\n');
  }

  if (Array.isArray(object)) {
    return `[${object.map(convert).join(' ')}]`;
  }

  if (typeof object === 'number') {
    if (object > -1e21 && object < 1e21) return Math.round(object * 1e6) / 1e6;
    throw new Error(`unsupported number: ${object}`);
  }

  return String(object);
}

export default convert;
