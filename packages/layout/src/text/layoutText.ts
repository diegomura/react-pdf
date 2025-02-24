import layoutEngine, {
  bidi,
  linebreaker,
  justification,
  scriptItemizer,
  wordHyphenation,
  textDecoration,
} from '@react-pdf/textkit';
import FontStore from '@react-pdf/font';

import fontSubstitution from './fontSubstitution';
import getAttributedString from './getAttributedString';
import { SafeTextNode } from '../types';

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

const getMaxLines = (node) => node.style?.maxLines;

const getTextOverflow = (node) => node.style?.textOverflow;

/**
 * Get layout container for specific text node
 *
 * @param {number} width
 * @param {number} height
 * @param {Object} node
 * @returns {Object} layout container
 */
const getContainer = (width, height, node) => {
  const maxLines = getMaxLines(node);
  const textOverflow = getTextOverflow(node);

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
 * @param node - Node
 * @param width - Container width
 * @param height - Container height
 * @param fontStore - Font store
 * @returns Layout lines
 */
const layoutText = (
  node: SafeTextNode,
  width: number,
  height: number,
  fontStore: FontStore,
) => {
  const attributedString = getAttributedString(fontStore, node);
  const container = getContainer(width, height, node);
  const options = getLayoutOptions(fontStore, node);
  const lines = engine(attributedString, container, options);

  return lines.reduce((acc, line) => [...acc, ...line], []);
};

export default layoutText;
