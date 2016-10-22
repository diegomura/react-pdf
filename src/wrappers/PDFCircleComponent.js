'use strict';

const PDFCircleComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const PDFCircleComponentMixin = {
  mountComponent() {
    const node = this._element;
    const {x, y, radius} = node.props;

    this._context.doc.circle(x, x, radius).stroke();
  }
};

Object.assign(
  PDFCircleComponent.prototype,
  PDFCircleComponentMixin
);

export default PDFCircleComponent;
