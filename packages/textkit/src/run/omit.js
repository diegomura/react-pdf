/**
 * Omit attribute from run
 *
 * @param  {Object}  run
 * @return {Object} run without ommited attribute
 */
const omit = (value, run) => {
  const newAttributes = {...run.attributes};
  delete newAttributes[value];
  return {...run, attributes: newAttributes};
};

export default omit;
