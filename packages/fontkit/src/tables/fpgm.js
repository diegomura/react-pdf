// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

// A list of instructions that are executed once when a font is first used.
// These instructions are known as the font program. The main use of this table
// is for the definition of functions that are used in many different glyph programs.
export default new r.Struct({
  instructions: new r.Array(r.uint8)
});
