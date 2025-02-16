import runAscent from '../../run/ascent';
import ascent from '../../attributedString/ascent';
import runAdvanceWidth from '../../run/advanceWidth';
import advanceWidth from '../../attributedString/advanceWidth';
import { AttributedString } from '../../types';

// The base font size used for calculating underline thickness.
const BASE_FONT_SIZE = 12;

/**
 * A TextDecorationEngine is used by a Typesetter to generate
 * DecorationLines for a line fragment, including underlines
 * and strikes.
 */
const textDecoration = () => (line: AttributedString) => {
  let x = line.overflowLeft || 0;
  const overflowRight = line.overflowRight || 0;
  const maxX = advanceWidth(line) - overflowRight;

  line.decorationLines = [];

  for (let i = 0; i < line.runs.length; i += 1) {
    const run = line.runs[i];

    const width = Math.min(maxX - x, runAdvanceWidth(run));
    const thickness = Math.max(
      0.5,
      Math.floor(run.attributes.fontSize / BASE_FONT_SIZE),
    );

    if (run.attributes.underline) {
      const rect = {
        x,
        y: ascent(line) + thickness * 2,
        width,
        height: thickness,
      };
      const decorationLine = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.underlineColor || 'black',
        style: run.attributes.underlineStyle || 'solid',
      };

      line.decorationLines.push(decorationLine);
    }

    if (run.attributes.strike) {
      const y = ascent(line) - runAscent(run) / 3;
      const rect = { x, y, width, height: thickness };
      const decorationLine = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.strikeColor || 'black',
        style: run.attributes.strikeStyle || 'solid',
      };

      line.decorationLines.push(decorationLine);
    }

    x += width;
  }

  return line;
};

export default textDecoration;
