const createCache = <T>({ limit = 100 } = {}) => {
  let cache: Record<string, T> = {};
  let keys: string[] = [];

  return {
    get: (key: string | null): T | null => (key ? cache[key] : null),
    set: (key: string, value: T) => {
      keys.push(key);
      if (keys.length > limit) {
        delete cache[keys.shift()!];
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
