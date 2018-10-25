const createCache = ({ limit = 100 } = {}) => {
  const cache = {};
  const keys = [];

  return {
    get: key => cache[key],
    set: (key, value) => {
      keys.push(key);
      if (keys.length > limit) {
        delete cache[keys.shift()];
      }
      cache[key] = value;
    },
    length: () => keys.length,
  };
};

export default createCache;
