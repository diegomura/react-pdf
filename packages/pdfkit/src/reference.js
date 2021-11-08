import zlib from 'zlib';
import { Writable } from '@react-pdf/streams';
import { Buffer } from 'buffer';
import PDFObject from './object';

class PDFReference extends Writable {
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
    this.deflate.on('data', chunk => {
      this.chunks.push(chunk);
      return (this.data.Length += chunk.length);
    });

    return this.deflate.on('end', this.finalize);
  }

  _write(chunk, encoding, callback) {
    if (!Buffer.isBuffer(chunk)) {
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

    this.document._write(`${this.id} ${this.gen} obj`);
    this.document._write(PDFObject.convert(this.data));

    if (this.chunks.length) {
      this.document._write('stream');
      for (let chunk of Array.from(this.chunks)) {
        this.document._write(chunk);
      }

      this.chunks.length = 0; // free up memory
      this.document._write('\nendstream');
    }

    this.document._write('endobj');
    return this.document._refEnd(this);
  }

  toString() {
    return `${this.id} ${this.gen} R`;
  }
}

export default PDFReference;
