const Debug = {
  debugText(layout) {
    this.root.fontSize(4);
    this.root.opacity(1);
    this.root.fillColor('black');
    this.root.text(
      `${layout.width} x ${layout.height}`,
      layout.left,
      layout.top - 4,
    );
  },
  debugContent(layout, margin, padding) {
    this.root.fillColor('#a1c6e7');
    this.root.opacity(0.5);
    this.root
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
    this.root.fillColor('#c4deb9');
    this.root.opacity(0.5);

    // Padding top
    this.root
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
    this.root
      .rect(
        layout.left + margin.left,
        layout.top + margin.top,
        padding.left,
        layout.height - margin.top - margin.bottom,
      )
      .fill();

    // Padding right
    this.root
      .rect(
        layout.left + layout.width - padding.right - margin.right,
        layout.top + margin.top,
        padding.right,
        layout.height - margin.top - margin.bottom,
      )
      .fill();

    // Padding bottom
    this.root
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
    this.root.fillColor('#f8cca1');
    this.root.opacity(0.5);

    // Margin top
    this.root
      .rect(
        layout.left + margin.left,
        layout.top,
        layout.width - margin.left - margin.right,
        margin.top,
      )
      .fill();

    // Margin left
    this.root.rect(layout.left, layout.top, margin.left, layout.height).fill();

    // Margin right
    this.root
      .rect(
        layout.left + layout.width - margin.right,
        layout.top,
        margin.right,
        layout.height,
      )
      .fill();

    // Margin bottom
    this.root
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

    this.root.save();

    this.debugContent(layout, margin, padding);
    this.debugPadding(layout, margin, padding);
    this.debugMargin(layout, margin);
    this.debugText(layout);

    this.root.restore();
  },
};

export default Debug;
