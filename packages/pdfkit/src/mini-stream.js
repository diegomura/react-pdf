/*
Minimal Readable stream shim — only what PDFDocument needs:
on/once/off/emit, push(chunk|null), pipe(dest).

Buffers pushes until the first `data` listener is added, then flushes on a
microtask so a caller can attach both `data` and `end` listeners before
flowing starts. After the first flush, pushes emit synchronously.
*/

class MiniReadable {
  constructor() {
    this._listeners = {};
    this._buffered = [];
    this._endBuffered = false;
    this._flowing = false;
    this._scheduled = false;
  }

  on(event, fn) {
    (this._listeners[event] = this._listeners[event] || []).push(fn);
    if (event === 'data' && !this._scheduled) {
      this._scheduled = true;
      queueMicrotask(() => {
        this._flowing = true;
        const chunks = this._buffered;
        this._buffered = [];
        for (const chunk of chunks) this.emit('data', chunk);
        if (this._endBuffered) this.emit('end');
      });
    }
    return this;
  }

  once(event, fn) {
    const wrap = (...args) => {
      this.off(event, wrap);
      fn(...args);
    };
    return this.on(event, wrap);
  }

  off(event, fn) {
    const arr = this._listeners[event];
    if (!arr) return this;
    const idx = arr.indexOf(fn);
    if (idx !== -1) arr.splice(idx, 1);
    return this;
  }

  removeListener(event, fn) {
    return this.off(event, fn);
  }

  emit(event, ...args) {
    const arr = this._listeners[event];
    if (!arr) return;
    for (const fn of arr.slice()) fn(...args);
  }

  push(chunk) {
    if (chunk === null) {
      if (this._flowing) this.emit('end');
      else this._endBuffered = true;
      return false;
    }
    if (this._flowing) this.emit('data', chunk);
    else this._buffered.push(chunk);
    return true;
  }

  pipe(dest) {
    this.on('data', (chunk) => dest.write(chunk));
    this.on('end', () => dest.end && dest.end());
    this.on('error', (err) => dest.emit && dest.emit('error', err));
    return dest;
  }
}

export default MiniReadable;
