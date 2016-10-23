'use strict';

const ImageComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const ImageComponentMixin = {
  mountComponent() {
    const {doc} = this._context;
    const node = this._element;
    const {children, src, x, y, ...props} = node.props;

    if (x && y) {
      doc.image(src, x, y, props);
    } else {
      doc.image(src, props);
    }
  }
};

Object.assign(
  ImageComponent.prototype,
  ImageComponentMixin
);

export default ImageComponent;
