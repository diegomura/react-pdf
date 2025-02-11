const createCache = <T>({ limit = 100 } = {}) => {
  let cache: Record<string, T> = {};
  let keys = [];

  return {
    get: (key: string): T | undefined => cache[key],
    set: (key: string, value: T) => {
      keys.push(key);
      if (keys.length > limit) {
        delete cache[keys.shift()];
      }
      cache[key] = value;
    },
    reset: () => {
      cache = {};
      keys = [];
    },
    length: () => keys.length,
  };
};

export default createCache;
