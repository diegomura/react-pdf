/* eslint-disable operator-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */

import { createElement } from './element';

const STYLES = {
  strokeStyle: {
    svgAttr: 'stroke',
    canvas: '#000000',
    svg: 'none',
    apply: 'stroke',
  },
  fillStyle: {
    svgAttr: 'fill',
    canvas: '#000000',
    svg: null,
    apply: 'fill',
  },
  lineCap: {
    svgAttr: 'stroke-linecap',
    canvas: 'butt',
    svg: 'butt',
    apply: 'stroke',
  },
  lineJoin: {
    svgAttr: 'stroke-linejoin',
    canvas: 'miter',
    svg: 'miter',
    apply: 'stroke',
  },
  miterLimit: {
    svgAttr: 'stroke-miterlimit',
    canvas: 10,
    svg: 4,
    apply: 'stroke',
  },
  lineWidth: {
    svgAttr: 'stroke-width',
    canvas: 1,
    svg: 1,
    apply: 'stroke',
  },
  globalAlpha: {
    svgAttr: 'opacity',
    canvas: 1,
    svg: 1,
    apply: 'fill stroke',
  },
  font: {
    canvas: '10px sans-serif',
  },
  shadowColor: {
    canvas: '#000000',
  },
  shadowOffsetX: {
    canvas: 0,
  },
  shadowOffsetY: {
    canvas: 0,
  },
  shadowBlur: {
    canvas: 0,
  },
  textAlign: {
    canvas: 'start',
  },
  textBaseline: {
    canvas: 'alphabetic',
  },
  lineDash: {
    svgAttr: 'stroke-dasharray',
    canvas: [],
    svg: null,
    apply: 'stroke',
  },
};

function randomString(holder) {
  let randomstring;

  if (!holder) {
    throw new Error(
      'cannot create a random attribute name for an undefined object',
    );
  }
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  randomstring = '';
  do {
    randomstring = '';
    for (let i = 0; i < 12; i += 1) {
      randomstring += chars[Math.floor(Math.random() * chars.length)];
    }
  } while (holder[randomstring]);
  return randomstring;
}

class SVGPage {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.setDefaultStyles();

    this.ids = {};
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
      this[key] = STYLES[key].canvas;
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
    this.currentDefaultPath = '';
    this.currentPosition = {};

    const path = createElement('path');
    const parent = this.closestGroupOrSvg();
    parent.appendChild(path);
    this.currentElement = path;
  }

  addPathCommand(command) {
    this.currentDefaultPath += ' ';
    this.currentDefaultPath += command;
  }

  closePath() {
    if (this.currentDefaultPath) {
      this.addPathCommand('Z');
    }
  }

  moveTo(x, y) {
    if (this.currentElement.nodeName !== 'path') this.beginPath();
    this.currentPosition = { x, y };
    this.addPathCommand(`M ${x} ${y}`);
  }

  lineTo(x, y) {
    this.currentPosition = { x, y };
    if (this.currentDefaultPath.indexOf('M') > -1) {
      this.addPathCommand(`L ${x} ${y}`);
    } else {
      this.addPathCommand(`M ${x} ${y}`);
    }
  }

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    this.currentPosition = { x, y };
    this.addPathCommand(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`);
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

  fill() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('paint-order', 'stroke fill markers');
    }

    this.applyCurrentDefaultPath();
    this.applyStyleToCurrentElement('fill');
  }

  stroke() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('paint-order', 'fill stroke markers');
    }

    this.applyCurrentDefaultPath();
    this.applyStyleToCurrentElement('stroke');
  }

  clip() {
    const group = this.closestGroupOrSvg();
    const clipPath = createElement('clipPath');
    const id = randomString(this.ids);
    const newGroup = createElement('g');

    this.applyCurrentDefaultPath();

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
    this.applyStyleToCurrentElement('fill');
    parent.appendChild(textElement);
  }

  applyCurrentDefaultPath() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('d', this.currentDefaultPath);
    }
  }

  applyStyleToCurrentElement(type) {
    let currentElement = this.currentElement;
    const currentStyleGroup = this.currentElementsToStyle;

    if (currentStyleGroup) {
      currentElement.setAttribute(type, '');
      currentElement = currentStyleGroup.element;
      currentStyleGroup.children.forEach(node => node.setAttribute(type, ''));
    }

    const keys = Object.keys(STYLES);

    for (let i = 0; i < keys.length; i += 1) {
      const style = STYLES[keys[i]];
      const value = this[keys[i]];

      if (
        style.apply &&
        style.apply.indexOf(type) !== -1 &&
        style.svg !== value
      ) {
        let attr = style.svgAttr;
        if (keys[i] === 'globalAlpha') {
          attr = `${type}-${style.svgAttr}`;

          if (currentElement.getAttribute(attr)) continue;
        }

        currentElement.setAttribute(attr, value);
      }
    }
  }

  addTransform(t) {
    const parent = this.closestGroupOrSvg();

    if (parent.childNodes.length > 0) {
      if (this.currentElement.nodeName === 'path') {
        this.currentElementsToStyle = this.currentElementsToStyle || {
          element: parent,
          children: [],
        };
        this.currentElementsToStyle.children.push(this.currentElement);
        this.applyCurrentDefaultPath();
      }

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

  scale(x, y) {
    if (y === undefined) y = x;
    this.addTransform(`scale(${x},${y})`);
  }
}

export default SVGPage;
