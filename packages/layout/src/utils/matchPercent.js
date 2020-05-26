const isPercent = value => /((-)?\d+\.?\d*)%/g.exec(value);

/**
 * Get percentage value of input
 *
 * @param {String} value
 * @returns {Object} percent value (if matches)
 */
const matchPercent = value => {
  const match = isPercent(value);

  if (match) {
    const value = parseFloat(match[1], 10);
    const percent = value / 100;

    return {
      value,
      percent,
      absValue: Math.abs(value),
      absPercent: Math.abs(percent),
    };
  }

  return null;
};

export default matchPercent;
