import * as AATFeatureMap from './AATFeatureMap';
import * as Script from '../layout/Script';
import AATMorxProcessor from './AATMorxProcessor';

export default class AATLayoutEngine {
  constructor(font) {
    this.font = font;
    this.morxProcessor = new AATMorxProcessor(font);
    this.fallbackPosition = false;
  }

  substitute(glyphRun) {
    // AAT expects the glyphs to be in visual order prior to morx processing,
    // so reverse the glyphs if the script is right-to-left.
    if (glyphRun.direction === 'rtl') {
      glyphRun.glyphs.reverse();
    }

    this.morxProcessor.process(glyphRun.glyphs, AATFeatureMap.mapOTToAAT(glyphRun.features));
  }

  getAvailableFeatures(script, language) {
    return AATFeatureMap.mapAATToOT(this.morxProcessor.getSupportedFeatures());
  }

  stringsForGlyph(gid) {
    let glyphStrings = this.morxProcessor.generateInputs(gid);
    let result = new Set;

    for (let glyphs of glyphStrings) {
      this._addStrings(glyphs, 0, result, '');
    }

    return result;
  }

  _addStrings(glyphs, index, strings, string) {
    let codePoints = this.font._cmapProcessor.codePointsForGlyph(glyphs[index]);

    for (let codePoint of codePoints) {
      let s = string + String.fromCodePoint(codePoint);
      if (index < glyphs.length - 1) {
        this._addStrings(glyphs, index + 1, strings, s);
      } else {
        strings.add(s);
      }
    }
  }
}
