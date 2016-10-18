'use strict';

const ReactMultiChild = require('react/lib/ReactMultiChild');

const PDFRendererComponent = function(element) {
  this.node = null;
  this._mountImage = null;
  this._renderedChildren = null;
  this._currentElement = element;
};

const PDFRendererComponentMixin = {
  getPublicInstance() {
    return this.node;
  },

  mountComponent(
    transaction,
    nativeParent,
    nativeContainerInfo,
    context
  ) {
    this.node = this._currentElement;
    this.mountChildren(this.node.children, transaction, context);

    return this.node;
  },

  receiveComponent(nextElement, transaction, context) {
    // Typically you would diff the props and apply those to the host
    // environment, though all we need to do is swap out our _currentElement.
    const prevElement = this._currentElement;
    this._currentElement = nextElement;

    // this.updateChildren comes from ReactMultiChild.Mixin
    this.updateChildren(nextElement.props.children, transaction, context);
  },
  // there is no native node
  getHostNode() {},
  // how do you unmount PDF?
  unmountComponent() {},
};

Object.assign(
  PDFRendererComponent.prototype,
  PDFRendererComponentMixin,
  ReactMultiChild.Mixin
);

module.exports = PDFRendererComponent;
