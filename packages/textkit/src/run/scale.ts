import { Run } from '../types';

/**
 * Calculate run scale
 *
 * @param run - Run
 * @returns Scale
 */
const calculateScale = (run: Run) => {
  const attributes = run.attributes || {};
  const fontSize = attributes.fontSize || 12;
  const font = attributes.font;
  const unitsPerEm = typeof font === 'string' ? null : font?.unitsPerEm;

  return unitsPerEm ? fontSize / unitsPerEm : 0;
};

/**
 * Get run scale
 *
 * @param  run
 * @returns Scale
 */
const scale = (run: Run) => {
  return run.attributes?.scale || calculateScale(run);
};

export default scale;
