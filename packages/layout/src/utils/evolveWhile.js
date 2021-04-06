const evolveWhile = (condition, processor) => async value => {
  let currentValue = value;

  while (condition(currentValue)) {
    currentValue = await processor(currentValue);
  }

  return currentValue;
};

export default evolveWhile;
