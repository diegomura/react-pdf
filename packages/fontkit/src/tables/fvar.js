// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

const Axis = new r.Struct({
  axisTag: new r.String(4),
  minValue: r.fixed32,
  defaultValue: r.fixed32,
  maxValue: r.fixed32,
  flags: r.uint16,
  nameID: r.uint16,
  name: t => t.parent.parent.name.records.fontFeatures[t.nameID]
});

const Instance = new r.Struct({
  nameID: r.uint16,
  name: t => t.parent.parent.name.records.fontFeatures[t.nameID],
  flags: r.uint16,
  coord: new r.Array(r.fixed32, t => t.parent.axisCount),
  postscriptNameID: new r.Optional(r.uint16, t => t.parent.instanceSize - t._currentOffset > 0)
});

export default new r.Struct({
  version: r.fixed32,
  offsetToData: r.uint16,
  countSizePairs: r.uint16,
  axisCount: r.uint16,
  axisSize: r.uint16,
  instanceCount: r.uint16,
  instanceSize: r.uint16,
  axis: new r.Array(Axis, 'axisCount'),
  instance: new r.Array(Instance, 'instanceCount')
});
