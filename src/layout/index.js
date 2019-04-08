import layoutEngine from '@react-pdf/textkit/layout';
import lineBreaker from '@react-pdf/textkit/engines/linebreaker';
import justification from '@react-pdf/textkit/engines/justification';
import textDecoration from '@react-pdf/textkit/engines/textDecoration';
import scriptItemizer from '@react-pdf/textkit/engines/scriptItemizer';
import wordHyphenation from '@react-pdf/textkit/engines/wordHyphenation';

import fontSubstitution from './fontSubstitution';

const engines = {
  lineBreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const engine = layoutEngine(engines);

export default engine;
