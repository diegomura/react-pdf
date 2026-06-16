/**
 * Check if value is in a range group.
 * @param {number} value
 * @param {number[]} rangeGroup
 * @returns {boolean}
 */
function inRange(value, rangeGroup) {
  if (value < rangeGroup[0]) return false;
  let startRange = 0;
  let endRange = rangeGroup.length / 2;
  while (startRange <= endRange) {
    const middleRange = Math.floor((startRange + endRange) / 2);

    // actual array index
    const arrayIndex = middleRange * 2;

    // Check if value is in range pointed by actual index
    if (
      value >= rangeGroup[arrayIndex] &&
      value <= rangeGroup[arrayIndex + 1]
    ) {
      return true;
    }

    if (value > rangeGroup[arrayIndex + 1]) {
      // Search Right Side Of Array
      startRange = middleRange + 1;
    } else {
      // Search Left Side Of Array
      endRange = middleRange - 1;
    }
  }
  return false;
}

export { inRange };
