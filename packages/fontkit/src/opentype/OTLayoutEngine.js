import ShapingPlan from './ShapingPlan'
import * as Shapers from './shapers'
import GlyphInfo from './GlyphInfo'
import GSUBProcessor from './GSUBProcessor'
import GPOSProcessor from './GPOSProcessor'

export default class OTLayoutEngine {
  constructor(font) {
    this.font = font
    this.plan = null
    this.GSUBProcessor = null
    this.GPOSProcessor = null
    this.fallbackPosition = true

    if (font.GSUB) {
      this.GSUBProcessor = new GSUBProcessor(font, font.GSUB)
    }

    if (font.GPOS) {
      this.GPOSProcessor = new GPOSProcessor(font, font.GPOS)
    }
  }

  setup(glyphRun) {
    // Select a script based on what is available in GSUB/GPOS.
    let script = null
    if (this.GPOSProcessor) {
      script = this.GPOSProcessor.selectScript(glyphRun.script, glyphRun.language, glyphRun.direction)
    }

    if (this.GSUBProcessor) {
      script = this.GSUBProcessor.selectScript(glyphRun.script, glyphRun.language, glyphRun.direction)
    }

    // Choose a shaper based on the script, and setup a shaping plan.
    // This determines which features to apply to which glyphs.
    this.shaper = Shapers.choose(script)
    this.plan = new ShapingPlan(this.font, script, glyphRun.direction)
    this.shaper.plan(this.plan, glyphRun.glyphs, glyphRun.features)

    // Assign chosen features to output glyph run
    for (let key in this.plan.allFeatures) {
      glyphRun.features[key] = true
    }
  }

  substitute(glyphRun) {
    if (this.GSUBProcessor) {
      this.plan.process(this.GSUBProcessor, glyphRun.glyphs)
    }
  }

  position(glyphRun) {
    if (this.shaper.zeroMarkWidths === 'BEFORE_GPOS') {
      this.zeroMarkAdvances(glyphRun)
    }

    if (this.GPOSProcessor) {
      this.plan.process(this.GPOSProcessor, glyphRun.glyphs, glyphRun.positions)
    }

    if (this.shaper.zeroMarkWidths === 'AFTER_GPOS') {
      this.zeroMarkAdvances(glyphRun)
    }

    // Reverse the glyphs and positions if the script is right-to-left
    if (glyphRun.direction === 'rtl') {
      glyphRun.glyphs.reverse()
      glyphRun.positions.reverse()
    }

    return this.GPOSProcessor && this.GPOSProcessor.features
  }

  zeroMarkAdvances(glyphRun) {
    for (let i = 0; i < glyphRun.glyphs; i++) {
      if (glyphRun.glyphs[i].isMark) {
        positions[i].xAdvance = 0
        positions[i].yAdvance = 0
      }
    }
  }

  cleanup() {
    this.glyphInfos = null
    this.plan = null
    this.shaper = null
  }

  getAvailableFeatures(script, language) {
    let features = []

    if (this.GSUBProcessor) {
      this.GSUBProcessor.selectScript(script, language)
      features.push(...Object.keys(this.GSUBProcessor.features))
    }

    if (this.GPOSProcessor) {
      this.GPOSProcessor.selectScript(script, language)
      features.push(...Object.keys(this.GPOSProcessor.features))
    }

    return features
  }
}
