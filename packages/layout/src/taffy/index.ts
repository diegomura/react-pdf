import { loadTaffy as taffyLoad } from 'taffy-layout';

let instancePromise: Promise<unknown> | undefined;

/**
 * Compile and instantiate the Taffy WASM module once per process.
 * After this resolves, `TaffyTree` and `Style` from `taffy-layout` are usable.
 */
export const loadTaffy = async (): Promise<void> => {
  await (instancePromise ??= taffyLoad());
};
