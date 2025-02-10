/**
 * Repeats an element a specified number of times.
 *
 * @template T
 * @param element - Element to be repeated
 * @param length - Number of times to repeat element
 * @returns Repeated elements
 */
const repeat = <T = any>(element: T, length: number = 0): T[] => {
  const result = new Array(length);
  for (let i = 0; i < length; i += 1) {
    result[i] = element;
  }
  return result;
};

export default repeat;
