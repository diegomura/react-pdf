// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';
import inflate from 'tiny-inflate';
import TTFFont from './TTFFont';
import WOFFDirectory from './tables/WOFFDirectory';

export default class WOFFFont extends TTFFont {
  static probe(buffer) {
    return buffer.toString('ascii', 0, 4) === 'wOFF';
  }

  _decodeDirectory() {
    this.directory = WOFFDirectory.decode(this.stream, { _startOffset: 0 });
  }

  _getTableStream(tag) {
    const table = this.directory.tables[tag];
    if (table) {
      this.stream.pos = table.offset;

      if (table.compLength < table.length) {
        this.stream.pos += 2; // skip deflate header
        const outBuffer = Buffer.alloc(table.length);
        const buf = inflate(
          this.stream.readBuffer(table.compLength - 2),
          outBuffer,
        );
        return new r.DecodeStream(buf);
      }

      return this.stream;
    }

    return null;
  }
}
