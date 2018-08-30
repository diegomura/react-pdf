const Debug = {
  debugText(layout) {
    this.root.instance
      .fontSize(4)
      .opacity(1)
      .fillColor('black')
      .text(
        `${layout.width} x ${layout.height}`,
        layout.left,
        Math.max(layout.top - 4, 1),
      );
  },
  debugContent(layout, margin, padding) {
    this.root.instance
      .fillColor('#a1c6e7')
      .opacity(0.5)
      .rect(
        layout.left + padding.left + margin.left,
        layout.top + padding.top + margin.top,
        layout.width -
          padding.left -
          padding.right -
          margin.left -
          margin.right,
        layout.height -
          padding.top -
          padding.bottom -
          margin.top -
          margin.bottom,
      )
      .fill();
  },
  debugPadding(layout, margin, padding) {
    this.root.instance.fillColor('#c4deb9').opacity(0.5);

    // Padding top
    this.root.instance
      .rect(
        layout.left + margin.left + padding.left,
        layout.top + margin.top,
        layout.width -
          padding.right -
          padding.left -
          margin.left -
          margin.right,
        padding.top,
      )
      .fill();

    // Padding left
    this.root.instance
      .rect(
        layout.left + margin.left,
        layout.top + margin.top,
        padding.left,
        layout.height - margin.top - margin.bottom,
      )
      .fill();

    // Padding right
    this.root.instance
      .rect(
        layout.left + layout.width - padding.right - margin.right,
        layout.top + margin.top,
        padding.right,
        layout.height - margin.top - margin.bottom,
      )
      .fill();

    // Padding bottom
    this.root.instance
      .rect(
        layout.left + padding.left + margin.left,
        layout.top + layout.height - padding.bottom - margin.bottom,
        layout.width -
          padding.right -
          padding.left -
          margin.left -
          margin.right,
        padding.bottom,
      )
      .fill();
  },
  debugMargin(layout, margin) {
    this.root.instance.fillColor('#f8cca1').opacity(0.5);

    // Margin top
    this.root.instance
      .rect(
        layout.left + margin.left,
        layout.top,
        layout.width - margin.left - margin.right,
        margin.top,
      )
      .fill();

    // Margin left
    this.root.instance
      .rect(layout.left, layout.top, margin.left, layout.height)
      .fill();

    // Margin right
    this.root.instance
      .rect(
        layout.left + layout.width - margin.right,
        layout.top,
        margin.right,
        layout.height,
      )
      .fill();

    // Margin bottom
    this.root.instance
      .rect(
        layout.left + margin.left,
        layout.top + layout.height - margin.bottom,
        layout.width - margin.left - margin.right,
        margin.bottom,
      )
      .fill();
  },
  debug() {
    const layout = this.getAbsoluteLayout();
    const padding = this.padding;
    const margin = this.margin;

    this.root.instance.save();

    this.debugContent(layout, margin, padding);
    this.debugPadding(layout, margin, padding);
    this.debugMargin(layout, margin);
    this.debugText(layout);

    this.root.instance.restore();
  },
};

export default Debug;
