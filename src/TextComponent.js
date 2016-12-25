'use strict';

const TextComponent = function(element) {
  this.node = null;
  this._currentElement = element;
};

const TextComponentMixin = {
  mountComponent(transaction, nativeParent, nativeContainerInfo, context) {
    this.node = this._currentElement;
    // Just return the text value
    return this._currentElement;
  },
  receiveComponent(){},
  getHostNode() {},
  unmountComponent() {},
};

Object.assign(
  TextComponent.prototype,
  TextComponentMixin
);

export default TextComponent;
