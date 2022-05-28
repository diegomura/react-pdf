const omit = (key, object) => {
  const copy = Object.assign({}, object);

  delete copy[key];

  return copy;
};

export default omit;
