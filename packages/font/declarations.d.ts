import type { Font, FontCollection } from 'fontkit';

declare module 'fontkit' {
  export function create(
    buffer: Uint8Array | Buffer,
    postscriptName?: string,
  ): Font | FontCollection;
}
