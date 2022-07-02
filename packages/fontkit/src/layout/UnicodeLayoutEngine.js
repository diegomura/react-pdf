import unicode from 'unicode-properties';

/**
 * This class is used when GPOS does not define 'mark' or 'mkmk' features
 * for positioning marks relative to base glyphs. It uses the unicode
 * combining class property to position marks.
 *
 * Based on code from Harfbuzz, thanks!
 * https://github.com/behdad/harfbuzz/blob/master/src/hb-ot-shape-fallback.cc
 */
export default class UnicodeLayoutEngine {
  constructor(font) {
    this.font = font;
  }

  positionGlyphs(glyphs, positions) {
    // find each base + mark cluster, and position the marks relative to the base
    let clusterStart = 0;
    let clusterEnd = 0;
    for (let index = 0; index < glyphs.length; index++) {
      let glyph = glyphs[index];
      if (glyph.isMark) { // TODO: handle ligatures
        clusterEnd = index;
      } else {
        if (clusterStart !== clusterEnd) {
          this.positionCluster(glyphs, positions, clusterStart, clusterEnd);
        }

        clusterStart = clusterEnd = index;
      }
    }

    if (clusterStart !== clusterEnd) {
      this.positionCluster(glyphs, positions, clusterStart, clusterEnd);
    }

    return positions;
  }

  positionCluster(glyphs, positions, clusterStart, clusterEnd) {
    let base = glyphs[clusterStart];
    let baseBox = base.cbox.copy();

    // adjust bounding box for ligature glyphs
    if (base.codePoints.length > 1) {
      // LTR. TODO: RTL support.
      baseBox.minX += ((base.codePoints.length - 1) * baseBox.width) / base.codePoints.length;
    }

    let xOffset = -positions[clusterStart].xAdvance;
    let yOffset = 0;
    let yGap = this.font.unitsPerEm / 16;

    // position each of the mark glyphs relative to the base glyph
    for (let index = clusterStart + 1; index <= clusterEnd; index++) {
      let mark = glyphs[index];
      let markBox = mark.cbox;
      let position = positions[index];

      let combiningClass = this.getCombiningClass(mark.codePoints[0]);

      if (combiningClass !== 'Not_Reordered') {
        position.xOffset = position.yOffset = 0;

        // x positioning
        switch (combiningClass) {
          case 'Double_Above':
          case 'Double_Below':
            // LTR. TODO: RTL support.
            position.xOffset += baseBox.minX - markBox.width / 2 - markBox.minX;
            break;

          case 'Attached_Below_Left':
          case 'Below_Left':
          case 'Above_Left':
            // left align
            position.xOffset += baseBox.minX - markBox.minX;
            break;

          case 'Attached_Above_Right':
          case 'Below_Right':
          case 'Above_Right':
            // right align
            position.xOffset += baseBox.maxX - markBox.width - markBox.minX;
            break;

          default: // Attached_Below, Attached_Above, Below, Above, other
            // center align
            position.xOffset += baseBox.minX + (baseBox.width - markBox.width) / 2 - markBox.minX;
        }

        // y positioning
        switch (combiningClass) {
          case 'Double_Below':
          case 'Below_Left':
          case 'Below':
          case 'Below_Right':
          case 'Attached_Below_Left':
          case 'Attached_Below':
            // add a small gap between the glyphs if they are not attached
            if (combiningClass === 'Attached_Below_Left' || combiningClass === 'Attached_Below') {
              baseBox.minY += yGap;
            }

            position.yOffset = -baseBox.minY - markBox.maxY;
            baseBox.minY += markBox.height;
            break;

          case 'Double_Above':
          case 'Above_Left':
          case 'Above':
          case 'Above_Right':
          case 'Attached_Above':
          case 'Attached_Above_Right':
            // add a small gap between the glyphs if they are not attached
            if (combiningClass === 'Attached_Above' || combiningClass === 'Attached_Above_Right') {
              baseBox.maxY += yGap;
            }

            position.yOffset = baseBox.maxY - markBox.minY;
            baseBox.maxY += markBox.height;
            break;
        }

        position.xAdvance = position.yAdvance = 0;
        position.xOffset += xOffset;
        position.yOffset += yOffset;

      } else {
        xOffset -= position.xAdvance;
        yOffset -= position.yAdvance;
      }
    }

    return;
  }

  getCombiningClass(codePoint) {
    let combiningClass = unicode.getCombiningClass(codePoint);

    // Thai / Lao need some per-character work
    if ((codePoint & ~0xff) === 0x0e00) {
      if (combiningClass === 'Not_Reordered') {
        switch (codePoint) {
          case 0x0e31:
          case 0x0e34:
          case 0x0e35:
          case 0x0e36:
          case 0x0e37:
          case 0x0e47:
          case 0x0e4c:
          case 0x0e3d:
          case 0x0e4e:
            return 'Above_Right';

          case 0x0eb1:
          case 0x0eb4:
          case 0x0eb5:
          case 0x0eb6:
          case 0x0eb7:
          case 0x0ebb:
          case 0x0ecc:
          case 0x0ecd:
            return 'Above';

          case 0x0ebc:
            return 'Below';
        }
      } else if (codePoint === 0x0e3a) { // virama
        return 'Below_Right';
      }
    }

    switch (combiningClass) {
      // Hebrew

      case 'CCC10': // sheva
      case 'CCC11': // hataf segol
      case 'CCC12': // hataf patah
      case 'CCC13': // hataf qamats
      case 'CCC14': // hiriq
      case 'CCC15': // tsere
      case 'CCC16': // segol
      case 'CCC17': // patah
      case 'CCC18': // qamats
      case 'CCC20': // qubuts
      case 'CCC22': // meteg
        return 'Below';

      case 'CCC23': // rafe
        return 'Attached_Above';

      case 'CCC24': // shin dot
        return 'Above_Right';

      case 'CCC25': // sin dot
      case 'CCC19': // holam
        return 'Above_Left';

      case 'CCC26': // point varika
        return 'Above';

      case 'CCC21': // dagesh
        break;

      // Arabic and Syriac

      case 'CCC27': // fathatan
      case 'CCC28': // dammatan
      case 'CCC30': // fatha
      case 'CCC31': // damma
      case 'CCC33': // shadda
      case 'CCC34': // sukun
      case 'CCC35': // superscript alef
      case 'CCC36': // superscript alaph
        return 'Above';

      case 'CCC29': // kasratan
      case 'CCC32': // kasra
        return 'Below';

      // Thai

      case 'CCC103': // sara u / sara uu
        return 'Below_Right';

      case 'CCC107': // mai
        return 'Above_Right';

      // Lao

      case 'CCC118': // sign u / sign uu
        return 'Below';

      case 'CCC122': // mai
        return 'Above';

      // Tibetan

      case 'CCC129': // sign aa
      case 'CCC132': // sign u
        return 'Below';

      case 'CCC130': // sign i
        return 'Above';
    }

    return combiningClass;
  }
}
