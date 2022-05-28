const adjust = (index, fn, collection) => {
  if (index >= 0 && index >= collection.length) return collection;
  if (index < 0 && Math.abs(index) > collection.length) return collection;

  const i = index < 0 ? collection.length + index : index;

  return Object.assign([], collection, { [i]: fn(collection[i]) });
};

export default adjust;
