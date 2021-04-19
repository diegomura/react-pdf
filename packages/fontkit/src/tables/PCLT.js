import r from 'restructure';

// PCL 5 Table
// NOTE: The PCLT table is strongly discouraged for OpenType fonts with TrueType outlines
export default new r.Struct({
  version:              r.uint16,
  fontNumber:           r.uint32,
  pitch:                r.uint16,
  xHeight:              r.uint16,
  style:                r.uint16,
  typeFamily:           r.uint16,
  capHeight:            r.uint16,
  symbolSet:            r.uint16,
  typeface:             new r.String(16),
  characterComplement:  new r.String(8),
  fileName:             new r.String(6),
  strokeWeight:         new r.String(1),
  widthType:            new r.String(1),
  serifStyle:           r.uint8,
  reserved:             new r.Reserved(r.uint8)
});
