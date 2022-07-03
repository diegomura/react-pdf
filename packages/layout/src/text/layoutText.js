import layoutEngine, {
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  textDecoration,
} from '@react-pdf/textkit';

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

const getMaxLines = node => node.style?.maxLines;

const getTextOverflow = node => node.style?.textOverflow;

/**
 * Get layout container for specific text node
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Object} node
 * @returns {Object} layout container
 */
const getContainer = (width, height, node, excludeRects) => {
  const maxLines = getMaxLines(node);
  const textOverflow = getTextOverflow(node);

  return {
    x: 0,
    y: 0,
    width,
    maxLines,
    excludeRects,
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
const getLayoutOptions = (fontStore, node) => ({
  hyphenationPenalty: node.props.hyphenationPenalty,
  shrinkWhitespaceFactor: { before: -0.5, after: -0.5 },
  hyphenationCallback:
    node.props.hyphenationCallback ||
    fontStore?.getHyphenationCallback() ||
    null,
});

/**
 * Get text lines for given node
 *
 * @param {Object} node
 * @param {Number} container width
 * @param {Number} container height
 * @param {Number} fontStore font store
 * @returns {Array} layout lines
 */
const layoutText = (node, width, height, fontStore, excludeRects) => {
  const attributedString = getAttributedString(fontStore, node);
  const container = getContainer(width, height, node, excludeRects);
  const options = getLayoutOptions(fontStore, node);
  const lines = engine(attributedString, container, options);

  return lines.reduce((acc, line) => [...acc, ...line], []);
};

export default layoutText;
