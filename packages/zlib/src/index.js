const { Buffer } = require('buffer');
const { Transform } = require('stream');

const binding = require('./binding');

// zlib constants
const Z_FINISH = 4;
const Z_NO_FLUSH = 0;
const Z_DEFAULT_STRATEGY = 0;
const Z_DEFAULT_MEMLEVEL = 8;
const Z_DEFAULT_WINDOWBITS = 15;
const Z_DEFAULT_COMPRESSION = -1;
const Z_DEFAULT_CHUNK = 16 * 1024;

function _close(engine, callback) {
  if (callback) process.nextTick(callback);

  if (!engine._handle) return;

  engine._handle.close();
  engine._handle = null;
}

class Zlib extends Transform {
  constructor() {
    super();

    this._offset = 0;
    this._flushFlag = Z_NO_FLUSH;
    this._chunkSize = Z_DEFAULT_CHUNK;
    this._buffer = Buffer.allocUnsafe(this._chunkSize);

    this._handle = new binding.Zlib();

    this._handle.init(
      Z_DEFAULT_WINDOWBITS,
      Z_DEFAULT_COMPRESSION,
      Z_DEFAULT_MEMLEVEL,
      Z_DEFAULT_STRATEGY,
    );

    this.once('end', this.close);
  }

  _flush(callback) {
    this._transform(Buffer.alloc(0), '', callback);
  }

  close(callback) {
    _close(this, callback);
    this.emit('close');
  }

  _transform(chunk, encoding, cb) {
    let flushFlag;
    const ws = this._writableState;
    const ending = ws.ending || ws.ended;
    const last = ending && (!chunk || ws.length === chunk.length);

    if (chunk !== null && !Buffer.isBuffer(chunk))
      return cb(new Error('invalid input'));

    if (last) {
      flushFlag = Z_FINISH;
    } else {
      flushFlag = this._flushFlag;

      if (chunk.length >= ws.length) {
        this._flushFlag = Z_NO_FLUSH;
      }
    }

    this._processChunk(chunk, flushFlag, cb);
  }

  _processChunk(chunk, flushFlag, cb) {
    let availInBefore = chunk && chunk.length;
    let availOutBefore = this._chunkSize - this._offset;

    const self = this;
    const buffers = [];
    const async = typeof cb === 'function';

    let inOff = 0;
    let nread = 0;

    function callback(availInAfter, availOutAfter) {
      if (this) {
        this.buffer = null;
        this.callback = null;
      }

      const have = availOutBefore - availOutAfter;

      if (have > 0) {
        const out = self._buffer.slice(self._offset, self._offset + have);

        self._offset += have;

        if (async) {
          self.push(out);
        } else {
          buffers.push(out);
          nread += out.length;
        }
      }

      if (availOutAfter === 0 || self._offset >= self._chunkSize) {
        availOutBefore = self._chunkSize;
        self._offset = 0;
        self._buffer = Buffer.allocUnsafe(self._chunkSize);
      }

      if (availOutAfter === 0) {
        inOff += availInBefore - availInAfter;
        availInBefore = availInAfter;

        if (!async) return true;

        const newReq = self._handle.write(
          flushFlag,
          chunk,
          inOff,
          availInBefore,
          self._buffer,
          self._offset,
          self._chunkSize,
        );
        newReq.callback = callback;
        newReq.buffer = chunk;
        return;
      }

      if (!async) return false;

      cb();
    }

    if (!async) {
      let res = this._handle.writeSync(
        flushFlag,
        chunk,
        inOff,
        availInBefore,
        this._buffer,
        this._offset,
        availOutBefore,
      );

      while (callback(res[0], res[1])) {
        res = this._handle.writeSync(
          flushFlag,
          chunk,
          inOff,
          availInBefore,
          this._buffer,
          this._offset,
          availOutBefore,
        );
      }

      _close(this);

      return Buffer.concat(buffers, nread);
    }

    const req = this._handle.write(
      flushFlag,
      chunk,
      inOff,
      availInBefore,
      this._buffer,
      this._offset,
      availOutBefore,
    );

    req.buffer = chunk;
    req.callback = callback;
  }
}

exports.createDeflate = () => {
  return new Zlib();
};

exports.deflateSync = buffer => {
  const engine = new Zlib();

  if (typeof buffer === 'string') buffer = Buffer.from(buffer);

  if (!Buffer.isBuffer(buffer)) throw new TypeError('Not a string or buffer');

  return engine._processChunk(buffer, Z_FINISH);
};
