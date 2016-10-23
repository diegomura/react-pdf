'use strict';

const CircleComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const CircleComponentMixin = {
  mountComponent() {
    const node = this._element;
    const {x, y, radius} = node.props;

    this._context.doc.circle(x, y, radius).stroke();
  }
};

Object.assign(
  CircleComponent.prototype,
  CircleComponentMixin
);

export default CircleComponent;
