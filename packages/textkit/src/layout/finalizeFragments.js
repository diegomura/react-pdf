import advanceWidth from '../attributedString/advanceWidth';
import leadingOffset from '../attributedString/leadingOffset';
import trailingOffset from '../attributedString/trailingOffset';
import dropLast from '../attributedString/dropLast';
import last from '../../../fns/last';
import compose from '../../../fns/compose';

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

/**
 * Remove new line char at the end of line if present
 *
 * @param  {Object}  line
 * @return {Object} line
 */
const removeNewLine = line => {
  return last(line.string) === '\n' ? dropLast(line) : line;
};

const getOverflowLeft = line => {
  return leadingOffset(line) + (line.overflowLeft || 0);
};

const getOverflowRight = line => {
  return trailingOffset(line) + (line.overflowRight || 0);
};

/**
 * Ignore whitespace at the start and end of a line for alignment
 *
 * @param  {Object}  line
 * @return {Object} line
 */
const adjustOverflow = line => {
  const overflowLeft = getOverflowLeft(line);
  const overflowRight = getOverflowRight(line);

  const x = line.box.x - overflowLeft;
  const width = line.box.width + overflowLeft + overflowRight;
  const box = Object.assign({}, line.box, { x, width });

  return Object.assign({}, line, { box, overflowLeft, overflowRight });
};

/**
 * Performs line justification by calling appropiate engine
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {string}  text align
 * @param  {Object}  line
 * @return {Object} line
 */
const justifyLine = (engines, options, align) => line => {
  const lineWidth = advanceWidth(line);
  const alignFactor = ALIGNMENT_FACTORS[align] || 0;
  const remainingWidth = Math.max(0, line.box.width - lineWidth);
  const shouldJustify = align === 'justify' || lineWidth > line.box.width;

  const x = line.box.x + remainingWidth * alignFactor;
  const box = Object.assign({}, line.box, { x });
  const newLine = Object.assign({}, line, { box });

  return shouldJustify ? engines.justification(options)(newLine) : newLine;
};

/**
 * Finalize line by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  line
 * @param  {number}  line index
 * @param  {Array}  total lines
 * @return {Object} line
 */
const finalizeBlock = (engines = {}, options) => (line, i, lines) => {
  const isLastFragment = i === lines.length - 1;
  const style = line.runs?.[0]?.attributes || {};
  const align = isLastFragment ? style.alignLastLine : style.align;

  return compose(
    engines.textDecoration(options),
    justifyLine(engines, options, align),
    adjustOverflow,
    removeNewLine,
  )(line);
};

/**
 * Finalize line block by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Array}  line blocks
 * @return {Array} line blocks
 */
const finalizeFragments = (engines, options) => blocks => {
  const blockFinalizer = finalizeBlock(engines, options);
  return blocks.map(block => block.map(blockFinalizer));
};

export default finalizeFragments;
