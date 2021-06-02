import * as R from 'ramda';

/**
 * Create attributed string from text fragments
 *
 * @param  {Array}  fragments
 * @return {Object} attributed string
 */
const fromFragments = fragments => {
  let offset = 0;

  const getRuns = R.map(fragment => {
    const run = {
      ...fragment,
      start: offset,
      end: offset + fragment.string.length,
      attributes: fragment.attributes || {},
    };
    offset += fragment.string.length;

    return run;
  });

  return R.applySpec({
    runs: getRuns,
    string: R.o(R.join(''), R.pluck('string')),
  })(fragments);
};

export default fromFragments;
