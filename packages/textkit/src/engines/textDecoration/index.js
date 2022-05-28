/* eslint-disable no-param-reassign */

import runAscent from '../../run/ascent';
import ascent from '../../attributedString/ascent';
import runAdvanceWidth from '../../run/advanceWidth';
import advanceWidth from '../../attributedString/advanceWidth';

// The base font size used for calculating underline thickness.
const BASE_FONT_SIZE = 12;

/**
 * A TextDecorationEngine is used by a Typesetter to generate
 * DecorationLines for a line fragment, including underlines
 * and strikes.
 */
const textDecoration = () => lineFragment => {
  let x = lineFragment.overflowLeft || 0;
  const overflowRight = lineFragment.overflowRight || 0;
  const maxX = advanceWidth(lineFragment) - overflowRight;

  lineFragment.decorationLines = [];

  for (let i = 0; i < lineFragment.runs.length; i += 1) {
    const run = lineFragment.runs[i];

    const width = Math.min(maxX - x, runAdvanceWidth(run));
    const thickness = Math.max(
      0.5,
      Math.floor(run.attributes.fontSize / BASE_FONT_SIZE),
    );

    if (run.attributes.underline) {
      const rect = {
        x,
        y: ascent(lineFragment) + thickness * 2,
        width,
        height: thickness,
      };
      const line = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.underlineColor || 'black',
        style: run.attributes.underlineStyle || 'solid',
      };

      lineFragment.decorationLines.push(line);
    }

    if (run.attributes.strike) {
      const y = ascent(lineFragment) - runAscent(run) / 3;
      const rect = { x, y, width, height: thickness };
      const line = {
        rect,
        opacity: run.attributes.opacity,
        color: run.attributes.strikeColor || 'black',
        style: run.attributes.strikeStyle || 'solid',
      };

      lineFragment.decorationLines.push(line);
    }

    x += width;
  }

  return lineFragment;
};

export default textDecoration;
