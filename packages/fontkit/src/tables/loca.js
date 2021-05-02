// Updated: 417af0c79c5664271a07a783574ec7fac7ebad0c

import r from 'restructure';

let loca = new r.VersionedStruct('head.indexToLocFormat', {
  0: {
    offsets: new r.Array(r.uint16)
  },
  1: {
    offsets: new r.Array(r.uint32)
  }
});

loca.process = function() {
  if (this.version === 0) {
    for (let i = 0; i < this.offsets.length; i++) {
      this.offsets[i] <<= 1;
    }
  }
};

loca.preEncode = function() {
  if (this.version === 0) {
    for (let i = 0; i < this.offsets.length; i++) {
      this.offsets[i] >>>= 1;
    }
  }
};

export default loca;
