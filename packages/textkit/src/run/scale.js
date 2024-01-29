/**
 * Calculate run scale
 *
 * @param {Object}  run
 * @returns {number} scale
 */
const calculateScale = (run) => {
  const attributes = run.attributes || {};
  const fontSize = attributes.fontSize || 12;
  const unitsPerEm = attributes.font?.unitsPerEm;

  return unitsPerEm ? fontSize / unitsPerEm : 0;
};

/**
 * Get run scale
 *
 * @param {Object}  run
 * @returns {number} scale
 */
const scale = (run) => {
  return run.attributes?.scale || calculateScale(run);
};

export default scale;
