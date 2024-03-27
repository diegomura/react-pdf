import PDFReference from './reference';
import PDFNameTree from './name_tree';

const escapableRe = /[\n\r\t\b\f\(\)\\]/g;
const escapable = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  '\\': '\\\\',
  '(': '\\(',
  ')': '\\)'
};

const pad = (str, length) => (Array(length + 1).join('0') + str).slice(-length);

// Convert little endian UTF-16 to big endian
const swapBytes = function (buff) {
  const l = buff.length;
  if (l & 0x01) {
    throw new Error('Buffer length must be even');
  } else {
    for (let i = 0, end = l - 1; i < end; i += 2) {
      const a = buff[i];
      buff[i] = buff[i + 1];
      buff[i + 1] = a;
    }
  }

  return buff;
};

class PDFObject {
  static convert(object, encryptFn = null) {
    // String literals are converted to the PDF name type
    if (typeof object === 'string') {
      return `/${object}`;
    }

    // String objects are converted to PDF strings (UTF-16)
    if (object instanceof String) {
      let string = object;
      // Detect if this is a unicode string
      let isUnicode = false;
      for (let i = 0, end = string.length; i < end; i++) {
        if (string.charCodeAt(i) > 0x7f) {
          isUnicode = true;
          break;
        }
      }

      // If so, encode it as big endian UTF-16
      let stringBuffer;
      if (isUnicode) {
        stringBuffer = swapBytes(Buffer.from(`\ufeff${string}`, 'utf16le'));
      } else {
        stringBuffer = Buffer.from(string.valueOf(), 'ascii');
      }

      // Encrypt the string when necessary
      if (encryptFn) {
        string = encryptFn(stringBuffer).toString('binary');
      } else {
        string = stringBuffer.toString('binary');
      }

      // Escape characters as required by the spec
      string = string.replace(escapableRe, (c) => escapable[c]);

      return `(${string})`;

    }

    // Buffers are converted to PDF hex strings
    if (Buffer.isBuffer(object)) {
      return `<${object.toString('hex')}>`;
    }

    if (object instanceof PDFReference || object instanceof PDFNameTree) {
      return object.toString();
    }

    if (object instanceof Date) {
      let string =
        `D:${pad(object.getUTCFullYear(), 4)}` +
        pad(object.getUTCMonth() + 1, 2) +
        pad(object.getUTCDate(), 2) +
        pad(object.getUTCHours(), 2) +
        pad(object.getUTCMinutes(), 2) +
        pad(object.getUTCSeconds(), 2) +
        'Z';

      // Encrypt the string when necessary
      if (encryptFn) {
        string = encryptFn(Buffer.from(string, 'ascii')).toString('binary');

        // Escape characters as required by the spec
        string = string.replace(escapableRe, c => escapable[c]);
      }

      return `(${string})`;
    }

    if (Array.isArray(object)) {
      const items = Array.from(object)
        .map(e => PDFObject.convert(e, encryptFn))
        .join(' ');
      return `[${items}]`;
    }

    if ({}.toString.call(object) === '[object Object]') {
      const out = ['<<'];
      for (let key in object) {
        const val = object[key];
        out.push(`/${key} ${PDFObject.convert(val, encryptFn)}`);
      }

      out.push('>>');
      return out.join('\n');
    }

    if (typeof object === 'number') {
      return PDFObject.number(object);
    }

    return `${object}`;
  }

  static number(n) {
    if (n > -1e21 && n < 1e21) {
      return Math.round(n * 1e6) / 1e6;
    }

    throw new Error(`unsupported number: ${n}`);
  }
}

export default PDFObject;
