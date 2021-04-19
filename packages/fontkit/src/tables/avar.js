import r from 'restructure';

let shortFrac = new r.Fixed(16, 'BE', 14);

let Correspondence = new r.Struct({
  fromCoord: shortFrac,
  toCoord: shortFrac
});

let Segment = new r.Struct({
  pairCount: r.uint16,
  correspondence: new r.Array(Correspondence, 'pairCount')
});

export default new r.Struct({
  version: r.fixed32,
  axisCount: r.uint32,
  segment: new r.Array(Segment, 'axisCount')
});
