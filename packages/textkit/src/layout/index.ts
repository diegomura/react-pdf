import { compose } from '@react-pdf/fns';

import wrapWords from './wrapWords';
import typesetter from './typesetter';
import bidiReordering from './bidiReordering';
import generateGlyphs from './generateGlyphs';
import resolveYOffset from './resolveYOffset';
import preprocessRuns from './preprocessRuns';
import splitParagraphs from './splitParagraphs';
import finalizeFragments from './finalizeFragments';
import resolveAttachments from './resolveAttachments';
import applyDefaultStyles from './applyDefaultStyles';
import verticalAlignment from './verticalAlign';
import bidiMirroring from './bidiMirroring';
import { AttributedString, Container, LayoutOptions } from '../types';
import type { Engines } from '../engines';

/**
 * A LayoutEngine is the main object that performs text layout.
 * It accepts an AttributedString and a Container object
 * to layout text into, and uses several helper objects to perform
 * various layout tasks. These objects can be overridden to customize
 * layout behavior.
 */
const layoutEngine = (engines: Engines) => {
  return (
    attributedString: AttributedString,
    container: Container,
    options: LayoutOptions = {},
  ) => {
    const processParagraph = compose(
      resolveYOffset(),
      resolveAttachments(),
      verticalAlignment(),
      wrapWords(engines, options),
      generateGlyphs(),
      bidiMirroring(),
      preprocessRuns(engines),
    );

    const processParagraphs = (paragraphs: AttributedString[]) =>
      paragraphs.map(processParagraph);

    return compose(
      finalizeFragments(engines, options),
      bidiReordering(),
      typesetter(engines, options, container),
      processParagraphs,
      splitParagraphs(),
      applyDefaultStyles(),
    )(attributedString);
  };
};

export default layoutEngine;
