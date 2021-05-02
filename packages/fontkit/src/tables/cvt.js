// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

// An array of predefined values accessible by instructions
export default new r.Struct({
  controlValues: new r.Array(r.int16)
});
