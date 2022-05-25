import capitalize from '../../../fns/capitalize';
import upperFirst from '../../../fns/upperFirst';

/**
 * Apply transformation to text string
 *
 * @param {String} text
 * @param {String} transformation type
 * @returns {String} transformed text
 */
const transformText = (text, transformation) => {
  switch (transformation) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return capitalize(text);
    case 'upperfirst':
      return upperFirst(text);
    default:
      return text;
  }
};

export default transformText;
