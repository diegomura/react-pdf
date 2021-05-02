// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

// VDMX tables contain ascender/descender overrides for certain (usually small)
// sizes. This is needed in order to match font metrics on Windows.

const Ratio = new r.Struct({
  bCharSet:       r.uint8,                             // Character set
  xRatio:         r.uint8,                             // Value to use for x-Ratio
  yStartRatio:    r.uint8,                             // Starting y-Ratio value
  yEndRatio:      r.uint8                              // Ending y-Ratio value
});

const vTable = new r.Struct({
  yPelHeight:     r.uint16,                            // yPelHeight to which values apply
  yMax:           r.int16,                             // Maximum value (in pels) for this yPelHeight
  yMin:           r.int16                              // Minimum value (in pels) for this yPelHeight
});

const VdmxGroup = new r.Struct({
  recs:           r.uint16,                            // Number of height records in this group
  startsz:        r.uint8,                             // Starting yPelHeight
  endsz:          r.uint8,                             // Ending yPelHeight
  entries:        new r.Array(vTable, 'recs')          // The VDMX records
});

export default new r.Struct({
  version:        r.uint16,                            // Version number (0 or 1)
  numRecs:        r.uint16,                            // Number of VDMX groups present
  numRatios:      r.uint16,                            // Number of aspect ratio groupings
  ratioRanges:    new r.Array(Ratio, 'numRatios'),     // Ratio ranges
  offsets:        new r.Array(r.uint16, 'numRatios'),  // Offset to the VDMX group for this ratio range
  groups:         new r.Array(VdmxGroup, 'numRecs')    // The actual VDMX groupings
});
