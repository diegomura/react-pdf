const STYLES = {
  strokeColorStyle: '#000000',
  fillColorStyle: '#000000',
  lineWidthStyle: 1,
  fillRuleStyle: 'nonzero',
  lineCapStyle: 'butt',
  lineJoinStyle: 'miter',
  lineDashStyle: '0 0',
  fillOpacityStyle: 1,
  strokeOpacityStyle: 1,
  opacityStyle: 1,
  fontSizeStyle: 12,
  fontFamilyStyle: 'Helvetica',
};

export default {
  setDefaultStyles() {
    const keys = Object.keys(STYLES);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this[key] = STYLES[key];
    }
  },

  getStyleState() {
    const styleState = {};
    const keys = Object.keys(STYLES);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      styleState[key] = this[key];
    }

    return styleState;
  },

  applyStyleState(styleState) {
    const keys = Object.keys(styleState);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this[key] = styleState[key];
    }
  },

  opacity(opacity) {
    this.opacityStyle = opacity;
  },

  fillRule(rule) {
    this.fillRuleStyle = rule.replaceAll('-', '');
  },

  fillColor(color) {
    this.fillColorStyle = color;
  },

  fillOpacity(opacity) {
    this.fillOpacityStyle = opacity;
  },

  strokeColor(color) {
    this.strokeColorStyle = color;
  },

  strokeOpacity(opacity) {
    this.strokeOpacityStyle = opacity;
  },

  lineCap(value) {
    this.lineCapStyle = value;
  },

  lineJoin(value) {
    this.lineJoinStyle = value;
  },

  lineWidth(width) {
    this.lineWidthStyle = width;
  },

  lineDash(length, space) {
    this.lineDashStyle = `${length} ${space || ''}`.trim();
  },

  fontSize(size) {
    this.fontSizeStyle = size;
  },

  fontFamily(fontFamily) {
    this.fontFamilyStyle = fontFamily;
  },
};
