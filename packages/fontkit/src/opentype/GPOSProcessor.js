import OTProcessor from './OTProcessor';

export default class GPOSProcessor extends OTProcessor {
  applyPositionValue(sequenceIndex, value) {
    let position = this.positions[this.glyphIterator.peekIndex(sequenceIndex)];
    if (value.xAdvance != null) {
      position.xAdvance += value.xAdvance;
    }

    if (value.yAdvance != null) {
      position.yAdvance += value.yAdvance;
    }

    if (value.xPlacement != null) {
      position.xOffset += value.xPlacement;
    }

    if (value.yPlacement != null) {
      position.yOffset += value.yPlacement;
    }

    // Adjustments for font variations
    let variationProcessor = this.font._variationProcessor;
    let variationStore = this.font.GDEF && this.font.GDEF.itemVariationStore;
    if (variationProcessor && variationStore) {
      if (value.xPlaDevice) {
        position.xOffset += variationProcessor.getDelta(variationStore, value.xPlaDevice.a, value.xPlaDevice.b);
      }

      if (value.yPlaDevice) {
        position.yOffset += variationProcessor.getDelta(variationStore, value.yPlaDevice.a, value.yPlaDevice.b);
      }

      if (value.xAdvDevice) {
        position.xAdvance += variationProcessor.getDelta(variationStore, value.xAdvDevice.a, value.xAdvDevice.b);
      }

      if (value.yAdvDevice) {
        position.yAdvance += variationProcessor.getDelta(variationStore, value.yAdvDevice.a, value.yAdvDevice.b);
      }
    }

    // TODO: device tables
  }

  applyLookup(lookupType, table) {
    switch (lookupType) {
      case 1: { // Single positioning value
        let index = this.coverageIndex(table.coverage);
        if (index === -1) {
          return false;
        }

        switch (table.version) {
          case 1:
            this.applyPositionValue(0, table.value);
            break;

          case 2:
            this.applyPositionValue(0, table.values.get(index));
            break;
        }

        return true;
      }

      case 2: { // Pair Adjustment Positioning
        let nextGlyph = this.glyphIterator.peek();
        if (!nextGlyph) {
          return false;
        }

        let index = this.coverageIndex(table.coverage);
        if (index === -1) {
          return false;
        }

        switch (table.version) {
          case 1: // Adjustments for glyph pairs
            let set = table.pairSets.get(index);

            for (let pair of set) {
              if (pair.secondGlyph === nextGlyph.id) {
                this.applyPositionValue(0, pair.value1);
                this.applyPositionValue(1, pair.value2);
                return true;
              }
            }

            return false;

          case 2: // Class pair adjustment
            let class1 = this.getClassID(this.glyphIterator.cur.id, table.classDef1);
            let class2 = this.getClassID(nextGlyph.id, table.classDef2);
            if (class1 === -1 || class2 === -1) {
              return false;
            }

            var pair = table.classRecords.get(class1).get(class2);
            this.applyPositionValue(0, pair.value1);
            this.applyPositionValue(1, pair.value2);
            return true;
        }
      }

      case 3: { // Cursive Attachment Positioning
        let nextIndex = this.glyphIterator.peekIndex();
        let nextGlyph = this.glyphs[nextIndex];
        if (!nextGlyph) {
          return false;
        }

        let curRecord = table.entryExitRecords[this.coverageIndex(table.coverage)];
        if (!curRecord || !curRecord.exitAnchor) {
          return false;
        }

        let nextRecord = table.entryExitRecords[this.coverageIndex(table.coverage, nextGlyph.id)];
        if (!nextRecord || !nextRecord.entryAnchor) {
          return false;
        }

        let entry = this.getAnchor(nextRecord.entryAnchor);
        let exit = this.getAnchor(curRecord.exitAnchor);

        let cur = this.positions[this.glyphIterator.index];
        let next = this.positions[nextIndex];

        switch (this.direction) {
          case 'ltr':
            cur.xAdvance = exit.x + cur.xOffset;

            let d = entry.x + next.xOffset;
            next.xAdvance -= d;
            next.xOffset -= d;
            break;

          case 'rtl':
            d = exit.x + cur.xOffset;
            cur.xAdvance -= d;
            cur.xOffset -= d;
            next.xAdvance = entry.x + next.xOffset;
            break;
        }

        if (this.glyphIterator.flags.rightToLeft) {
          this.glyphIterator.cur.cursiveAttachment = nextIndex;
          cur.yOffset = entry.y - exit.y;
        } else {
          nextGlyph.cursiveAttachment = this.glyphIterator.index;
          cur.yOffset = exit.y - entry.y;
        }

        return true;
      }

      case 4: { // Mark to base positioning
        let markIndex = this.coverageIndex(table.markCoverage);
        if (markIndex === -1) {
          return false;
        }

        // search backward for a base glyph
        let baseGlyphIndex = this.glyphIterator.index;
        while (--baseGlyphIndex >= 0 && (this.glyphs[baseGlyphIndex].isMark || this.glyphs[baseGlyphIndex].ligatureComponent > 0));

        if (baseGlyphIndex < 0) {
          return false;
        }

        let baseIndex = this.coverageIndex(table.baseCoverage, this.glyphs[baseGlyphIndex].id);
        if (baseIndex === -1) {
          return false;
        }

        let markRecord = table.markArray[markIndex];
        let baseAnchor = table.baseArray[baseIndex][markRecord.class];
        this.applyAnchor(markRecord, baseAnchor, baseGlyphIndex);
        return true;
      }

      case 5: { // Mark to ligature positioning
        let markIndex = this.coverageIndex(table.markCoverage);
        if (markIndex === -1) {
          return false;
        }

        // search backward for a base glyph
        let baseGlyphIndex = this.glyphIterator.index;
        while (--baseGlyphIndex >= 0 && this.glyphs[baseGlyphIndex].isMark);

        if (baseGlyphIndex < 0) {
          return false;
        }

        let ligIndex = this.coverageIndex(table.ligatureCoverage, this.glyphs[baseGlyphIndex].id);
        if (ligIndex === -1) {
          return false;
        }

        let ligAttach = table.ligatureArray[ligIndex];
        let markGlyph = this.glyphIterator.cur;
        let ligGlyph = this.glyphs[baseGlyphIndex];
        let compIndex = ligGlyph.ligatureID && ligGlyph.ligatureID === markGlyph.ligatureID && (markGlyph.ligatureComponent > 0)
          ? Math.min(markGlyph.ligatureComponent, ligGlyph.codePoints.length) - 1
          : ligGlyph.codePoints.length - 1;

        let markRecord = table.markArray[markIndex];
        let baseAnchor = ligAttach[compIndex][markRecord.class];
        this.applyAnchor(markRecord, baseAnchor, baseGlyphIndex);
        return true;
      }

      case 6: { // Mark to mark positioning
        let mark1Index = this.coverageIndex(table.mark1Coverage);
        if (mark1Index === -1) {
          return false;
        }

        // get the previous mark to attach to
        let prevIndex = this.glyphIterator.peekIndex(-1);
        let prev = this.glyphs[prevIndex];
        if (!prev || !prev.isMark) {
          return false;
        }

        let cur = this.glyphIterator.cur;

        // The following logic was borrowed from Harfbuzz
        let good = false;
        if (cur.ligatureID === prev.ligatureID) {
          if (!cur.ligatureID) { // Marks belonging to the same base
            good = true;
          } else if (cur.ligatureComponent === prev.ligatureComponent) { // Marks belonging to the same ligature component
            good = true;
          }
        } else {
          // If ligature ids don't match, it may be the case that one of the marks
          // itself is a ligature, in which case match.
          if ((cur.ligatureID && !cur.ligatureComponent) || (prev.ligatureID && !prev.ligatureComponent)) {
            good = true;
          }
        }

        if (!good) {
          return false;
        }

        let mark2Index = this.coverageIndex(table.mark2Coverage, prev.id);
        if (mark2Index === -1) {
          return false;
        }

        let markRecord = table.mark1Array[mark1Index];
        let baseAnchor = table.mark2Array[mark2Index][markRecord.class];
        this.applyAnchor(markRecord, baseAnchor, prevIndex);
        return true;
      }

      case 7: // Contextual positioning
        return this.applyContext(table);

      case 8: // Chaining contextual positioning
        return this.applyChainingContext(table);

      case 9: // Extension positioning
        return this.applyLookup(table.lookupType, table.extension);

      default:
        throw new Error(`Unsupported GPOS table: ${lookupType}`);
    }
  }

