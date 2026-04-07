/* eslint-disable no-await-in-loop */

type Fn = (arg: any, ...args: any[]) => Promise<any> | any;

type ComposedInput<T extends Fn[]> = T extends [
  ...any,
  (arg: infer A, ...args: any[]) => Promise<any> | any,
]
  ? A
  : never;

type ComposedOutput<T extends Fn[]> = T extends [
  (arg: any, ...args: any[]) => Promise<infer R> | infer R,
  ...any,
]
  ? R
  : never;

/**
 * Performs right-to-left function composition with async functions support.
 * asyncCompose(f, g, h)(x) is equivalent to f(g(h(x))), awaiting each result.
 *
 * @param fns - Functions to compose (can be sync or async)
 * @returns Composed async function that applies functions from right to left
 */
const asyncCompose =
  <T extends Fn[]>(...fns: T) =>
  async (
    value: ComposedInput<T>,
    ...args: Parameters<T[0]> extends [any, ...infer Rest] ? Rest : []
  ): Promise<ComposedOutput<T>> => {
    let result = value;

    for (let i = fns.length - 1; i >= 0; i -= 1) {
      result = await fns[i](result, ...args);
    }

    return result as ComposedOutput<T>;
  };

export default asyncCompose;
