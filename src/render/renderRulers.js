import * as R from 'ramda';

import matchPercent from '../utils/matchPercent';
import hasVerticalRuler from '../node/hasVerticalRuler';
import hasHorizontalRuler from '../node/hasHorizontalRuler';
import {
  RULER_WIDTH,
  RULER_COLOR,
  LINE_COLOR,
  GRID_COLOR,
  LINE_WIDTH,
  RULER_FONT_SIZE,
  DEFAULT_RULER_STEPS,
} from '../constants';

const range = (max, steps) =>
  Array.from({ length: Math.ceil(max / steps) }, (_, i) => i * steps);

const matchPercentage = value => {
  const match = matchPercent(value);
  return match ? 100 / match.value : null;
};

const getVerticalSteps = page => {
  const value =
    page.props.horizontalRulerSteps ||
    page.props.rulerSteps ||
    DEFAULT_RULER_STEPS;

  if (typeof value === 'string') {
    const percentage = matchPercentage(value);
    if (percentage) {
      const width = page.box.width - (hasVerticalRuler(page) ? RULER_WIDTH : 0);
      return width / percentage;
    }
    throw new Error('Page: Invalid horizontal steps value');
  }

  return value;
};

const getHorizontalSteps = page => {
  const value =
    page.props.verticalRulerSteps ||
    page.props.rulerSteps ||
    DEFAULT_RULER_STEPS;

  if (typeof value === 'string') {
    const percentage = matchPercentage(value);
    if (percentage) {
      const height =
        page.box.height - (hasVerticalRuler(page) ? RULER_WIDTH : 0);
      return height / percentage;
    }
    throw new Error('Page: Invalid horizontal steps value');
  }

  return value;
};

const renderVerticalRuler = ctx => page => {
  const width = page.box.width;
  const height = page.box.height;
  const offset = hasHorizontalRuler(page) ? RULER_WIDTH : 0;
  const hRange = range(width, getVerticalSteps(page));

  ctx
    .rect(offset, 0, width, RULER_WIDTH)
    .fill(RULER_COLOR)
    .moveTo(offset, RULER_WIDTH)
    .lineTo(width, RULER_WIDTH)
    .stroke(LINE_COLOR);

  hRange.map(step => {
    ctx
      .moveTo(offset + step, 0)
      .lineTo(offset + step, RULER_WIDTH)
      .stroke(LINE_COLOR)
      .fillColor('black')
      .text(`${Math.round(step)}`, offset + step + 1, 1);

    if (step !== 0) {
      ctx
        .moveTo(offset + step, RULER_WIDTH)
        .lineTo(offset + step, height)
        .stroke(GRID_COLOR);
    }
  });

  return page;
};

const renderHorizontalRuler = ctx => page => {
  const width = page.box.width;
  const height = page.box.height;
  const offset = hasVerticalRuler(page) ? RULER_WIDTH : 0;
  const hRange = range(height, getHorizontalSteps(page));

  ctx
    .rect(0, offset, RULER_WIDTH, height)
    .fill(RULER_COLOR)
    .moveTo(RULER_WIDTH, hasHorizontalRuler(page) ? RULER_WIDTH : 0)
    .lineTo(RULER_WIDTH, height)
    .stroke(LINE_COLOR);

  hRange.map(step => {
    ctx
      .moveTo(0, offset + step)
      .lineTo(RULER_WIDTH, offset + step)
      .stroke(LINE_COLOR)
      .fillColor('black')
      .text(`${Math.round(step)}`, 1, offset + step + 1);

    if (step !== 0) {
      ctx
        .moveTo(RULER_WIDTH, offset + step)
        .lineTo(width, offset + step)
        .stroke(GRID_COLOR);
    }
  });

  return page;
};

const renderRulers = (ctx, page) => {
  ctx
    .save()
    .lineWidth(LINE_WIDTH)
    .fontSize(RULER_FONT_SIZE)
    .opacity(1);

  R.compose(
    R.when(hasVerticalRuler, renderVerticalRuler(ctx)),
    R.when(hasHorizontalRuler, renderHorizontalRuler(ctx)),
  )(page);

  ctx.restore();

  return page;
};

export default R.curryN(2, renderRulers);
