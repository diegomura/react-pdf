/**
 * Get run font
 *
 * @param  {Object}  run
 * @return {Object} font
 */
const getFont = run => run.attributes?.font || null;

export default getFont;
