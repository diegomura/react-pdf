/* eslint-disable no-restricted-globals */

import { matchPercent } from '@react-pdf/fns';

const processLineHeight = (value, styles) => {
  if (value === '') return value;

  const { fontSize = 18 } = styles;

  // Percent values: use this number multiplied by the element's font size
  const { percent } = matchPercent(value) || {};
  if (percent) return percent * fontSize;

  // Unitless values: use this number multiplied by the element's font size
  return isNaN(value) ? value : value * fontSize;
};

export default processLineHeight;
