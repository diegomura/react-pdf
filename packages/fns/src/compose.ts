type Fn = (arg: any, ...args: any[]) => any;

type ComposedInput<T extends Fn[]> = T extends [
  ...any,
  (arg: infer A, ...args: any[]) => any,
]
  ? A
  : never;

type ComposedOutput<T extends Fn[]> = T extends [
  (arg: any, ...args: any[]) => infer R,
  ...any,
]
  ? R
  : never;

/**
 * Performs right-to-left function composition.
 * compose(f, g, h)(x) is equivalent to f(g(h(x)))
 *
 * @param fns - Functions to compose
 * @returns Composed function that applies functions from right to left
 */
const compose =
  <T extends Fn[]>(...fns: T) =>
  (value: ComposedInput<T>, ...args: any[]): ComposedOutput<T> => {
    let result: unknown = value;

    for (let i = fns.length - 1; i >= 0; i -= 1) {
      result = fns[i](result, ...args);
    }

    return result as ComposedOutput<T>;
  };

export default compose;
