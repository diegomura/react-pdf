'use strict';

const PDFTextComponent = function(element) {
  this._currentElement = element;
};

const PDFTextComponentMixin = {
  mountComponent(transaction, nativeParent, nativeContainerInfo, context) {
    // Just return the text value
    return this._currentElement;
  },
  receiveComponent(){},
  getHostNode() {},
  unmountComponent() {},
};

Object.assign(
  PDFTextComponent.prototype,
  PDFTextComponentMixin
);

export default PDFTextComponent;
