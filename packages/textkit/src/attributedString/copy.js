import copyRun from '../run/copy';

/**
 * Deep clone attributed string
 *
 * @param  {Object}  attributed string
 * @return {Object} cloned attributed string
 */
const copy = attributeString => {
  const runs = attributeString.runs.map(copyRun);
  return Object.assign({}, attributeString, { runs });
};

export default copy;
