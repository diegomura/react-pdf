/* eslint-disable no-param-reassign */
import Blob from 'blob';
import { Writable, Readable } from './stream-browser';

class BlobStream extends Writable {
  constructor() {
    super();

    this._chunks = [];
    this._blob = null;
    this.length = 0;
  }

  _write(chunk, encoding, callback) {
    // convert chunks to Uint8Arrays (e.g. Buffer when array fallback is being used)
    if (!(chunk instanceof Uint8Array)) chunk = new Uint8Array(chunk);

    this.length += chunk.length;
    this._chunks.push(chunk);
    callback();
  }

  toBlob(type = 'application/octet-stream') {
    // cache the blob if needed
    if (!this._blob) {
      this._blob = new Blob(this._chunks, { type });
      this._chunks = []; // free memory
    }

    // if the cached blob's type doesn't match the requested type, make a new blob
    if (this._blob.type !== type) this._blob = new Blob([this._blob], { type });

    return this._blob;
  }
}

export { Writable, Readable, BlobStream };
export default { Writable, Readable, BlobStream };
