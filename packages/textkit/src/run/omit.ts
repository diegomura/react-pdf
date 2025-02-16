import { Attributes, Run } from '../types';

/**
 * Omit attribute from run
 *
 * @param value - Attribute key
 * @param run - Run
 * @returns Run without ommited attribute
 */
const omit = (value: keyof Attributes, run: Run): Run => {
  const attributes = Object.assign({}, run.attributes);

  delete attributes[value];

  return Object.assign({}, run, { attributes });
};

export default omit;
