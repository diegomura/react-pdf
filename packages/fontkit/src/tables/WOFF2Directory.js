import r from 'restructure';

const Base128 = {
  decode(stream) {
    let result = 0;
    let iterable = [0, 1, 2, 3, 4];
    for (let j = 0; j < iterable.length; j++) {
      let i = iterable[j];
      let code = stream.readUInt8();

      // If any of the top seven bits are set then we're about to overflow.
      if (result & 0xe0000000) {
        throw new Error('Overflow');
      }

      result = (result << 7) | (code & 0x7f);
      if ((code & 0x80) === 0) {
        return result;
      }
    }

    throw new Error('Bad base 128 number');
  }
};

let knownTags = [
  'cmap', 'head', 'hhea', 'hmtx', 'maxp', 'name', 'OS/2', 'post', 'cvt ',
  'fpgm', 'glyf', 'loca', 'prep', 'CFF ', 'VORG', 'EBDT', 'EBLC', 'gasp',
  'hdmx', 'kern', 'LTSH', 'PCLT', 'VDMX', 'vhea', 'vmtx', 'BASE', 'GDEF',
  'GPOS', 'GSUB', 'EBSC', 'JSTF', 'MATH', 'CBDT', 'CBLC', 'COLR', 'CPAL',
  'SVG ', 'sbix', 'acnt', 'avar', 'bdat', 'bloc', 'bsln', 'cvar', 'fdsc',
  'feat', 'fmtx', 'fvar', 'gvar', 'hsty', 'just', 'lcar', 'mort', 'morx',
  'opbd', 'prop', 'trak', 'Zapf', 'Silf', 'Glat', 'Gloc', 'Feat', 'Sill'
];

let WOFF2DirectoryEntry = new r.Struct({
  flags: r.uint8,
  customTag: new r.Optional(new r.String(4), t => (t.flags & 0x3f) === 0x3f),
  tag: t => t.customTag || knownTags[t.flags & 0x3f],// || (() => { throw new Error(`Bad tag: ${flags & 0x3f}`); })(); },
  length: Base128,
  transformVersion: t => (t.flags >>> 6) & 0x03,
  transformed: t => (t.tag === 'glyf' || t.tag === 'loca') ? t.transformVersion === 0 : t.transformVersion !== 0,
  transformLength: new r.Optional(Base128, t => t.transformed)
});

let WOFF2Directory = new r.Struct({
  tag: new r.String(4), // should be 'wOF2'
  flavor: r.uint32,
  length: r.uint32,
  numTables: r.uint16,
  reserved: new r.Reserved(r.uint16),
  totalSfntSize: r.uint32,
  totalCompressedSize: r.uint32,
  majorVersion: r.uint16,
  minorVersion: r.uint16,
  metaOffset: r.uint32,
  metaLength: r.uint32,
  metaOrigLength: r.uint32,
  privOffset: r.uint32,
  privLength: r.uint32,
  tables: new r.Array(WOFF2DirectoryEntry, 'numTables')
});

WOFF2Directory.process = function() {
  let tables = {};
  for (let i = 0; i < this.tables.length; i++) {
    let table = this.tables[i];
    tables[table.tag] = table;
  }

  return this.tables = tables;
};

export default WOFF2Directory;
