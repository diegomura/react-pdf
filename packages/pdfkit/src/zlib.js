/*
Deflate helpers. Node builds use the native zlib module; browser builds use
fflate, whose output is wrapped in Buffer because the browser Buffer polyfill's
concat() rejects plain Uint8Arrays.
*/

import {
  createDeflate as nodeCreateDeflate,
  deflateSync as nodeDeflateSync,
} from 'zlib';
import { Zlib, zlibSync } from 'fflate';

const browserCreateDeflate = () => {
  const handlers = { data: [], end: [] };
  const deflate = new Zlib();

  deflate.ondata = (chunk, final) => {
    handlers.data.forEach((fn) => fn(Buffer.from(chunk)));
    // fflate emits synchronously; defer 'end' to keep the reference
    // finalization order node's async zlib produces
    if (final) queueMicrotask(() => handlers.end.forEach((fn) => fn()));
  };

  return {
    on(event, fn) {
      handlers[event].push(fn);
      return this;
    },
    write(chunk) {
      deflate.push(chunk);
    },
    end() {
      deflate.push(new Uint8Array(0), true);
    },
  };
};

export const createDeflate = BROWSER ? browserCreateDeflate : nodeCreateDeflate;

export const deflateSync = BROWSER
  ? (data) => Buffer.from(zlibSync(data))
  : nodeDeflateSync;
