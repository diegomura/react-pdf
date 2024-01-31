/**
 * @typedef {import('../types.js').AttributedString} AttributedString
 * @typedef {import('../types.js').Fragment} Fragment
 */

/**
 * Create attributed string from text fragments
 *
 * @param {Fragment[]} fragments fragments
 * @returns {AttributedString} attributed string
 */
function fromFragments(fragments) {
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
}

export default fromFragments;
