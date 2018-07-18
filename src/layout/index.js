import { LayoutEngine as BaseLayoutEngine } from '@react-pdf/textkit-core';
import scriptItemizer from '@react-pdf/script-itemizer';
import justificationEngine from '@textkit/justification-engine';
import textDecorationEngine from '@textkit/text-decoration-engine';
import lineFragmentGenerator from '@textkit/line-fragment-generator';
import lineBreaker from './linebreaker';

// TODO: Re-add font fontSubstitution
// import fontSubstitutionEngine from './fontSubstitution';

// justificationEngine values
const shrinkWhitespaceFactor = { before: -0.5, after: -0.5 };

export class LayoutEngine extends BaseLayoutEngine {
  constructor({ hyphenationCallback }) {
    const engines = {
      scriptItemizer: scriptItemizer(),
      decorationEngine: textDecorationEngine(),
      lineFragmentGenerator: lineFragmentGenerator(),
      // fontSubstitutionEngine: fontSubstitutionEngine(),
      lineBreaker: lineBreaker({ hyphenationCallback }),
      justificationEngine: justificationEngine({ shrinkWhitespaceFactor }),
    };

    super(engines);
  }
}

export * from '@react-pdf/textkit-core';
