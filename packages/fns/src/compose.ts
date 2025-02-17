type Fn = (arg: any, ...args: any[]) => any;

type FirstFnParameterType<T extends Fn[]> = T extends [
  ...any,
  (arg: infer A, ...args: any[]) => any,
]
  ? A
  : never;

type LastFnReturnType<T extends Fn[]> = T extends [
  (arg: any, ...args: any[]) => infer R,
  ...any,
]
  ? R
  : never;

/**
 * Performs right-to-left function composition
 *
 * @param fns - Functions
 * @returns Composed function
 */
const compose =
  <T extends Fn[]>(...fns: T) =>
  (value: FirstFnParameterType<T>, ...args: any[]): LastFnReturnType<T> => {
    let result: unknown = value;

    const reversedFns = fns.slice().reverse();

    for (let i = 0; i < reversedFns.length; i += 1) {
      const fn = reversedFns[i];
      result = fn(result, ...args);
    }

    return result as LastFnReturnType<T>;
  };

export default compose;
