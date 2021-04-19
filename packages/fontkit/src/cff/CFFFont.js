import r from 'restructure';
import CFFIndex from './CFFIndex';
import CFFTop from './CFFTop';
import CFFPrivateDict from './CFFPrivateDict';
import standardStrings from './CFFStandardStrings';

class CFFFont {
  constructor(stream) {
    this.stream = stream;
    this.decode();
  }

  static decode(stream) {
    return new CFFFont(stream);
  }

  decode() {
    let start = this.stream.pos;
    let top = CFFTop.decode(this.stream);
    for (let key in top) {
      let val = top[key];
      this[key] = val;
    }

    if (this.version < 2) {
      if (this.topDictIndex.length !== 1) {
        throw new Error("Only a single font is allowed in CFF");
      }

      this.topDict = this.topDictIndex[0];
    }

    this.isCIDFont = this.topDict.ROS != null;
    return this;
  }

  string(sid) {
    if (this.version >= 2) {
      return null;
    }

    if (sid < standardStrings.length) {
      return standardStrings[sid];
    }

    return this.stringIndex[sid - standardStrings.length];
  }

  get postscriptName() {
    if (this.version < 2) {
      return this.nameIndex[0];
    }

    return null;
  }

  get fullName() {
    return this.string(this.topDict.FullName);
  }

  get familyName() {
    return this.string(this.topDict.FamilyName);
  }

  getCharString(glyph) {
    this.stream.pos = this.topDict.CharStrings[glyph].offset;
    return this.stream.readBuffer(this.topDict.CharStrings[glyph].length);
  }

  getGlyphName(gid) {
    // CFF2 glyph names are in the post table.
    if (this.version >= 2) {
      return null;
    }

    // CID-keyed fonts don't have glyph names
    if (this.isCIDFont) {
      return null;
    }

    let { charset } = this.topDict;
    if (Array.isArray(charset)) {
      return charset[gid];
    }

    if (gid === 0) {
      return '.notdef';
    }

    gid -= 1;

    switch (charset.version) {
      case 0:
        return this.string(charset.glyphs[gid]);

      case 1:
      case 2:
        for (let i = 0; i < charset.ranges.length; i++) {
          let range = charset.ranges[i];
          if (range.offset <= gid && gid <= range.offset + range.nLeft) {
            return this.string(range.first + (gid - range.offset));
          }
        }
        break;
    }

    return null;
  }

  fdForGlyph(gid) {
    if (!this.topDict.FDSelect) {
      return null;
    }

    switch (this.topDict.FDSelect.version) {
      case 0:
        return this.topDict.FDSelect.fds[gid];

      case 3:
      case 4:
        let { ranges } = this.topDict.FDSelect;
        let low = 0;
        let high = ranges.length - 1;

        while (low <= high) {
          let mid = (low + high) >> 1;

          if (gid < ranges[mid].first) {
            high = mid - 1;
          } else if (mid < high && gid > ranges[mid + 1].first) {
            low = mid + 1;
          } else {
            return ranges[mid].fd;
          }
        }
      default:
        throw new Error(`Unknown FDSelect version: ${this.topDict.FDSelect.version}`);
    }
  }

  privateDictForGlyph(gid) {
    if (this.topDict.FDSelect) {
      let fd = this.fdForGlyph(gid);
      if (this.topDict.FDArray[fd]) {
        return this.topDict.FDArray[fd].Private;
      }

      return null;
    }

    if (this.version < 2) {
      return this.topDict.Private;
    }

    return this.topDict.FDArray[0].Private;
  }
}

export default CFFFont;
