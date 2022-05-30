const pick = (keys, obj) => {
  const result = {};

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i];

    if (key in obj) result[key] = obj[key];
  }

  return result;
};

export default pick;
