'use strict';

const TextComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const TextComponentMixin = {
  mountComponent() {
    const node = this._element;
    const {children, x, y, ...props} = node.props;

    if (x && y) {
      this._context.doc.text(children, x, y, props);
    } else {
      this._context.doc.text(children, props);
    }

    return node;
  }
};

Object.assign(
  TextComponent.prototype,
  TextComponentMixin
);

export default TextComponent;
