import r from 'restructure';

// Vertical Header Table
export default new r.Struct({
  version:                r.uint16,  // Version number of the Vertical Header Table
  ascent:                 r.int16,   // The vertical typographic ascender for this font
  descent:                r.int16,   // The vertical typographic descender for this font
  lineGap:                r.int16,   // The vertical typographic line gap for this font
  advanceHeightMax:       r.int16,   // The maximum advance height measurement found in the font
  minTopSideBearing:      r.int16,   // The minimum top side bearing measurement found in the font
  minBottomSideBearing:   r.int16,   // The minimum bottom side bearing measurement found in the font
  yMaxExtent:             r.int16,
  caretSlopeRise:         r.int16,   // Caret slope (rise/run)
  caretSlopeRun:          r.int16,
  caretOffset:            r.int16,   // Set value equal to 0 for nonslanted fonts
  reserved:               new r.Reserved(r.int16, 4),
  metricDataFormat:       r.int16,   // Set to 0
  numberOfMetrics:        r.uint16   // Number of advance heights in the Vertical Metrics table
});
