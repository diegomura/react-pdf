import { GapStyle } from '../types';

type GapValue = GapStyle['gap'];

const expandGap = (key: 'gap', value: GapValue): GapStyle => {
  const match = `${value}`.split(' ');

  return {
    rowGap: match?.[0] || value,
    columnGap: match?.[1] || value,
  };
};

export default expandGap;
