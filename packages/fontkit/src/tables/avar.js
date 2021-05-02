// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

const shortFrac = new r.Fixed(16, 'BE', 14);

const Correspondence = new r.Struct({
  fromCoord: shortFrac,
  toCoord: shortFrac,
});

const Segment = new r.Struct({
  pairCount: r.uint16,
  correspondence: new r.Array(Correspondence, 'pairCount'),
});

export default new r.Struct({
  version: r.fixed32,
  axisCount: r.uint32,
  segment: new r.Array(Segment, 'axisCount'),
});
