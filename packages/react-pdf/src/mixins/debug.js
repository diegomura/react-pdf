const Debug = {
  debugText(layout, margin) {
    this.root.fontSize(4);
    this.root.opacity(1);
    this.root.fillColor('black');
    this.root.text(
      `${layout.width + margin.left + margin.right} x ${layout.height +
        margin.top +
        margin.bottom}`,
      layout.left - margin.left,
      layout.top - margin.top - 4,
    );
  },
  debugContent(layout, padding) {
    this.root.fillColor('#a1c6e7');
    this.root.opacity(0.5);
    this.root
      .rect(
        layout.left + padding.left,
        layout.top + padding.top,
        layout.width - padding.left - padding.right,
        layout.height - padding.top - padding.bottom,
      )
      .fill();
  },
  debugPadding(layout, padding) {
    this.root.fillColor('#c4deb9');
    this.root.opacity(0.5);
    this.root
      .rect(
        layout.left + padding.left,
        layout.top,
        layout.width - padding.right - padding.left,
        padding.top,
      )
      .fill();
    this.root.rect(layout.left, layout.top, padding.left, layout.height).fill();
    this.root
      .rect(
        layout.left + layout.width - padding.right,
        layout.top,
        padding.right,
        layout.height,
      )
      .fill();
    this.root
      .rect(
        layout.left + padding.left,
        layout.top + layout.height - padding.bottom,
        layout.width - padding.right - padding.left,
        padding.bottom,
      )
      .fill();
  },
  debugMargin(layout, margin) {
    this.root.fillColor('#f8cca1');
    this.root.opacity(0.5);
    this.root
      .rect(layout.left, layout.top - margin.top, layout.width, margin.top)
      .fill();
    this.root
      .rect(
        layout.left - margin.left,
        layout.top - margin.top,
        margin.left,
        layout.height + margin.top + margin.bottom,
      )
      .fill();
    this.root
      .rect(
        layout.left + layout.width,
        layout.top - margin.top,
        margin.right,
        layout.height + margin.top + margin.bottom,
      )
      .fill();
    this.root
      .rect(
        layout.left,
        layout.top + layout.height,
        layout.width,
        margin.bottom,
      )
      .fill();
  },
  debug() {
    const layout = this.getAbsoluteLayout();
    const padding = this.getPadding();
    const margin = this.getMargin();

    this.root.save();

    this.debugContent(layout, padding);
    this.debugPadding(layout, padding);
    this.debugMargin(layout, margin);
    this.debugText(layout, margin);

    this.root.restore();
  },
};

export default Debug;
