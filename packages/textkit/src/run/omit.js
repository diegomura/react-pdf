/**
 * Omit attribute from run
 *
 * @param  {Object}  run
 * @return {Object} run without ommited attribute
 */
const omit = (value, run) => {
  const attributes = Object.assign({}, run.attributes);

  delete attributes[value];

  return Object.assign({}, run, { attributes });
};

export default omit;
