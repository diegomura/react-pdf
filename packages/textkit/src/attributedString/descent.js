import runDescent from '../run/descent';

/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 */

/**
 * Returns attributed string descent
 *
 * @param {AttributedString} attributedString attributed string
 * @returns {number} descent
 */
const descent = (attributedString) => {
  const reducer = (acc, run) => Math.min(acc, runDescent(run));
  return attributedString.runs.reduce(reducer, 0);
};

export default descent;
