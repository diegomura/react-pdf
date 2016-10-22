'use strict';

import Wrappers from './wrappers';
import ReactMultiChild from 'react/lib/ReactMultiChild';

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
    const node = this.node = this._currentElement;
    const {children, ...props} = node.props;

    switch (node.type) {
      case 'document':
        break;
      case 'page':
      case 'circle':
      case 'rect':
        new Wrappers[node.type](node, context).mountComponent();
        break;
      default:
        context.doc[node.type](children, props);
    }

    // Naive way of not mounting TextComponent
    if (typeof children != 'string') {
      this.mountChildren(children, transaction, context);
    }

    return node;
  },
  // There is no updating for PDF file
  receiveComponent(){},
  // There is no native node
  getHostNode() {},
  // How do you unmount PDF?
  unmountComponent() {},
};

Object.assign(
  PDFRendererComponent.prototype,
  PDFRendererComponentMixin,
  ReactMultiChild.Mixin
);

export default PDFRendererComponent;
