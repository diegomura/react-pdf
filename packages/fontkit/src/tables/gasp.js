import r from 'restructure';

let GaspRange = new r.Struct({
  rangeMaxPPEM:       r.uint16,                  // Upper limit of range, in ppem
  rangeGaspBehavior:  new r.Bitfield(r.uint16, [ // Flags describing desired rasterizer behavior
    'grayscale', 'gridfit',
    'symmetricSmoothing', 'symmetricGridfit'     // only in version 1, for ClearType
  ])
});

export default new r.Struct({
  version:    r.uint16,  // set to 0
  numRanges:  r.uint16,
  gaspRanges: new r.Array(GaspRange, 'numRanges') // Sorted by ppem
});
