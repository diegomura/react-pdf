import slice from './slice';

/**
 * Drop last char of run
 *
 * @param {Object} run
 * @returns {Object} run without last char
 */
const dropLast = (run) => slice(0, run.end - run.start - 1, run);

export default dropLast;
