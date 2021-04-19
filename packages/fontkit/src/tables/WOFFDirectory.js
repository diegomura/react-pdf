import r from 'restructure';
import tables from './';

let WOFFDirectoryEntry = new r.Struct({
  tag:          new r.String(4),
  offset:       new r.Pointer(r.uint32, 'void', {type: 'global'}),
  compLength:   r.uint32,
  length:       r.uint32,
  origChecksum: r.uint32
});

let WOFFDirectory = new r.Struct({
  tag:            new r.String(4), // should be 'wOFF'
  flavor:         r.uint32,
  length:         r.uint32,
  numTables:      r.uint16,
  reserved:       new r.Reserved(r.uint16),
  totalSfntSize:  r.uint32,
  majorVersion:   r.uint16,
  minorVersion:   r.uint16,
  metaOffset:     r.uint32,
  metaLength:     r.uint32,
  metaOrigLength: r.uint32,
  privOffset:     r.uint32,
  privLength:     r.uint32,
  tables:         new r.Array(WOFFDirectoryEntry, 'numTables')
});

WOFFDirectory.process = function() {
  let tables = {};
  for (let table of this.tables) {
    tables[table.tag] = table;
  }

  this.tables = tables;
};

export default WOFFDirectory;
