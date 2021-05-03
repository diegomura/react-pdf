import r from 'restructure';

// horizontal header
export default new r.Struct({
  version:              r.int32,
  ascent:               r.int16,   // Distance from baseline of highest ascender
  descent:              r.int16,   // Distance from baseline of lowest descender
  lineGap:              r.int16,   // Typographic line gap
  advanceWidthMax:      r.uint16,  // Maximum advance width value in 'hmtx' table
  minLeftSideBearing:   r.int16,   // Maximum advance width value in 'hmtx' table
  minRightSideBearing:  r.int16,   // Minimum right sidebearing value
  xMaxExtent:           r.int16,
  caretSlopeRise:       r.int16,   // Used to calculate the slope of the cursor (rise/run); 1 for vertical
  caretSlopeRun:        r.int16,   // 0 for vertical
  caretOffset:          r.int16,   // Set to 0 for non-slanted fonts
  reserved:             new r.Reserved(r.int16, 4),
  metricDataFormat:     r.int16,   // 0 for current format
  numberOfMetrics:      r.uint16   // Number of advance widths in 'hmtx' table
});
