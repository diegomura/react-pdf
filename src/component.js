'use strict';

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
    const {children, fillColor, fontSize, ...props} = node.props;

    // Set content fillColor
    context.doc.fillColor(fillColor || 'black');
    context.doc.fontSize(fontSize || 12);

    if (node.type != 'document') {
      switch (node.type) {
        case 'page':
          // Because the document already starts with a page
          // we don't call addPage the first time
          if (context.firstPageSkipped)
            context.doc.addPage();

          context.firstPageSkipped = true;
          break;
        case 'rect':
          var {x, y, width, height, cornerRadius} = props;

          if (cornerRadius) {
            context.doc.roundedRect(x, x, width, height, cornerRadius).stroke();
          } else {
            context.doc.rect(x, x, width, height).stroke();
          }
        case 'circle':
          var {x, y, radius} = props;

          context.doc.circle(x, x, radius).stroke();
          break;
        default:
          context.doc[node.type](children, props);
      }
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
