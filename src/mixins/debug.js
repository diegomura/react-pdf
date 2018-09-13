const Debug = {
  debug() {
    const layout = this.getAbsoluteLayout();
    const padding = this.padding;
    const margin = this.margin;

    this.root.instance.save();

    this.debugContent(layout, margin, padding);
    this.debugPadding(layout, margin, padding);
    this.debugMargin(layout, margin);
    this.debugText(layout, margin);

    this.root.instance.restore();
  },
  debugText(layout, margin) {
    const roundedWidth = Math.round(this.width + margin.left + margin.right);
    const roundedHeight = Math.round(this.height + margin.top + margin.bottom);

    this.root.instance
      .fontSize(4)
      .opacity(1)
      .fillColor('black')
      .text(
        `${roundedWidth} x ${roundedHeight}`,
        layout.left - margin.left,
        Math.max(layout.top - margin.top - 4, 1),
      );
  },
  debugContent(layout, margin, padding) {
    this.root.instance
      .fillColor('#a1c6e7')
      .opacity(0.5)
      .rect(
        layout.left + padding.left,
        layout.top + padding.top,
        layout.width - padding.left - padding.right,
        layout.height - padding.top - padding.bottom,
      )
      .fill();
  },
  debugPadding(layout, margin, padding) {
    this.root.instance.fillColor('#c4deb9').opacity(0.5);

    // Padding top
    this.root.instance
      .rect(
        layout.left + padding.left,
        layout.top,
        layout.width - padding.right - padding.left,
        padding.top,
      )
      .fill();

    // Padding left
    this.root.instance
      .rect(layout.left, layout.top, padding.left, layout.height)
      .fill();

    // Padding right
    this.root.instance
      .rect(
        layout.left + layout.width - padding.right,
        layout.top,
        padding.right,
        layout.height,
      )
      .fill();

    // Padding bottom
    this.root.instance
      .rect(
        layout.left + padding.left,
        layout.top + layout.height - padding.bottom,
        layout.width - padding.right - padding.left,
        padding.bottom,
      )
      .fill();
  },
  debugMargin(layout, margin) {
    this.root.instance.fillColor('#f8cca1').opacity(0.5);

    // Margin top
    this.root.instance
      .rect(layout.left, layout.top - margin.top, layout.width, margin.top)
      .fill();

    // Margin left
    this.root.instance
      .rect(
        layout.left - margin.left,
        layout.top - margin.top,
        margin.left,
        layout.height + margin.top + margin.bottom,
      )
      .fill();

    // Margin right
    this.root.instance
      .rect(
        layout.left + layout.width,
        layout.top - margin.top,
        margin.right,
        layout.height + margin.top + margin.bottom,
      )
      .fill();

    // Margin bottom
    this.root.instance
      .rect(
        layout.left,
        layout.top + layout.height,
        layout.width,
        margin.bottom,
      )
      .fill();
  },
};

export default Debug;
