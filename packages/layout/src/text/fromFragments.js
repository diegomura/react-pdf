/**
 * Create attributed string from text fragments
 *
 * @param {Object[]} fragments fragments
 * @returns {Object} attributed string
 */
const fromFragments = (fragments) => {
  let offset = 0;
  let string = '';
  const runs = [];

  fragments.forEach((fragment) => {
    string += fragment.string;

    runs.push({
      start: offset,
      end: offset + fragment.string.length,
      attributes: fragment.attributes || {},
    });

    offset += fragment.string.length;
  });

  return { string, runs };
};

export default fromFragments;
