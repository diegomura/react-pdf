import OTProcessor from './OTProcessor';
import GlyphInfo from './GlyphInfo';

export default class GSUBProcessor extends OTProcessor {
  applyLookup(lookupType, table) {
    switch (lookupType) {
      case 1: { // Single Substitution
        let index = this.coverageIndex(table.coverage);
        if (index === -1) {
          return false;
        }

        let glyph = this.glyphIterator.cur;
        switch (table.version) {
          case 1:
            glyph.id = (glyph.id + table.deltaGlyphID) & 0xffff;
            break;

          case 2:
            glyph.id = table.substitute.get(index);
            break;
        }

        return true;
      }

      case 2: { // Multiple Substitution
        let index = this.coverageIndex(table.coverage);
        if (index !== -1) {
          let sequence = table.sequences.get(index);

          if (sequence.length === 0) {
            // If the sequence length is zero, delete the glyph.
            // The OpenType spec disallows this, but seems like Harfbuzz and Uniscribe allow it.
            this.glyphs.splice(this.glyphIterator.index, 1);
            return true;
          }

          this.glyphIterator.cur.id = sequence[0];
          this.glyphIterator.cur.ligatureComponent = 0;

          let features = this.glyphIterator.cur.features;
          let curGlyph = this.glyphIterator.cur;
          let replacement = sequence.slice(1).map((gid, i) => {
            let glyph = new GlyphInfo(this.font, gid, undefined, features);
            glyph.shaperInfo = curGlyph.shaperInfo;
            glyph.isLigated = curGlyph.isLigated;
            glyph.ligatureComponent = i + 1;
            glyph.substituted = true;
            glyph.isMultiplied = true;
            return glyph;
          });

          this.glyphs.splice(this.glyphIterator.index + 1, 0, ...replacement);
          return true;
        }

        return false;
      }

      case 3: { // Alternate Substitution
        let index = this.coverageIndex(table.coverage);
        if (index !== -1) {
          let USER_INDEX = 0; // TODO
          this.glyphIterator.cur.id = table.alternateSet.get(index)[USER_INDEX];
          return true;
        }

        return false;
      }

      case 4: { // Ligature Substitution
        let index = this.coverageIndex(table.coverage);
        if (index === -1) {
          return false;
        }

        for (let ligature of table.ligatureSets.get(index)) {
          let matched = this.sequenceMatchIndices(1, ligature.components);
          if (!matched) {
            continue;
          }

          let curGlyph = this.glyphIterator.cur;

          // Concatenate all of the characters the new ligature will represent
          let characters = curGlyph.codePoints.slice();
          for (let index of matched) {
            characters.push(...this.glyphs[index].codePoints);
          }

          // Create the replacement ligature glyph
          let ligatureGlyph = new GlyphInfo(this.font, ligature.glyph, characters, curGlyph.features);
          ligatureGlyph.shaperInfo = curGlyph.shaperInfo;
          ligatureGlyph.isLigated = true;
          ligatureGlyph.substituted = true;

          // From Harfbuzz:
          // - If it *is* a mark ligature, we don't allocate a new ligature id, and leave
          //   the ligature to keep its old ligature id.  This will allow it to attach to
          //   a base ligature in GPOS.  Eg. if the sequence is: LAM,LAM,SHADDA,FATHA,HEH,
          //   and LAM,LAM,HEH for a ligature, they will leave SHADDA and FATHA with a
          //   ligature id and component value of 2.  Then if SHADDA,FATHA form a ligature
          //   later, we don't want them to lose their ligature id/component, otherwise
          //   GPOS will fail to correctly position the mark ligature on top of the
          //   LAM,LAM,HEH ligature. See https://bugzilla.gnome.org/show_bug.cgi?id=676343
          //
          // - If a ligature is formed of components that some of which are also ligatures
          //   themselves, and those ligature components had marks attached to *their*
          //   components, we have to attach the marks to the new ligature component
          //   positions!  Now *that*'s tricky!  And these marks may be following the
          //   last component of the whole sequence, so we should loop forward looking
          //   for them and update them.
          //
          //   Eg. the sequence is LAM,LAM,SHADDA,FATHA,HEH, and the font first forms a
          //   'calt' ligature of LAM,HEH, leaving the SHADDA and FATHA with a ligature
          //   id and component == 1.  Now, during 'liga', the LAM and the LAM-HEH ligature
          //   form a LAM-LAM-HEH ligature.  We need to reassign the SHADDA and FATHA to
          //   the new ligature with a component value of 2.
          //
          //   This in fact happened to a font...  See https://bugzilla.gnome.org/show_bug.cgi?id=437633
          let isMarkLigature = curGlyph.isMark;
          for (let i = 0; i < matched.length && isMarkLigature; i++) {
            isMarkLigature = this.glyphs[matched[i]].isMark;
          }

          ligatureGlyph.ligatureID = isMarkLigature ? null : this.ligatureID++;

          let lastLigID = curGlyph.ligatureID;
          let lastNumComps = curGlyph.codePoints.length;
          let curComps = lastNumComps;
          let idx = this.glyphIterator.index + 1;

          // Set ligatureID and ligatureComponent on glyphs that were skipped in the matched sequence.
          // This allows GPOS to attach marks to the correct ligature components.
          for (let matchIndex of matched) {
            // Don't assign new ligature components for mark ligatures (see above)
            if (isMarkLigature) {
              idx = matchIndex;
            } else {
              while (idx < matchIndex) {
                var ligatureComponent = curComps - lastNumComps + Math.min(this.glyphs[idx].ligatureComponent || 1, lastNumComps);
                this.glyphs[idx].ligatureID = ligatureGlyph.ligatureID;
                this.glyphs[idx].ligatureComponent = ligatureComponent;
                idx++;
              }
            }

            lastLigID = this.glyphs[idx].ligatureID;
            lastNumComps = this.glyphs[idx].codePoints.length;
            curComps += lastNumComps;
            idx++; // skip base glyph
          }

          // Adjust ligature components for any marks following
          if (lastLigID && !isMarkLigature) {
            for (let i = idx; i < this.glyphs.length; i++) {
              if (this.glyphs[i].ligatureID === lastLigID) {
                var ligatureComponent = curComps - lastNumComps + Math.min(this.glyphs[i].ligatureComponent || 1, lastNumComps);
                this.glyphs[i].ligatureComponent = ligatureComponent;
              } else {
                break;
              }
            }
          }

          // Delete the matched glyphs, and replace the current glyph with the ligature glyph
          for (let i = matched.length - 1; i >= 0; i--) {
            this.glyphs.splice(matched[i], 1);
          }

          this.glyphs[this.glyphIterator.index] = ligatureGlyph;
          return true;
        }

        return false;
      }

      case 5: // Contextual Substitution
        return this.applyContext(table);

      case 6: // Chaining Contextual Substitution
        return this.applyChainingContext(table);

      case 7: // Extension Substitution
        return this.applyLookup(table.lookupType, table.extension);

      default:
        throw new Error(`GSUB lookupType ${lookupType} is not supported`);
    }
  }
}
