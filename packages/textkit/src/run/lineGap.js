import scale from './scale';

/**
 * Get run lineGap
 *
 * @param  {Object}  run
 * @return {number} lineGap
 */
const lineGap = run => {
  return (run.attributes?.font?.lineGap || 0) * scale(run);
};

export default lineGap;
