/**
 * Returns new array starting with zero, keeping the same relation between consecutive values.
 *
 * @param array - List of numbers
 * @returns Normalized array starting at zero
 */
const normalize = (array: number[]): number[] => {
  if (array.length === 0) return [];
  const offset = array[0];
  return array.map((value) => value - offset);
};

export default normalize;