  applyAnchor(markRecord, baseAnchor, baseGlyphIndex) {
    let baseCoords = this.getAnchor(baseAnchor);
    let markCoords = this.getAnchor(markRecord.markAnchor);

    let basePos = this.positions[baseGlyphIndex];
    let markPos = this.positions[this.glyphIterator.index];

    markPos.xOffset = baseCoords.x - markCoords.x;
    markPos.yOffset = baseCoords.y - markCoords.y;
    this.glyphIterator.cur.markAttachment = baseGlyphIndex;
  }

  getAnchor(anchor) {
    // TODO: contour point, device tables
    let x = anchor.xCoordinate;
    let y = anchor.yCoordinate;

    // Adjustments for font variations
    let variationProcessor = this.font._variationProcessor;
    let variationStore = this.font.GDEF && this.font.GDEF.itemVariationStore;
    if (variationProcessor && variationStore) {
      if (anchor.xDeviceTable) {
        x += variationProcessor.getDelta(variationStore, anchor.xDeviceTable.a, anchor.xDeviceTable.b);
      }

      if (anchor.yDeviceTable) {
        y += variationProcessor.getDelta(variationStore, anchor.yDeviceTable.a, anchor.yDeviceTable.b);
      }
    }

    return {x, y};
  }

  applyFeatures(userFeatures, glyphs, advances) {
    super.applyFeatures(userFeatures, glyphs, advances);

    for (var i = 0; i < this.glyphs.length; i++) {
      this.fixCursiveAttachment(i);
    }

    this.fixMarkAttachment();
  }

  fixCursiveAttachment(i) {
    let glyph = this.glyphs[i];
    if (glyph.cursiveAttachment != null) {
      let j = glyph.cursiveAttachment;

      glyph.cursiveAttachment = null;
      this.fixCursiveAttachment(j);

      this.positions[i].yOffset += this.positions[j].yOffset;
    }
  }

  fixMarkAttachment() {
    for (let i = 0; i < this.glyphs.length; i++) {
      let glyph = this.glyphs[i];
      if (glyph.markAttachment != null) {
        let j = glyph.markAttachment;

        this.positions[i].xOffset += this.positions[j].xOffset;
        this.positions[i].yOffset += this.positions[j].yOffset;

        if (this.direction === 'ltr') {
          for (let k = j; k < i; k++) {
            this.positions[i].xOffset -= this.positions[k].xAdvance;
            this.positions[i].yOffset -= this.positions[k].yAdvance;
          }
        } else {
          for (let k = j + 1; k < i + 1; k++) {
            this.positions[i].xOffset += this.positions[k].xAdvance;
            this.positions[i].yOffset += this.positions[k].yAdvance;
          }
        }
      }
    }
  }
}
