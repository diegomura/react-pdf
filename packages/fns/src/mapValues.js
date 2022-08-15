const mapValues = (object, fn) => {
  const entries = Object.entries(object);

  return entries.reduce((acc, [key, value], index) => {
    acc[key] = fn(value, key, index);
    return acc;
  }, {});
};

export default mapValues;
