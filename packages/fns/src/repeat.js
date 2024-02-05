const repeat = (list, length = 0) => {
  const result = new Array(length);
  for (let i = 0; i < length; i += 1) {
    result[i] = list;
  }
  return result;
};

export default repeat;
