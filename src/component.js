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
    let node = this.node = this._currentElement;

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
          var {x, y, width, height, cornerRadius} = node.props;

          if (cornerRadius) {
            context.doc.roundedRect(x, x, width, height, cornerRadius).stroke();
          } else {
            context.doc.rect(x, x, width, height).stroke();
          }
        case 'circle':
          var {x, y, radius} = node.props;

          context.doc.circle(x, x, radius).stroke();
          break;
        default:
          context.doc[node.type](
            node.props.children,
            node.props
          );
      }
    }

    // Naive way of not mounting TextComponent
    if (typeof node.props.children != 'string') {
      this.mountChildren(node.props.children, transaction, context);
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

export default PDFRendererComponent;
