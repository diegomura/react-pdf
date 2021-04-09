import length from '../attributedString/length';
import slice from '../attributedString/slice';

/**
 * Breaks attributed string into paragraphs
 *
 * @param  {Object}  engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Array} attributed string array
 */
const splitParagraphs = () => attributedString => {
  const res = [];

  let start = 0;
  let breakPoint = attributedString.string.indexOf('\n') + 1;

  while (breakPoint > 0) {
    res.push(slice(start, breakPoint, attributedString));
    start = breakPoint;
    breakPoint = attributedString.string.indexOf('\n', breakPoint) + 1;
  }

  if (start === 0) {
    res.push(attributedString);
  } else if (start < attributedString.string.length) {
    res.push(slice(start, length(attributedString), attributedString));
  }

  return res;
};

export default splitParagraphs;
