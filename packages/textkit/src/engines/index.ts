import bidi from './bidi';
import linebreaker from './linebreaker';
import justification from './justification';
import fontSubstitution from './fontSubstitution';
import textDecoration from './textDecoration';
import scriptItemizer from './scriptItemizer';
import wordHyphenation from './wordHyphenation';

export type Engines = {
  bidi: typeof bidi;
  linebreaker: typeof linebreaker;
  justification: typeof justification;
  fontSubstitution: typeof fontSubstitution;
  scriptItemizer: typeof scriptItemizer;
  textDecoration: typeof textDecoration;
  wordHyphenation?: typeof wordHyphenation;
};
