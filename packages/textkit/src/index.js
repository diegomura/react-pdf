import layoutEngine from './layout';
import bidi from './engines/bidi';
import linebreaker from './engines/linebreaker';
import justification from './engines/justification';
import textDecoration from './engines/textDecoration';
import scriptItemizer from './engines/scriptItemizer';
import wordHyphenation from './engines/wordHyphenation';
import fontSubstitution from './engines/fontSubstitution';

const engines = {
  bidi,
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const engine = layoutEngine(engines);

export default engine;
