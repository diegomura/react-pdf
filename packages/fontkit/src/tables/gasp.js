// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

const GaspRange = new r.Struct({
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
