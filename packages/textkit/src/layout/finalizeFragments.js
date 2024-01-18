import { last, compose } from '@react-pdf/fns';

import runHeight from '../run/height';
import runAscent from '../run/ascent';
import runDescent from '../run/descent';
import runAdvanceWidth from '../run/advanceWidth';
import advanceWidth from '../attributedString/advanceWidth';
import leadingOffset from '../attributedString/leadingOffset';
import trailingOffset from '../attributedString/trailingOffset';
import dropLast from '../attributedString/dropLast';

const ALIGNMENT_FACTORS = { center: 0.5, right: 1 };

/**
 * Remove new line char at the end of line if present
 *
 * @param {Object}  line
 * @returns {Object} line
 */
const removeNewLine = (line) => {
  return last(line.string) === '\n' ? dropLast(line) : line;
};

const getOverflowLeft = (line) => {
  return leadingOffset(line) + (line.overflowLeft || 0);
};

const getOverflowRight = (line) => {
  return trailingOffset(line) + (line.overflowRight || 0);
};

/**
 * Ignore whitespace at the start and end of a line for alignment
 *
 * @param {Object}  line
 * @returns {Object} line
 */
const adjustOverflow = (line) => {
  const overflowLeft = getOverflowLeft(line);
  const overflowRight = getOverflowRight(line);

  const x = line.box.x - overflowLeft;
  const width = line.box.width + overflowLeft + overflowRight;
  const box = Object.assign({}, line.box, { x, width });

  return Object.assign({}, line, { box, overflowLeft, overflowRight });
};

/**
 * @typedef {Function} JustifyLine
 * @param {Object} line
 * @returns {Object} line
 */

/**
 * Performs line justification by calling appropiate engine
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @param {string} align text align
 * @returns {JustifyLine} justifyLine
 */
const justifyLine = (engines, options, align) => (line) => {
  const lineWidth = advanceWidth(line);
  const alignFactor = ALIGNMENT_FACTORS[align] || 0;
  const remainingWidth = Math.max(0, line.box.width - lineWidth);
  const shouldJustify = align === 'justify' || lineWidth > line.box.width;

  const x = line.box.x + remainingWidth * alignFactor;
  const box = Object.assign({}, line.box, { x });
  const newLine = Object.assign({}, line, { box });

  return shouldJustify ? engines.justification(options)(newLine) : newLine;
};

const finalizeLine = (line) => {
  let lineAscent = 0;
  let lineDescent = 0;
  let lineHeight = 0;
  let lineXAdvance = 0;

  const runs = line.runs.map((run) => {
    const height = runHeight(run);
    const ascent = runAscent(run);
    const descent = runDescent(run);
    const xAdvance = runAdvanceWidth(run);

    lineHeight = Math.max(lineHeight, height);
    lineAscent = Math.max(lineAscent, ascent);
    lineDescent = Math.max(lineDescent, descent);
    lineXAdvance += xAdvance;

    return Object.assign({}, run, { height, ascent, descent, xAdvance });
  });

  return Object.assign({}, line, {
    runs,
    height: lineHeight,
    ascent: lineAscent,
    descent: lineDescent,
    xAdvance: lineXAdvance,
  });
};

/**
 * @typedef {Function} FinalizeBlock
 * @param {Object} line
 * @param {number} i line index
 * @param {Object[]} lines total lines
 * @returns {Object} line
 */

/**
 * Finalize line by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @returns {FinalizeBlock} finalize block
 */
const finalizeBlock =
  (engines = {}, options) =>
  (line, i, lines) => {
    const isLastFragment = i === lines.length - 1;
    const style = line.runs?.[0]?.attributes || {};
    const align = isLastFragment ? style.alignLastLine : style.align;

    return compose(
      finalizeLine,
      engines.textDecoration(options),
      justifyLine(engines, options, align),
      adjustOverflow,
      removeNewLine,
    )(line);
  };

/**
 * @typedef {Function} FinalizeFragments
 * @param {Object[]} blocks line blocks
 * @returns {Object[]} blocks
 */

/**
 * Finalize line block by performing line justification
 * and text decoration (using appropiate engines)
 *
 * @param {Object} engines engines
 * @param {Object} options layout options
 * @returns {FinalizeFragments} finalizeFragments
 */
const finalizeFragments = (engines, options) => (blocks) => {
  const blockFinalizer = finalizeBlock(engines, options);
  return blocks.map((block) => block.map(blockFinalizer));
};

export default finalizeFragments;
