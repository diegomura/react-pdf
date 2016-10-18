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

    if (this.node.type != 'document') {
      switch (this.node.type) {
        case 'page':
          // Because the document already starts with a page
          // we don't call addPage the first time
          if (context.firstPageSkipped)
            context.doc.addPage();

          context.firstPageSkipped = true;
          break;
        default:
          context.doc[this.node.type](
            this.node.props.children,
            this.node.props
          );
      }
    }

    // Naive way of not mounting TextComponent
    if (typeof this.node.props.children != 'string') {
      this.mountChildren(this.node.props.children, transaction, context);
    }

    return this.node;
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

module.exports = PDFRendererComponent;
