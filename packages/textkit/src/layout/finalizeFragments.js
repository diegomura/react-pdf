import { last, compose } from '@nutshelllabs/fns';

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
  line.box.x = x;
  line.box.width = width;
  line.overflowLeft = overflowLeft;
  line.overflowRight = overflowRight;

  return line;
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
  line.box.x = x;

  return shouldJustify ? engines.justification(options)(line) : line;
};

const finalizeLine = line => {
  let lineAscent = 0;
  let lineDescent = 0;
  let lineHeight = 0;
  let lineXAdvance = 0;

  line.runs.forEach(run => {
    const height = runHeight(run);
    const ascent = runAscent(run);
    const descent = runDescent(run);
    const xAdvance = runAdvanceWidth(run);

    lineHeight = Math.max(lineHeight, height);
    lineAscent = Math.max(lineAscent, ascent);
    lineDescent = Math.max(lineDescent, descent);
    lineXAdvance += xAdvance;

    run.height = height;
    run.ascent = ascent;
    run.descent = descent;
    run.xAdvance = xAdvance;
  });

  line.height = lineHeight;
  line.ascent = lineAscent;
  line.descent = lineDescent;
  line.xAdvance = lineXAdvance;
  return line;
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
    finalizeLine,
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
