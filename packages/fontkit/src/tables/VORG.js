// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

const VerticalOrigin = new r.Struct({
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
