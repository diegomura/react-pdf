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

// One level deep: overriding a key keeps the rest of the scale. Arrays and
// functions are values, not scales, so they replace.
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

// Bare suffix is a percentage, bracketed is 0-1 unless it carries a `%`.
// Callers must try the plain reading first: `w-1/2` spells a fraction the same.
export function splitAlpha(value: string) {
  const slash = value.lastIndexOf('/');

  if (slash === -1) return { base: value, alpha: undefined };

  const base = value.slice(0, slash);
  const raw = value.slice(slash + 1);
  const bracketed = raw.startsWith('[') && raw.endsWith(']');
  const inner = bracketed ? raw.slice(1, -1) : raw;
  const percent = inner.endsWith('%');
  const amount = Number(percent ? inner.slice(0, -1) : inner);

  if (inner === '' || !Number.isFinite(amount)) {
    return { base, alpha: undefined };
  }

  const alpha = bracketed && !percent ? amount : amount / 100;

  return { base, alpha: Math.min(Math.max(alpha, 0), 1) };
}

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const COLOR_FN = /^(rgb|hsl)\(([^)]*)\)$/i;

export const NAMED_COLORS: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
};

// react-pdf reads 8-digit hex and rgba()/hsla(). Keywords like `transparent`
// have no channel to modulate, so they return undefined and the class warns.
export function withAlpha(color: string | number | undefined, alpha: number) {
  if (typeof color !== 'string') return undefined;

  const value = NAMED_COLORS[color] ?? color;

  if (HEX.test(value)) {
    const full =
      value.length === 4
        ? `#${value
            .slice(1)
            .split('')
            .map((channel) => channel + channel)
            .join('')}`
        : value;
    const byte = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');

    return `${full}${byte}`;
  }

  const [, name, args] = COLOR_FN.exec(value) ?? [];

  if (name) return `${name.toLowerCase()}a(${args}, ${alpha})`;

  return undefined;
}

// react-pdf parseFloats aspectRatio, so "16 / 9" has to collapse to a number.
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
