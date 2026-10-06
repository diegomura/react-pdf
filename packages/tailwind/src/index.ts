import { Style } from '@react-pdf/types';
import defaultTheme from 'tailwindcss/defaultTheme';
import { tailwindColors } from './colors';
import {
  exactUtilities,
  isDimensionProperty,
  isNegativeProperty,
  isRenderableLength,
  isScaledProperty,
  utilityPatterns,
} from './properties';
import {
  capitalize,
  ExtendableDeepPartial,
  isNumeric,
  mergeScales,
  NAMED_COLORS,
  parseRatio,
  px,
  rem,
  splitAlpha,
  withAlpha,
} from './utils';

type DefaultTheme = typeof defaultTheme;

type ThemeBaseConfig = Omit<
  ExtendableDeepPartial<typeof defaultTheme>,
  'colors' | 'fontFamily'
>;

type ThemeConfig = ThemeBaseConfig & {
  colors?: Record<string, string | Record<number, string>>;
  fontFamily?: Partial<DefaultTheme['fontFamily']> & {
    [key: string]: string | string[];
  };
};

type Options = {
  ptPerRem?: number;
};

const UNIT_VALUE = /^(-?(?:\d+\.?\d*|\.\d+))(px|rem|em)$/;

// Explicit return type: TS elides the `Style` import otherwise.
export function createTw(
  config: ThemeConfig,
  options?: Options,
): (input: string) => Style {
  const theme = {
    ...(mergeScales(defaultTheme, config) as typeof defaultTheme),
    // Config only: Tailwind's stacks name fonts react-pdf can't draw.
    fontFamily: (config.fontFamily ?? {}) as typeof defaultTheme.fontFamily,
  };

  // Default colors are in OKLCH from v4 onwards, so we use the hex versions here for compatibility
  const colors = mergeScales(
    tailwindColors,
    config.colors ?? {},
  ) as typeof tailwindColors;

  // Merged, so config reaches the scales derived from it (padding <- spacing).
  function themeResolver(name: string) {
    return theme[name as keyof typeof theme] ?? {};
  }

  const cache = new Map<string, MergedStyle>();

  function transformValue(
    value: string | number | undefined,
    property?: string,
    isNegative?: boolean,
  ) {
    if (value === undefined) {
      return undefined;
    }

    if (typeof value !== 'string' && typeof value !== 'number') {
      console.warn(
        'Invalid value type passed to transformValue',
        value,
        property,
      );
      return undefined;
    }

    const sign = isNegative ? -1 : 1;

    if (typeof value === 'number') {
      return sign * value;
    }

    switch (property) {
      case 'lineHeight':
        // react-pdf only supports unitless line-heights
        // https://github.com/diegomura/react-pdf/issues/912
        if (value.endsWith('rem')) {
          return sign * Number(value.replace('rem', ''));
        }
        return sign * Number(value);

      default: {
        // Whole match, not a suffix: "-apple-system" ends in "em".
        const unit = UNIT_VALUE.exec(value);
        if (unit) {
          const amount = sign * Number(unit[1]);
          return unit[2] === 'px' ? px(amount) : rem(amount, options?.ptPerRem);
        }
        if (isNegative && property && isNegativeProperty(property)) {
          const suffix = ['deg', '%'].find((i) => value.endsWith(i));
          if (suffix) {
            return `${sign * Number(value.replace(suffix, ''))}${suffix}`;
          }
        }
        if (isNumeric(value)) {
          return sign * Number(value);
        }
        if (isDimensionProperty(property) && !isRenderableLength(value)) {
          return undefined;
        }
        return value;
      }
    }
  }

  function getCustomValue(value: string) {
    if (value.startsWith('[') && value.endsWith(']')) {
      return value.slice(1, value.length - 1).replaceAll('_', ' ');
    }
    return undefined;
  }

  // Example: text-2xl => ["1.5rem", { lineHeight: "2rem"}]
  type MultiProperty = [
    string,
    string | Record<string, string | number | undefined>,
  ];

  function isMultiProperty(value: unknown): value is MultiProperty {
    return Array.isArray(value);
  }

  interface Value {
    value: string | number | undefined;
    type?: 'color' | 'unit' | 'numeric' | 'other';
    isCustom?: boolean;
    additionalProperties?: MergedStyle;
  }

  function parseValue(
    value: string,
    property?: string,
    isNegative?: boolean,
  ): Value {
    const direct = parseBaseValue(value, property, isNegative);

    // Plain reading first, so `w-1/2` stays a fraction.
    if (direct.value !== undefined) return direct;

    const { base, alpha } = splitAlpha(value);

    if (alpha === undefined) return direct;

    const named = NAMED_COLORS[base];

    if (named) {
      return { value: withAlpha(named, alpha), type: 'color', isCustom: false };
    }

    const resolved = parseBaseValue(base, property, isNegative);

    if (resolved.type !== 'color') return direct;

    return { ...resolved, value: withAlpha(resolved.value, alpha) };
  }

  function parseBaseValue(
    value: string,
    property?: string,
    isNegative?: boolean,
  ): Value {
    const valueParts = value.split('-');

    // Custom value
    const customValue = getCustomValue(value);
    if (customValue) {
      // Color
      if (
        ['#', 'rgb', 'hsl'].some((prefix) => customValue.startsWith(prefix))
      ) {
        return {
          value: customValue,
          type: 'color',
          isCustom: true,
        };
      }
      // Unit
      if (['px', 'rem'].some((suffix) => customValue.endsWith(suffix))) {
        return {
          value: transformValue(customValue, property, isNegative),
          type: 'unit',
          isCustom: true,
        };
      }
      // Other
      return {
        value: transformValue(customValue, property, isNegative),
        type: 'other',
        isCustom: true,
      };
    }

    // Color
    // Exceptions: "font-weight: black" isn't a colour, and a dimension can't
    // hold one -- a colour named like a spacing key would win and break it.
    if (
      valueParts[0] &&
      valueParts[0] in colors &&
      property !== 'fontWeight' &&
      !isDimensionProperty(property)
    ) {
      const color = colors[valueParts[0] as keyof typeof colors];
      return {
        value:
          typeof color === 'string'
            ? color
            : valueParts[1] && typeof valueParts[1] === 'string'
              ? color?.[valueParts[1] as unknown as keyof typeof color]
              : undefined,
        type: 'color' as const,
        isCustom: false,
        additionalProperties: undefined,
      };
    }

    if (valueParts.length === 0 || !property) {
      return {
        value: undefined,
      };
    }

    // Scaled properties
    const maybeScaledProperty = ['top', 'right', 'bottom', 'left'].includes(
      property,
    )
      ? 'inset'
      : property;

    if (isScaledProperty(maybeScaledProperty)) {
      // Check if property exists directly on tailwind theme object (like eg. fontSize)
      const key = maybeScaledProperty as keyof typeof theme;
      const themeProp = theme[key];
      let result: string | number | undefined;

      if (typeof themeProp === 'function') {
        // Here the theme value expects a function that resolves values within the theme object
        result = (themeProp as any)({ theme: themeResolver })?.[value];
      } else if (themeProp && value in themeProp) {
        result = themeProp?.[value as keyof (typeof theme)[typeof key]];
      }

      if (!result) {
        // Check if property uses tailwind spacing scale
        result = theme.spacing[value as keyof typeof theme.spacing];
      }

      // Some utilities may set multiple properties (eg. text-* sets both fontSize and lineHeight)
      if (isMultiProperty(result)) {
        const additionalProperties =
          result[1] && result[1] !== null && typeof result[1] === 'object'
            ? Object.fromEntries(
                Object.entries(result[1]).map(([key, value]) => [
                  key,
                  transformValue(value, key),
                ]),
              )
            : null;

        return {
          value: transformValue(result[0], property, isNegative),
          type: 'unit',
          isCustom: false,
          ...(additionalProperties ? { additionalProperties } : null),
        };
      }

      return {
        value: transformValue(result, property, isNegative),
        type: 'unit',
        isCustom: false,
      };
    }

    // No match
    return {
      value: undefined,
    };
  }

  type MergedStyle =
    | Style
    | Record<string, string | number | undefined>
    | undefined;

  function screenSize(key: string) {
    const screens = theme.screens as Record<string, unknown> | undefined;
    const size = transformValue(
      (getCustomValue(key) ?? screens?.[key]) as string | undefined,
      'width',
    );

    return typeof size === 'number' ? size : undefined;
  }

  // Media queries resolve against the page box, so breakpoints and orientation
  // carry over. State variants describe something a PDF never enters.
  function resolveModifier(modifier: string) {
    if (modifier === 'portrait' || modifier === 'landscape') {
      return `orientation: ${modifier}`;
    }

    const isMax = modifier.startsWith('max-');
    const isMin = modifier.startsWith('min-');
    const size = screenSize(isMax || isMin ? modifier.slice(4) : modifier);

    if (size === undefined) return undefined;

    return `${isMax ? 'max-width' : 'min-width'}: ${size}`;
  }

  function resolveModifiers(modifiers: string[]) {
    if (modifiers.length === 0) return null;

    const conditions = modifiers.map(resolveModifier);

    if (conditions.some((condition) => condition === undefined)) {
      return undefined;
    }

    return conditions.join(' and ');
  }

  function parseUtility(className: string): MergedStyle {
    const modifierParts = className.split(':');
    const query = resolveModifiers(modifierParts.slice(0, -1));

    if (query === undefined) return undefined;

    const style = parseBaseUtility(modifierParts[modifierParts.length - 1]);

    if (!query || !style) return style;

    return { [`@media ${query}`]: style } as MergedStyle;
  }

  function parseBaseUtility(utilityStr: string | undefined): MergedStyle {
    // Exact utilities
    if (utilityStr && utilityStr in exactUtilities) {
      return exactUtilities[utilityStr];
    }

    // Utility patterns
    const isNegative = utilityStr ? utilityStr.startsWith('-') : false;
    const utilityParts = utilityStr
      ? utilityStr.slice(isNegative ? 1 : 0).split('-')
      : [];

    const matchingUtilityPatternKey = Object.keys(utilityPatterns).find(
      (key) => {
        const keyParts = key.split('-');
        const comparisonKey = utilityParts.slice(0, keyParts.length).join('-');
        return key === comparisonKey;
      },
    );

    if (matchingUtilityPatternKey) {
      // From the stripped parts: "grou|p-|hover:p-4" mis-splits the raw name.
      const rawValue = utilityParts
        .slice(matchingUtilityPatternKey.split('-').length)
        .join('-');
      const pattern = utilityPatterns[matchingUtilityPatternKey];
      const property = Array.isArray(pattern) ? pattern[0] : pattern;
      const mappedProperties = Array.isArray(pattern)
        ? Array.isArray(pattern[1])
          ? pattern[1]
          : [pattern[1]]
        : [pattern];

      if (!rawValue || (isNegative && !isNegativeProperty(property))) {
        return undefined;
      }

      const { value, additionalProperties } = parseValue(
        rawValue,
        property,
        isNegative,
      );

      return {
        ...Object.fromEntries(mappedProperties.map((prop) => [prop, value])),
        ...(additionalProperties ?? null),
      };
    }

    // Special utilities
    switch (utilityParts[0]) {
      case 'inset': {
        const direction = ['x', 'y'].find((i) => i === utilityParts[1]);
        const valueStr = utilityParts.slice(direction ? 2 : 1).join('-');
        const { value } = parseValue(valueStr, 'inset', isNegative);
        switch (direction) {
          case 'x':
            return {
              left: value,
              right: value,
            };
          case 'y':
            return {
              top: value,
              bottom: value,
            };
          default:
            return {
              top: value,
              right: value,
              bottom: value,
              left: value,
            };
        }
      }

      case 'font': {
        const valueStr = utilityParts.slice(1).join('-');
        const customValue = getCustomValue(valueStr);
        if (customValue) {
          if (isNumeric(customValue)) {
            return {
              fontWeight: parseInt(customValue, 10),
            };
          }
          return {
            fontFamily: customValue,
          };
        }
        if (theme.fontFamily && valueStr in theme.fontFamily) {
          const { value } = parseValue(valueStr, 'fontFamily');
          return {
            fontFamily: value,
          };
        }
        const { value } = parseValue(valueStr, 'fontWeight');
        return {
          fontWeight: value,
        };
      }

      case 'text': {
        const valueStr = utilityParts.slice(1).join('-');
        const { value, additionalProperties, type } = parseValue(
          valueStr,
          'fontSize',
        );
        if (type === 'color') {
          return { color: value };
        }
        return { fontSize: value, ...additionalProperties };
      }

      case 'decoration': {
        const valueStr = utilityParts.slice(1).join('-');
        const { value, type } = parseValue(valueStr, 'textDecorationColor');
        if (type === 'color') {
          return {
            textDecorationColor: value,
          };
        }
        // Only decoration color (not thickness) supported for now
        return undefined;
      }

      case 'rounded': {
        const direction = ['t', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl'].find(
          (i) => i === utilityParts[1],
        );
        const valueStr = utilityParts.slice(direction ? 2 : 1).join('-');
        const { value } = parseValue(valueStr || 'DEFAULT', 'borderRadius');
        switch (direction) {
          case 't':
            return {
              borderTopLeftRadius: value,
              borderTopRightRadius: value,
            };
          case 'r':
            return {
              borderTopRightRadius: value,
              borderBottomRightRadius: value,
            };
          case 'b':
            return {
              borderBottomRightRadius: value,
              borderBottomLeftRadius: value,
            };
          case 'l':
            return {
              borderBottomLeftRadius: value,
              borderTopLeftRadius: value,
            };
          case 'tl':
            return {
              borderTopLeftRadius: value,
            };
          case 'tr':
            return {
              borderTopRightRadius: value,
            };
          case 'br':
            return {
              borderBottomRightRadius: value,
            };
          case 'bl':
            return {
              borderBottomLeftRadius: value,
            };
          default:
            return {
              borderRadius: value,
            };
        }
      }

      case 'border': {
        // Border width or color
        const direction = ['x', 'y', 't', 'r', 'b', 'l'].find(
          (i) => i === utilityParts[1],
        );
        const valueStr = utilityParts.slice(direction ? 2 : 1).join('-');
        const { value, type } = parseValue(
          valueStr || 'DEFAULT',
          'borderWidth',
        );
        const propertySuffix = capitalize(type === 'color' ? 'color' : 'width');
        switch (direction) {
          case 'x':
            return {
              [`borderLeft${propertySuffix}`]: value,
              [`borderRight${propertySuffix}`]: value,
            };
          case 'y':
            return {
              [`borderTop${propertySuffix}`]: value,
              [`borderBottom${propertySuffix}`]: value,
            };
          case 't':
            return { [`borderTop${propertySuffix}`]: value };
          case 'r':
            return { [`borderRight${propertySuffix}`]: value };
          case 'b':
            return { [`borderBottom${propertySuffix}`]: value };
          case 'l':
            return { [`borderLeft${propertySuffix}`]: value };
          default:
            return {
              [`border${propertySuffix}`]: value,
            };
        }
      }

      case 'scale': {
        const direction = ['x', 'y'].find((i) => i === utilityParts[1]);
        const valueStr = utilityParts.slice(direction ? 2 : 1).join('-');
        const { value } = parseValue(valueStr, 'scale', isNegative);
        switch (direction) {
          case 'x':
            return {
              transform: `scaleX(${value})`,
            };
          case 'y':
            return {
              transform: `scaleY(${value})`,
            };
          default:
            return {
              transform: `scale(${value})`,
            };
        }
      }

      case 'rotate': {
        const { value } = parseValue(
          utilityParts.slice(1).join('-'),
          'rotate',
          isNegative,
        );
        return {
          transform: `rotate(${value})`,
        };
      }

      case 'skew': {
        const direction = ['x', 'y'].find((i) => i === utilityParts[1]);
        const valueStr = utilityParts.slice(direction ? 2 : 1).join('-');
        const { value } = parseValue(valueStr, 'skew', isNegative);
        switch (direction) {
          case 'x':
            return {
              transform: `skewX(${value})`,
            };
          case 'y':
            return {
              transform: `skewY(${value})`,
            };
          default:
            // Both axes, spelled out: react-pdf reads y from the second arg.
            return {
              transform: `skew(${value}, ${value})`,
            };
        }
      }

      case 'aspect': {
        const valueStr = utilityParts.slice(1).join('-');
        const themeRatio = theme.aspectRatio as
          | Record<string, unknown>
          | undefined;
        // The valueStr fallback covers bare fractions like `aspect-3/2`.
        const ratio = parseRatio(
          getCustomValue(valueStr) ?? themeRatio?.[valueStr] ?? valueStr,
        );
        return ratio === undefined ? undefined : { aspectRatio: ratio };
      }

      case 'translate': {
        const direction = ['x', 'y'].find((i) => i === utilityParts[1]);
        const valueStr = utilityParts.slice(direction ? 2 : 1).join('-');
        const { value } = parseValue(valueStr, 'translate', isNegative);
        switch (direction) {
          case 'x':
            return {
              transform: `translateX(${value})`,
            };
          case 'y':
            return {
              transform: `translateY(${value})`,
            };
          default:
            return {
              transform: `translate(${value})`,
            };
        }
      }

      // No match
      default:
        return undefined;
    }
  }

  function handleInvalidClassName(className: string) {
    console.warn(`@react-pdf/tailwind: Invalid class "${className}"`);
  }

  return function (input: string) {
    const classNames = input.split(' ').map((i) => i.trim());
    return classNames
      .map((className) => {
        if (cache.has(className)) {
          return cache.get(className);
        }
        const parsed = parseUtility(className);
        const resolved =
          parsed && Object.values(parsed).every((v) => typeof v !== 'undefined')
            ? parsed
            : undefined;

        // Misses cached too: tw() runs per element, so this would re-warn each time.
        cache.set(className, resolved);
        if (!resolved) handleInvalidClassName(className);

        return resolved;
      })
      .reduce<Style>(mergeStyle, {});
  };
}

type Merged = Record<string, unknown>;

// Transforms and feature tags compose; `@media` blocks merge a level down.
function mergeStyle(acc: Style, val: unknown): Style {
  if (!val || typeof val !== 'object') return acc;

  const next = { ...acc } as Merged;

  for (const [key, value] of Object.entries(val as Merged)) {
    if (key.startsWith('@media')) {
      next[key] = mergeStyle((next[key] ?? {}) as Style, value);
      continue;
    }

    if (key === 'transform') {
      if (value) {
        next.transform = [next.transform ?? '', value].join(' ').trim();
      }
      continue;
    }

    if (key === 'fontFeatureSettings') {
      const previous = next.fontFeatureSettings;
      const tags = Array.isArray(value) ? value : [];
      next.fontFeatureSettings = Array.isArray(previous)
        ? [...previous, ...tags]
        : tags;
      continue;
    }

    next[key] = value;
  }

  return next as Style;
}
