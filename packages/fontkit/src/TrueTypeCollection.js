// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';
import TTFFont from './TTFFont';

const TTCHeader = new r.VersionedStruct(r.uint32, {
  0x00010000: {
    numFonts: r.uint32,
    offsets: new r.Array(r.uint32, 'numFonts'),
  },
  0x00020000: {
    numFonts: r.uint32,
    offsets: new r.Array(r.uint32, 'numFonts'),
    dsigTag: r.uint32,
    dsigLength: r.uint32,
    dsigOffset: r.uint32,
  },
});

export default class TrueTypeCollection {
  static probe(buffer) {
    return buffer.toString('ascii', 0, 4) === 'ttcf';
  }

  constructor(stream) {
    this.stream = stream;
    if (stream.readString(4) !== 'ttcf') {
      throw new Error('Not a TrueType collection');
    }

    this.header = TTCHeader.decode(stream);
  }

  getFont(name) {
    for (let offset of this.header.offsets) {
      let stream = new r.DecodeStream(this.stream.buffer);
      stream.pos = offset;
      let font = new TTFFont(stream);
      if (font.postscriptName === name) {
        return font;
      }
    }

    return null;
  }

  get fonts() {
    const fonts = [];
    for (let offset of this.header.offsets) {
      let stream = new r.DecodeStream(this.stream.buffer);
      stream.pos = offset;
      fonts.push(new TTFFont(stream));
    }

    return fonts;
  }
}
