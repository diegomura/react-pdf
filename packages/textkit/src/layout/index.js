import * as R from 'ramda';

import wrapWords from './wrapWords';
import typesetter from './typesetter';
import generateGlyphs from './generateGlyphs';
import resolveYOffset from './resolveYOffset';
import preprocessRuns from './preprocessRuns';
import splitParagraphs from './splitParagraphs';
import finalizeFragments from './finalizeFragments';
import resolveAttachments from './resolveAttachments';
import applyDefaultStyles from './applyDefaultStyles';

/**
 * A LayoutEngine is the main object that performs text layout.
 * It accepts an AttributedString and a Container object
 * to layout text into, and uses several helper objects to perform
 * various layout tasks. These objects can be overridden to customize
 * layout behavior.
 *
 * @param  {Object}  engines
 * @param  {Object}  attributted string
 * @param  {Object}  container rect
 * @param  {Object}  layout options
 * @return {Array} paragraph blocks
 */
const layoutEngine = (engines, attributedString, container, options = {}) => {
  const processParagraphs = R.compose(
    resolveYOffset(engines, options),
    resolveAttachments(engines, options),
    generateGlyphs(engines, options),
    wrapWords(engines, options),
  );

  return R.compose(
    finalizeFragments(engines, options),
    typesetter(engines, options, container),
    R.map(processParagraphs),
    splitParagraphs(engines, options),
    preprocessRuns(engines, options),
    applyDefaultStyles(engines, options),
  )(attributedString);
};

export default R.curryN(3, layoutEngine);
