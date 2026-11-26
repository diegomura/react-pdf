import type {
  AvailableSpace,
  MeasureFunction as TaffyMeasureFunction,
  Size,
} from 'taffy-layout';

/**
 * Sizing constraint for one axis, in the vocabulary the measure functions
 * were written against.
 */
export enum MeasureMode {
  /** No constraint: `width` is `Infinity` (max-content) or `0` (min-content) */
  Undefined = 0,
  /** The axis is already decided; `width` is its final size */
  Exactly = 1,
  /** Free to shrink-wrap up to `width` */
  AtMost = 2,
}

export type MeasureFunction = (
  width: number,
  widthMode: MeasureMode,
  height: number,
  heightMode: MeasureMode,
) => { width?: number; height?: number };

/** Content measure callback as stored in a Taffy node's context */
export type NodeMeasure = (
  known: Size<number | undefined>,
  available: Size<AvailableSpace>,
) => Size<number>;

const constraint = (
  known: number | undefined,
  available: AvailableSpace,
): [number, MeasureMode] => {
  if (known !== undefined) return [known, MeasureMode.Exactly];
  if (typeof available === 'number') return [available, MeasureMode.AtMost];
  return [available === 'min-content' ? 0 : Infinity, MeasureMode.Undefined];
};

const finite = (value?: number) => (Number.isFinite(value) ? value! : 0);

/**
 * Adapt a measure function to Taffy's `(knownDimensions, availableSpace)`
 * calling convention.
 */
export const toNodeMeasure =
  (measure: MeasureFunction): NodeMeasure =>
  (known, available) => {
    const [width, widthMode] = constraint(known.width, available.width);
    const [height, heightMode] = constraint(known.height, available.height);
    const size = measure(width, widthMode, height, heightMode);

    return { width: finite(size.width), height: finite(size.height) };
  };

const ZERO: Size<number> = { width: 0, height: 0 };

/**
 * Build the single measure callback Taffy expects for a `computeLayout`
 * call. Each leaf carries its own `NodeMeasure` as node context. Errors
 * thrown by a measure function are captured and rethrown by `rethrow`,
 * because the binding would otherwise swallow them as a zero size.
 */
export const createMeasureDispatch = () => {
  let error: unknown;

  const dispatch: TaffyMeasureFunction = (
    known,
    available,
    _node,
    context,
    style,
  ) => {
    style.free();

    if (error || typeof context !== 'function') return ZERO;

    try {
      return (context as NodeMeasure)(known, available);
    } catch (e) {
      error = e;
      return ZERO;
    }
  };

  const rethrow = () => {
    if (error) throw error;
  };

  return { dispatch, rethrow };
};
