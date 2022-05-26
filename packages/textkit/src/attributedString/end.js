import last from '../../../fns/last';

/**
 * Get attributed string end value
 *
 * @param  {Object}  attributed string
 * @return {number} end
 */
const end = attributedString => {
  const { runs } = attributedString;
  return runs.length === 0 ? 0 : last(runs).end;
};

export default end;
