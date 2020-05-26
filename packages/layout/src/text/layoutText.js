import * as R from 'ramda';
import layoutEngine from '@react-pdf/textkit/layout';
import linebreaker from '@react-pdf/textkit/engines/linebreaker';
import justification from '@react-pdf/textkit/engines/justification';
import textDecoration from '@react-pdf/textkit/engines/textDecoration';
import scriptItemizer from '@react-pdf/textkit/engines/scriptItemizer';
import wordHyphenation from '@react-pdf/textkit/engines/wordHyphenation';

import Font from '../font';
import fontSubstitution from './fontSubstitution';
import getAttributedString from './getAttributedString';

const engines = {
  linebreaker,
  justification,
  textDecoration,
  scriptItemizer,
  wordHyphenation,
  fontSubstitution,
};

const engine = layoutEngine(engines);

/**
 * Get layout container for specific text node
 *
 * @param {Object} node
 * @param {Number} width
 * @param {Number} height
 * @returns {Object} layout container
 */
const getContainer = (node, width, height) => {
  const maxLines = R.path(['style', 'maxLines'], node);
  const textOverflow = R.path(['style', 'textOverflow'], node);

  return {
    x: 0,
    y: 0,
    width,
    maxLines,
    height: height || Infinity,
    truncateMode: textOverflow,
  };
};

/**
 * Get text layout options for specific text node
 *
 * @param {Object} node instance
 * @returns {Object} layout options
 */
const getLayoutOptions = node => ({
  hyphenationPenalty: node.props.hyphenationPenalty,
  hyphenationCallback: Font.getHyphenationCallback(),
  shrinkWhitespaceFactor: { before: -0.5, after: -0.5 },
});

/**
 * Get text lines for given node
 *
 * @param {Object} node
 * @param {Number} container width
 * @param {Number} container height
 * @returns {Array} layout lines
 */
const layoutText = R.compose(
  R.reduce(R.concat, []),
  R.converge(engine, [getAttributedString, getContainer, getLayoutOptions]),
);

export default layoutText;
