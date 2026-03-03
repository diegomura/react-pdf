const createCache = <T>({ limit = 100 } = {}) => {
  let cache = new Map<string, T>();

  return {
    get: (key: string | null): T | undefined | null =>
      key ? cache.get(key) ?? undefined : null,
    set: (key: string, value: T) => {
      cache.delete(key);

      if (cache.size >= limit) {
        const firstKey = cache.keys().next().value as string;
        cache.delete(firstKey);
      }

      cache.set(key, value);
    },
    reset: () => {
      cache = new Map();
    },
    length: () => cache.size,
  };
};

export default createCache;
