/**
 * Create attributed string from text fragments
 *
 * @param  {Array}  fragments
 * @return {Object} attributed string
 */
const fromFragments = fragments => {
  let offset = 0;
  const strings = [];
  const runs = [];

  fragments.forEach(fragment => {
    strings.push(fragment.string);

    runs.push({
      start: offset,
      end: offset + fragment.string.length,
      attributes: fragment.attributes || {},
    });

    offset += fragment.string.length;
  });

  return { string: ''.concat(...strings), runs };
};

export default fromFragments;
