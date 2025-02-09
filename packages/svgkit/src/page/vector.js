import uuid from '../utils/uuid';
import { Gradient } from '../gradient';
import { createElement } from './element';

export default {
  beginPath() {
    this.currentPath = '';
    this.currentPosition = {};

    const path = createElement('path');
    const parent = this.closestGroupOrSvg();
    parent.appendChild(path);
    this.currentElement = path;
  },

  addPathCommand(command) {
    if (!this.currentPath) this.beginPath();

    this.currentPath += ' ';
    this.currentPath += command;
  },

  closePath() {
    if (this.currentPath) {
      this.addPathCommand('Z');
    }
  },

  moveTo(x, y) {
    if (!this.currentPath) this.beginPath();

    if (this.currentElement.nodeName !== 'path') this.beginPath();
    this.currentPosition = { x, y };

    this.addPathCommand(`M ${x} ${y}`);
  },

  lineTo(x, y) {
    if (!this.currentPath) this.beginPath();

    this.currentPosition = { x, y };

    if (this.currentPath.indexOf('M') > -1) {
      this.addPathCommand(`L ${x} ${y}`);
    } else {
      this.addPathCommand(`M ${x} ${y}`);
    }
  },

  bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y) {
    if (!this.currentPath) this.beginPath();

    this.currentPosition = { x, y };

    this.addPathCommand(`C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${x} ${y}`);
  },

  quadraticCurveTo(cpx, cpy, x, y) {
    if (!this.currentPath) this.beginPath();

    this.currentPosition = { x, y };

    this.addPathCommand(`Q ${cpx} ${cpy} ${x} ${y}`);
  },

  rect(x, y, width, height) {
    this.beginPath();
    this.moveTo(x, y);
    this.lineTo(x + width, y);
    this.lineTo(x + width, y + height);
    this.lineTo(x, y + height);
    this.lineTo(x, y);
    this.closePath();
  },

  circle(x, y, radius) {
    this.beginPath();

    const startX = x + radius * Math.cos(0);
    const startY = y + radius * Math.sin(0);

    this.lineTo(startX, startY);

    this.addPathCommand(
      `A ${radius} ${radius} 0 1 1 ${startX} ${startY - 0.5}`,
    );

    this.closePath();
  },

  gradient(gradient) {
    if (gradient.added) return;

    const element = createElement(gradient.type, gradient.attributes);

    gradient.stops.forEach((stop) => {
      const stopChild = createElement('stop');

      stopChild.setAttribute('offset', stop.offset);
      stopChild.setAttribute('stop-color', stop.color);
      stopChild.setAttribute('stop-opacity', stop.opacity);

      element.appendChild(stopChild);
    });

    this.defs.appendChild(element);

    gradient.added = true;
  },

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
  },

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
  },

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
  },

  applyCurrentPath() {
    if (this.currentElement.nodeName === 'path') {
      this.currentElement.setAttribute('d', this.currentPath);
    }
  },

  clip() {
    const group = this.closestGroupOrSvg();
    const clipPath = createElement('clipPath');
    const id = uuid();
    const newGroup = createElement('g');

    this.applyCurrentPath();

    group.removeChild(this.currentElement);
    clipPath.setAttribute('id', id);
    clipPath.appendChild(this.currentElement);

    this.defs.appendChild(clipPath);

    group.setAttribute('clip-path', `url(#${id})`);
    group.appendChild(newGroup);

    this.currentElement = newGroup;
  },
};
