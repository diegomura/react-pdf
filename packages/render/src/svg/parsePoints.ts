const pairs = <T>(values: T[]): T[][] => {
  const result = [];

  for (let i = 0; i < values.length; i += 2) {
    result.push([values[i], values[i + 1]]);
  }

  return result;
};

/**
 * Parse svg-like points into number arrays
 *
 * @param points string ex. "20,30 50,60"
 * @returns points array ex. [[20, 30], [50, 60]]
 */
const parsePoints = (points: string | null) => {
  let values = (points || '')
    .trim()
    .replace(/,/g, ' ')
    .replace(/(\d)-(\d)/g, '$1 -$2')
    .split(/\s+/);

  if (values.length % 2 !== 0) {
    values = values.slice(0, -1);
  }

  const mappedValues = values.map(parseFloat);

  return pairs(mappedValues);
};

export default parsePoints;
