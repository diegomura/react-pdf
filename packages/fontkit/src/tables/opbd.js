// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';
import { LookupTable } from './aat';

const OpticalBounds = new r.Struct({
  left: r.int16,
  top: r.int16,
  right: r.int16,
  bottom: r.int16
});

export default new r.Struct({
  version: r.fixed32,
  format: r.uint16,
  lookupTable: new LookupTable(OpticalBounds)
});
