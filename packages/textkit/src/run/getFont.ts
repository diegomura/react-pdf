import { Run } from '../types';

/**
 * Get run font
 *
 * @param run - Run
 * @returns Font
 */
const getFont = (run: Run) => {
  return run.attributes?.font || null;
};

export default getFont;
