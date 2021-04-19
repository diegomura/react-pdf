import {binarySearch} from './utils';
import {getEncoding} from './encodings';
import {cache} from './decorators';
import {range} from './utils';

// iconv-lite is an optional dependency.
try {
  var iconv = require('iconv-lite');
} catch (err) {}

export default class CmapProcessor {
  constructor(cmapTable) {
    // Attempt to find a Unicode cmap first
    this.encoding = null;
    this.cmap = this.findSubtable(cmapTable, [
      // 32-bit subtables
      [3, 10],
      [0, 6],
      [0, 4],

      // 16-bit subtables
      [3, 1],
      [0, 3],
      [0, 2],
      [0, 1],
      [0, 0]
    ]);

    // If not unicode cmap was found, and iconv-lite is installed,
    // take the first table with a supported encoding.
    if (!this.cmap && iconv) {
      for (let cmap of cmapTable.tables) {
        let encoding = getEncoding(cmap.platformID, cmap.encodingID, cmap.table.language - 1);
        if (iconv.encodingExists(encoding)) {
          this.cmap = cmap.table;
          this.encoding = encoding;
        }
      }
    }

    if (!this.cmap) {
      throw new Error("Could not find a supported cmap table");
    }

    this.uvs = this.findSubtable(cmapTable, [[0, 5]]);
    if (this.uvs && this.uvs.version !== 14) {
      this.uvs = null;
    }
  }

  findSubtable(cmapTable, pairs) {
    for (let [platformID, encodingID] of pairs) {
      for (let cmap of cmapTable.tables) {
        if (cmap.platformID === platformID && cmap.encodingID === encodingID) {
          return cmap.table;
        }
      }
    }

    return null;
  }

  lookup(codepoint, variationSelector) {
    // If there is no Unicode cmap in this font, we need to re-encode
    // the codepoint in the encoding that the cmap supports.
    if (this.encoding) {
      let buf = iconv.encode(String.fromCodePoint(codepoint), this.encoding);
      codepoint = 0;
      for (let i = 0; i < buf.length; i++) {
        codepoint = (codepoint << 8) | buf[i];
      }

    // Otherwise, try to get a Unicode variation selector for this codepoint if one is provided.
    } else if (variationSelector) {
      let gid = this.getVariationSelector(codepoint, variationSelector);
      if (gid) {
        return gid;
      }
    }

    let cmap = this.cmap;
    switch (cmap.version) {
      case 0:
        return cmap.codeMap.get(codepoint) || 0;

      case 4: {
        let min = 0;
        let max = cmap.segCount - 1;
        while (min <= max) {
          let mid = (min + max) >> 1;

          if (codepoint < cmap.startCode.get(mid)) {
            max = mid - 1;
          } else if (codepoint > cmap.endCode.get(mid)) {
            min = mid + 1;
          } else {
            let rangeOffset = cmap.idRangeOffset.get(mid);
            let gid;

            if (rangeOffset === 0) {
              gid = codepoint + cmap.idDelta.get(mid);
            } else {
              let index = rangeOffset / 2 + (codepoint - cmap.startCode.get(mid)) - (cmap.segCount - mid);
              gid = cmap.glyphIndexArray.get(index) || 0;
              if (gid !== 0) {
                gid += cmap.idDelta.get(mid);
              }
            }

            return gid & 0xffff;
          }
        }

        return 0;
      }

      case 8:
        throw new Error('TODO: cmap format 8');

      case 6:
      case 10:
        return cmap.glyphIndices.get(codepoint - cmap.firstCode) || 0;

      case 12:
      case 13: {
        let min = 0;
        let max = cmap.nGroups - 1;
        while (min <= max) {
          let mid = (min + max) >> 1;
          let group = cmap.groups.get(mid);

          if (codepoint < group.startCharCode) {
            max = mid - 1;
          } else if (codepoint > group.endCharCode) {
            min = mid + 1;
          } else {
            if (cmap.version === 12) {
              return group.glyphID + (codepoint - group.startCharCode);
            } else {
              return group.glyphID;
            }
          }
        }

        return 0;
      }

      case 14:
        throw new Error('TODO: cmap format 14');

      default:
        throw new Error(`Unknown cmap format ${cmap.version}`);
    }
  }

  getVariationSelector(codepoint, variationSelector) {
    if (!this.uvs) {
      return 0;
    }

    let selectors = this.uvs.varSelectors.toArray();
    let i = binarySearch(selectors, x => variationSelector - x.varSelector);
    let sel = selectors[i];

    if (i !== -1 && sel.defaultUVS) {
      i = binarySearch(sel.defaultUVS, x =>
        codepoint < x.startUnicodeValue ? -1 : codepoint > x.startUnicodeValue + x.additionalCount ? +1 : 0
      );
    }

    if (i !== -1 && sel.nonDefaultUVS) {
      i = binarySearch(sel.nonDefaultUVS, x => codepoint - x.unicodeValue);
      if (i !== -1) {
        return sel.nonDefaultUVS[i].glyphID;
      }
    }

    return 0;
  }

  @cache
  getCharacterSet() {
    let cmap = this.cmap;
    switch (cmap.version) {
      case 0:
        return range(0, cmap.codeMap.length);

      case 4: {
        let res = [];
        let endCodes = cmap.endCode.toArray();
        for (let i = 0; i < endCodes.length; i++) {
          let tail = endCodes[i] + 1;
          let start = cmap.startCode.get(i);
          res.push(...range(start, tail));
        }

        return res;
      }

      case 8:
        throw new Error('TODO: cmap format 8');

      case 6:
      case 10:
        return range(cmap.firstCode, cmap.firstCode + cmap.glyphIndices.length);

      case 12:
      case 13: {
        let res = [];
        for (let group of cmap.groups.toArray()) {
          res.push(...range(group.startCharCode, group.endCharCode + 1));
        }

        return res;
      }

      case 14:
        throw new Error('TODO: cmap format 14');

      default:
        throw new Error(`Unknown cmap format ${cmap.version}`);
    }
  }

  @cache
  codePointsForGlyph(gid) {
    let cmap = this.cmap;
    switch (cmap.version) {
      case 0: {
        let res = [];
        for (let i = 0; i < 256; i++) {
          if (cmap.codeMap.get(i) === gid) {
            res.push(i);
          }
        }

        return res;
      }

      case 4: {
        let res = [];
        for (let i = 0; i < cmap.segCount; i++) {
          let end = cmap.endCode.get(i);
          let start = cmap.startCode.get(i);
          let rangeOffset = cmap.idRangeOffset.get(i);
          let delta = cmap.idDelta.get(i);

          for (var c = start; c <= end; c++) {
            let g = 0;
            if (rangeOffset === 0) {
              g = c + delta;
            } else {
              let index = rangeOffset / 2 + (c - start) - (cmap.segCount - i);
              g = cmap.glyphIndexArray.get(index) || 0;
              if (g !== 0) {
                g += delta;
              }
            }

            if (g === gid) {
              res.push(c);
            }
          }
        }

        return res;
      }

      case 12: {
        let res = [];
        for (let group of cmap.groups.toArray()) {
          if (gid >= group.glyphID && gid <= group.glyphID + (group.endCharCode - group.startCharCode)) {
            res.push(group.startCharCode + (gid - group.glyphID));
          }
        }

        return res;
      }

      case 13: {
        let res = [];
        for (let group of cmap.groups.toArray()) {
          if (gid === group.glyphID) {
            res.push(...range(group.startCharCode, group.endCharCode + 1));
          }
        }

        return res;
      }

      default:
        throw new Error(`Unknown cmap format ${cmap.version}`);
    }
  }
}
