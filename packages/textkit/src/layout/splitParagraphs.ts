import length from '../attributedString/length';
import slice from '../attributedString/slice';
import { AttributedString } from '../types';

/**
 * Breaks attributed string into paragraphs
 */
const splitParagraphs = () => {
  /**
   * @param attributedString - Attributed string
   * @returns Paragraphs attributed strings
   */
  return (attributedString: AttributedString) => {
    const paragraphs: AttributedString[] = [];

    let start = 0;
    let breakPoint = attributedString.string.indexOf('\n') + 1;

    while (breakPoint > 0) {
      paragraphs.push(slice(start, breakPoint, attributedString));
      start = breakPoint;
      breakPoint = attributedString.string.indexOf('\n', breakPoint) + 1;
    }

    if (start === 0) {
      paragraphs.push(attributedString);
    } else if (start < attributedString.string.length) {
      paragraphs.push(slice(start, length(attributedString), attributedString));
    }

    return paragraphs;
  };
};

export default splitParagraphs;
