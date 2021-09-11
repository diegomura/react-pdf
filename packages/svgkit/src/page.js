/* eslint-disable no-useless-escape */
/* eslint-disable operator-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import { randomString } from './utils';
import { createElement } from './element';
import { Gradient } from './gradient';
import getSize from './getPageSize';

// const DEFAULT_MARGINS = {
//   top: 0,
//   left: 0,
//   bottom: 0,
//   right: 0,
// };

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
  // font: {
  //   default: '10px sans-serif',
  // },
  // textAlign: {
  //   default: 'start',
  // },
  // textBaseline: {
  //   default: 'alphabetic',
  // },
};

class SVGPage {
  // TODO: consider margins
  constructor({
    size = 'letter',
    orientation = 'portrait',
    // margins = DEFAULT_MARGINS,
  } = {}) {
    const { width, height } = getSize(size, orientation);

    this.width = width;
    this.height = height;

    this.setDefaultStyles();

    this.groupStack = [];
    this.stack = [this.getStyleState()];

    this.root = createElement('svg');
    this.root.setAttribute('version', '1.1');
    this.root.setAttribute('width', this.width);
    this.root.setAttribute('height', this.height);

    this.defs = createElement('defs');
    this.root.appendChild(this.defs);

    this.currentElement = createElement('g');
    this.root.appendChild(this.currentElement);
  }

  setDefaultStyles = () => {
    const keys = Object.keys(STYLES);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this[key] = STYLES[key];
    }
  };

  getStyleState() {
    const styleState = {};
    const keys = Object.keys(STYLES);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      styleState[key] = this[key];
    }

    return styleState;
  }

  applyStyleState(styleState) {
    const keys = Object.keys(styleState);

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      this[key] = styleState[key];
    }
  }

  closestGroupOrSvg(node) {
    node = node || this.currentElement;

    if (node.nodeName === 'g' || node.nodeName === 'svg') return node;

    return this.closestGroupOrSvg(node.parentNode);
  }

  save() {
    const group = createElement('g');
    const parent = this.closestGroupOrSvg();

    this.groupStack.push(parent);
    parent.appendChild(group);

    this.currentElement = group;
    this.stack.push(this.getStyleState());
  }

  restore() {
    this.currentElement = this.groupStack.pop();
    this.currentElementsToStyle = null;

    // Clearing canvas will make the poped group invalid, currentElement is set to the root group node.
    if (!this.currentElement) {
      this.currentElement = this.root.childNodes[1];
    }

    const state = this.stack.pop();
    this.applyStyleState(state);
  }

  beginPath() {
    this.currentPath = '';
    this.currentPosition = {};

    const path = createElement('path');
    const parent = this.closestGroupOrSvg();
    parent.appendChild(path);
    this.currentElement = path;
  }

  addPathCommand(command) {
    if (!this.currentPath) this.beginPath();

    this.currentPath += ' ';
    this.currentPath += command;
  }

  closePath() {
    if (this.currentPath) {
      this.addPathCommand('Z');
    }
  }

  moveTo(x, y) {
    if (!this.currentPath) this.beginPath();

    if (this.currentElement.nodeName !== 'path') this.beginPath();
    this.currentPosition = { x, y };

    this.addPathCommand(`M ${x} ${y}`);
  }

  lineTo(x, y) {
    if (!this.currentPath) this.beginPath();

    this.currentPosition = { x, y };

    if (this.currentPath.indexOf('M') > -1) {
      this.addPathCommand(`L ${x} ${y}`);
    } else {
      this.addPathCommand(`M ${x} ${y}`);
    }
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    if (!this.currentPath) this.beginPath();

    this.currentPosition = { x, y };

    this.addPathCommand(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`);
  }

  quadraticCurveTo(cpx, cpy, x, y) {
    if (!this.currentPath) this.beginPath();

    this.currentPosition = { x, y };

    this.addPathCommand(`Q ${cpx} ${cpy} ${x} ${y}`);
  }

  rect(x, y, width, height) {
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(x + width, y);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.lineTo(x, y);
    this.closePath();
  }

  circle(x, y, radius) {
    this.beginPath();

    const startX = x + radius * Math.cos(0);
    const startY = y + radius * Math.sin(0);

    this.lineTo(startX, startY);

    this.addPathCommand(
      `A ${radius} ${radius} 0 1 1 ${startX} ${startY - 0.5}`,
    );

    this.closePath();
  }

  opacity(opacity) {
    this.opacityStyle = opacity;
  }

  fillRule(rule) {
    this.fillRuleStyle = rule.replaceAll('-', '');
  }

  fillColor(color) {
    this.fillColorStyle = color;
  }

  fillOpacity(opacity) {
    this.fillOpacityStyle = opacity;
  }

  strokeColor(color) {
    this.strokeColorStyle = color;
  }

  strokeOpacity(opacity) {
    this.strokeOpacityStyle = opacity;
  }

  lineCap(value) {
    this.lineCapStyle = value;
  }

  lineJoin(value) {
    this.lineJoinStyle = value;
  }

  lineWidth(width) {
    this.lineWidthStyle = width;
  }

  lineDash(length, space) {
    this.lineDashStyle = `${length} ${space || ''}`.trim();
  }

  gradient(gradient) {
    if (gradient.added) return;

    const element = createElement(gradient.type, gradient.attributes);

    gradient.stops.forEach(stop => {
      const stopChild = createElement('stop');

      stopChild.setAttribute('offset', stop.offset);
      stopChild.setAttribute('stop-color', stop.color);
      stopChild.setAttribute('stop-opacity', stop.opacity);

      element.appendChild(stopChild);
    });

    this.defs.appendChild(element);

    gradient.added = true;
  }

  fill() {
    let fillColorStyle = this.fillColorStyle;

    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('paint-order', 'stroke fill markers');
    }

    this.applyCurrentPath();

    if (this.fillColorStyle instanceof Gradient) {
      this.gradient(fillColorStyle);
      fillColorStyle = `url('#${fillColorStyle.id}')`;
    }

    this.currentElement.setAttribute('stroke', 'none');
    this.currentElement.setAttribute('fill', fillColorStyle);
    this.currentElement.setAttribute('opacity', this.opacityStyle);
    this.currentElement.setAttribute('fill-rule', this.fillRuleStyle);
    this.currentElement.setAttribute('fill-opacity', this.fillOpacityStyle);

    this.currentPath = '';
  }

  stroke() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('paint-order', 'fill stroke markers');
    }

    this.applyCurrentPath();

    this.currentElement.setAttribute('fill', 'none');
    this.currentElement.setAttribute('opacity', this.opacityStyle);
    this.currentElement.setAttribute('stroke', this.strokeColorStyle);
    this.currentElement.setAttribute('stroke-width', this.lineWidthStyle);
    this.currentElement.setAttribute('stroke-linecap', this.lineCapStyle);
    this.currentElement.setAttribute('stroke-linejoin', this.lineJoinStyle);
    this.currentElement.setAttribute('stroke-dasharray', this.lineDashStyle);
    this.currentElement.setAttribute('stroke-opacity', this.strokeOpacityStyle);

    this.currentPath = '';
  }

  fillAndStroke() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('paint-order', 'fill stroke markers');
    }

    this.applyCurrentPath();

    this.currentElement.setAttribute('fill', this.fillColorStyle);
    this.currentElement.setAttribute('fill-rule', this.fillRuleStyle);
    this.currentElement.setAttribute('fill-opacity', this.fillOpacityStyle);
    this.currentElement.setAttribute('opacity', this.opacityStyle);
    this.currentElement.setAttribute('stroke', this.strokeColorStyle);
    this.currentElement.setAttribute('stroke-width', this.lineWidthStyle);
    this.currentElement.setAttribute('stroke-linecap', this.lineCapStyle);
    this.currentElement.setAttribute('stroke-linejoin', this.lineJoinStyle);
    this.currentElement.setAttribute('stroke-dasharray', this.lineDashStyle);
    this.currentElement.setAttribute('stroke-opacity', this.strokeOpacityStyle);

    this.currentPath = '';
  }

  clip() {
    const group = this.closestGroupOrSvg();
    const clipPath = createElement('clipPath');
    const id = randomString();
    const newGroup = createElement('g');

    this.applyCurrentPath();

    group.removeChild(this.currentElement);
    clipPath.setAttribute('id', id);
    clipPath.appendChild(this.currentElement);

    this.defs.appendChild(clipPath);

    group.setAttribute('clip-path', `url(#${id})`);
    group.appendChild(newGroup);

    this.currentElement = newGroup;
  }

  image(href, x, y, width, height) {
    const image = createElement('image');
    const parent = this.closestGroupOrSvg();

    image.setAttribute('x', x);
    image.setAttribute('y', y);
    image.setAttribute('width', width);
    image.setAttribute('height', height);
    image.setAttribute('xlink:href', href);
    image.setAttribute('preserveAspectRatio', 'none');

    parent.appendChild(image);
  }

  parseFont() {
    const regex = /^\s*(?=(?:(?:[-a-z]+\s*){0,2}(italic|oblique))?)(?=(?:(?:[-a-z]+\s*){0,2}(small-caps))?)(?=(?:(?:[-a-z]+\s*){0,2}(bold(?:er)?|lighter|[1-9]00))?)(?:(?:normal|\1|\2|\3)\s*){0,3}((?:xx?-)?(?:small|large)|medium|smaller|larger|[.\d]+(?:\%|in|[cem]m|ex|p[ctx]))(?:\s*\/\s*(normal|[.\d]+(?:\%|in|[cem]m|ex|p[ctx])))?\s*([-,\'\"\sa-z0-9]+?)\s*$/i;
    const fontPart = regex.exec(this.font);
    const data = {
      style: fontPart[1] || 'normal',
      size: fontPart[4] || '10px',
      family: fontPart[6] || 'sans-serif',
      weight: fontPart[3] || 'normal',
      href: null,
    };

    return data;
  }

  text(glyphs, positions, x, y) {
    const font = this.parseFont();
    const parent = this.closestGroupOrSvg();
    const fontSize = parseInt(font.size.slice(0, -2), 10);
    const scale = 1000 / fontSize;

    const glyphPositions = positions.reduce(
      (acc, pos) => {
        const lastValue = acc[acc.length - 1];
        const value = lastValue + pos.xAdvance / scale;
        return [...acc, value];
      },
      [0],
    );

    const textElement = createElement('text');
    const tspanElement = createElement('tspan', {
      y,
      x: glyphPositions.join(' '),
      'font-family': font.family,
      'font-size': font.size,
      'font-style': font.style,
      'font-weight': font.weight,
    });

    const codePoints = glyphs.map(glyph => parseInt(glyph, 16));

    textElement.appendChild(tspanElement);
    tspanElement.appendChild(String.fromCodePoint(...codePoints));
    this.currentElement = tspanElement;

    parent.appendChild(textElement);
  }

  applyCurrentPath() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('d', this.currentPath);
    }
  }

  addTransform(t) {
    const parent = this.closestGroupOrSvg();

    if (parent.childNodes.length > 0) {
      const group = createElement('g');
      parent.appendChild(group);
      this.currentElement = group;
    }

    let transform = this.currentElement.getAttribute('transform');
    if (transform) {
      transform += ' ';
    } else {
      transform = '';
    }
    transform += t;
    this.currentElement.setAttribute('transform', transform);
  }

  translate(x, y) {
    this.addTransform(`translate(${x},${y})`);
  }

  rotate(angle, origin = [0, 0]) {
    this.addTransform(`rotate(${angle},${origin[0]},${origin[1]})`);
  }

  scale(x, y) {
    if (y === undefined) y = x;
    this.addTransform(`scale(${x},${y})`);
  }
}

export default SVGPage;
