import Text from './text';
import Vector from './vector';
import Images from './images';
import Styles from './styles';
import Transform from './transform';
import { createElement } from './element';
import getSize from '../utils/getPageSize';

// const DEFAULT_MARGINS = {
//   top: 0,
//   left: 0,
//   bottom: 0,
//   right: 0,
// };

class SVGPage {
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

    if (!this.currentElement) {
      this.currentElement = this.root.childNodes[1];
    }

    const state = this.stack.pop();
    this.applyStyleState(state);
  }

  setDefaultStyles() {}

  applyStyleState(state) {}

  getStyleState() {}
}

const mixin = (methods) => {
  return (() => {
    const result = [];
    for (const name in methods) {
      const method = methods[name];
      result.push((SVGPage.prototype[name] = method));
    }
    return result;
  })();
};

mixin(Text);
mixin(Vector);
mixin(Styles);
mixin(Images);
mixin(Transform);

export default SVGPage;
