import {binarySearch} from '../utils';

export default class KernProcessor {
  constructor(font) {
    this.kern = font.kern;
  }

  process(glyphs, positions) {
    for (let glyphIndex = 0; glyphIndex < glyphs.length - 1; glyphIndex++) {
      let left = glyphs[glyphIndex].id;
      let right = glyphs[glyphIndex + 1].id;
      positions[glyphIndex].xAdvance += this.getKerning(left, right);
    }
  }

  getKerning(left, right) {
    let res = 0;

    for (let table of this.kern.tables) {
      if (table.coverage.crossStream) {
        continue;
      }

      switch (table.version) {
        case 0:
          if (!table.coverage.horizontal) {
            continue;
          }

          break;
        case 1:
          if (table.coverage.vertical || table.coverage.variation) {
            continue;
          }

          break;
        default:
          throw new Error(`Unsupported kerning table version ${table.version}`);
      }

      let val = 0;
      let s = table.subtable;
      switch (table.format) {
        case 0:
          let pairIdx = binarySearch(s.pairs, function (pair) {
            return (left - pair.left) || (right - pair.right);
          });

          if (pairIdx >= 0) {
            val = s.pairs[pairIdx].value;
          }

          break;

        case 2:
          let leftOffset = 0, rightOffset = 0;
          if (left >= s.leftTable.firstGlyph && left < s.leftTable.firstGlyph + s.leftTable.nGlyphs) {
            leftOffset = s.leftTable.offsets[left - s.leftTable.firstGlyph];
          } else {
            leftOffset = s.array.off;
          }

          if (right >= s.rightTable.firstGlyph && right < s.rightTable.firstGlyph + s.rightTable.nGlyphs) {
            rightOffset = s.rightTable.offsets[right - s.rightTable.firstGlyph];
          }

          let index = (leftOffset + rightOffset - s.array.off) / 2;
          val = s.array.values.get(index);
          break;

        case 3:
          if (left >= s.glyphCount || right >= s.glyphCount) {
            return 0;
          }

          val = s.kernValue[s.kernIndex[s.leftClass[left] * s.rightClassCount + s.rightClass[right]]];
          break;

        default:
          throw new Error(`Unsupported kerning sub-table format ${table.format}`);
      }

      // Microsoft supports the override flag, which resets the result
      // Otherwise, the sum of the results from all subtables is returned
      if (table.coverage.override) {
        res = val;
      } else {
        res += val;
      }
    }

    return res;
  }
}
