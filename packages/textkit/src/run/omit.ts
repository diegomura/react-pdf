import { Attributes, Run } from '../types';

/**
 * Omit attribute from run
 *
 * @param value - Attribute key
 * @param run - Run
 * @returns Run without omitted attribute
 */
const omit = (value: keyof Attributes, run: Run): Run => {
  if (!(value in run.attributes)) return run;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [value]: _omitted, ...rest } = run.attributes;

  return { ...run, attributes: rest };
};

export default omit;
