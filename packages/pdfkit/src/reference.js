import zlib from 'zlib';
import stream from 'stream';
import PDFObject from './object';

class PDFReference extends stream.Writable {
  constructor(document, id, data = {}) {
    super({ decodeStrings: false });

    this.finalize = this.finalize.bind(this);
    this.document = document;
    this.id = id;
    this.data = data;
    this.gen = 0;
    this.compress = this.document.compress && !this.data.Filter;
    this.uncompressedLength = 0;
    this.buffer = [];
  }

  _write(chunk, encoding, callback) {
    if (!(chunk instanceof Uint8Array)) {
      chunk = Buffer.from(chunk + '\n', 'binary');
    }

    this.uncompressedLength += chunk.length;
    if (this.data.Length == null) {
      this.data.Length = 0;
    }
    this.buffer.push(chunk);
    this.data.Length += chunk.length;
    if (this.compress) {
      this.data.Filter = 'FlateDecode';
    }
    return callback();
  }

  end(chunk) {
    if (chunk) {
      this.write(chunk);
    }
    return this.finalize();
  }

  finalize() {
    this.offset = this.document._offset;

    if (this.buffer.length) {
      this.buffer = Buffer.concat(this.buffer);
      if (this.compress) {
        this.buffer = zlib.deflateSync(this.buffer);
      }
      this.data.Length = this.buffer.length;
    }

    this.document._write(`${this.id} ${this.gen} obj`);
    this.document._write(PDFObject.convert(this.data));

    if (this.buffer.length) {
      this.document._write('stream');
      this.document._write(this.buffer);

      this.buffer = []; // free up memory
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
