import { parseFloat } from '@react-pdf/fns';
import { Viewbox } from '../types';

const parseViewbox = (value?: string | Viewbox) => {
  if (!value) return null;
  if (typeof value !== 'string') return value;

  const values = value.split(/[,\s]+/).map(parseFloat);

  if (values.length !== 4) return null;

  return { minX: values[0], minY: values[1], maxX: values[2], maxY: values[3] };
};

export default parseViewbox;
