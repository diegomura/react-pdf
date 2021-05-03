import r from 'restructure';
import Tables from './';

let TableEntry = new r.Struct({
  tag:        new r.String(4),
  checkSum:   r.uint32,
  offset:     new r.Pointer(r.uint32, 'void', { type: 'global' }),
  length:     r.uint32
});

let Directory = new r.Struct({
  tag:            new r.String(4),
  numTables:      r.uint16,
  searchRange:    r.uint16,
  entrySelector:  r.uint16,
  rangeShift:     r.uint16,
  tables:         new r.Array(TableEntry, 'numTables')
});

Directory.process = function() {
  let tables = {};
  for (let table of this.tables) {
    tables[table.tag] = table;
  }

  this.tables = tables;
};

Directory.preEncode = function(stream) {
  let tables = [];
  for (let tag in this.tables) {
    let table = this.tables[tag];
    if (table) {
      tables.push({
        tag: tag,
        checkSum: 0,
        offset: new r.VoidPointer(Tables[tag], table),
        length: Tables[tag].size(table)
      });
    }
  }

  this.tag = 'true';
  this.numTables = tables.length;
  this.tables = tables;

  let maxExponentFor2 = Math.floor((Math.log(this.numTables) / Math.LN2));
  let maxPowerOf2 = Math.pow(2, maxExponentFor2);

  this.searchRange =  maxPowerOf2 * 16;
  this.entrySelector = Math.log(maxPowerOf2) / Math.LN2;
  this.rangeShift = this.numTables * 16 - this.searchRange;
};

export default Directory;
