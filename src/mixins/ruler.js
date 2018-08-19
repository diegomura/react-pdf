const RULER_WIDTH = 13;
const RULER_COLOR = 'white';
const RULER_FONT_SIZE = 5;
const DEFAULT_RULER_STEPS = 50;
const LINE_WIDTH = 0.5;
const LINE_COLOR = 'gray';
const GRID_COLOR = '#ababab';

const range = (max, steps) =>
  Array.from({ length: Math.ceil(max / steps) }, (_, i) => i * steps);

const matchPercentage = value => {
  const match = value.match(/(\d+\.?\d*)%/);
  if (match) {
    return 100 / parseFloat(match[1], 10);
  }

  return null;
};

const Ruler = {
  getRulerWidth() {
    return RULER_WIDTH;
  },
  hasHorizontalRuler() {
    return this.props.ruler || this.props.horizontalRuler;
  },
  hasVerticalRuler() {
    return this.props.ruler || this.props.verticalRuler;
  },
  getHorizontalSteps() {
    const value =
      this.props.horizontalRulerSteps ||
      this.props.rulerSteps ||
      DEFAULT_RULER_STEPS;

    if (typeof value === 'string') {
      const percentage = matchPercentage(value);
      if (percentage) {
        const width = this.width - (this.hasVerticalRuler() ? RULER_WIDTH : 0);
        return width / percentage;
      }
      throw new Error('Page: Invalid horizontal steps value');
    }

    return value;
  },
  getVerticalSteps() {
    const value =
      this.props.verticalRulerSteps ||
      this.props.rulerSteps ||
      DEFAULT_RULER_STEPS;

    if (typeof value === 'string') {
      const percentage = matchPercentage(value);
      if (percentage) {
        const height =
          this.height - (this.hasHorizontalRuler() ? RULER_WIDTH : 0);
        return height / percentage;
      }
      throw new Error('Page: Invalid horizontal steps value');
    }

    return value;
  },
  renderRuler() {
    this.root.instance
      .save()
      .lineWidth(LINE_WIDTH)
      .fontSize(RULER_FONT_SIZE)
      .opacity(1);

    if (this.hasHorizontalRuler()) {
      this.drawHorizontalRuler();
    }

    if (this.hasVerticalRuler()) {
      this.drawVerticalRuler();
    }

    if (this.hasHorizontalRuler() && this.hasVerticalRuler()) {
      this.root.instance
        .rect(0, 0, RULER_WIDTH - LINE_WIDTH, RULER_WIDTH - LINE_WIDTH)
        .fill(RULER_COLOR);
    }

    this.root.instance.restore();
  },
  drawHorizontalRuler() {
    const offset = this.hasVerticalRuler() ? RULER_WIDTH : 0;

    this.root.instance
      .rect(offset, 0, this.width, RULER_WIDTH)
      .fill(RULER_COLOR)
      .moveTo(this.hasVerticalRuler() ? RULER_WIDTH : 0, RULER_WIDTH)
      .lineTo(this.width, RULER_WIDTH)
      .stroke(LINE_COLOR);

    const hRange = range(this.width, this.getHorizontalSteps());

    hRange.map(step => {
      this.root.instance
        .moveTo(offset + step, 0)
        .lineTo(offset + step, RULER_WIDTH)
        .stroke(LINE_COLOR)
        .fillColor('black')
        .text(`${Math.round(step)}`, offset + step + 1, 1);
    });

    hRange.map(step => {
      if (step !== 0) {
        this.root.instance
          .moveTo(offset + step, RULER_WIDTH)
          .lineTo(offset + step, this.height)
          .stroke(GRID_COLOR);
      }
    });
  },
  drawVerticalRuler() {
    const offset = this.hasHorizontalRuler() ? RULER_WIDTH : 0;

    this.root.instance
      .rect(0, offset, RULER_WIDTH, this.height)
      .fill(RULER_COLOR)
      .moveTo(RULER_WIDTH, this.hasHorizontalRuler() ? RULER_WIDTH : 0)
      .lineTo(RULER_WIDTH, this.height)
      .stroke(LINE_COLOR);

    const vRange = range(this.height, this.getVerticalSteps());

    vRange.map(step => {
      this.root.instance
        .moveTo(0, offset + step)
        .lineTo(RULER_WIDTH, offset + step)
        .stroke(LINE_COLOR)
        .fillColor('black')
        .text(`${Math.round(step)}`, 1, offset + step + 1);
    });

    vRange.map(step => {
      if (step !== 0) {
        this.root.instance
          .moveTo(RULER_WIDTH, offset + step)
          .lineTo(this.width, offset + step)
          .stroke(GRID_COLOR);
      }
    });
  },
};

export default Ruler;
