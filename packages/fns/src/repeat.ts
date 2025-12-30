/**
 * Repeats an element a specified number of times.
 *
 * @example
 * repeat('a', 3) // => ['a', 'a', 'a']
 * repeat(0, 4)   // => [0, 0, 0, 0]
 * repeat('x')    // => []
 *
 * @param element - Element to be repeated
 * @param length - Number of times to repeat element (default: 0)
 * @returns Array with the element repeated
 */
const repeat = <T>(element: T, length: number = 0): T[] => {
  const result = new Array<T>(length);

  for (let i = 0; i < length; i += 1) {
    result[i] = element;
  }

  return result;
};

export default repeat;
