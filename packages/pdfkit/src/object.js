/*
PDFObject - converts JavaScript types into their corresponding PDF types.
By Devon Govett
*/

import PDFReference from './reference';
import PDFNameTree from './name_tree';
import {
  fromBinaryString,
  fromUtf16BEWithBOM,
  toBinaryString,
  toHex,
} from './binary';

const pad = (str, length) => (Array(length + 1).join('0') + str).slice(-length);

const escapableRe = /[\n\r\t\b\f()\\]/g;
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

class PDFObject {
  static convert(object, encryptFn = null) {
    // String literals are converted to the PDF name type
    if (typeof object === 'string') {
      return `/${object}`;
    }

    // String objects are converted to PDF strings (UTF-16)
    if (object instanceof String) {
      const string = object;
      // Detect if this is a unicode string
      let isUnicode = false;
      for (let i = 0, end = string.length; i < end; i++) {
        if (string.charCodeAt(i) > 0x7f) {
          isUnicode = true;
          break;
        }
      }

      let bytes = isUnicode
        ? fromUtf16BEWithBOM(string.valueOf())
        : fromBinaryString(string.valueOf());

      if (encryptFn) {
        bytes = encryptFn(bytes);
      }

      // Escape characters as required by the spec
      const escaped = toBinaryString(bytes).replace(
        escapableRe,
        (c) => escapable[c],
      );

      return `(${escaped})`;
    }

    // Byte arrays are converted to PDF hex strings
    if (object instanceof Uint8Array) {
      return `<${toHex(object)}>`;
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
        string = toBinaryString(encryptFn(fromBinaryString(string)));
        string = string.replace(escapableRe, (c) => escapable[c]);
      }

      return `(${string})`;
    }

    if (Array.isArray(object)) {
      const items = object
        .map((e) => PDFObject.convert(e, encryptFn))
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
