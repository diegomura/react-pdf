import { castFloat } from './utils';

const flexDefaults = [1, 1, 0];

const processFlex = (key, value) => {
  const matches = `${value}`.split(' ');

  const flexGrow = castFloat(matches[0] || flexDefaults[0]);
  const flexShrink = castFloat(matches[1] || flexDefaults[1]);
  const flexBasis = castFloat(matches[2] || flexDefaults[2]);

  return { flexGrow, flexShrink, flexBasis };
};

export default processFlex;
