// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

// Set of instructions executed whenever the point size or font transformation change
export default new r.Struct({
  controlValueProgram: new r.Array(r.uint8)
});
