'use strict';

const EmptyComponent = function(element, context) {
  this._element = element;
  this._context = context;
};

const EmptyComponentMixin = {
  mountComponent() {
    return this._element.props.children;
  }
};

Object.assign(
  EmptyComponent.prototype,
  EmptyComponentMixin
);

export default EmptyComponent;
