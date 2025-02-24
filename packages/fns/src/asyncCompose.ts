/* eslint-disable no-await-in-loop */

type Fn = (arg: any, ...args: any[]) => Promise<any> | any;

type FirstFnParameterType<T extends Fn[]> = T extends [
  ...any,
  (arg: infer A, ...args: any[]) => Promise<any> | any,
]
  ? A
  : never;

type LastFnReturnType<T extends Fn[]> = T extends [
  (arg: any, ...args: any[]) => Promise<infer R> | infer R,
  ...any,
]
  ? R
  : never;
/**
 * Performs right-to-left function composition with async functions support
 *
 * @param fns - Functions
 * @returns Composed function
 */
const asyncCompose =
  <T extends Fn[]>(...fns: T) =>
  async (
    value: FirstFnParameterType<T>,
    ...args: Parameters<T[0]> extends [any, ...infer Rest] ? Rest : []
  ): Promise<LastFnReturnType<T>> => {
    let result = value;
    const reversedFns = fns.slice().reverse();

    for (let i = 0; i < reversedFns.length; i += 1) {
      const fn = reversedFns[i];
      result = await fn(result, ...args);
    }

    return result as LastFnReturnType<T>;
  };

export default asyncCompose;
