import { matchPercent } from '@react-pdf/fns';
import { ExpandedStyle } from '../types';

const processLineHeight = (value: number | string, styles: ExpandedStyle) => {
  if (value === '') return value;

  const fontSize = (styles.fontSize || 18) as number;

  // Percent values: use this number multiplied by the element's font size
  const { percent } = matchPercent(value) || {};
  if (percent) return percent * fontSize;

  // Unitless values: use this number multiplied by the element's font size
  // @ts-ignore
  return isNaN(value) ? value : value * fontSize;
};

export default processLineHeight;
