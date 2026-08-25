const PT_PER_PX = 1;
const PT_PER_REM = 12;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type ExtendableDeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? ExtendableDeepPartial<T[P]> : T[P];
} & Record<string, unknown>;

export function round(value: number) {
  return Math.round(value * 1e6) / 1e6;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// Scales merge one level deep so a config that overrides a single key
// (spacing.4, colors.gray.500) keeps the rest of the default scale. Arrays and
// functions are values, not scales, so they replace rather than merge.
export function mergeScales(
  base: Record<string, unknown>,
  overrides: Record<string, unknown>,
) {
  const merged: Record<string, unknown> = { ...base };

  for (const [key, value] of Object.entries(overrides)) {
    const baseValue = base[key];

    merged[key] =
      isPlainObject(baseValue) && isPlainObject(value)
        ? { ...baseValue, ...value }
        : value;
  }

  return merged;
}

export function isNumeric(value: string) {
  if (value.startsWith('.')) {
    value = `0${value}`;
  }
  return Number(value).toString() === value;
}

export function capitalize(string: string) {
  return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;
}

export function rem(value: number, ptPerRem: number = PT_PER_REM) {
  return round(ptPerRem * value);
}

export function px(value: number) {
  return round(PT_PER_PX * value);
}

// react-pdf resolves aspectRatio with parseFloat, so "16 / 9" has to be
// collapsed to a single number here rather than passed through.
export function parseRatio(value: unknown) {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : undefined;
  }

  if (typeof value !== 'string') return undefined;

  const parts = value.split('/').map((part) => Number(part.trim()));
  const width = parts[0];
  const height = parts[1];

  if (width === undefined || !Number.isFinite(width)) return undefined;
  if (height === undefined) return width;

  return Number.isFinite(height) && height !== 0
    ? round(width / height)
    : undefined;
}
