// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
const KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

const Clipping = {
  clip() {
    const { top, left, width, height } = this.getAbsoluteLayout();

    const {
      borderTopLeftRadius = 0,
      borderTopRightRadius = 0,
      borderBottomRightRadius = 0,
      borderBottomLeftRadius = 0,
    } = this.style;

    // Border top
    const rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
    const ctr = rtr * (1.0 - KAPPA);

    this.root.instance.moveTo(left + rtr, top);
    this.root.instance.lineTo(left + width - rtr, top);
    this.root.instance.bezierCurveTo(
      left + width - ctr,
      top,
      left + width,
      top + ctr,
      left + width,
      top + rtr,
    );

    // Border right
    const rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
    const cbr = rbr * (1.0 - KAPPA);

    this.root.instance.lineTo(left + width, top + height - rbr);
    this.root.instance.bezierCurveTo(
      left + width,
      top + height - cbr,
      left + width - cbr,
      top + height,
      left + width - rbr,
      top + height,
    );

    // Border bottom
    const rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
    const cbl = rbl * (1.0 - KAPPA);

    this.root.instance.lineTo(left + rbl, top + height);
    this.root.instance.bezierCurveTo(
      left + cbl,
      top + height,
      left,
      top + height - cbl,
      left,
      top + height - rbl,
    );

    // Border left
    const rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
    const ctl = rtl * (1.0 - KAPPA);

    this.root.instance.lineTo(left, top + rtl);
    this.root.instance.bezierCurveTo(
      left,
      top + ctl,
      left + ctl,
      top,
      left + rtl,
      top,
    );
    this.root.instance.closePath();
    this.root.instance.clip();
  },
};

export default Clipping;
