/*
PDFReference - represents a reference to another object in the PDF object heirarchy
By Devon Govett
*/

import pako from 'pako';
import { concat, fromBinaryString } from './binary';
import PDFObject from './object';

class PDFReference {
  constructor(document, id, data) {
    this.document = document;
    this.id = id;
    if (data == null) {
      data = {};
    }
    this.data = data;

    this.gen = 0;
    this.compress = this.document.compress && !this.data.Filter;
    this.uncompressedLength = 0;
    this.chunks = [];
  }

  write(chunk) {
    if (!(chunk instanceof Uint8Array)) {
      chunk = fromBinaryString(chunk + '\n');
    }

    this.uncompressedLength += chunk.length;
    if (this.data.Length == null) {
      this.data.Length = 0;
    }

    this.chunks.push(chunk);
    this.data.Length += chunk.length;
  }

  end(chunk) {
    if (chunk != null) this.write(chunk);
    return this.finalize();
  }

  finalize() {
    this.offset = this.document._offset;

    const encryptFn = this.document._security
      ? this.document._security.getEncryptFn(this.id, this.gen)
      : null;

    if (this.chunks.length) {
      let buffer = concat(this.chunks);

      if (this.compress) {
        this.data.Filter = 'FlateDecode';
        buffer = pako.deflate(buffer);
      }

      if (encryptFn) {
        buffer = encryptFn(buffer);
      }

      this.data.Length = buffer.length;
      this.document._write(`${this.id} ${this.gen} obj`);
      this.document._write(PDFObject.convert(this.data, encryptFn));
      this.document._write('stream');
      this.document._write(buffer);
      this.chunks.length = 0;
      this.document._write('\nendstream');
    } else {
      this.document._write(`${this.id} ${this.gen} obj`);
      this.document._write(PDFObject.convert(this.data, encryptFn));
    }

    this.document._write('endobj');
    return this.document._refEnd(this);
  }

  toString() {
    return `${this.id} ${this.gen} R`;
  }
}

export default PDFReference;
