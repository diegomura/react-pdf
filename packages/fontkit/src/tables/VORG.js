import r from 'restructure';

let VerticalOrigin = new r.Struct({
  glyphIndex:   r.uint16,
  vertOriginY:  r.int16
});

export default new r.Struct({
  majorVersion:           r.uint16,
  minorVersion:           r.uint16,
  defaultVertOriginY:     r.int16,
  numVertOriginYMetrics:  r.uint16,
  metrics:                new r.Array(VerticalOrigin, 'numVertOriginYMetrics')
});
