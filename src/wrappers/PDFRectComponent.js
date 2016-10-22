'use strict';

const PDFRectComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const PDFRectComponentMixin = {
  mountComponent() {
    const node = this._element;
    const {children, x, y, width, height, cornerRadius, ...props} = node.props;

    if (cornerRadius) {
      this._context.doc.roundedRect(x, y, width, height, cornerRadius).stroke();
    } else {
      this._context.doc.rect(x, y, width, height).stroke();
    }

    return node;
  }
};

Object.assign(
  PDFRectComponent.prototype,
  PDFRectComponentMixin
);

export default PDFRectComponent;
