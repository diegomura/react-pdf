/**
 * This decorator caches the results of a getter or method such that
 * the results are lazily computed once, and then cached.
 * @private
 */
export function cache(target, key, descriptor) {
  if (descriptor.get) {
    let get = descriptor.get;
    descriptor.get = function() {
      let value = get.call(this);
      Object.defineProperty(this, key, { value });
      return value;
    };
  } else if (typeof descriptor.value === 'function') {
    let fn = descriptor.value;

    return {
      get() {
        let cache = new Map;
        function memoized(...args) {
          let key = args.length > 0 ? args[0] : 'value';
          if (cache.has(key)) {
            return cache.get(key);
          }

          let result = fn.apply(this, args);
          cache.set(key, result);
          return result;
        };

        Object.defineProperty(this, key, {value: memoized});
        return memoized;
      }
    };
  }
}
