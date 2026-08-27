/**
 * First-fit line breaking: the algorithm react-pdf does *not* use, kept around
 * so the lab can put it next to Knuth & Plass.
 */
export const greedyLines = (
  text: string,
  maxWidth: number,
  measure: (line: string) => number,
) => {
  const tokens = text.split(/( +)/).filter(Boolean);
  const lines: string[] = [];

  let current = '';

  for (const token of tokens) {
    if (token.trim() === '') {
      if (current) current += token;
      continue;
    }

    const candidate = current + token;

    if (current.trim() && measure(candidate.trimEnd()) > maxWidth) {
      lines.push(current.trimEnd());
      current = token;
    } else {
      current = candidate;
    }
  }

  if (current.trim()) lines.push(current.trimEnd());

  return lines;
};

/**
 * Sum of squared leftovers, ignoring the last line. Squaring is what makes one
 * badly short line cost more than several slightly short ones, which is the
 * whole reason optimal breaking looks better.
 */
export const raggedness = (widths: number[], maxWidth: number) =>
  widths
    .slice(0, -1)
    .reduce((total, width) => total + (maxWidth - width) ** 2, 0);
