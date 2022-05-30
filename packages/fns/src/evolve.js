const evolve = (transformations, object) => {
  const result = object instanceof Array ? [] : {};
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];
    const transformation = transformations[key];
    const type = typeof transformation;

    if (type === 'function') {
      result[key] = transformation(object[key]);
    } else if (transformation && type === 'object') {
      result[key] = evolve(transformation, object[key]);
    } else result[key] = object[key];
  }

  return result;
};

export default evolve;
