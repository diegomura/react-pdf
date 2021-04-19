import r from 'restructure';
import TTFFont from './TTFFont';

let DFontName = new r.String(r.uint8);
let DFontData = new r.Struct({
  len: r.uint32,
  buf: new r.Buffer('len')
});

let Ref = new r.Struct({
  id: r.uint16,
  nameOffset: r.int16,
  attr: r.uint8,
  dataOffset: r.uint24,
  handle: r.uint32
});

let Type = new r.Struct({
  name: new r.String(4),
  maxTypeIndex: r.uint16,
  refList: new r.Pointer(r.uint16, new r.Array(Ref, t => t.maxTypeIndex + 1), { type: 'parent' })
});

let TypeList = new r.Struct({
  length: r.uint16,
  types: new r.Array(Type, t => t.length + 1)
});

let DFontMap = new r.Struct({
  reserved: new r.Reserved(r.uint8, 24),
  typeList: new r.Pointer(r.uint16, TypeList),
  nameListOffset: new r.Pointer(r.uint16, 'void')
});

let DFontHeader = new r.Struct({
  dataOffset: r.uint32,
  map: new r.Pointer(r.uint32, DFontMap),
  dataLength: r.uint32,
  mapLength: r.uint32
});

export default class DFont {
  static probe(buffer) {
    let stream = new r.DecodeStream(buffer);

    try {
      var header = DFontHeader.decode(stream);
    } catch (e) {
      return false;
    }

    for (let type of header.map.typeList.types) {
      if (type.name === 'sfnt') {
        return true;
      }
    }

    return false;
  }

  constructor(stream) {
    this.stream = stream;
    this.header = DFontHeader.decode(this.stream);

    for (let type of this.header.map.typeList.types) {
      for (let ref of type.refList) {
        if (ref.nameOffset >= 0) {
          this.stream.pos = ref.nameOffset + this.header.map.nameListOffset;
          ref.name = DFontName.decode(this.stream);
        } else {
          ref.name = null;
        }
      }

      if (type.name === 'sfnt') {
        this.sfnt = type;
      }
    }
  }

  getFont(name) {
    if (!this.sfnt) {
      return null;
    }

    for (let ref of this.sfnt.refList) {
      let pos = this.header.dataOffset + ref.dataOffset + 4;
      let stream = new r.DecodeStream(this.stream.buffer.slice(pos));
      let font = new TTFFont(stream);
      if (font.postscriptName === name) {
        return font;
      }
    }

    return null;
  }

  get fonts() {
    let fonts = [];
    for (let ref of this.sfnt.refList) {
      let pos = this.header.dataOffset + ref.dataOffset + 4;
      let stream = new r.DecodeStream(this.stream.buffer.slice(pos));
      fonts.push(new TTFFont(stream));
    }

    return fonts;
  }
}
