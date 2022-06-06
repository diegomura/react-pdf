const pairs = values => {
  const result = [];

  for (let i = 0; i < values.length; i += 2) {
    result.push([values[i], values[i + 1]]);
  }

  return result;
};

/**
 * Parse svg-like points into number arrays
 *
 * @param {String} points string ex. "20,30 50,60"
 * @return {Array} points array ex. [[20, 30], [50, 60]]
 */
const parsePoints = points => {
  let values = (points || '')
    .trim()
    .replace(/,/g, ' ')
    .replace(/(\d)-(\d)/g, '$1 -$2')
    .split(/\s+/);

  if (values.length % 2 !== 0) {
    values = values.slice(0, -1);
  }

  values = values.map(parseFloat);

  return pairs(values);
};

export default parsePoints;
