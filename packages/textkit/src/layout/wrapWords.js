/**
 * Wrap words of attribute string
 *
 * @param  {Object} layout engines
 * @param  {Object}  layout options
 * @param  {Object}  attributed string
 * @return {Object} attributed string including syllables
 */
const wrapWords = () => attributedString => {
  const syllables = [];

  attributedString.string
    .split(/([ ]+)/g)
    .filter(Boolean)
    .forEach(w => syllables.push(w));

  attributedString.syllables = syllables;
  return attributedString;
};

export default wrapWords;
