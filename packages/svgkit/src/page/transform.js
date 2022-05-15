/* eslint-disable no-param-reassign */

import { createElement } from './element';

export default {
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
  },

  translate(x, y) {
    this.addTransform(`translate(${x},${y})`);
  },

  rotate(angle, origin = [0, 0]) {
    this.addTransform(`rotate(${angle},${origin[0]},${origin[1]})`);
  },

  scale(x, y) {
    if (y === undefined) y = x;
    this.addTransform(`scale(${x},${y})`);
  },
};
