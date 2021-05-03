import TTFFont from './TTFFont';
import WOFFDirectory from './tables/WOFFDirectory';
import tables from './tables';
import inflate from 'tiny-inflate';
import r from 'restructure';

export default class WOFFFont extends TTFFont {
  static probe(buffer) {
    return buffer.toString('ascii', 0, 4) === 'wOFF';
  }

  _decodeDirectory() {
    this.directory = WOFFDirectory.decode(this.stream, { _startOffset: 0 });
  }

  _getTableStream(tag) {
    let table = this.directory.tables[tag];
    if (table) {
      this.stream.pos = table.offset;

      if (table.compLength < table.length) {
        this.stream.pos += 2; // skip deflate header
        let outBuffer = new Buffer(table.length);
        let buf = inflate(this.stream.readBuffer(table.compLength - 2), outBuffer);
        return new r.DecodeStream(buf);
      } else {
        return this.stream;
      }
    }

    return null;
  }
}
