import r from 'restructure';

let shortFrac = new r.Fixed(16, 'BE', 14);
class Offset {
  static decode(stream, parent) {
    // In short format, offsets are multiplied by 2.
    // This doesn't seem to be documented by Apple, but it
    // is implemented this way in Freetype.
    return parent.flags 
      ? stream.readUInt32BE()
      : stream.readUInt16BE() * 2;
  }
}

let gvar = new r.Struct({
  version: r.uint16,
  reserved: new r.Reserved(r.uint16),
  axisCount: r.uint16,
  globalCoordCount: r.uint16,
  globalCoords: new r.Pointer(r.uint32, new r.Array(new r.Array(shortFrac, 'axisCount'), 'globalCoordCount')),
  glyphCount: r.uint16,
  flags: r.uint16,
  offsetToData: r.uint32,
  offsets: new r.Array(new r.Pointer(Offset, 'void', { relativeTo: 'offsetToData', allowNull: false }), t => t.glyphCount + 1)
});

export default gvar;
