interface PercentMatch {
  percent: number;
  value: number;
}

const isPercent = (value: string | number | null) =>
  /((-)?\d+\.?\d*)%/g.exec(`${value}`);

/**
 * Get percentage value of input
 *
 * @param value
 * @returns Percent value (if matches)
 */
const matchPercent = (value: string | number | null): PercentMatch | null => {
  const match = isPercent(value);

  if (match) {
    const f = parseFloat(match[1]);
    const percent = f / 100;

    return { percent, value: f };
  }

  return null;
};

export default matchPercent;
