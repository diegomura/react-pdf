const Zstream = require('pako/lib/zlib/zstream');
const zlibDeflate = require('pako/lib/zlib/deflate.js');

/**
 * Emulate Node's zlib C++ layer for use by the JS layer in index.js
 */
class Zlib {
  constructor() {
    this.flush = 0;
    this.level = 0;
    this.memLevel = 0;
    this.strategy = 0;
    this.windowBits = 0;
    this.write_in_progress = false;
    this.pending_close = false;
  }

  init(windowBits, level, memLevel, strategy) {
    this.level = level;
    this.windowBits = windowBits;
    this.memLevel = memLevel;
    this.strategy = strategy;

    this.flush = 0;

    this.strm = new Zstream();

    zlibDeflate.deflateInit2(
      this.strm,
      this.level,
      8, // Z_DEFLATED
      this.windowBits,
      this.memLevel,
      this.strategy,
    );

    this.write_in_progress = false;
  }

  write(flush, input, inOff, inLen, out, outOff, outLen) {
    return this._write(true, flush, input, inOff, inLen, out, outOff, outLen);
  }

  writeSync(flush, input, inOff, inLen, out, outOff, outLen) {
    return this._write(false, flush, input, inOff, inLen, out, outOff, outLen);
  }

  _write(async, flush, input, inOff, inLen, out, outOff, outLen) {
    this.write_in_progress = true;

    this.write_in_progress = true;

    if (input == null) {
      input = Buffer.alloc(0);
      inLen = 0;
      inOff = 0;
    }

    this.strm.avail_in = inLen;
    this.strm.input = input;
    this.strm.next_in = inOff;
    this.strm.avail_out = outLen;
    this.strm.output = out;
    this.strm.next_out = outOff;
    this.flush = flush;

    if (!async) {
      // sync version
      this._process();
      return this._afterSync();
    }

    // async version
    const self = this;
    process.nextTick(() => {
      self._process();
      self._after();
    });

    return this;
  }

  _afterSync() {
    const availOut = this.strm.avail_out;
    const availIn = this.strm.avail_in;

    this.write_in_progress = false;

    return [availIn, availOut];
  }

  _process() {
    zlibDeflate.deflate(this.strm, this.flush);
  }

  _after() {
    const availOut = this.strm.avail_out;
    const availIn = this.strm.avail_in;

    this.write_in_progress = false;

    // call the write() cb
    this.callback(availIn, availOut);

    if (this.pending_close) {
      this.close();
    }
  }

  close() {
    if (this.write_in_progress) {
      this.pending_close = true;
      return;
    }

    this.pending_close = false;

    zlibDeflate.deflateEnd(this.strm);
  }
}

exports.Zlib = Zlib;
