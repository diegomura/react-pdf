const splitPage = (words, availableHeight, getHeight) => {
  let minIndex = 0;
  let maxIndex = words.length;
  let currentIndex;
  let currentElement;
  let result;

  while (minIndex <= maxIndex) {
    currentIndex = ((minIndex + maxIndex) / 2) | 0;
    currentElement = getHeight(words.slice(0, currentIndex).join(' '));

    if (currentElement < availableHeight) {
      result = currentIndex;
      minIndex = currentIndex + 1;
    } else if (currentElement >= availableHeight) {
      maxIndex = currentIndex - 1;
    }
  }

  return result || 1;
};

export const chunkStringIntoPages = (string, availableHeight, getHeight) => {
  const results = [];
  const words = string.split(' ');

  while (words.length > 0) {
    const pageIndex = splitPage(words, availableHeight, getHeight);
    results.push(words.splice(0, pageIndex).join(' '));
  }
  return results;
};
