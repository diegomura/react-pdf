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

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Rect} Rect
 */

/**
 * A LayoutEngine is the main object that performs text layout.
 * It accepts an AttributedString and a Container object
 * to layout text into, and uses several helper objects to perform
 * various layout tasks. These objects can be overridden to customize
 * layout behavior.
 *
 * @param {Object} engines engines
 */
const layoutEngine = (engines) => {
  /**
   * @param {AttributedString} attributedString attributed string
   * @param {Rect} container container rect
   * @param {Object} options layout options
   * @returns {Object[]} paragraph blocks
   */
  return (attributedString, container, options = {}) => {
    const processParagraph = compose(
      resolveYOffset(),
      resolveAttachments(),
      verticalAlignment(),
      wrapWords(engines, options),
      generateGlyphs(),
      bidiMirroring(),
      preprocessRuns(engines, options),
    );

    const processParagraphs = (paragraphs) => paragraphs.map(processParagraph);

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
