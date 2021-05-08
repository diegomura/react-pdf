import { castFloat } from './utils';

const processFlex = (key, value) => {
  const matches = value.split(' ');

  const flexGrow = castFloat(matches[0] || value);
  const flexShrink = castFloat(matches[1] || value);
  const flexBasis = castFloat(matches[2] || value);

  return { flexGrow, flexShrink, flexBasis };
};

export default processFlex;
