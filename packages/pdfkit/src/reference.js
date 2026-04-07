/*
PDFReference - represents a reference to another object in the PDF object heirarchy
By Devon Govett
*/

import zlib from 'zlib';
import stream from 'stream';
import PDFObject from './object';

class PDFReference extends stream.Writable {
  constructor(document, id, data) {
    super({ decodeStrings: false });

    this.finalize = this.finalize.bind(this);
    this.document = document;
    this.id = id;
    if (data == null) {
      data = {};
    }
    this.data = data;

    this.gen = 0;
    this.deflate = null;
    this.compress = this.document.compress && !this.data.Filter;
    this.uncompressedLength = 0;
    this.chunks = [];
  }

  initDeflate() {
    this.data.Filter = 'FlateDecode';

    this.deflate = zlib.createDeflate();
    this.deflate.on('data', (chunk) => {
      this.chunks.push(chunk);
      return (this.data.Length += chunk.length);
    });

    return this.deflate.on('end', this.finalize);
  }

  _write(chunk, encoding, callback) {
    if (!(chunk instanceof Uint8Array)) {
      chunk = Buffer.from(chunk + '\n', 'binary');
    }

    this.uncompressedLength += chunk.length;
    if (this.data.Length == null) {
      this.data.Length = 0;
    }

    if (this.compress) {
      if (!this.deflate) {
        this.initDeflate();
      }
      this.deflate.write(chunk);
    } else {
      this.chunks.push(chunk);
      this.data.Length += chunk.length;
    }

    return callback();
  }

  end() {
    super.end(...arguments);

    if (this.deflate) {
      return this.deflate.end();
    }

    return this.finalize();
  }

  finalize() {
    this.offset = this.document._offset;

    const encryptFn = this.document._security
      ? this.document._security.getEncryptFn(this.id, this.gen)
      : null;

    if (this.chunks.length) {
      let buffer = Buffer.concat(this.chunks);

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
