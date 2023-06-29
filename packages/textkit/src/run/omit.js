/**
 * Omit attribute from run
 *
 * @param  {Object}  run
 * @return {Object} run without ommited attribute
 */
const omit = (value, run) => {
  delete run.attributes[value];
  return run;
};

export default omit;
