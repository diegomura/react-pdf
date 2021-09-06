/* eslint-disable import/prefer-default-export */

class Element {
  constructor(type, attributes = {}) {
    this.type = type;
    this.children = [];
    this.parent = null;
    this.attributes = attributes;
  }

  setAttribute(name, value) {
    this.attributes[name] = value;
  }

  getAttribute(name) {
    return this.attributes[name];
  }

  setParent(parent) {
    this.parent = parent;
  }

  appendChild(element) {
    this.children.push(element);
    if (element.setParent) element.setParent(this);
  }

  removeChild(element) {
    const index = this.children.indexOf(element);

    if (index > -1) {
      this.children.splice(index, 1);
      element.setParent(null);
    }
  }

  get nodeName() {
    return this.type;
  }

  get childNodes() {
    return this.children;
  }

  get parentNode() {
    return this.parent;
  }
}

export const createElement = (type, attributes) =>
  new Element(type, attributes);
