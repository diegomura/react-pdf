import * as Script from '../layout/Script';

/**
 * ShapingPlans are used by the OpenType shapers to store which
 * features should by applied, and in what order to apply them.
 * The features are applied in groups called stages. A feature
 * can be applied globally to all glyphs, or locally to only
 * specific glyphs.
 *
 * @private
 */
export default class ShapingPlan {
  constructor(font, script, direction) {
    this.font = font;
    this.script = script;
    this.direction = direction;
    this.stages = [];
    this.globalFeatures = {};
    this.allFeatures = {};
  }

  /**
   * Adds the given features to the last stage.
   * Ignores features that have already been applied.
   */
  _addFeatures(features, global) {
    let stageIndex = this.stages.length - 1;
    let stage = this.stages[stageIndex];
    for (let feature of features) {
      if (this.allFeatures[feature] == null) {
        stage.push(feature);
        this.allFeatures[feature] = stageIndex;

        if (global) {
          this.globalFeatures[feature] = true;
        }
      }
    }
  }

  /**
   * Add features to the last stage
   */
  add(arg, global = true) {
    if (this.stages.length === 0) {
      this.stages.push([]);
    }

    if (typeof arg === 'string') {
      arg = [arg];
    }

    if (Array.isArray(arg)) {
      this._addFeatures(arg, global);
    } else if (typeof arg === 'object') {
      this._addFeatures(arg.global || [], true);
      this._addFeatures(arg.local || [], false);
    } else {
      throw new Error("Unsupported argument to ShapingPlan#add");
    }
  }

  /**
   * Add a new stage
   */
  addStage(arg, global) {
    if (typeof arg === 'function') {
      this.stages.push(arg, []);
    } else {
      this.stages.push([]);
      this.add(arg, global);
    }
  }

  setFeatureOverrides(features) {
    if (Array.isArray(features)) {
      this.add(features);
    } else if (typeof features === 'object') {
      for (let tag in features) {
        if (features[tag]) {
          this.add(tag);
        } else if (this.allFeatures[tag] != null) {
          let stage = this.stages[this.allFeatures[tag]];
          stage.splice(stage.indexOf(tag), 1);
          delete this.allFeatures[tag];
          delete this.globalFeatures[tag];
        }
      }
    }
  }

  /**
   * Assigns the global features to the given glyphs
   */
  assignGlobalFeatures(glyphs) {
    for (let glyph of glyphs) {
      for (let feature in this.globalFeatures) {
        glyph.features[feature] = true;
      }
    }
  }

  /**
   * Executes the planned stages using the given OTProcessor
   */
  process(processor, glyphs, positions) {
    for (let stage of this.stages) {
      if (typeof stage === 'function') {
        if (!positions) {
          stage(this.font, glyphs, this);
        }

      } else if (stage.length > 0) {
        processor.applyFeatures(stage, glyphs, positions);
      }
    }
  }
}
