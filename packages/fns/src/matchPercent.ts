interface PercentMatch {
  percent: number;
  value: number;
}

const PERCENT_REGEX = /(-?\d+\.?\d*)%/;

/**
 * Parses a percentage string and returns both the numeric value and decimal percent.
 *
 * @example
 * matchPercent('50%')  // => { value: 50, percent: 0.5 }
 * matchPercent('-25%') // => { value: -25, percent: -0.25 }
 * matchPercent('abc')  // => null
 *
 * @param value - The value to parse
 * @returns Object with value and percent, or null if not a valid percentage
 */
const matchPercent = (value: string | number | null): PercentMatch | null => {
  const match = PERCENT_REGEX.exec(`${value}`);

  if (match) {
    const numericValue = parseFloat(match[1]);
    const percent = numericValue / 100;

    return { percent, value: numericValue };
  }

  return null;
};

export default matchPercent;
