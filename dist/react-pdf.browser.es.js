import _inheritsLoose from '@babel/runtime/helpers/inheritsLoose';
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/objectWithoutPropertiesLoose';
import _extends from '@babel/runtime/helpers/extends';
import React, { Fragment } from 'react';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import BlobStream from 'blob-stream';
import ReactFiberReconciler from 'react-reconciler';
import { unstable_scheduleCallback, unstable_cancelCallback } from 'scheduler';
import _createClass from '@babel/runtime/helpers/createClass';
import PDFDocument, { PDFFontFactory } from 'pdfkit';
import Yoga from 'yoga-layout-prebuilt';
import { mergeDeepWith, isNil, compose, equals, type, toPairsIn, pick, pathOr, last, propEq, complement, prop } from 'ramda';
import matchMedia from 'media-engine';
import _assertThisInitialized from '@babel/runtime/helpers/assertThisInitialized';
import PDFRenderer$1 from '@react-pdf/textkit/renderers/pdf';
import AttributedString from '@react-pdf/textkit/attributedString';
import 'is-url';
import fontkit from '@react-pdf/fontkit';
import fetch from 'cross-fetch';
import layoutEngine from '@react-pdf/textkit/layout';
import linebreaker from '@react-pdf/textkit/engines/linebreaker';
import justification from '@react-pdf/textkit/engines/justification';
import textDecoration from '@react-pdf/textkit/engines/textDecoration';
import scriptItemizer from '@react-pdf/textkit/engines/scriptItemizer';
import wordHyphenation from '@react-pdf/textkit/engines/wordHyphenation';
import emojiRegex from 'emoji-regex';
import PNG from '@react-pdf/png-js';
import _wrapPages from 'page-wrapping';

function printWarning(format) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  var argIndex = 0;
  var message = 'Warning: ' + format.replace(/%s/g, function () {
    return args[argIndex++];
  });

  if (typeof console !== 'undefined') {
    console.error(message);
  }

  try {
    throw new Error(message);
  } catch (x) {}
}

var __DEV__ = process.env.NODE_ENV !== 'production';

var warning = __DEV__ ? function (condition, format) {
  if (format === undefined) {
    throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
  }

  if (!condition) {
    for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      args[_key2 - 2] = arguments[_key2];
    }

    printWarning.apply(void 0, [format].concat(args));
  }
} : function () {};

var Root =
/*#__PURE__*/
function () {
  function Root() {
    this.isDirty = false;
    this.document = null;
    this.instance = null;
  }

  var _proto = Root.prototype;

  _proto.appendChild = function appendChild(child) {
    this.document = child;
  };

  _proto.removeChild = function removeChild() {
    this.document.cleanup();
    this.document = null;
  };

  _proto.markDirty = function markDirty() {
    this.isDirty = true;
  };

  _proto.cleanup = function cleanup() {
    this.document.cleanup();
  };

  _proto.finish = function finish() {
    this.document.finish();
  };

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.instance = new PDFDocument({
                autoFirstPage: false
              });
              _context.next = 3;
              return this.document.render();

            case 3:
              this.cleanup();
              this.isDirty = false;

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Root, [{
    key: "name",
    get: function get() {
      return 'Root';
    }
  }]);

  return Root;
}();

var upperFirst = function upperFirst(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

var isPercent = function isPercent(value) {
  return /((-)?\d+\.?\d*)%/g.exec(value);
};

var matchPercent = function matchPercent(value) {
  var match = isPercent(value);

  if (match) {
    var _value = parseFloat(match[1], 10);

    var percent = _value / 100;
    return {
      value: _value,
      percent: percent,
      absValue: Math.abs(_value),
      absPercent: Math.abs(percent)
    };
  }

  return null;
};

var YOGA_CONFIG = Yoga.Config.create();
YOGA_CONFIG.setPointScaleFactor(0);

var Node =
/*#__PURE__*/
function () {
  function Node() {
    this.parent = null;
    this.children = [];
    this.computed = false;
    this.layout = Yoga.Node.createWithConfig(YOGA_CONFIG);
  }

  var _proto = Node.prototype;

  _proto.appendChild = function appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.layout.insertChild(child.layout, this.layout.getChildCount());
    }
  };

  _proto.appendChildBefore = function appendChildBefore(child, beforeChild) {
    var index = this.children.indexOf(beforeChild);

    if (index !== -1 && child) {
      child.parent = this;
      this.children.splice(index, 0, child);
      this.layout.insertChild(child.layout, index);
    }
  };

  _proto.removeChild = function removeChild(child) {
    var index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.layout.removeChild(child.layout);
    }

    child.cleanup();
  };

  _proto.removeAllChilds = function removeAllChilds() {
    var children = [].concat(this.children);

    for (var i = 0; i < children.length; i++) {
      children[i].remove();
    }
  };

  _proto.remove = function remove() {
    this.parent.removeChild(this);
  };

  _proto.setDimension = function setDimension(attr, value) {
    var fixedMethod = "set" + upperFirst(attr);
    var percentMethod = fixedMethod + "Percent";
    var percent = matchPercent(value);

    if (percent) {
      this.layout[percentMethod](percent.value);
    } else {
      this.layout[fixedMethod](value);
    }
  };

  _proto.setPosition = function setPosition(edge, value) {
    var percent = matchPercent(value);

    if (percent) {
      this.layout.setPositionPercent(edge, percent.value);
    } else {
      this.layout.setPosition(edge, value);
    }
  };

  _proto.setPadding = function setPadding(edge, value) {
    var percent = matchPercent(value);

    if (percent) {
      this.layout.setPaddingPercent(edge, percent.value);
    } else {
      this.layout.setPadding(edge, value);
    }
  };

  _proto.setMargin = function setMargin(edge, value) {
    var percent = matchPercent(value);

    if (percent) {
      this.layout.setMarginPercent(edge, percent.value);
    } else {
      this.layout.setMargin(edge, value);
    }
  };

  _proto.setBorder = function setBorder(edge, value) {
    if (matchPercent(value)) {
      throw new Error('Node: You cannot set percentage border widths');
    }

    this.layout.setBorder(edge, value);
  };

  _proto.getAbsoluteLayout = function getAbsoluteLayout() {
    var parent = this.parent;
    var parentLayout = parent && parent.getAbsoluteLayout ? parent.getAbsoluteLayout() : {
      left: 0,
      top: 0
    };
    return {
      left: this.left + parentLayout.left,
      top: this.top + parentLayout.top,
      height: this.height,
      width: this.width
    };
  };

  _proto.copyStyle = function copyStyle(node) {
    this.layout.copyStyle(node.layout);
  };

  _proto.calculateLayout = function calculateLayout() {
    this.layout.calculateLayout();
    this.computed = true;
  };

  _proto.isEmpty = function isEmpty() {
    return this.children.length === 0;
  };

  _proto.markDirty = function markDirty() {
    return this.layout.markDirty();
  };

  _proto.onAppendDynamically = function onAppendDynamically() {};

  _proto.cleanup = function cleanup() {
    this.children.forEach(function (c) {
      return c.cleanup();
    });
    this.layout.unsetMeasureFunc();
    Yoga.Node.destroy(this.layout);
  };

  _createClass(Node, [{
    key: "position",
    get: function get() {
      return this.layout.getPositionType() === Yoga.POSITION_TYPE_ABSOLUTE ? 'absolute' : 'relative';
    },
    set: function set(value) {
      this.layout.setPositionType(value === 'absolute' ? Yoga.POSITION_TYPE_ABSOLUTE : Yoga.POSITION_TYPE_RELATIVE);
    }
  }, {
    key: "top",
    get: function get() {
      return this.layout.getComputedTop() || 0;
    },
    set: function set(value) {
      this.setPosition(Yoga.EDGE_TOP, value);
    }
  }, {
    key: "left",
    get: function get() {
      return this.layout.getComputedLeft() || 0;
    },
    set: function set(value) {
      this.setPosition(Yoga.EDGE_LEFT, value);
    }
  }, {
    key: "right",
    get: function get() {
      return this.layout.getComputedRight() || 0;
    },
    set: function set(value) {
      this.setPosition(Yoga.EDGE_RIGHT, value);
    }
  }, {
    key: "bottom",
    get: function get() {
      return this.layout.getComputedBottom() || 0;
    },
    set: function set(value) {
      this.setPosition(Yoga.EDGE_BOTTOM, value);
    }
  }, {
    key: "width",
    get: function get() {
      return this.layout.getComputedWidth();
    },
    set: function set(value) {
      this.setDimension('width', value);
    }
  }, {
    key: "minWidth",
    get: function get() {
      return this.layout.getMinWidth().value;
    },
    set: function set(value) {
      this.setDimension('minWidth', value);
    }
  }, {
    key: "maxWidth",
    get: function get() {
      return this.layout.getMaxWidth().value;
    },
    set: function set(value) {
      this.setDimension('maxWidth', value);
    }
  }, {
    key: "height",
    get: function get() {
      return this.layout.getComputedHeight();
    },
    set: function set(value) {
      this.setDimension('height', value);
    }
  }, {
    key: "minHeight",
    get: function get() {
      return this.layout.getMinHeight().value;
    },
    set: function set(value) {
      this.setDimension('minHeight', value);
    }
  }, {
    key: "maxHeight",
    get: function get() {
      return this.layout.getMaxHeight().value;
    },
    set: function set(value) {
      this.setDimension('maxHeight', value);
    }
  }, {
    key: "paddingTop",
    get: function get() {
      return this.layout.getComputedPadding(Yoga.EDGE_TOP) || 0;
    },
    set: function set(value) {
      this.setPadding(Yoga.EDGE_TOP, value);
    }
  }, {
    key: "paddingRight",
    get: function get() {
      return this.layout.getComputedPadding(Yoga.EDGE_RIGHT) || 0;
    },
    set: function set(value) {
      this.setPadding(Yoga.EDGE_RIGHT, value);
    }
  }, {
    key: "paddingBottom",
    get: function get() {
      return this.layout.getComputedPadding(Yoga.EDGE_BOTTOM) || 0;
    },
    set: function set(value) {
      this.setPadding(Yoga.EDGE_BOTTOM, value);
    }
  }, {
    key: "paddingLeft",
    get: function get() {
      return this.layout.getComputedPadding(Yoga.EDGE_LEFT) || 0;
    },
    set: function set(value) {
      this.setPadding(Yoga.EDGE_LEFT, value);
    }
  }, {
    key: "marginTop",
    get: function get() {
      return this.layout.getComputedMargin(Yoga.EDGE_TOP) || 0;
    },
    set: function set(value) {
      this.setMargin(Yoga.EDGE_TOP, value);
    }
  }, {
    key: "marginRight",
    get: function get() {
      return this.layout.getComputedMargin(Yoga.EDGE_RIGHT) || 0;
    },
    set: function set(value) {
      this.setMargin(Yoga.EDGE_RIGHT, value);
    }
  }, {
    key: "marginBottom",
    get: function get() {
      return this.layout.getComputedMargin(Yoga.EDGE_BOTTOM) || 0;
    },
    set: function set(value) {
      this.setMargin(Yoga.EDGE_BOTTOM, value);
    }
  }, {
    key: "marginLeft",
    get: function get() {
      return this.layout.getComputedMargin(Yoga.EDGE_LEFT) || 0;
    },
    set: function set(value) {
      this.setMargin(Yoga.EDGE_LEFT, value);
    }
  }, {
    key: "borderTopWidth",
    get: function get() {
      return this.layout.getComputedBorder(Yoga.EDGE_TOP) || 0;
    },
    set: function set(value) {
      this.setBorder(Yoga.EDGE_TOP, value);
    }
  }, {
    key: "borderRightWidth",
    get: function get() {
      return this.layout.getComputedBorder(Yoga.EDGE_RIGHT) || 0;
    },
    set: function set(value) {
      this.setBorder(Yoga.EDGE_RIGHT, value);
    }
  }, {
    key: "borderBottomWidth",
    get: function get() {
      return this.layout.getComputedBorder(Yoga.EDGE_BOTTOM) || 0;
    },
    set: function set(value) {
      this.setBorder(Yoga.EDGE_BOTTOM, value);
    }
  }, {
    key: "borderLeftWidth",
    get: function get() {
      return this.layout.getComputedBorder(Yoga.EDGE_LEFT) || 0;
    },
    set: function set(value) {
      this.setBorder(Yoga.EDGE_LEFT, value);
    }
  }, {
    key: "padding",
    get: function get() {
      return {
        top: this.paddingTop,
        right: this.paddingRight,
        bottom: this.paddingBottom,
        left: this.paddingLeft
      };
    },
    set: function set(value) {
      this.paddingTop = value;
      this.paddingRight = value;
      this.paddingBottom = value;
      this.paddingLeft = value;
    }
  }, {
    key: "margin",
    get: function get() {
      return {
        top: this.marginTop,
        right: this.marginRight,
        bottom: this.marginBottom,
        left: this.marginLeft
      };
    },
    set: function set(value) {
      this.marginTop = value;
      this.marginRight = value;
      this.marginBottom = value;
      this.marginLeft = value;
    }
  }]);

  return Node;
}();

var yogaValue = function yogaValue(prop, value) {
  var isAlignType = function isAlignType(prop) {
    return prop === 'alignItems' || prop === 'alignContent' || prop === 'alignSelf';
  };

  switch (value) {
    case 'auto':
      if (prop === 'alignSelf') {
        return Yoga.ALIGN_AUTO;
      }

      break;

    case 'flex':
      return Yoga.DISPLAY_FLEX;

    case 'none':
      return Yoga.DISPLAY_NONE;

    case 'row':
      return Yoga.FLEX_DIRECTION_ROW;

    case 'row-reverse':
      return Yoga.FLEX_DIRECTION_ROW_REVERSE;

    case 'column':
      return Yoga.FLEX_DIRECTION_COLUMN;

    case 'column-reverse':
      return Yoga.FLEX_DIRECTION_COLUMN_REVERSE;

    case 'stretch':
      return Yoga.ALIGN_STRETCH;

    case 'baseline':
      return Yoga.ALIGN_BASELINE;

    case 'space-around':
      if (prop === 'justifyContent') {
        return Yoga.JUSTIFY_SPACE_AROUND;
      } else if (isAlignType(prop)) {
        return Yoga.ALIGN_SPACE_AROUND;
      }

      break;

    case 'space-between':
      if (prop === 'justifyContent') {
        return Yoga.JUSTIFY_SPACE_BETWEEN;
      } else if (isAlignType(prop)) {
        return Yoga.ALIGN_SPACE_BETWEEN;
      }

      break;

    case 'around':
      return Yoga.JUSTIFY_SPACE_AROUND;

    case 'between':
      return Yoga.JUSTIFY_SPACE_BETWEEN;

    case 'wrap':
      return Yoga.WRAP_WRAP;

    case 'wrap-reverse':
      return Yoga.WRAP_WRAP_REVERSE;

    case 'nowrap':
      return Yoga.WRAP_NO_WRAP;

    case 'flex-start':
      if (prop === 'justifyContent') {
        return Yoga.JUSTIFY_FLEX_START;
      } else if (isAlignType(prop)) {
        return Yoga.ALIGN_FLEX_START;
      }

      break;

    case 'flex-end':
      if (prop === 'justifyContent') {
        return Yoga.JUSTIFY_FLEX_END;
      } else if (isAlignType(prop)) {
        return Yoga.ALIGN_FLEX_END;
      }

      break;

    case 'center':
      if (prop === 'justifyContent') {
        return Yoga.JUSTIFY_CENTER;
      } else if (isAlignType(prop)) {
        return Yoga.ALIGN_CENTER;
      }

      break;

    default:
      return value;
  }
}; // These are not supported yet

var DPI = 72; // 72pt per inch.

var parseValue = function parseValue(value) {
  var match = /^(-?\d*\.?\d+)(in|mm|cm|pt|vh|vw)?$/g.exec(value);

  if (match) {
    return {
      value: parseFloat(match[1], 10),
      unit: match[2] || 'pt'
    };
  }

  return {
    value: value,
    unit: undefined
  };
};

var parseScalar = function parseScalar(value, container) {
  var scalar = parseValue(value);

  switch (scalar.unit) {
    case 'in':
      return scalar.value * DPI;

    case 'mm':
      return scalar.value * (1 / 25.4) * DPI;

    case 'cm':
      return scalar.value * (1 / 2.54) * DPI;

    case 'vh':
      if (container.isAutoHeight) {
        throw new Error('vh unit not supported in auto-height pages. Please specify page height if you want to use vh.');
      }

      return scalar.value * (container.height / 100);

    case 'vw':
      return scalar.value * (container.width / 100);

    default:
      return scalar.value;
  }
};

var isBorderStyle = function isBorderStyle(key, value) {
  return key.match(/^border/) && typeof value === 'string';
};

var matchBorderShorthand = function matchBorderShorthand(value) {
  return value.match(/(\d+(px|in|mm|cm|pt|vw|vh)?)\s(\S+)\s(\S+)/);
}; // Transforms shorthand border values


var processBorders = function processBorders(key, value) {
  var match = matchBorderShorthand(value);

  if (match) {
    if (key.match(/.Color/)) {
      return match[4];
    } else if (key.match(/.Style/)) {
      return match[3];
    } else if (key.match(/.Width/)) {
      return match[1];
    } else {
      throw new Error("StyleSheet: Invalid '" + value + "' for '" + key + "'");
    }
  }

  return value;
};

var isBoxModelStyle = function isBoxModelStyle(key, value) {
  return key.match(/^(margin)|(padding)/) && typeof value === 'string';
};

var matchBoxModel = function matchBoxModel(value) {
  return value.match(/\d+(px|in|mm|cm|pt|%|vw|vh)?/g);
}; // Transforms shorthand margin and padding values


var processBoxModel = function processBoxModel(key, value) {
  var match = matchBoxModel(value);

  if (match) {
    if (key.match(/.Top/)) {
      return match[0];
    } else if (key.match(/.Right/)) {
      return match[1] || match[0];
    } else if (key.match(/.Bottom/)) {
      return match[2] || match[0];
    } else if (key.match(/.Left/)) {
      return match[3] || match[1] || match[0];
    } else {
      throw new Error("StyleSheet: Invalid '" + value + "' for '" + key + "'");
    }
  }

  return value;
};

// https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Common_weight_name_mapping
var FONT_WEIGHTS = {
  thin: 100,
  hairline: 100,
  ultralight: 200,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  demibold: 600,
  bold: 700,
  ultrabold: 800,
  extrabold: 800,
  heavy: 900,
  black: 900
};
var isFontWeightStyle = function isFontWeightStyle(key) {
  return key.match(/^fontWeight/);
};
var processFontWeight = function processFontWeight(value) {
  if (!value) return FONT_WEIGHTS.normal;
  if (typeof value === 'number') return value;
  return FONT_WEIGHTS[value.toLowerCase()];
};

var isObjectPositionStyle = function isObjectPositionStyle(key, value) {
  return key.match(/^objectPosition/) && typeof value === 'string';
};

var matchObjectPosition = function matchObjectPosition(value) {
  return value.match(/\d+(px|in|mm|cm|pt|%|vw|vh)?/g);
}; // Transforms shorthand objectPosition values


var processObjectPosition = function processObjectPosition(key, value) {
  var match = matchObjectPosition(value);

  if (match) {
    if (key.match(/.X/)) {
      return match[0];
    } else if (key.match(/.Y/)) {
      return match[1];
    } else {
      throw new Error("StyleSheet: Invalid '" + value + "' for '" + key + "'");
    }
  }

  return value;
};

var isTransformOriginStyle = function isTransformOriginStyle(key, value) {
  return key.match(/^transformOrigin/) && typeof value === 'string';
};

var matchTransformOrigin = function matchTransformOrigin(value) {
  return value.match(/(-?\d+(px|in|mm|cm|pt|%|vw|vh)?)|top|right|bottom|left|center/g);
};

var transformOffsetKeywords = function transformOffsetKeywords(value) {
  switch (value) {
    case 'top':
    case 'left':
      return '0%';

    case 'right':
    case 'bottom':
      return '100%';

    case 'center':
      return '50%';

    default:
      return value;
  }
}; // Transforms shorthand transformOrigin values


var processTransformOrigin = function processTransformOrigin(key, value) {
  var match = matchTransformOrigin(value);

  if (match) {
    var result;

    if (key.match(/.X/)) {
      result = match[0];
    } else if (key.match(/.Y/)) {
      result = match[1] || match[0];
    } else {
      throw new Error("StyleSheet: Invalid '" + value + "' for '" + key + "'");
    }

    return transformOffsetKeywords(result);
  }

  return value;
};

var hasOwnProperty = Object.prototype.hasOwnProperty;
var styleShorthands = {
  margin: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true
  },
  marginHorizontal: {
    marginLeft: true,
    marginRight: true
  },
  marginVertical: {
    marginTop: true,
    marginBottom: true
  },
  padding: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true
  },
  paddingHorizontal: {
    paddingLeft: true,
    paddingRight: true
  },
  paddingVertical: {
    paddingTop: true,
    paddingBottom: true
  },
  border: {
    borderTopColor: true,
    borderTopStyle: true,
    borderTopWidth: true,
    borderRightColor: true,
    borderRightStyle: true,
    borderRightWidth: true,
    borderBottomColor: true,
    borderBottomStyle: true,
    borderBottomWidth: true,
    borderLeftColor: true,
    borderLeftStyle: true,
    borderLeftWidth: true
  },
  borderTop: {
    borderTopColor: true,
    borderTopStyle: true,
    borderTopWidth: true
  },
  borderRight: {
    borderRightColor: true,
    borderRightStyle: true,
    borderRightWidth: true
  },
  borderBottom: {
    borderBottomColor: true,
    borderBottomStyle: true,
    borderBottomWidth: true
  },
  borderLeft: {
    borderLeftColor: true,
    borderLeftStyle: true,
    borderLeftWidth: true
  },
  borderColor: {
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true
  },
  borderRadius: {
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    borderBottomLeftRadius: true
  },
  borderStyle: {
    borderTopStyle: true,
    borderRightStyle: true,
    borderBottomStyle: true,
    borderLeftStyle: true
  },
  borderWidth: {
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true
  },
  objectPosition: {
    objectPositionX: true,
    objectPositionY: true
  },
  transformOrigin: {
    transformOriginX: true,
    transformOriginY: true
  }
}; // Expand the shorthand properties to isolate every declaration from the others.

var expandStyles = function expandStyles(style) {
  if (!style) return style;
  var propsArray = Object.keys(style);
  var resolvedStyle = {};

  for (var i = 0; i < propsArray.length; i++) {
    var key = propsArray[i];
    var value = style[key];

    switch (key) {
      case 'display':
      case 'flex':
      case 'flexDirection':
      case 'flexWrap':
      case 'flexFlow':
      case 'flexGrow':
      case 'flexShrink':
      case 'flexBasis':
      case 'justifyContent':
      case 'alignSelf':
      case 'alignItems':
      case 'alignContent':
      case 'order':
        resolvedStyle[key] = yogaValue(key, value);
        break;

      case 'textAlignVertical':
        resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
        break;

      case 'margin':
      case 'marginHorizontal':
      case 'marginVertical':
      case 'padding':
      case 'paddingHorizontal':
      case 'paddingVertical':
      case 'border':
      case 'borderTop':
      case 'borderRight':
      case 'borderBottom':
      case 'borderLeft':
      case 'borderColor':
      case 'borderRadius':
      case 'borderStyle':
      case 'borderWidth':
      case 'objectPosition':
      case 'transformOrigin':
        {
          var expandedProps = styleShorthands[key];

          for (var propName in expandedProps) {
            if (hasOwnProperty.call(expandedProps, propName)) {
              resolvedStyle[propName] = value;
            }
          }
        }
        break;

      default:
        resolvedStyle[key] = value;
        break;
    }
  }

  return resolvedStyle;
};

var transformStyles = function transformStyles(style, container) {
  var expandedStyles = expandStyles(style);
  var propsArray = Object.keys(expandedStyles);
  var resolvedStyle = {};

  for (var i = 0; i < propsArray.length; i++) {
    var key = propsArray[i];
    var value = expandedStyles[key];
    var resolved = void 0;

    if (isBorderStyle(key, value)) {
      resolved = processBorders(key, value);
    } else if (isBoxModelStyle(key, value)) {
      resolved = processBoxModel(key, value);
    } else if (isObjectPositionStyle(key, value)) {
      resolved = processObjectPosition(key, value);
    } else if (isTransformOriginStyle(key, value)) {
      resolved = processTransformOrigin(key, value);
    } else if (isFontWeightStyle(key, value)) {
      resolved = processFontWeight(value);
    } else {
      resolved = value;
    }

    resolvedStyle[key] = parseScalar(resolved, container);
  }

  return resolvedStyle;
};

var create = function create(styles) {
  return styles;
};

var flatten = function flatten(input) {
  if (!Array.isArray(input)) {
    input = [input];
  }

  var result = input.reduce(function (acc, style) {
    if (style) {
      var s = Array.isArray(style) ? flatten(style) : style;
      Object.keys(s).forEach(function (key) {
        if (s[key] !== null && s[key] !== undefined) {
          acc[key] = s[key];
        }
      });
    }

    return acc;
  }, {});
  return result;
};

var resolveMediaQueries = function resolveMediaQueries(input, container) {
  var result = Object.keys(input).reduce(function (acc, key) {
    var _extends2;

    if (/@media/.test(key)) {
      var _matchMedia;

      return _extends({}, acc, matchMedia((_matchMedia = {}, _matchMedia[key] = input[key], _matchMedia), container));
    }

    return _extends({}, acc, (_extends2 = {}, _extends2[key] = input[key], _extends2));
  }, {});
  return result;
};

var resolve = function resolve(styles, container) {
  if (!styles) return null;
  styles = flatten(styles);
  styles = resolveMediaQueries(styles, container);
  styles = transformStyles(styles, container);
  return styles;
};

var absoluteFillObject = {
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
};
var StyleSheet = {
  hairlineWidth: 1,
  create: create,
  resolve: resolve,
  flatten: flatten,
  absoluteFillObject: absoluteFillObject
};

var Debug = {
  debug: function debug() {
    var layout = this.getAbsoluteLayout();
    var padding = this.padding;
    var margin = this.margin;
    this.root.instance.save();
    this.debugContent(layout, margin, padding);
    this.debugPadding(layout, margin, padding);
    this.debugMargin(layout, margin);
    this.debugText(layout, margin);
    this.debugOrigin();
    this.root.instance.restore();
  },
  debugOrigin: function debugOrigin() {
    if (this.style.transform) {
      var origin = this.origin;
      this.root.instance.circle(origin[0], origin[1], 3).fill('red').circle(origin[0], origin[1], 5).stroke('red');
    }
  },
  debugText: function debugText(layout, margin) {
    var roundedWidth = Math.round(this.width + margin.left + margin.right);
    var roundedHeight = Math.round(this.height + margin.top + margin.bottom);
    this.root.instance.fontSize(4).opacity(1).fillColor('black').text(roundedWidth + " x " + roundedHeight, layout.left - margin.left, Math.max(layout.top - margin.top - 4, 1));
  },
  debugContent: function debugContent(layout, margin, padding) {
    this.root.instance.fillColor('#a1c6e7').opacity(0.5).rect(layout.left + padding.left, layout.top + padding.top, layout.width - padding.left - padding.right, layout.height - padding.top - padding.bottom).fill();
  },
  debugPadding: function debugPadding(layout, margin, padding) {
    this.root.instance.fillColor('#c4deb9').opacity(0.5); // Padding top

    this.root.instance.rect(layout.left + padding.left, layout.top, layout.width - padding.right - padding.left, padding.top).fill(); // Padding left

    this.root.instance.rect(layout.left, layout.top, padding.left, layout.height).fill(); // Padding right

    this.root.instance.rect(layout.left + layout.width - padding.right, layout.top, padding.right, layout.height).fill(); // Padding bottom

    this.root.instance.rect(layout.left + padding.left, layout.top + layout.height - padding.bottom, layout.width - padding.right - padding.left, padding.bottom).fill();
  },
  debugMargin: function debugMargin(layout, margin) {
    this.root.instance.fillColor('#f8cca1').opacity(0.5); // Margin top

    this.root.instance.rect(layout.left, layout.top - margin.top, layout.width, margin.top).fill(); // Margin left

    this.root.instance.rect(layout.left - margin.left, layout.top - margin.top, margin.left, layout.height + margin.top + margin.bottom).fill(); // Margin right

    this.root.instance.rect(layout.left + layout.width, layout.top - margin.top, margin.right, layout.height + margin.top + margin.bottom).fill(); // Margin bottom

    this.root.instance.rect(layout.left, layout.top + layout.height, layout.width, margin.bottom).fill();
  }
};

// Ref: https://www.w3.org/TR/css-backgrounds-3/#borders
// This constant is used to approximate a symmetrical arc using a cubic Bezier curve.
var KAPPA = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);

function drawBorders() {
  var instance = this.root.instance;
  var layout = this.getAbsoluteLayout();
  var borderTopWidth = this.borderTopWidth,
      borderLeftWidth = this.borderLeftWidth,
      borderRightWidth = this.borderRightWidth,
      borderBottomWidth = this.borderBottomWidth;
  var _this$style = this.style,
      opacity = _this$style.opacity,
      _this$style$borderTop = _this$style.borderTopLeftRadius,
      borderTopLeftRadius = _this$style$borderTop === void 0 ? 0 : _this$style$borderTop,
      _this$style$borderTop2 = _this$style.borderTopRightRadius,
      borderTopRightRadius = _this$style$borderTop2 === void 0 ? 0 : _this$style$borderTop2,
      _this$style$borderBot = _this$style.borderBottomLeftRadius,
      borderBottomLeftRadius = _this$style$borderBot === void 0 ? 0 : _this$style$borderBot,
      _this$style$borderBot2 = _this$style.borderBottomRightRadius,
      borderBottomRightRadius = _this$style$borderBot2 === void 0 ? 0 : _this$style$borderBot2,
      _this$style$borderTop3 = _this$style.borderTopColor,
      borderTopColor = _this$style$borderTop3 === void 0 ? 'black' : _this$style$borderTop3,
      _this$style$borderTop4 = _this$style.borderTopStyle,
      borderTopStyle = _this$style$borderTop4 === void 0 ? 'solid' : _this$style$borderTop4,
      _this$style$borderLef = _this$style.borderLeftColor,
      borderLeftColor = _this$style$borderLef === void 0 ? 'black' : _this$style$borderLef,
      _this$style$borderLef2 = _this$style.borderLeftStyle,
      borderLeftStyle = _this$style$borderLef2 === void 0 ? 'solid' : _this$style$borderLef2,
      _this$style$borderRig = _this$style.borderRightColor,
      borderRightColor = _this$style$borderRig === void 0 ? 'black' : _this$style$borderRig,
      _this$style$borderRig2 = _this$style.borderRightStyle,
      borderRightStyle = _this$style$borderRig2 === void 0 ? 'solid' : _this$style$borderRig2,
      _this$style$borderBot3 = _this$style.borderBottomColor,
      borderBottomColor = _this$style$borderBot3 === void 0 ? 'black' : _this$style$borderBot3,
      _this$style$borderBot4 = _this$style.borderBottomStyle,
      borderBottomStyle = _this$style$borderBot4 === void 0 ? 'solid' : _this$style$borderBot4;
  var style = {
    borderTopColor: borderTopColor,
    borderTopWidth: borderTopWidth,
    borderTopStyle: borderTopStyle,
    borderLeftColor: borderLeftColor,
    borderLeftWidth: borderLeftWidth,
    borderLeftStyle: borderLeftStyle,
    borderRightColor: borderRightColor,
    borderRightWidth: borderRightWidth,
    borderRightStyle: borderRightStyle,
    borderBottomColor: borderBottomColor,
    borderBottomWidth: borderBottomWidth,
    borderBottomStyle: borderBottomStyle,
    borderTopLeftRadius: borderTopLeftRadius,
    borderTopRightRadius: borderTopRightRadius,
    borderBottomLeftRadius: borderBottomLeftRadius,
    borderBottomRightRadius: borderBottomRightRadius
  };
  var width = layout.width,
      height = layout.height;
  var rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
  var rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
  var rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
  var rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
  instance.save();
  instance.strokeOpacity(opacity);

  if (borderTopWidth) {
    instance.save();
    clipBorderTop(instance, layout, style, rtr, rtl);
    fillBorderTop(instance, layout, style, rtr, rtl);
    instance.restore();
  }

  if (borderRightWidth) {
    instance.save();
    clipBorderRight(instance, layout, style, rtr, rbr);
    fillBorderRight(instance, layout, style, rtr, rbr);
    instance.restore();
  }

  if (borderBottomWidth) {
    instance.save();
    clipBorderBottom(instance, layout, style, rbl, rbr);
    fillBorderBottom(instance, layout, style, rbl, rbr);
    instance.restore();
  }

  if (borderLeftWidth) {
    instance.save();
    clipBorderLeft(instance, layout, style, rbl, rtl);
    fillBorderLeft(instance, layout, style, rbl, rtl);
    instance.restore();
  }

  instance.restore();
}

var clipBorderTop = function clipBorderTop(ctx, layout, style, rtr, rtl) {
  var top = layout.top,
      left = layout.left,
      width = layout.width,
      height = layout.height;
  var borderTopWidth = style.borderTopWidth,
      borderRightWidth = style.borderRightWidth,
      borderLeftWidth = style.borderLeftWidth; // Clip outer top border edge

  ctx.moveTo(left + rtl, top);
  ctx.lineTo(left + width - rtr, top); // Ellipse coefficients outer top right cap

  var c0 = rtr * (1.0 - KAPPA); // Clip outer top right cap

  ctx.bezierCurveTo(left + width - c0, top, left + width, top + c0, left + width, top + rtr); // Move down in case the margin exceedes the radius

  var topRightYCoord = top + Math.max(borderTopWidth, rtr);
  ctx.lineTo(left + width, topRightYCoord); // Clip inner top right cap

  ctx.lineTo(left + width - borderRightWidth, topRightYCoord); // Ellipse coefficients inner top right cap

  var innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
  var innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
  var c1 = innerTopRightRadiusX * (1.0 - KAPPA);
  var c2 = innerTopRightRadiusY * (1.0 - KAPPA); // Clip inner top right cap

  ctx.bezierCurveTo(left + width - borderRightWidth, top + borderTopWidth + c2, left + width - borderRightWidth - c1, top + borderTopWidth, left + width - borderRightWidth - innerTopRightRadiusX, top + borderTopWidth); // Clip inner top border edge

  ctx.lineTo(left + Math.max(rtl, borderLeftWidth), top + borderTopWidth); // Ellipse coefficients inner top left cap

  var innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
  var innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
  var c3 = innerTopLeftRadiusX * (1.0 - KAPPA);
  var c4 = innerTopLeftRadiusY * (1.0 - KAPPA);
  var topLeftYCoord = top + Math.max(borderTopWidth, rtl); // Clip inner top left cap

  ctx.bezierCurveTo(left + borderLeftWidth + c3, top + borderTopWidth, left + borderLeftWidth, top + borderTopWidth + c4, left + borderLeftWidth, topLeftYCoord);
  ctx.lineTo(left, topLeftYCoord); // Move down in case the margin exceedes the radius

  ctx.lineTo(left, top + rtl); // Ellipse coefficients outer top left cap

  var c5 = rtl * (1.0 - KAPPA); // Clip outer top left cap

  ctx.bezierCurveTo(left, top + c5, left + c5, top, left + rtl, top);
  ctx.closePath();
  ctx.clip(); // Clip border top cap joins

  if (borderRightWidth) {
    var trSlope = -borderTopWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.clip();
  }

  if (borderLeftWidth) {
    var _trSlope = -borderTopWidth / borderLeftWidth;

    ctx.moveTo(left + width / 2, _trSlope * (-width / 2) + top);
    ctx.lineTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.closePath();
    ctx.clip();
  }
};

var fillBorderTop = function fillBorderTop(ctx, layout, style, rtr, rtl) {
  var top = layout.top,
      left = layout.left,
      width = layout.width;
  var borderTopColor = style.borderTopColor,
      borderTopWidth = style.borderTopWidth,
      borderTopStyle = style.borderTopStyle,
      borderRightWidth = style.borderRightWidth,
      borderLeftWidth = style.borderLeftWidth;
  var c0 = rtl * (1.0 - KAPPA);
  var c1 = rtr * (1.0 - KAPPA);
  ctx.moveTo(left, top + Math.max(rtl, borderTopWidth));
  ctx.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top);
  ctx.lineTo(left + width - rtr, top);
  ctx.bezierCurveTo(left + width - c1, top, left + width, top + c1, left + width, top + rtr);
  ctx.strokeColor(borderTopColor);
  ctx.lineWidth(Math.max(borderRightWidth, borderTopWidth, borderLeftWidth) * 2);

  if (borderTopStyle === 'dashed') {
    ctx.dash(borderTopWidth * 2, {
      space: borderTopWidth * 1.2
    });
  } else if (borderTopStyle === 'dotted') {
    ctx.dash(borderTopWidth, {
      space: borderTopWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

var clipBorderRight = function clipBorderRight(ctx, layout, style, rtr, rbr) {
  var top = layout.top,
      left = layout.left,
      width = layout.width,
      height = layout.height;
  var borderTopWidth = style.borderTopWidth,
      borderRightWidth = style.borderRightWidth,
      borderBottomWidth = style.borderBottomWidth; // Clip outer right border edge

  ctx.moveTo(left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr); // Ellipse coefficients outer bottom right cap

  var c0 = rbr * (1.0 - KAPPA); // Clip outer top right cap

  ctx.bezierCurveTo(left + width, top + height - c0, left + width - c0, top + height, left + width - rbr, top + height); // Move left in case the margin exceedes the radius

  var topBottomXCoord = left + width - Math.max(borderRightWidth, rbr);
  ctx.lineTo(topBottomXCoord, top + height); // Clip inner bottom right cap

  ctx.lineTo(topBottomXCoord, top + height - borderBottomWidth); // Ellipse coefficients inner bottom right cap

  var innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
  var innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
  var c1 = innerBottomRightRadiusX * (1.0 - KAPPA);
  var c2 = innerBottomRightRadiusY * (1.0 - KAPPA); // Clip inner top right cap

  ctx.bezierCurveTo(left + width - borderRightWidth - c1, top + height - borderBottomWidth, left + width - borderRightWidth, top + height - borderBottomWidth - c2, left + width - borderRightWidth, top + height - Math.max(rbr, borderBottomWidth)); // Clip inner right border edge

  ctx.lineTo(left + width - borderRightWidth, top + Math.max(rtr, borderTopWidth)); // Ellipse coefficients inner top right cap

  var innerTopRightRadiusX = Math.max(rtr - borderRightWidth, 0);
  var innerTopRightRadiusY = Math.max(rtr - borderTopWidth, 0);
  var c3 = innerTopRightRadiusX * (1.0 - KAPPA);
  var c4 = innerTopRightRadiusY * (1.0 - KAPPA);
  var topRightXCoord = left + width - Math.max(rtr, borderRightWidth); // Clip inner top left cap

  ctx.bezierCurveTo(left + width - borderRightWidth, top + borderTopWidth + c4, left + width - borderRightWidth - c3, top + borderTopWidth, topRightXCoord, top + borderTopWidth);
  ctx.lineTo(topRightXCoord, top); // Move right in case the margin exceedes the radius

  ctx.lineTo(left + width - rtr, top); // Ellipse coefficients outer top right cap

  var c5 = rtr * (1.0 - KAPPA); // Clip outer top right cap

  ctx.bezierCurveTo(left + width - c5, top, left + width, top + c5, left + width, top + rtr);
  ctx.closePath();
  ctx.clip(); // Clip border right cap joins

  if (borderTopWidth) {
    var trSlope = -borderTopWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, trSlope * (-width / 2) + top);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.closePath();
    ctx.clip();
  }

  if (borderBottomWidth) {
    var brSlope = borderBottomWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left + width, top);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.clip();
  }
};

var fillBorderRight = function fillBorderRight(ctx, layout, style, rtr, rbr) {
  var top = layout.top,
      left = layout.left,
      width = layout.width,
      height = layout.height;
  var borderRightColor = style.borderRightColor,
      borderRightStyle = style.borderRightStyle,
      borderRightWidth = style.borderRightWidth,
      borderTopWidth = style.borderTopWidth,
      borderBottomWidth = style.borderBottomWidth;
  var c0 = rbr * (1.0 - KAPPA);
  var c1 = rtr * (1.0 - KAPPA);
  ctx.moveTo(left + width - rtr, top);
  ctx.bezierCurveTo(left + width - c1, top, left + width, top + c1, left + width, top + rtr);
  ctx.lineTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(left + width, top + height - c0, left + width - c0, top + height, left + width - rbr, top + height);
  ctx.strokeColor(borderRightColor);
  ctx.lineWidth(Math.max(borderRightWidth, borderTopWidth, borderBottomWidth) * 2);

  if (borderRightStyle === 'dashed') {
    ctx.dash(borderRightWidth * 2, {
      space: borderRightWidth * 1.2
    });
  } else if (borderRightStyle === 'dotted') {
    ctx.dash(borderRightWidth, {
      space: borderRightWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

var clipBorderBottom = function clipBorderBottom(ctx, layout, style, rbl, rbr) {
  var top = layout.top,
      left = layout.left,
      width = layout.width,
      height = layout.height;
  var borderBottomWidth = style.borderBottomWidth,
      borderRightWidth = style.borderRightWidth,
      borderLeftWidth = style.borderLeftWidth; // Clip outer top border edge

  ctx.moveTo(left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height); // Ellipse coefficients outer top right cap

  var c0 = rbl * (1.0 - KAPPA); // Clip outer top right cap

  ctx.bezierCurveTo(left + c0, top + height, left, top + height - c0, left, top + height - rbl); // Move up in case the margin exceedes the radius

  var bottomLeftYCoord = top + height - Math.max(borderBottomWidth, rbl);
  ctx.lineTo(left, bottomLeftYCoord); // Clip inner bottom left cap

  ctx.lineTo(left + borderLeftWidth, bottomLeftYCoord); // Ellipse coefficients inner top right cap

  var innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
  var innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
  var c1 = innerBottomLeftRadiusX * (1.0 - KAPPA);
  var c2 = innerBottomLeftRadiusY * (1.0 - KAPPA); // Clip inner bottom left cap

  ctx.bezierCurveTo(left + borderLeftWidth, top + height - borderBottomWidth - c2, left + borderLeftWidth + c1, top + height - borderBottomWidth, left + borderLeftWidth + innerBottomLeftRadiusX, top + height - borderBottomWidth); // Clip inner bottom border edge

  ctx.lineTo(left + width - Math.max(rbr, borderRightWidth), top + height - borderBottomWidth); // Ellipse coefficients inner top left cap

  var innerBottomRightRadiusX = Math.max(rbr - borderRightWidth, 0);
  var innerBottomRightRadiusY = Math.max(rbr - borderBottomWidth, 0);
  var c3 = innerBottomRightRadiusX * (1.0 - KAPPA);
  var c4 = innerBottomRightRadiusY * (1.0 - KAPPA);
  var bottomRightYCoord = top + height - Math.max(borderBottomWidth, rbr); // Clip inner top left cap

  ctx.bezierCurveTo(left + width - borderRightWidth - c3, top + height - borderBottomWidth, left + width - borderRightWidth, top + height - borderBottomWidth - c4, left + width - borderRightWidth, bottomRightYCoord);
  ctx.lineTo(left + width, bottomRightYCoord); // Move down in case the margin exceedes the radius

  ctx.lineTo(left + width, top + height - rbr); // Ellipse coefficients outer top left cap

  var c5 = rbr * (1.0 - KAPPA); // Clip outer top left cap

  ctx.bezierCurveTo(left + width, top + height - c5, left + width - c5, top + height, left + width - rbr, top + height);
  ctx.closePath();
  ctx.clip(); // Clip border bottom cap joins

  if (borderRightWidth) {
    var brSlope = borderBottomWidth / borderRightWidth;
    ctx.moveTo(left + width / 2, brSlope * (-width / 2) + top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.closePath();
    ctx.clip();
  }

  if (borderLeftWidth) {
    var trSlope = -borderBottomWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + width, top + height);
    ctx.lineTo(left + width, top);
    ctx.closePath();
    ctx.clip();
  }
};

var fillBorderBottom = function fillBorderBottom(ctx, layout, style, rbl, rbr) {
  var top = layout.top,
      left = layout.left,
      width = layout.width,
      height = layout.height;
  var borderBottomColor = style.borderBottomColor,
      borderBottomStyle = style.borderBottomStyle,
      borderBottomWidth = style.borderBottomWidth,
      borderRightWidth = style.borderRightWidth,
      borderLeftWidth = style.borderLeftWidth;
  var c0 = rbl * (1.0 - KAPPA);
  var c1 = rbr * (1.0 - KAPPA);
  ctx.moveTo(left + width, top + height - rbr);
  ctx.bezierCurveTo(left + width, top + height - c1, left + width - c1, top + height, left + width - rbr, top + height);
  ctx.lineTo(left + rbl, top + height);
  ctx.bezierCurveTo(left + c0, top + height, left, top + height - c0, left, top + height - rbl);
  ctx.strokeColor(borderBottomColor);
  ctx.lineWidth(Math.max(borderBottomWidth, borderRightWidth, borderLeftWidth) * 2);

  if (borderBottomStyle === 'dashed') {
    ctx.dash(borderBottomWidth * 2, {
      space: borderBottomWidth * 1.2
    });
  } else if (borderBottomStyle === 'dotted') {
    ctx.dash(borderBottomWidth, {
      space: borderBottomWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

var clipBorderLeft = function clipBorderLeft(ctx, layout, style, rbl, rtl) {
  var top = layout.top,
      left = layout.left,
      width = layout.width,
      height = layout.height;
  var borderTopWidth = style.borderTopWidth,
      borderLeftWidth = style.borderLeftWidth,
      borderBottomWidth = style.borderBottomWidth; // Clip outer left border edge

  ctx.moveTo(left, top + height - rbl);
  ctx.lineTo(left, top + rtl); // Ellipse coefficients outer top left cap

  var c0 = rtl * (1.0 - KAPPA); // Clip outer top left cap

  ctx.bezierCurveTo(left, top + c0, left + c0, top, left + rtl, top); // Move right in case the margin exceedes the radius

  var topLeftCoordX = left + Math.max(borderLeftWidth, rtl);
  ctx.lineTo(topLeftCoordX, top); // Clip inner top left cap

  ctx.lineTo(topLeftCoordX, top + borderTopWidth); // Ellipse coefficients inner top left cap

  var innerTopLeftRadiusX = Math.max(rtl - borderLeftWidth, 0);
  var innerTopLeftRadiusY = Math.max(rtl - borderTopWidth, 0);
  var c1 = innerTopLeftRadiusX * (1.0 - KAPPA);
  var c2 = innerTopLeftRadiusY * (1.0 - KAPPA); // Clip inner top right cap

  ctx.bezierCurveTo(left + borderLeftWidth + c1, top + borderTopWidth, left + borderLeftWidth, top + borderTopWidth + c2, left + borderLeftWidth, top + Math.max(rtl, borderTopWidth)); // Clip inner left border edge

  ctx.lineTo(left + borderLeftWidth, top + height - Math.max(rbl, borderBottomWidth)); // Ellipse coefficients inner bottom left cap

  var innerBottomLeftRadiusX = Math.max(rbl - borderLeftWidth, 0);
  var innerBottomLeftRadiusY = Math.max(rbl - borderBottomWidth, 0);
  var c3 = innerBottomLeftRadiusX * (1.0 - KAPPA);
  var c4 = innerBottomLeftRadiusY * (1.0 - KAPPA);
  var bottomLeftXCoord = left + Math.max(rbl, borderLeftWidth); // Clip inner top left cap

  ctx.bezierCurveTo(left + borderLeftWidth, top + height - borderBottomWidth - c4, left + borderLeftWidth + c3, top + height - borderBottomWidth, bottomLeftXCoord, top + height - borderBottomWidth);
  ctx.lineTo(bottomLeftXCoord, top + height); // Move left in case the margin exceedes the radius

  ctx.lineTo(left + rbl, top + height); // Ellipse coefficients outer top right cap

  var c5 = rbl * (1.0 - KAPPA); // Clip outer top right cap

  ctx.bezierCurveTo(left + c5, top + height, left, top + height - c5, left, top + height - rbl);
  ctx.closePath();
  ctx.clip(); // Clip border right cap joins

  if (borderBottomWidth) {
    var trSlope = -borderBottomWidth / borderLeftWidth;
    ctx.moveTo(left + width / 2, trSlope * (width / 2) + top + height);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left, top);
    ctx.lineTo(left + width, top);
    ctx.closePath();
    ctx.clip();
  }

  if (borderBottomWidth) {
    var _trSlope2 = -borderTopWidth / borderLeftWidth;

    ctx.moveTo(left + width / 2, _trSlope2 * (-width / 2) + top);
    ctx.lineTo(left, top);
    ctx.lineTo(left, top + height);
    ctx.lineTo(left + width, top + height);
    ctx.closePath();
    ctx.clip();
  }
};

var fillBorderLeft = function fillBorderLeft(ctx, layout, style, rbl, rtl) {
  var top = layout.top,
      left = layout.left,
      height = layout.height;
  var borderLeftColor = style.borderLeftColor,
      borderLeftStyle = style.borderLeftStyle,
      borderLeftWidth = style.borderLeftWidth,
      borderTopWidth = style.borderTopWidth,
      borderBottomWidth = style.borderBottomWidth;
  var c0 = rbl * (1.0 - KAPPA);
  var c1 = rtl * (1.0 - KAPPA);
  ctx.moveTo(left + rbl, top + height);
  ctx.bezierCurveTo(left + c0, top + height, left, top + height - c0, left, top + height - rbl);
  ctx.lineTo(left, top + rtl);
  ctx.bezierCurveTo(left, top + c1, left + c1, top, left + rtl, top);
  ctx.strokeColor(borderLeftColor);
  ctx.lineWidth(Math.max(borderLeftWidth, borderTopWidth, borderBottomWidth) * 2);

  if (borderLeftStyle === 'dashed') {
    ctx.dash(borderLeftWidth * 2, {
      space: borderLeftWidth * 1.2
    });
  } else if (borderLeftStyle === 'dotted') {
    ctx.dash(borderLeftWidth, {
      space: borderLeftWidth * 1.2
    });
  }

  ctx.stroke();
  ctx.undash();
};

var Borders = {
  drawBorders: drawBorders
};

// This constant is used to approximate a symmetrical arc using a cubic
// Bezier curve.
var KAPPA$1 = 4.0 * ((Math.sqrt(2) - 1.0) / 3.0);
var Clipping = {
  clip: function clip() {
    var _this$getAbsoluteLayo = this.getAbsoluteLayout(),
        top = _this$getAbsoluteLayo.top,
        left = _this$getAbsoluteLayo.left,
        width = _this$getAbsoluteLayo.width,
        height = _this$getAbsoluteLayo.height;

    var _this$style = this.style,
        _this$style$borderTop = _this$style.borderTopLeftRadius,
        borderTopLeftRadius = _this$style$borderTop === void 0 ? 0 : _this$style$borderTop,
        _this$style$borderTop2 = _this$style.borderTopRightRadius,
        borderTopRightRadius = _this$style$borderTop2 === void 0 ? 0 : _this$style$borderTop2,
        _this$style$borderBot = _this$style.borderBottomRightRadius,
        borderBottomRightRadius = _this$style$borderBot === void 0 ? 0 : _this$style$borderBot,
        _this$style$borderBot2 = _this$style.borderBottomLeftRadius,
        borderBottomLeftRadius = _this$style$borderBot2 === void 0 ? 0 : _this$style$borderBot2; // Border top

    var rtr = Math.min(borderTopRightRadius, 0.5 * width, 0.5 * height);
    var ctr = rtr * (1.0 - KAPPA$1);
    this.root.instance.moveTo(left + rtr, top);
    this.root.instance.lineTo(left + width - rtr, top);
    this.root.instance.bezierCurveTo(left + width - ctr, top, left + width, top + ctr, left + width, top + rtr); // Border right

    var rbr = Math.min(borderBottomRightRadius, 0.5 * width, 0.5 * height);
    var cbr = rbr * (1.0 - KAPPA$1);
    this.root.instance.lineTo(left + width, top + height - rbr);
    this.root.instance.bezierCurveTo(left + width, top + height - cbr, left + width - cbr, top + height, left + width - rbr, top + height); // Border bottom

    var rbl = Math.min(borderBottomLeftRadius, 0.5 * width, 0.5 * height);
    var cbl = rbl * (1.0 - KAPPA$1);
    this.root.instance.lineTo(left + rbl, top + height);
    this.root.instance.bezierCurveTo(left + cbl, top + height, left, top + height - cbl, left, top + height - rbl); // Border left

    var rtl = Math.min(borderTopLeftRadius, 0.5 * width, 0.5 * height);
    var ctl = rtl * (1.0 - KAPPA$1);
    this.root.instance.lineTo(left, top + rtl);
    this.root.instance.bezierCurveTo(left, top + ctl, left + ctl, top, left + rtl, top);
    this.root.instance.closePath();
    this.root.instance.clip();
  }
};

var getRotation = function getRotation(transform) {
  var match = /rotate\((-?\d+.?\d+)(.+)\)/g.exec(transform);

  if (match && match[1] && match[2]) {
    var value = match[1];
    return match[2] === 'rad' ? value * 180 / Math.PI : value;
  }

  return 0;
};

var getTranslateX = function getTranslateX(transform) {
  var matchX = /translateX\((-?\d+\.?d*)\)/g.exec(transform);
  var matchGeneric = /translate\((-?\d+\.?d*).*,\s*(-?\d+\.?d*).*\)/g.exec(transform);
  if (matchX && matchX[1]) return matchX[1];
  if (matchGeneric && matchGeneric[1]) return matchGeneric[1];
  return 0;
};

var getTranslateY = function getTranslateY(transform) {
  var matchY = /translateY\((-?\d+\.?\d*)\)/g.exec(transform);
  var matchGeneric = /translate\((-?\d+\.?\d*).*,\s*(-?\d+\.?\d*).*\)/g.exec(transform);
  if (matchY && matchY[1]) return matchY[1];
  if (matchGeneric && matchGeneric[2]) return matchGeneric[2];
  return 0;
};

var getScaleX = function getScaleX(transform) {
  var matchX = /scaleX\((-?\d+\.?\d*)\)/g.exec(transform);
  var matchGeneric = /scale\((-?\d+\.?\d*).*,\s*(-?\d+\.?\d*).*\)/g.exec(transform);
  if (matchX && matchX[1]) return matchX[1];
  if (matchGeneric && matchGeneric[1]) return matchGeneric[1];
  return 1;
};

var getScaleY = function getScaleY(transform) {
  var matchY = /scaleY\((-?\d+\.?\d*)\)/g.exec(transform);
  var matchGeneric = /scale\((-?\d+\.?\d*).*,\s*(-?\d+\.?\d*).*\)/g.exec(transform);
  if (matchY && matchY[1]) return matchY[1];
  if (matchGeneric && matchGeneric[2]) return matchGeneric[2];
  return 1;
};

var getMatrix = function getMatrix(transform) {
  var match = /matrix\(([^,]+),([^,]+),([^,]+),([^,]+),([^,]+),([^,]+)\)/g.exec(transform);
  if (match) return match.slice(1, 7);
  return null;
};

var applySingleTransformation = function applySingleTransformation(element, transform, origin) {
  if (/rotate/g.test(transform)) {
    element.root.instance.rotate(getRotation(transform), {
      origin: origin
    });
  } else if (/scaleX/g.test(transform)) {
    element.root.instance.scale(getScaleX(transform), 1, {
      origin: origin
    });
  } else if (/scaleY/g.test(transform)) {
    element.root.instance.scale(1, getScaleY(transform), {
      origin: origin
    });
  } else if (/scale/g.test(transform)) {
    element.root.instance.scale(getScaleX(transform), getScaleY(transform), {
      origin: origin
    });
  } else if (/translateX/g.test(transform)) {
    element.root.instance.translate(getTranslateX(transform), 1, {
      origin: origin
    });
  } else if (/translateY/g.test(transform)) {
    element.root.instance.translate(1, getTranslateY(transform), {
      origin: origin
    });
  } else if (/translate/g.test(transform)) {
    element.root.instance.translate(getTranslateX(transform), getTranslateY(transform), {
      origin: origin
    });
  } else if (/matrix/g.test(transform)) {
    var _element$root$instanc;

    (_element$root$instanc = element.root.instance).transform.apply(_element$root$instanc, getMatrix(transform));
  }
};

var Transformations = {
  applyTransformations: function applyTransformations() {
    var match;
    var re = /[a-zA-Z]+\([^)]+\)/g;
    var origin = this.origin;
    var transform = this.style && this.style.transform || '';

    while ((match = re.exec(transform)) != null) {
      applySingleTransformation(this, match[0], origin);
    }
  }
};

var merge = function merge(a, b) {
  return isNil(b) ? a : b;
};

var deepMerge = function deepMerge(objs) {
  return objs.reduce(function (acc, obj) {
    return mergeDeepWith(merge, acc, obj);
  }, {});
};

var isFunction = compose(equals('Function'), type);

var inheritedProperties = ['color', 'fontFamily', 'fontSize', 'fontStyle', 'fontWeight', 'letterSpacing', 'opacity', 'textDecoration', 'lineHeight', 'textAlign', 'visibility', 'wordSpacing'];

var Base =
/*#__PURE__*/
function (_Node) {
  _inheritsLoose(Base, _Node);

  function Base(root, props) {
    var _this;

    _this = _Node.call(this) || this;
    _this.root = root;
    _this.style = {};
    _this.props = deepMerge([_this.constructor.defaultProps, Base.defaultProps, props]);
    warning(!_this.props.styles, '"styles" prop passed instead of "style" prop');
    return _this;
  }

  var _proto = Base.prototype;

  _proto.appendChild = function appendChild(child) {
    _Node.prototype.appendChild.call(this, child);

    this.root.markDirty();
  };

  _proto.appendChildBefore = function appendChildBefore(child, beforeChild) {
    _Node.prototype.appendChildBefore.call(this, child, beforeChild);

    this.root.markDirty();
  };

  _proto.removeChild = function removeChild(child) {
    _Node.prototype.removeChild.call(this, child);

    this.root.markDirty();
  };

  _proto.update = function update(newProps) {
    this.props = deepMerge([this.constructor.defaultProps, Base.defaultProps, newProps]);
    this.root.markDirty();
  };

  _proto.applyProps = function applyProps() {
    var _this2 = this;

    this.style = this.resolveStyles();
    toPairsIn(this.style).map(function (_ref) {
      var attribute = _ref[0],
          value = _ref[1];

      _this2.applyStyle(attribute, value);
    });
    this.children.forEach(function (child) {
      if (child.applyProps) child.applyProps();
    });
  };

  _proto.resolveStyles = function resolveStyles() {
    var _this$page = this.page,
        size = _this$page.size,
        orientation = _this$page.orientation,
        isAutoHeight = _this$page.isAutoHeight;
    var container = {
      orientation: orientation,
      isAutoHeight: isAutoHeight,
      width: size.width,
      height: size.height
    };
    var ownStyles = StyleSheet.resolve(this.props.style, container);
    var inheritedStyles = this.parent ? pick(inheritedProperties, this.parent.style) : {};
    return _extends({}, inheritedStyles, ownStyles);
  };

  _proto.applyStyle = function applyStyle(attribute, value) {
    if (value === undefined) return;
    var setter = "set" + upperFirst(attribute);

    switch (attribute) {
      case 'marginTop':
      case 'marginRight':
      case 'marginBottom':
      case 'marginLeft':
      case 'paddingTop':
      case 'paddingRight':
      case 'paddingBottom':
      case 'paddingLeft':
      case 'borderTopWidth':
      case 'borderRightWidth':
      case 'borderBottomWidth':
      case 'borderLeftWidth':
      case 'position':
      case 'top':
      case 'right':
      case 'bottom':
      case 'left':
      case 'width':
      case 'height':
      case 'minHeight':
      case 'maxHeight':
      case 'minWidth':
      case 'maxWidth':
        this[attribute] = value;
        break;

      default:
        if (isFunction(this.layout[setter])) {
          this.layout[setter](value);
        }

    }
  };

  _proto.getLayoutData = function getLayoutData() {
    var layout = this.getAbsoluteLayout();
    return {
      type: this.name,
      top: layout.top,
      left: layout.left,
      width: layout.width,
      style: this.style,
      height: layout.height,
      children: this.children.map(function (c) {
        return c.getLayoutData();
      })
    };
  };

  _proto.drawBackgroundColor = function drawBackgroundColor() {
    var _this$style = this.style,
        backgroundColor = _this$style.backgroundColor,
        _this$style$opacity = _this$style.opacity,
        opacity = _this$style$opacity === void 0 ? 1 : _this$style$opacity;

    var _this$getAbsoluteLayo = this.getAbsoluteLayout(),
        left = _this$getAbsoluteLayo.left,
        top = _this$getAbsoluteLayo.top,
        width = _this$getAbsoluteLayo.width,
        height = _this$getAbsoluteLayo.height;

    if (backgroundColor) {
      this.root.instance.save();
      this.clip();
      this.root.instance.fillOpacity(opacity).fillColor(backgroundColor).rect(left, top, width, height).fill().restore();
    }
  };

  _proto.clone = function clone() {
    var clone = new this.constructor(this.root, this.props);
    clone.copyStyle(this);
    clone.style = this.style;
    return clone;
  };

  _proto.onNodeSplit = function onNodeSplit(height, clone) {
    this.calculateLayout();
    clone.marginTop = 0;
    clone.paddingTop = 0; // If a height was given to the element, we need to substract the remaining wrapping height
    // If not, we just let Yoga calculate the appropiate height when layout get's calculated.

    if (clone.style.height) {
      clone.height = this.height - height;
    }

    this.height = height;
    this.marginBottom = 0;
    this.paddingBottom = 0;
  };

  _proto.renderChildren =
  /*#__PURE__*/
  function () {
    var _renderChildren = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var i;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = 0;

            case 1:
              if (!(i < this.children.length)) {
                _context.next = 7;
                break;
              }

              _context.next = 4;
              return this.children[i].render();

            case 4:
              i++;
              _context.next = 1;
              break;

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function renderChildren() {
      return _renderChildren.apply(this, arguments);
    }

    return renderChildren;
  }();

  _createClass(Base, [{
    key: "page",
    get: function get() {
      return this.parent.page;
    }
  }, {
    key: "wrap",
    get: function get() {
      return this.props.wrap;
    }
  }, {
    key: "break",
    get: function get() {
      return this.props.break;
    },
    set: function set(value) {
      this.props.break = value;
    }
  }, {
    key: "fixed",
    get: function get() {
      return this.props.fixed;
    }
  }, {
    key: "minPresenceAhead",
    get: function get() {
      return this.props.minPresenceAhead;
    }
  }, {
    key: "absolute",
    get: function get() {
      return this.props.style.position === 'absolute';
    }
  }, {
    key: "origin",
    get: function get() {
      var _this$style2 = this.style,
          transformOriginX = _this$style2.transformOriginX,
          transformOriginY = _this$style2.transformOriginY;

      var _this$getAbsoluteLayo2 = this.getAbsoluteLayout(),
          left = _this$getAbsoluteLayo2.left,
          top = _this$getAbsoluteLayo2.top,
          width = _this$getAbsoluteLayo2.width,
          height = _this$getAbsoluteLayo2.height;

      var percentX = matchPercent(transformOriginX);
      var percentY = matchPercent(transformOriginY);
      var offsetX = percentX ? width * percentX.percent : transformOriginX;
      var offsetY = percentY ? height * percentY.percent : transformOriginY;
      return [left + offsetX, top + offsetY];
    }
  }]);

  return Base;
}(Node);

Base.defaultProps = {
  style: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    transformOriginX: '50%',
    transformOriginY: '50%'
  },
  minPresenceAhead: 0
};
Object.assign(Base.prototype, Debug);
Object.assign(Base.prototype, Borders);
Object.assign(Base.prototype, Clipping);
Object.assign(Base.prototype, Transformations);

var RULER_WIDTH = 13;
var RULER_COLOR = 'white';
var RULER_FONT_SIZE = 5;
var DEFAULT_RULER_STEPS = 50;
var LINE_WIDTH = 0.5;
var LINE_COLOR = 'gray';
var GRID_COLOR = '#ababab';

var range = function range(max, steps) {
  return Array.from({
    length: Math.ceil(max / steps)
  }, function (_, i) {
    return i * steps;
  });
};

var matchPercentage = function matchPercentage(value) {
  var match = matchPercent(value);
  return match ? 100 / match.value : null;
};

var Ruler = {
  getRulerWidth: function getRulerWidth() {
    return RULER_WIDTH;
  },
  hasHorizontalRuler: function hasHorizontalRuler() {
    return this.props.ruler || this.props.horizontalRuler;
  },
  hasVerticalRuler: function hasVerticalRuler() {
    return this.props.ruler || this.props.verticalRuler;
  },
  getHorizontalSteps: function getHorizontalSteps() {
    var value = this.props.horizontalRulerSteps || this.props.rulerSteps || DEFAULT_RULER_STEPS;

    if (typeof value === 'string') {
      var percentage = matchPercentage(value);

      if (percentage) {
        var width = this.width - (this.hasVerticalRuler() ? RULER_WIDTH : 0);
        return width / percentage;
      }

      throw new Error('Page: Invalid horizontal steps value');
    }

    return value;
  },
  getVerticalSteps: function getVerticalSteps() {
    var value = this.props.verticalRulerSteps || this.props.rulerSteps || DEFAULT_RULER_STEPS;

    if (typeof value === 'string') {
      var percentage = matchPercentage(value);

      if (percentage) {
        var height = this.height - (this.hasHorizontalRuler() ? RULER_WIDTH : 0);
        return height / percentage;
      }

      throw new Error('Page: Invalid horizontal steps value');
    }

    return value;
  },
  renderRuler: function renderRuler() {
    var hasHorizontalRuler = this.hasHorizontalRuler();
    var hasVerticalRuler = this.hasVerticalRuler();

    if (hasHorizontalRuler || hasVerticalRuler) {
      this.root.instance.save().lineWidth(LINE_WIDTH).fontSize(RULER_FONT_SIZE).opacity(1);
      if (hasHorizontalRuler) this.drawHorizontalRuler();
      if (hasVerticalRuler) this.drawVerticalRuler();

      if (hasHorizontalRuler && hasVerticalRuler) {
        this.root.instance.rect(0, 0, RULER_WIDTH - LINE_WIDTH, RULER_WIDTH - LINE_WIDTH).fill(RULER_COLOR);
      }

      this.root.instance.restore();
    }
  },
  drawHorizontalRuler: function drawHorizontalRuler() {
    var _this = this;

    var offset = this.hasVerticalRuler() ? RULER_WIDTH : 0;
    this.root.instance.rect(offset, 0, this.width, RULER_WIDTH).fill(RULER_COLOR).moveTo(this.hasVerticalRuler() ? RULER_WIDTH : 0, RULER_WIDTH).lineTo(this.width, RULER_WIDTH).stroke(LINE_COLOR);
    var hRange = range(this.width, this.getHorizontalSteps());
    hRange.map(function (step) {
      _this.root.instance.moveTo(offset + step, 0).lineTo(offset + step, RULER_WIDTH).stroke(LINE_COLOR).fillColor('black').text("" + Math.round(step), offset + step + 1, 1);
    });
    hRange.map(function (step) {
      if (step !== 0) {
        _this.root.instance.moveTo(offset + step, RULER_WIDTH).lineTo(offset + step, _this.height).stroke(GRID_COLOR);
      }
    });
  },
  drawVerticalRuler: function drawVerticalRuler() {
    var _this2 = this;

    var offset = this.hasHorizontalRuler() ? RULER_WIDTH : 0;
    this.root.instance.rect(0, offset, RULER_WIDTH, this.height).fill(RULER_COLOR).moveTo(RULER_WIDTH, this.hasHorizontalRuler() ? RULER_WIDTH : 0).lineTo(RULER_WIDTH, this.height).stroke(LINE_COLOR);
    var vRange = range(this.height, this.getVerticalSteps());
    vRange.map(function (step) {
      _this2.root.instance.moveTo(0, offset + step).lineTo(RULER_WIDTH, offset + step).stroke(LINE_COLOR).fillColor('black').text("" + Math.round(step), 1, offset + step + 1);
    });
    vRange.map(function (step) {
      if (step !== 0) {
        _this2.root.instance.moveTo(RULER_WIDTH, offset + step).lineTo(_this2.width, offset + step).stroke(GRID_COLOR);
      }
    });
  }
};

var TextInstance =
/*#__PURE__*/
function () {
  function TextInstance(root, value) {
    this.root = root;
    this.value = value;
    this.parent = null;
    this.props = {};
  }

  var _proto = TextInstance.prototype;

  _proto.getLayoutData = function getLayoutData() {
    return this.value;
  };

  _proto.remove = function remove() {
    this.parent.removeChild(this);
  };

  _proto.clone = function clone() {
    return new this.constructor(this.root, this.value);
  };

  _proto.cleanup = function cleanup() {};

  _proto.update = function update(value) {
    this.value = value;
    this.parent.computed = false;
    this.parent.container = null;
    this.root.markDirty();
  };

  _createClass(TextInstance, [{
    key: "name",
    get: function get() {
      return 'TextInstance';
    }
  }]);

  return TextInstance;
}();

var PAGE_SIZES = {
  '4A0': [4767.87, 6740.79],
  '2A0': [3370.39, 4767.87],
  A0: [2383.94, 3370.39],
  A1: [1683.78, 2383.94],
  A2: [1190.55, 1683.78],
  A3: [841.89, 1190.55],
  A4: [595.28, 841.89],
  A5: [419.53, 595.28],
  A6: [297.64, 419.53],
  A7: [209.76, 297.64],
  A8: [147.4, 209.76],
  A9: [104.88, 147.4],
  A10: [73.7, 104.88],
  B0: [2834.65, 4008.19],
  B1: [2004.09, 2834.65],
  B2: [1417.32, 2004.09],
  B3: [1000.63, 1417.32],
  B4: [708.66, 1000.63],
  B5: [498.9, 708.66],
  B6: [354.33, 498.9],
  B7: [249.45, 354.33],
  B8: [175.75, 249.45],
  B9: [124.72, 175.75],
  B10: [87.87, 124.72],
  C0: [2599.37, 3676.54],
  C1: [1836.85, 2599.37],
  C2: [1298.27, 1836.85],
  C3: [918.43, 1298.27],
  C4: [649.13, 918.43],
  C5: [459.21, 649.13],
  C6: [323.15, 459.21],
  C7: [229.61, 323.15],
  C8: [161.57, 229.61],
  C9: [113.39, 161.57],
  C10: [79.37, 113.39],
  RA0: [2437.8, 3458.27],
  RA1: [1729.13, 2437.8],
  RA2: [1218.9, 1729.13],
  RA3: [864.57, 1218.9],
  RA4: [609.45, 864.57],
  SRA0: [2551.18, 3628.35],
  SRA1: [1814.17, 2551.18],
  SRA2: [1275.59, 1814.17],
  SRA3: [907.09, 1275.59],
  SRA4: [637.8, 907.09],
  EXECUTIVE: [521.86, 756.0],
  FOLIO: [612.0, 936.0],
  LEGAL: [612.0, 1008.0],
  LETTER: [612.0, 792.0],
  TABLOID: [792.0, 1224.0]
}; // Return page size in an object { width, height } given the passed size and orientation
// Accepts page type string, number, array or object as parameter

var getPageSize = function getPageSize(size, orientation) {
  if (orientation === void 0) {
    orientation = 'portrait';
  }

  var result;

  if (typeof size === 'string') {
    result = PAGE_SIZES[size.toUpperCase()];
  } else if (Array.isArray(size)) {
    result = size;
  } else if (typeof size === 'number') {
    result = [size];
  } else if (typeof size === 'object' && size.width) {
    result = [size.width, size.height];
  } else {
    throw new Error("Invalid Page size: " + size);
  }

  return orientation === 'portrait' ? {
    width: result[0],
    height: result[1]
  } : {
    width: result[1],
    height: result[0]
  };
};

var PROTOCOL_REGEXP = /^([a-z]+\:(\/\/)?)/i;
var DEST_REGEXP = /^#.+/;
var getURL = function getURL(value) {
  if (!value) return '';
  if (isSrcDest(value)) return value; // don't modify it if it is a destination

  if (typeof value === 'string' && !value.match(PROTOCOL_REGEXP)) {
    return "http://" + value;
  }

  return value;
};
var isSrcDest = function isSrcDest(src) {
  return src.match(DEST_REGEXP);
};
var setLink = function setLink(node) {
  if (!node.src) return;

  var _node$getAbsoluteLayo = node.getAbsoluteLayout(),
      top = _node$getAbsoluteLayo.top,
      left = _node$getAbsoluteLayo.left,
      width = _node$getAbsoluteLayo.width,
      height = _node$getAbsoluteLayo.height;

  var instanceMethod = isSrcDest(node.src) ? 'goTo' : 'link';
  var nodeSrc = isSrcDest(node.src) ? node.src.slice(1) : node.src;
  node.root.instance[instanceMethod](left, top, width, height, nodeSrc);
};
var setDestination = function setDestination(node) {
  if (!node.props.dest) return;

  var _node$getAbsoluteLayo2 = node.getAbsoluteLayout(),
      top = _node$getAbsoluteLayo2.top;

  node.root.instance.addNamedDestination(node.props.dest, 'XYZ', null, top, null);
};

var Page =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Page, _Base);

  function Page(root, props) {
    var _this;

    _this = _Base.call(this, root, props) || this;
    _this._size = null;
    return _this;
  }

  var _proto = Page.prototype;

  _proto.resetMargins = function resetMargins() {
    if (!!this.marginTop || !!this.marginBottom || !!this.marginLeft || !!this.marginRight) {
      warning(false, 'Margin values are not allowed on Page element. Use padding instead.');
      this.marginTop = 0;
      this.marginBottom = 0;
      this.marginLeft = 0;
      this.marginRight = 0;
    }
  };

  _proto.applyProps = function applyProps() {
    _Base.prototype.applyProps.call(this);

    this.top = 0;
    this.left = 0;
    this.width = this.size.width;
    this.resetMargins(); // Add some padding if ruler present, so we can see the whole page inside it

    var rulerWidth = this.getRulerWidth();

    if (this.hasHorizontalRuler()) {
      this.paddingTop = this.paddingTop + rulerWidth;
    }

    if (this.hasVerticalRuler()) {
      this.paddingLeft = this.paddingLeft + rulerWidth;
    }
  };

  _proto.setPadding = function setPadding(edge, value) {
    var dimension = edge === Yoga.EDGE_TOP || edge === Yoga.EDGE_BOTTOM ? this.size.height : this.size.width;
    var match = matchPercent(value);

    if (match) {
      this.layout.setPadding(edge, dimension * match.percent);
    } else {
      this.layout.setPadding(edge, value);
    }
  };

  _proto.addDynamicChild =
  /*#__PURE__*/
  function () {
    var _addDynamicChild = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee(parent, elements) {
      var children, i, child, type, props, instance, _instance;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (elements) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return");

            case 2:
              children = Array.isArray(elements) ? elements : [elements];
              i = 0;

            case 4:
              if (!(i < children.length)) {
                _context.next = 27;
                break;
              }

              child = children[i];
              type = child.type, props = child.props;

              if (!(typeof child === 'string')) {
                _context.next = 12;
                break;
              }

              instance = new TextInstance(this.root, child);
              parent.appendChild(instance);
              _context.next = 24;
              break;

            case 12:
              if (!(type !== Fragment)) {
                _context.next = 22;
                break;
              }

              _instance = createInstance(child, this.root);
              _context.next = 16;
              return _instance.onAppendDynamically();

            case 16:
              parent.appendChild(_instance);

              _instance.applyProps();

              _context.next = 20;
              return this.addDynamicChild(_instance, props.children);

            case 20:
              _context.next = 24;
              break;

            case 22:
              _context.next = 24;
              return this.addDynamicChild(parent, props.children);

            case 24:
              i++;
              _context.next = 4;
              break;

            case 27:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function addDynamicChild(_x, _x2) {
      return _addDynamicChild.apply(this, arguments);
    }

    return addDynamicChild;
  }();

  _proto.renderDynamicNodes =
  /*#__PURE__*/
  function () {
    var _renderDynamicNodes = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2(props, cb) {
      var listToExplore, node, condition, elements;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              listToExplore = this.children.slice(0);

            case 1:
              if (!(listToExplore.length > 0)) {
                _context2.next = 14;
                break;
              }

              node = listToExplore.shift();
              condition = cb ? cb(node) : true;

              if (!(condition && node.props.render)) {
                _context2.next = 11;
                break;
              }

              node.removeAllChilds();
              elements = node.props.render(props);
              _context2.next = 9;
              return this.addDynamicChild(node, elements);

            case 9:
              if (!node.fixed) node.props.render = null;
              return _context2.abrupt("continue", 1);

            case 11:
              if (node.children) {
                listToExplore.push.apply(listToExplore, node.children);
              }

              _context2.next = 1;
              break;

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function renderDynamicNodes(_x3, _x4) {
      return _renderDynamicNodes.apply(this, arguments);
    }

    return renderDynamicNodes;
  }();

  _proto.nodeWillWrap =
  /*#__PURE__*/
  function () {
    var _nodeWillWrap = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3(props) {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return this.renderDynamicNodes(props);

            case 2:
              this.calculateLayout();

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function nodeWillWrap(_x5) {
      return _nodeWillWrap.apply(this, arguments);
    }

    return nodeWillWrap;
  }();

  _proto.onNodeSplit = function onNodeSplit(height, clone) {
    clone.marginTop = 0;
    this.marginBottom = 0;
    this.calculateLayout();
  };

  _proto.clone = function clone() {
    var clone = _Base.prototype.clone.call(this);

    clone._size = this.size;
    return clone;
  };

  _proto.update = function update(newProps) {
    _Base.prototype.update.call(this, newProps);

    this._size = null;
  };

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4() {
      var instance, height;
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              instance = this.root.instance;

              if (!this.isAutoHeight) {
                this.height = this.size.height;
              }

              this.calculateLayout();
              height = this.isAutoHeight ? this.height : this.size.height;
              instance.addPage({
                size: [this.size.width, height],
                margin: 0
              });

              if (this.style.backgroundColor) {
                instance.fillColor(this.style.backgroundColor).rect(0, 0, this.size.width, height).fill();
              }

              _context4.next = 8;
              return this.renderChildren();

            case 8:
              if (this.props.debug) {
                this.debug();
              }

              setDestination(this);
              this.renderRuler();

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Page, [{
    key: "name",
    get: function get() {
      return 'Page';
    }
  }, {
    key: "document",
    get: function get() {
      return this.parent;
    }
  }, {
    key: "page",
    get: function get() {
      return this;
    }
  }, {
    key: "orientation",
    get: function get() {
      return this.props.orientation;
    }
  }, {
    key: "size",
    get: function get() {
      if (this._size) return this._size;
      this._size = getPageSize(this.props.size, this.orientation); // Adjust size for ruler

      if (this.hasHorizontalRuler()) {
        this._size.width += this.getRulerWidth();
      }

      if (this.hasVerticalRuler()) {
        this._size.height += this.getRulerWidth();
      }

      return this._size;
    }
  }, {
    key: "isAutoHeight",
    get: function get() {
      return typeof this.size.height === 'undefined';
    }
  }]);

  return Page;
}(Base);

Page.defaultProps = {
  size: 'A4',
  wrap: true,
  orientation: 'portrait'
};
Object.assign(Page.prototype, Ruler);

var View =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(View, _Base);

  function View() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = View.prototype;

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.root.instance.save();
              this.applyTransformations();
              this.drawBackgroundColor();
              this.drawBorders();
              _context.next = 6;
              return this.renderChildren();

            case 6:
              setDestination(this);
              if (this.props.debug) this.debug();
              this.root.instance.restore();

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(View, [{
    key: "name",
    get: function get() {
      return 'View';
    }
  }]);

  return View;
}(Base);

View.defaultProps = {
  wrap: true
};

var fetchFont =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(src, options) {
    var response, buffer;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(src, options);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.buffer ? response.buffer() : response.arrayBuffer();

          case 5:
            buffer = _context.sent;
            return _context.abrupt("return", buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchFont(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var FontSource =
/*#__PURE__*/
function () {
  function FontSource(src, fontFamily, fontStyle, fontWeight, options) {
    this.src = src;
    this.fontFamily = fontFamily;
    this.fontStyle = fontStyle || 'normal';
    this.fontWeight = processFontWeight(fontWeight) || 400;
    this.data = null;
    this.loading = false;
    this.options = options;
  }

  var _proto = FontSource.prototype;

  _proto.load =
  /*#__PURE__*/
  function () {
    var _load = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2() {
      var _this = this;

      var _this$options, headers, body, _this$options$method, method, data;

      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              this.loading = true;

              _this$options = this.options, headers = _this$options.headers, body = _this$options.body, _this$options$method = _this$options.method, method = _this$options$method === void 0 ? 'GET' : _this$options$method;
              _context2.next = 5;
              return fetchFont(this.src, {
                method: method,
                body: body,
                headers: headers
              });

            case 5:
              data = _context2.sent;
              this.data = fontkit.create(data);
              _context2.next = 12;
              break;

            case 9:
              _context2.next = 11;
              return new Promise(function (resolve, reject) {
                return fontkit.open(_this.src, function (err, data) {
                  return err ? reject(err) : resolve(data);
                });
              });

            case 11:
              this.data = _context2.sent;

            case 12:
              this.loading = false;

            case 13:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function load() {
      return _load.apply(this, arguments);
    }

    return load;
  }();

  return FontSource;
}();

var Font =
/*#__PURE__*/
function () {
  Font.create = function create(family) {
    return new Font(family);
  };

  function Font(family) {
    this.family = family;
    this.sources = [];
  }

  var _proto2 = Font.prototype;

  _proto2.register = function register(_ref2) {
    var src = _ref2.src,
        fontWeight = _ref2.fontWeight,
        fontStyle = _ref2.fontStyle,
        options = _objectWithoutPropertiesLoose(_ref2, ["src", "fontWeight", "fontStyle"]);

    this.sources.push(new FontSource(src, this.fontFamily, fontStyle, fontWeight, options));
  };

  _proto2.resolve = function resolve(descriptor) {
    var _descriptor$fontWeigh = descriptor.fontWeight,
        fontWeight = _descriptor$fontWeigh === void 0 ? 400 : _descriptor$fontWeigh,
        _descriptor$fontStyle = descriptor.fontStyle,
        fontStyle = _descriptor$fontStyle === void 0 ? 'normal' : _descriptor$fontStyle;
    var styleSources = this.sources.filter(function (s) {
      return s.fontStyle === fontStyle;
    }); // Weight resolution. https://developer.mozilla.org/en-US/docs/Web/CSS/font-weight#Fallback_weights

    var exactFit = styleSources.find(function (s) {
      return s.fontWeight === fontWeight;
    });
    if (exactFit) return exactFit;
    var res;

    if (fontWeight >= 400 && fontWeight <= 500) {
      var leftOffset = styleSources.filter(function (s) {
        return s.fontWeight <= fontWeight;
      });
      var rightOffset = styleSources.filter(function (s) {
        return s.fontWeight > 500;
      });
      var fit = styleSources.filter(function (s) {
        return s.fontWeight >= fontWeight && s.fontWeight < 500;
      });
      res = fit[0] || leftOffset[leftOffset.length - 1] || rightOffset[0];
    }

    var lt = styleSources.filter(function (s) {
      return s.fontWeight < fontWeight;
    });
    var gt = styleSources.filter(function (s) {
      return s.fontWeight > fontWeight;
    });

    if (fontWeight < 400) {
      res = lt[lt.length - 1] || gt[0];
    }

    if (fontWeight > 500) {
      res = gt[0] || lt[lt.length - 1];
    }

    if (!res) {
      throw new Error("Could not resolve font for " + this.fontFamily + ", fontWeight " + fontWeight);
    }

    return res;
  };

  return Font;
}();

var emojiSource;
var registerEmojiSource = function registerEmojiSource(_ref) {
  var url = _ref.url,
      _ref$format = _ref.format,
      format = _ref$format === void 0 ? 'png' : _ref$format;
  emojiSource = {
    url: url,
    format: format
  };
};
var getEmojiSource = function getEmojiSource() {
  return emojiSource;
};
var emoji = {
  registerEmojiSource: registerEmojiSource,
  getEmojiSource: getEmojiSource
};

var standardFonts = ['Courier', 'Courier-Bold', 'Courier-Oblique', 'Helvetica', 'Helvetica-Bold', 'Helvetica-Oblique', 'Times-Roman', 'Times-Bold', 'Times-Italic'];

var hyphenationCallback;
var registerHyphenationCallback = function registerHyphenationCallback(callback) {
  hyphenationCallback = callback;
};
var getHyphenationCallback = function getHyphenationCallback() {
  return hyphenationCallback;
};
var hyphenation = {
  registerHyphenationCallback: registerHyphenationCallback,
  getHyphenationCallback: getHyphenationCallback
};

var fonts = {};

var register = function register(src, data) {
  if (typeof src === 'object') {
    data = src;
  } else {
    warning(false, 'Font.register will not longer accept the font source as first argument. Please move it into the data object. For more info refer to https://react-pdf.org/fonts');
    data.src = src;
  }

  var _data = data,
      family = _data.family;

  if (!fonts[family]) {
    fonts[family] = Font.create(family);
  } // Bulk loading


  if (data.fonts) {
    for (var i = 0; i < data.fonts.length; i++) {
      fonts[family].register(_extends({
        family: family
      }, data.fonts[i]));
    }
  } else {
    fonts[family].register(data);
  }
};

var getRegisteredFonts = function getRegisteredFonts() {
  return fonts;
};

var getRegisteredFontFamilies = function getRegisteredFontFamilies() {
  return Object.keys(fonts);
};

var getFont = function getFont(descriptor) {
  var fontFamily = descriptor.fontFamily;
  var isStandard = standardFonts.includes(fontFamily);
  if (isStandard) return null;

  if (!fonts[fontFamily]) {
    throw new Error("Font family not registered: " + fontFamily + ". Please register it calling Font.register() method.");
  }

  return fonts[fontFamily].resolve(descriptor);
};

var load =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(descriptor, doc) {
    var fontFamily, isStandard, font;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fontFamily = descriptor.fontFamily;
            isStandard = standardFonts.includes(fontFamily);

            if (!isStandard) {
              _context.next = 4;
              break;
            }

            return _context.abrupt("return");

          case 4:
            font = getFont(descriptor); // We cache the font to avoid fetching it many times

            if (!(!font.data && !font.loading)) {
              _context.next = 8;
              break;
            }

            _context.next = 8;
            return font.load();

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function load(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var reset = function reset() {
  for (var _font in fonts) {
    if (fonts.hasOwnProperty(_font)) {
      fonts[_font].data = null;
    }
  }
};

var clear = function clear() {
  fonts = {};
};

var Font$1 = _extends({
  register: register,
  getRegisteredFonts: getRegisteredFonts,
  getRegisteredFontFamilies: getRegisteredFontFamilies,
  getFont: getFont,
  load: load,
  clear: clear,
  reset: reset
}, emoji, hyphenation);

var StandardFont =
/*#__PURE__*/
function () {
  function StandardFont(src) {
    this.name = src;
    this.src = PDFFontFactory.open(null, src);
  }

  var _proto = StandardFont.prototype;

  _proto.layout = function layout(str) {
    var _this = this;

    var _this$src$encode = this.src.encode(str),
        encoded = _this$src$encode[0],
        positions = _this$src$encode[1];

    return {
      positions: positions,
      stringIndices: positions.map(function (_, i) {
        return i;
      }),
      glyphs: encoded.map(function (g, i) {
        var glyph = _this.getGlyph(parseInt(g, 16));

        glyph.advanceWidth = positions[i].advanceWidth;
        return glyph;
      })
    };
  };

  _proto.glyphForCodePoint = function glyphForCodePoint(codePoint) {
    var glyph = this.getGlyph(codePoint);
    glyph.advanceWidth = 400;
    return glyph;
  };

  _proto.getGlyph = function getGlyph(id) {
    return {
      id: id,
      _font: this.src,
      codePoints: [id],
      isLigature: false,
      name: this.src.font.characterToGlyph(id)
    };
  };

  _proto.hasGlyphForCodePoint = function hasGlyphForCodePoint(codePoint) {
    return this.src.font.characterToGlyph(codePoint) !== '.notdef';
  } // Based on empirical observation
  ;

  _createClass(StandardFont, [{
    key: "ascent",
    get: function get() {
      return 900;
    } // Based on empirical observation

  }, {
    key: "descent",
    get: function get() {
      switch (this.name) {
        case 'Times-Roman':
        case 'Times-Bold':
        case 'Times-Italic':
          return -220;

        case 'Courier':
        case 'Courier-Bold':
        case 'Courier-Oblique':
          return -230;

        default:
          return -200;
      }
    }
  }, {
    key: "lineGap",
    get: function get() {
      return 0;
    }
  }, {
    key: "unitsPerEm",
    get: function get() {
      return 1000;
    }
  }]);

  return StandardFont;
}();

var fontCache = {};
var IGNORED_CODE_POINTS = [173];
var getFontSize = pathOr(12, ['attributes', 'fontSize']);

var getFallbackFont = function getFallbackFont() {
  return getOrCreateFont('Helvetica');
};

var getOrCreateFont = function getOrCreateFont(name) {
  if (fontCache[name]) return fontCache[name];
  var font = new StandardFont(name);
  fontCache[name] = font;
  return font;
};

var shouldFallbackToFont = function shouldFallbackToFont(codePoint, font) {
  return !IGNORED_CODE_POINTS.includes(codePoint) && !font.hasGlyphForCodePoint(codePoint) && getFallbackFont().hasGlyphForCodePoint(codePoint);
};

var fontSubstitution = function fontSubstitution() {
  return function (_ref) {
    var string = _ref.string,
        runs = _ref.runs;
    var lastFont = null;
    var lastIndex = 0;
    var index = 0;
    var res = [];

    for (var _iterator = runs, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var run = _ref2;

      var _fontSize = getFontSize(run);

      var defaultFont = typeof run.attributes.font === 'string' ? getOrCreateFont(run.attributes.font) : run.attributes.font;

      if (string.length === 0) {
        res.push({
          start: 0,
          end: 0,
          attributes: {
            font: defaultFont
          }
        });
        break;
      }

      for (var _iterator2 = string.slice(run.start, run.end), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
          if (_i2 >= _iterator2.length) break;
          _ref3 = _iterator2[_i2++];
        } else {
          _i2 = _iterator2.next();
          if (_i2.done) break;
          _ref3 = _i2.value;
        }

        var char = _ref3;
        var codePoint = char.codePointAt();
        var shouldFallback = shouldFallbackToFont(codePoint, defaultFont);
        var font = shouldFallback ? getFallbackFont() : defaultFont; // If the default font does not have a glyph and the fallback font does, we use it

        if (font !== lastFont) {
          if (lastFont) {
            res.push({
              start: lastIndex,
              end: index,
              attributes: {
                font: lastFont,
                scale: lastFont ? _fontSize / lastFont.unitsPerEm : 0
              }
            });
          }

          lastFont = font;
          lastIndex = index;
        }

        index += char.length;
      }
    }

    if (lastIndex < string.length) {
      var fontSize = getFontSize(last(runs));
      res.push({
        start: lastIndex,
        end: string.length,
        attributes: {
          font: lastFont,
          scale: lastFont ? fontSize / lastFont.unitsPerEm : 0
        }
      });
    }

    return {
      string: string,
      runs: res
    };
  };
};

var engines = {
  linebreaker: linebreaker,
  justification: justification,
  textDecoration: textDecoration,
  scriptItemizer: scriptItemizer,
  wordHyphenation: wordHyphenation,
  fontSubstitution: fontSubstitution
};
var engine = layoutEngine(engines);

var fs = {};

PNG.isValid = function (data) {
  try {
    return !!new PNG(data);
  } catch (e) {
    return false;
  }
};

// Extracted from https://github.com/devongovett/pdfkit/blob/master/lib/image/jpeg.coffee
var MARKERS = [0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc8, 0xffc9, 0xffca, 0xffcb, 0xffcc, 0xffcd, 0xffce, 0xffcf];

var JPEG = function JPEG(data) {
  this.data = null;
  this.width = null;
  this.height = null;
  this.data = data;

  if (data.readUInt16BE(0) !== 0xffd8) {
    throw new Error('SOI not found in JPEG');
  }

  var marker;
  var pos = 2;

  while (pos < data.length) {
    marker = data.readUInt16BE(pos);
    pos += 2;

    if (MARKERS.includes(marker)) {
      break;
    }

    pos += data.readUInt16BE(pos);
  }

  if (!MARKERS.includes(marker)) {
    throw new Error('Invalid JPEG.');
  }

  pos += 3;
  this.height = data.readUInt16BE(pos);
  pos += 2;
  this.width = data.readUInt16BE(pos);
};

JPEG.isValid = function (data) {
  if (!data || !Buffer.isBuffer(data) || data.readUInt16BE(0) !== 0xffd8) {
    return false;
  }

  var marker;
  var pos = 2;

  while (pos < data.length) {
    marker = data.readUInt16BE(pos);
    pos += 2;

    if (MARKERS.includes(marker)) {
      break;
    }

    pos += data.readUInt16BE(pos);
  }

  if (!MARKERS.includes(marker)) {
    return false;
  }

  return true;
};

var createCache = function createCache(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 100 : _ref$limit;

  var cache = {};
  var keys = [];
  return {
    get: function get(key) {
      return cache[key];
    },
    set: function set(key, value) {
      keys.push(key);

      if (keys.length > limit) {
        delete cache[keys.shift()];
      }

      cache[key] = value;
    },
    reset: function reset() {
      cache = {};
      keys = [];
    },
    length: function length() {
      return keys.length;
    }
  };
};

var IMAGE_CACHE = createCache({
  limit: 30
});
var getAbsoluteLocalPath = function getAbsoluteLocalPath(src) {
  {
    throw new Error('Cannot check local paths in client-side environment');
  }

  var _url$parse = fs.parse(src),
      protocol = _url$parse.protocol,
      auth = _url$parse.auth,
      host = _url$parse.host,
      port = _url$parse.port,
      hostname = _url$parse.hostname,
      pathname = _url$parse.path;

  var absolutePath = fs.resolve(pathname);

  if (protocol && protocol !== 'file:' || auth || host || port || hostname) {
    return undefined;
  }

  return absolutePath;
};
var isDangerousLocalPath = function isDangerousLocalPath(filename, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$safePath = _ref.safePath,
      safePath = _ref$safePath === void 0 ? './public' : _ref$safePath;

  {
    throw new Error('Cannot check dangerous local path in client-side environemnt');
  }

  var absoluteSafePath = fs.resolve(safePath);
  var absoluteFilePath = fs.resolve(filename);
  return !absoluteFilePath.startsWith(absoluteSafePath);
};

var fetchLocalFile = function fetchLocalFile(src, _temp2) {
  var _ref2 = _temp2 === void 0 ? {} : _temp2,
      safePath = _ref2.safePath,
      _ref2$allowDangerousP = _ref2.allowDangerousPaths,
      allowDangerousPaths = _ref2$allowDangerousP === void 0 ? false : _ref2$allowDangerousP;

  return new Promise(function (resolve, reject) {
    try {
      {
        return reject(new Error('Cannot fetch local file in this environemnt'));
      }

      var absolutePath = getAbsoluteLocalPath(src);

      if (!absolutePath) {
        return reject(new Error("Cannot fetch non-local path: " + src));
      }

      if (!allowDangerousPaths && isDangerousLocalPath(absolutePath, {
        safePath: safePath
      })) {
        return reject(new Error("Cannot fetch dangerous local path: " + src));
      }

      fs.readFile(absolutePath, function (err, data) {
        return err ? reject(err) : resolve(data);
      });
    } catch (err) {
      reject(err);
    }
  });
};

var fetchRemoteFile =
/*#__PURE__*/
function () {
  var _ref3 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(uri, options) {
    var response, buffer;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(uri, options);

          case 2:
            response = _context.sent;
            _context.next = 5;
            return response.buffer ? response.buffer() : response.arrayBuffer();

          case 5:
            buffer = _context.sent;
            return _context.abrupt("return", buffer.constructor.name === 'Buffer' ? buffer : Buffer.from(buffer));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchRemoteFile(_x, _x2) {
    return _ref3.apply(this, arguments);
  };
}();

var isValidFormat = function isValidFormat(format) {
  var lower = format.toLowerCase();
  return lower === 'jpg' || lower === 'jpeg' || lower === 'png';
};

var guessFormat = function guessFormat(buffer) {
  var format;

  if (JPEG.isValid(buffer)) {
    format = 'jpg';
  } else if (PNG.isValid(buffer)) {
    format = 'png';
  }

  return format;
};

var isCompatibleBase64 = function isCompatibleBase64(_ref4) {
  var uri = _ref4.uri;
  return /^data:image\/[a-zA-Z]*;base64,[^"]*/g.test(uri);
};

function getImage(body, extension) {
  switch (extension.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
      return new JPEG(body);

    case 'png':
      return new PNG(body);

    default:
      return null;
  }
}

var resolveBase64Image = function resolveBase64Image(_ref5) {
  var uri = _ref5.uri;
  var match = /^data:image\/([a-zA-Z]*);base64,([^"]*)/g.exec(uri);
  var format = match[1];
  var data = match[2];

  if (!isValidFormat(format)) {
    throw new Error("Base64 image invalid format: " + format);
  }

  return new Promise(function (resolve) {
    return resolve(getImage(Buffer.from(data, 'base64'), format));
  });
};

var resolveImageFromData = function resolveImageFromData(src) {
  if (src.data && src.format) {
    return new Promise(function (resolve) {
      return resolve(getImage(src.data, src.format));
    });
  }

  throw new Error("Invalid data given for local file: " + JSON.stringify(src));
};

var resolveBufferImage = function resolveBufferImage(buffer) {
  var format = guessFormat(buffer);

  if (format) {
    return new Promise(function (resolve) {
      return resolve(getImage(buffer, format));
    });
  }
};

var getImageFormat = function getImageFormat(body) {
  var isPng = body[0] === 137 && body[1] === 80 && body[2] === 78 && body[3] === 71 && body[4] === 13 && body[5] === 10 && body[6] === 26 && body[7] === 10;
  var isJpg = body[0] === 255 && body[1] === 216 && body[2] === 255;
  var extension = '';

  if (isPng) {
    extension = 'png';
  } else if (isJpg) {
    extension = 'jpg';
  } else {
    throw new Error('Not valid image extension');
  }

  return extension;
};

var resolveImageFromUrl =
/*#__PURE__*/
function () {
  var _ref6 = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(src, options) {
    var uri, body, headers, _src$method, method, data, extension;

    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            uri = src.uri, body = src.body, headers = src.headers, _src$method = src.method, method = _src$method === void 0 ? 'GET' : _src$method;

            {
              _context2.next = 7;
              break;
            }

            _context2.next = 4;
            return fetchLocalFile(uri, options);

          case 4:
            _context2.t0 = _context2.sent;
            _context2.next = 10;
            break;

          case 7:
            _context2.next = 9;
            return fetchRemoteFile(uri, {
              body: body,
              headers: headers,
              method: method
            });

          case 9:
            _context2.t0 = _context2.sent;

          case 10:
            data = _context2.t0;
            extension = getImageFormat(data);
            return _context2.abrupt("return", getImage(data, extension));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function resolveImageFromUrl(_x3, _x4) {
    return _ref6.apply(this, arguments);
  };
}();

var resolveImage = function resolveImage(src, _temp3) {
  var _ref7 = _temp3 === void 0 ? {} : _temp3,
      _ref7$cache = _ref7.cache,
      cache = _ref7$cache === void 0 ? true : _ref7$cache,
      options = _objectWithoutPropertiesLoose(_ref7, ["cache"]);

  var cacheKey = src.data ? src.data.toString() : src.uri;

  if (cache && IMAGE_CACHE.get(cacheKey)) {
    return IMAGE_CACHE.get(cacheKey);
  }

  var image;

  if (isCompatibleBase64(src)) {
    image = resolveBase64Image(src);
  } else if (Buffer.isBuffer(src)) {
    image = resolveBufferImage(src);
  } else if (typeof src === 'object' && src.data) {
    image = resolveImageFromData(src);
  } else {
    image = resolveImageFromUrl(src, options);
  }

  if (!image) {
    throw new Error('Cannot resolve image');
  }

  if (cache) {
    IMAGE_CACHE.set(cacheKey, image);
  }

  return image;
};

var emojis = {};
var regex = emojiRegex();

var reflect = function reflect(promise) {
  return function () {
    return promise.apply(void 0, arguments).then(function (v) {
      return v;
    }, function (e) {
      return e;
    });
  };
}; // Returns a function to be able to mock resolveImage.


var makeFetchEmojiImage = function makeFetchEmojiImage() {
  return reflect(resolveImage);
};
/**
 * When an emoji as no color, it might still have 2 parts,
 * the canonical emoji and an empty string.
 * ex.
 *   (no color) Array.from('❤️') => ["❤", "️"]
 *   (w/ color) Array.from('👍🏿') => ["👍", "🏿"]
 *
 * The empty string needs to be removed otherwise the generated
 * url will be incorect.
 */


var _removeNoColor = function _removeNoColor(x) {
  return x !== '️';
};

var getCodePoints = function getCodePoints(string) {
  return Array.from(string).filter(_removeNoColor).map(function (char) {
    return char.codePointAt(0).toString(16);
  }).join('-');
};

var buildEmojiUrl = function buildEmojiUrl(emoji) {
  var _Font$getEmojiSource = Font$1.getEmojiSource(),
      url = _Font$getEmojiSource.url,
      format = _Font$getEmojiSource.format;

  return "" + url + getCodePoints(emoji) + "." + format;
};

var fetchEmojis = function fetchEmojis(string) {
  var emojiSource = Font$1.getEmojiSource();
  if (!emojiSource || !emojiSource.url) return [];
  var promises = [];
  var match;

  var _loop = function _loop() {
    var emoji = match[0];

    if (!emojis[emoji] || emojis[emoji].loading) {
      var emojiUrl = buildEmojiUrl(emoji);
      emojis[emoji] = {
        loading: true
      };
      var fetchEmojiImage = makeFetchEmojiImage();
      promises.push(fetchEmojiImage({
        uri: emojiUrl
      }).then(function (image) {
        emojis[emoji].loading = false;
        emojis[emoji].data = image.data;
      }));
    }
  };

  while (match = regex.exec(string)) {
    _loop();
  }

  return promises;
};
var embedEmojis = function embedEmojis(fragments) {
  var result = [];

  for (var i = 0; i < fragments.length; i++) {
    var fragment = fragments[i];
    var match = void 0;
    var lastIndex = 0;

    while (match = regex.exec(fragment.string)) {
      var index = match.index;
      var emoji = match[0];
      var emojiSize = fragment.attributes.fontSize;
      var chunk = fragment.string.slice(lastIndex, index + match[0].length); // If emoji image was found, we create a new fragment with the
      // correct attachment and object substitution character;

      if (emojis[emoji] && emojis[emoji].data) {
        result.push({
          string: chunk.replace(match, String.fromCharCode(0xfffc)),
          attributes: _extends({}, fragment.attributes, {
            attachment: {
              width: emojiSize,
              height: emojiSize,
              yOffset: Math.floor(emojiSize * 0.1),
              image: emojis[emoji].data
            }
          })
        });
      } else {
        // If no emoji data, we just replace the emoji with a nodef char
        result.push({
          string: chunk.replace(match, String.fromCharCode(0)),
          attributes: fragment.attributes
        });
      }

      lastIndex = index + emoji.length;
    }

    if (lastIndex < fragment.string.length) {
      result.push({
        string: fragment.string.slice(lastIndex),
        attributes: fragment.attributes
      });
    }
  }

  return result;
};

var IGNORABLE_CODEPOINTS = [8232, // LINE_SEPARATOR
8233];

var buildSubsetForFont = function buildSubsetForFont(font) {
  return IGNORABLE_CODEPOINTS.reduce(function (acc, codePoint) {
    if (font.hasGlyphForCodePoint && font.hasGlyphForCodePoint(codePoint)) {
      return acc;
    }

    return [].concat(acc, [String.fromCharCode(codePoint)]);
  }, []);
};

var ignoreChars = function ignoreChars(fragments) {
  return fragments.map(function (fragment) {
    var charSubset = buildSubsetForFont(fragment.attributes.font);
    var subsetRegex = new RegExp(charSubset.join('|'));
    return {
      string: fragment.string.replace(subsetRegex, ''),
      attributes: fragment.attributes
    };
  });
};

var PREPROCESSORS = [ignoreChars, embedEmojis];

var capitalize = function capitalize(value) {
  return value.replace(/(^|\s)\S/g, function (l) {
    return l.toUpperCase();
  });
};

var isImage = propEq('name', 'Image');
var isTextInstance = compose(complement(isNil), prop('value'));

var transformText = function transformText(text, transformation) {
  switch (transformation) {
    case 'uppercase':
      return text.toUpperCase();

    case 'lowercase':
      return text.toLowerCase();

    case 'capitalize':
      return capitalize(text);

    default:
      return text;
  }
};

var getFragments = function getFragments(instance) {
  if (!instance) return [{
    string: ''
  }];
  var fragments = [];
  var _instance$style = instance.style,
      _instance$style$color = _instance$style.color,
      color = _instance$style$color === void 0 ? 'black' : _instance$style$color,
      backgroundColor = _instance$style.backgroundColor,
      _instance$style$fontF = _instance$style.fontFamily,
      fontFamily = _instance$style$fontF === void 0 ? 'Helvetica' : _instance$style$fontF,
      fontWeight = _instance$style.fontWeight,
      fontStyle = _instance$style.fontStyle,
      _instance$style$fontS = _instance$style.fontSize,
      fontSize = _instance$style$fontS === void 0 ? 18 : _instance$style$fontS,
      _instance$style$textA = _instance$style.textAlign,
      textAlign = _instance$style$textA === void 0 ? 'left' : _instance$style$textA,
      lineHeight = _instance$style.lineHeight,
      textDecoration = _instance$style.textDecoration,
      textDecorationColor = _instance$style.textDecorationColor,
      textDecorationStyle = _instance$style.textDecorationStyle,
      textTransform = _instance$style.textTransform,
      letterSpacing = _instance$style.letterSpacing,
      textIndent = _instance$style.textIndent,
      opacity = _instance$style.opacity;
  var obj = Font$1.getFont({
    fontFamily: fontFamily,
    fontWeight: fontWeight,
    fontStyle: fontStyle
  });
  var font = obj ? obj.data : fontFamily;
  var attributes = {
    font: font,
    color: color,
    opacity: opacity,
    fontSize: fontSize,
    backgroundColor: backgroundColor,
    align: textAlign,
    indent: textIndent,
    link: instance.src,
    characterSpacing: letterSpacing,
    underlineStyle: textDecorationStyle,
    underline: textDecoration === 'underline',
    underlineColor: textDecorationColor || color,
    strike: textDecoration === 'line-through',
    strikeStyle: textDecorationStyle,
    strikeColor: textDecorationColor || color,
    lineHeight: lineHeight ? lineHeight * fontSize : null
  };
  instance.children.forEach(function (child) {
    if (isImage(child)) {
      fragments.push({
        string: String.fromCharCode(0xfffc),
        attributes: _extends({}, attributes, {
          attachment: {
            width: child.style.width || fontSize,
            height: child.style.height || fontSize,
            image: child.image.data
          }
        })
      });
    } else if (isTextInstance(child)) {
      fragments.push({
        string: transformText(child.value, textTransform),
        attributes: attributes
      });
    } else {
      if (child) {
        var _fragments;

        (_fragments = fragments).push.apply(_fragments, getFragments(child));
      }
    }
  });

  for (var _i = 0; _i < PREPROCESSORS.length; _i++) {
    var preprocessor = PREPROCESSORS[_i];
    fragments = preprocessor(fragments);
  }

  return fragments;
};
var getAttributedString = function getAttributedString(instance) {
  return AttributedString.fromFragments(getFragments(instance));
};

var Text =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Text, _Base);

  function Text(root, props) {
    var _this;

    _this = _Base.call(this, root, props) || this;
    _this.start = 0;
    _this.end = 0;
    _this.blocks = null;
    _this.computed = false;
    _this.attributedString = null;
    _this.layoutOptions = {
      hyphenationPenalty: props.hyphenationPenalty,
      hyphenationCallback: Font$1.getHyphenationCallback(),
      shrinkWhitespaceFactor: {
        before: -0.5,
        after: -0.5
      }
    };

    _this.layout.setMeasureFunc(_this.measureText.bind(_assertThisInitialized(_this)));

    return _this;
  }

  var _proto = Text.prototype;

  _proto.appendChild = function appendChild(child) {
    if (child) {
      child.parent = this;
      this.children.push(child);
      this.computed = false;
      this.attributedString = null;
      this.markDirty();
    }
  };

  _proto.removeChild = function removeChild(child) {
    var index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
      this.computed = false;
      this.attributedString = null;
      this.markDirty();
      child.cleanup();
    }
  };

  _proto.lineIndexAtHeight = function lineIndexAtHeight(height) {
    var counter = 0;

    for (var i = 0; i < this.lines.length; i++) {
      var line = this.lines[i];
      if (counter + line.box.height > height) return i;
      counter += line.box.height;
    }

    return this.lines.length;
  };

  _proto.heightAtLineIndex = function heightAtLineIndex(index) {
    var counter = 0;

    for (var i = 0; i < index; i++) {
      var line = this.lines[i];
      counter += line.box.height;
    }

    return counter;
  };

  _proto.layoutText = function layoutText(width, height) {
    this.attributedString = getAttributedString(this); // Text layout is expensive. That's why we ensure to only do it once
    // (except dynamic nodes. Those change content and needs to relayout every time)

    if (!this.blocks || this.props.render) {
      // Do the actual text layout.
      /// If height null or NaN, we take some liberty on layout height
      var container = {
        x: 0,
        y: 0,
        width: width,
        height: height || Infinity,
        maxLines: this.style.maxLines,
        truncateMode: this.style.textOverflow
      };
      this.blocks = engine(this.attributedString, container, this.layoutOptions);
    } // Get the total amount of rendered lines


    var linesCount = this.blocks.reduce(function (acc, b) {
      return acc + b.length;
    }, 0);
    this.end = linesCount + 1;
    this.computed = true;
  };

  _proto.measureText = function measureText(width, widthMode, height, heightMode) {
    if (widthMode === Yoga.MEASURE_MODE_EXACTLY) {
      this.layoutText(width, height);
      return {
        height: this.linesHeight
      };
    }

    if (widthMode === Yoga.MEASURE_MODE_AT_MOST) {
      this.layoutText(width, height);
      return {
        height: this.linesHeight,
        width: Math.min(width, this.linesWidth)
      };
    }

    return {};
  };

  _proto.resolveStyles = function resolveStyles() {
    var styles = _Base.prototype.resolveStyles.call(this); // Inherit relative positioning for inline childs


    if (this.parent && this.parent.name === 'Text' && this.parent.style.position === 'relative') {
      styles.top = styles.top || this.parent.style.top;
      styles.bottom = styles.bottom || this.parent.style.bottom;
      styles.position = styles.position || 'relative';
    } // Apply default link styles


    if (this.src) {
      styles.color = styles.color || 'blue';
      styles.textDecoration = styles.textDecoration || 'underline';
    }

    return styles;
  };

  _proto.wrapHeight = function wrapHeight(height) {
    var _this$props = this.props,
        orphans = _this$props.orphans,
        widows = _this$props.widows;
    var linesQuantity = this.lines.length;
    var sliceHeight = height - this.paddingTop;
    var slicedLine = this.lineIndexAtHeight(sliceHeight);

    if (linesQuantity < orphans) {
      return height;
    } else if (slicedLine < orphans || linesQuantity < orphans + widows) {
      return 0;
    } else if (linesQuantity === orphans + widows) {
      return this.heightAtLineIndex(orphans);
    } else if (linesQuantity - slicedLine < widows) {
      return height - this.heightAtLineIndex(widows - 1);
    }

    return height;
  };

  _proto.onNodeSplit = function onNodeSplit(height, clone) {
    var wrapHeight = this.wrapHeight(height);
    var slicedLineIndex = this.lineIndexAtHeight(wrapHeight);
    clone.marginTop = 0;
    clone.paddingTop = 0;
    clone.start = slicedLineIndex;
    clone.attributedString = this.attributedString;
    this.height = wrapHeight;
    this.marginBottom = 0;
    this.paddingBottom = 0;
    this.end = slicedLineIndex;
  };

  _proto.clone = function clone() {
    var text = _Base.prototype.clone.call(this);

    text.layoutEngine = this.layoutEngine; // Save calculated layout for non-dynamic clone elements

    if (this.blocks && !this.props.render) {
      text.blocks = [].concat(this.blocks);
    }

    return text;
  };

  _proto.renderText = function renderText() {
    var _this$getAbsoluteLayo = this.getAbsoluteLayout(),
        top = _this$getAbsoluteLayo.top,
        left = _this$getAbsoluteLayo.left;

    var initialY = this.lines[0] ? this.lines[0].box.y : 0; // We translate lines based on Yoga container

    this.root.instance.save();
    this.root.instance.translate(left + this.padding.left, top + this.padding.top - initialY); // Perform actual text rendering on document

    PDFRenderer$1.render(this.root.instance, [this.lines]);
    setLink(this);
    setDestination(this);
    this.root.instance.restore();
  };

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.root.instance.save();
              this.applyTransformations();
              this.drawBackgroundColor();
              this.drawBorders(); // Calculate text layout if needed
              // This can happen if measureText was not called by Yoga

              if (!this.computed) {
                this.layoutText(this.width - this.padding.left - this.padding.right, this.height - this.padding.top - this.padding.bottom);
              }

              this.renderText();

              if (this.props.debug) {
                this.debug();
              }

              this.root.instance.restore();

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Text, [{
    key: "name",
    get: function get() {
      return 'Text';
    }
  }, {
    key: "src",
    get: function get() {
      return getURL(this.props.src || this.props.href);
    }
  }, {
    key: "lines",
    get: function get() {
      if (!this.blocks) return [];
      return this.blocks.reduce(function (acc, block) {
        return [].concat(acc, block);
      }, []).splice(this.start, this.end);
    }
  }, {
    key: "linesHeight",
    get: function get() {
      if (!this.blocks) return -1;
      return this.lines.reduce(function (acc, line) {
        return acc + line.box.height;
      }, 0);
    }
  }, {
    key: "linesWidth",
    get: function get() {
      if (!this.blocks) return -1;
      return Math.max.apply(Math, this.lines.map(function (line) {
        return AttributedString.advanceWidth(line);
      }));
    }
  }]);

  return Text;
}(Base);

Text.defaultProps = {
  wrap: true,
  widows: 2,
  orphans: 2
};

var Link =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Link, _Base);

  function Link() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Link.prototype;

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              setLink(this);
              _context.next = 3;
              return this.renderChildren();

            case 3:
              if (this.props.debug) this.debug();

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Link, [{
    key: "name",
    get: function get() {
      return 'Link';
    }
  }, {
    key: "src",
    get: function get() {
      return getURL(this.props.src || this.props.href);
    }
  }]);

  return Link;
}(Base);

var Note =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Note, _Base);

  function Note() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Note.prototype;

  _proto.appendChild = function appendChild(child) {
    if (child.name !== 'TextInstance') {
      throw new Error('Note only accepts string children');
    }

    if (child) {
      child.parent = this;
      this.children.push(child);
    }
  };

  _proto.removeChild = function removeChild(child) {
    var index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }

    child.cleanup();
  };

  _proto.applyProps = function applyProps() {
    _Base.prototype.applyProps.call(this);

    this.height = 0;
    this.width = 0;
  };

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var _this$getAbsoluteLayo, top, left, value;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$getAbsoluteLayo = this.getAbsoluteLayout(), top = _this$getAbsoluteLayo.top, left = _this$getAbsoluteLayo.left;
              value = this.children[0] ? this.children[0].value : '';
              this.root.instance.note(left, top, 0, 0, value);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Note, [{
    key: "name",
    get: function get() {
      return 'Note';
    }
  }]);

  return Note;
}(Base);

Note.defaultProps = {};

var isNumeric = function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

var applyContainObjectFit = function applyContainObjectFit(cw, ch, iw, ih, px, py) {
  var cr = cw / ch;
  var ir = iw / ih;
  var pxp = matchPercent(px);
  var pyp = matchPercent(py);
  var pxv = pxp ? pxp.percent : 0.5;
  var pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    var height = ch;
    var width = height * ir;
    var yOffset = isNumeric(py) ? py : 0;
    var xOffset = isNumeric(px) ? px : (cw - width) * pxv;
    return {
      width: width,
      height: height,
      xOffset: xOffset,
      yOffset: yOffset
    };
  } else {
    var _width = cw;

    var _height = _width / ir;

    var _xOffset = isNumeric(px) ? px : 0;

    var _yOffset = isNumeric(py) ? py : (ch - _height) * pyv;

    return {
      width: _width,
      height: _height,
      yOffset: _yOffset,
      xOffset: _xOffset
    };
  }
};

var applyNoneObjectFit = function applyNoneObjectFit(cw, ch, iw, ih, px, py) {
  var width = iw;
  var height = ih;
  var pxp = matchPercent(px);
  var pyp = matchPercent(py);
  var pxv = pxp ? pxp.percent : 0.5;
  var pyv = pyp ? pyp.percent : 0.5;
  var xOffset = isNumeric(px) ? px : (cw - width) * pxv;
  var yOffset = isNumeric(py) ? py : (ch - height) * pyv;
  return {
    width: width,
    height: height,
    xOffset: xOffset,
    yOffset: yOffset
  };
};

var applyCoverObjectFit = function applyCoverObjectFit(cw, ch, iw, ih, px, py) {
  var ir = iw / ih;
  var cr = cw / ch;
  var pxp = matchPercent(px);
  var pyp = matchPercent(py);
  var pxv = pxp ? pxp.percent : 0.5;
  var pyv = pyp ? pyp.percent : 0.5;

  if (cr > ir) {
    var width = cw;
    var height = width / ir;
    var xOffset = isNumeric(px) ? px : 0;
    var yOffset = isNumeric(py) ? py : (ch - height) * pyv;
    return {
      width: width,
      height: height,
      yOffset: yOffset,
      xOffset: xOffset
    };
  } else {
    var _height2 = ch;

    var _width2 = _height2 * ir;

    var _xOffset2 = isNumeric(px) ? px : (cw - _width2) * pxv;

    var _yOffset2 = isNumeric(py) ? py : 0;

    return {
      width: _width2,
      height: _height2,
      xOffset: _xOffset2,
      yOffset: _yOffset2
    };
  }
};

var applyScaleDownObjectFit = function applyScaleDownObjectFit(cw, ch, iw, ih, px, py) {
  var containDimension = applyContainObjectFit(cw, ch, iw, ih, px, py);
  var noneDimension = applyNoneObjectFit(cw, ch, iw, ih, px, py);
  return containDimension.width < noneDimension.width ? containDimension : noneDimension;
};

var applyFillObjectFit = function applyFillObjectFit(cw, ch, px, py) {
  return {
    width: cw,
    height: ch,
    xOffset: matchPercent(px) ? 0 : px || 0,
    yOffset: matchPercent(py) ? 0 : py || 0
  };
};

var resolveObjectFit = function resolveObjectFit(type, cw, ch, iw, ih, px, py) {
  if (type === void 0) {
    type = 'fill';
  }

  switch (type) {
    case 'contain':
      return applyContainObjectFit(cw, ch, iw, ih, px, py);

    case 'cover':
      return applyCoverObjectFit(cw, ch, iw, ih, px, py);

    case 'none':
      return applyNoneObjectFit(cw, ch, iw, ih, px, py);

    case 'scale-down':
      return applyScaleDownObjectFit(cw, ch, iw, ih, px, py);

    default:
      return applyFillObjectFit(cw, ch, px, py);
  }
};

var SAFETY_HEIGHT = 10;

var Image =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Image, _Base);

  function Image(root, props) {
    var _this;

    _this = _Base.call(this, root, props) || this;
    _this.image = null;

    _this.layout.setMeasureFunc(_this.measureImage.bind(_assertThisInitialized(_this)));

    return _this;
  }

  var _proto = Image.prototype;

  _proto.shouldGrow = function shouldGrow() {
    return !!this.style.flexGrow;
  };

  _proto.measureImage = function measureImage(width, widthMode, height, heightMode) {
    var imageMargin = this.margin;
    var pagePadding = this.page.padding;
    var pageArea = this.page.isAutoHeight ? Infinity : this.page.size.height - pagePadding.top - pagePadding.bottom - imageMargin.top - imageMargin.bottom - SAFETY_HEIGHT; // Skip measure if image data not present yet

    if (!this.image) return {
      width: 0,
      height: 0
    };

    if (widthMode === Yoga.MEASURE_MODE_EXACTLY && heightMode === Yoga.MEASURE_MODE_UNDEFINED) {
      var scaledHeight = width / this.ratio;
      return {
        height: Math.min(pageArea, scaledHeight)
      };
    }

    if (heightMode === Yoga.MEASURE_MODE_EXACTLY && (widthMode === Yoga.MEASURE_MODE_AT_MOST || widthMode === Yoga.MEASURE_MODE_UNDEFINED)) {
      return {
        width: Math.min(height * this.ratio, width)
      };
    }

    if (widthMode === Yoga.MEASURE_MODE_EXACTLY && heightMode === Yoga.MEASURE_MODE_AT_MOST) {
      var _scaledHeight = width / this.ratio;

      return {
        height: Math.min(height, pageArea, _scaledHeight)
      };
    }

    if (widthMode === Yoga.MEASURE_MODE_AT_MOST && heightMode === Yoga.MEASURE_MODE_AT_MOST) {
      if (this.ratio > 1) {
        return {
          width: width,
          height: Math.min(width / this.ratio, height)
        };
      } else {
        return {
          width: Math.min(height * this.ratio, width),
          height: height
        };
      }
    }

    return {
      height: height,
      width: width
    };
  };

  _proto.fetch =
  /*#__PURE__*/
  function () {
    var _fetch = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var _this$props, cache, safePath, allowDangerousPaths;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = this.props, cache = _this$props.cache, safePath = _this$props.safePath, allowDangerousPaths = _this$props.allowDangerousPaths;

              if (this.src) {
                _context.next = 4;
                break;
              }

              warning(false, 'Image should receive either a "src" or "source" prop');
              return _context.abrupt("return");

            case 4:
              _context.prev = 4;
              _context.next = 7;
              return resolveImage(this.src, {
                cache: cache,
                safePath: safePath,
                allowDangerousPaths: allowDangerousPaths
              });

            case 7:
              this.image = _context.sent;
              _context.next = 14;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](4);
              this.image = {
                width: 0,
                height: 0
              };
              console.warn(_context.t0.message);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this, [[4, 10]]);
    }));

    function fetch() {
      return _fetch.apply(this, arguments);
    }

    return fetch;
  }();

  _proto.clone = function clone() {
    var clone = _Base.prototype.clone.call(this);

    clone.image = this.image;
    return clone;
  };

  _proto.onAppendDynamically =
  /*#__PURE__*/
  function () {
    var _onAppendDynamically = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return this.fetch();

            case 2:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function onAppendDynamically() {
      return _onAppendDynamically.apply(this, arguments);
    }

    return onAppendDynamically;
  }();

  _proto.renderImage = function renderImage() {
    var padding = this.padding;

    var _this$getAbsoluteLayo = this.getAbsoluteLayout(),
        left = _this$getAbsoluteLayo.left,
        top = _this$getAbsoluteLayo.top;

    var _this$style = this.style,
        opacity = _this$style.opacity,
        objectPositionX = _this$style.objectPositionX,
        objectPositionY = _this$style.objectPositionY;
    this.root.instance.save(); // Clip path to keep image inside border radius

    this.clip();

    if (this.image.data) {
      var _resolveObjectFit = resolveObjectFit(this.style.objectFit, this.width - padding.left - padding.right, this.height - padding.top - padding.bottom, this.image.width, this.image.height, objectPositionX, objectPositionY),
          width = _resolveObjectFit.width,
          height = _resolveObjectFit.height,
          xOffset = _resolveObjectFit.xOffset,
          yOffset = _resolveObjectFit.yOffset;

      if (width !== 0 && height !== 0) {
        this.root.instance.fillOpacity(opacity).image(this.image.data, left + padding.left + xOffset, top + padding.top + yOffset, {
          width: width,
          height: height
        });
      } else {
        warning(false, "Image with src '" + this.props.src + "' skipped due to invalid dimensions");
      }
    }

    this.root.instance.restore();
  };

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3() {
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              this.root.instance.save();
              this.applyTransformations();
              this.drawBackgroundColor();
              this.renderImage();
              this.drawBorders();

              if (this.props.debug) {
                this.debug();
              }

              setDestination(this);
              this.root.instance.restore();

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Image, [{
    key: "name",
    get: function get() {
      return 'Image';
    }
  }, {
    key: "ratio",
    get: function get() {
      return this.image.data ? this.image.width / this.image.height : 1;
    }
  }, {
    key: "src",
    get: function get() {
      var src = this.props.src || this.props.source;
      return typeof src === 'string' ? {
        uri: src
      } : src;
    }
  }]);

  return Image;
}(Base);

Image.defaultProps = {
  wrap: false,
  cache: true,
  style: {}
};

var Document =
/*#__PURE__*/
function () {
  function Document(root, props) {
    this.root = root;
    this.style = {};
    this.props = props;
    this.children = [];
    this.subpages = [];
  }

  var _proto = Document.prototype;

  _proto.appendChild = function appendChild(child) {
    child.parent = this;
    this.children.push(child);
  };

  _proto.removeChild = function removeChild(child) {
    var index = this.children.indexOf(child);

    if (index !== -1) {
      child.parent = null;
      this.children.splice(index, 1);
    }

    child.cleanup();
  };

  _proto.addMetaData = function addMetaData() {
    var _this$props = this.props,
        title = _this$props.title,
        author = _this$props.author,
        subject = _this$props.subject,
        keywords = _this$props.keywords,
        creator = _this$props.creator,
        producer = _this$props.producer; // The object keys need to start with a capital letter by the PDF spec

    if (title) this.root.instance.info.Title = title;
    if (author) this.root.instance.info.Author = author;
    if (subject) this.root.instance.info.Subject = subject;
    if (keywords) this.root.instance.info.Keywords = keywords;
    this.root.instance.info.Creator = creator || 'react-pdf';
    this.root.instance.info.Producer = producer || 'react-pdf';
  };

  _proto.loadFonts =
  /*#__PURE__*/
  function () {
    var _loadFonts = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var promises, listToExplore, node;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              promises = [];
              listToExplore = this.children.slice(0);

              while (listToExplore.length > 0) {
                node = listToExplore.shift();

                if (node.style && node.style.fontFamily) {
                  promises.push(Font$1.load(node.style, this.root.instance));
                }

                if (node.children) {
                  node.children.forEach(function (childNode) {
                    listToExplore.push(childNode);
                  });
                }
              }

              _context.next = 5;
              return Promise.all(promises);

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function loadFonts() {
      return _loadFonts.apply(this, arguments);
    }

    return loadFonts;
  }();

  _proto.loadEmojis =
  /*#__PURE__*/
  function () {
    var _loadEmojis = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2() {
      var promises, listToExplore, node;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              promises = [];
              listToExplore = this.children.slice(0);

              while (listToExplore.length > 0) {
                node = listToExplore.shift();

                if (typeof node === 'string') {
                  promises.push.apply(promises, fetchEmojis(node));
                } else if (typeof node.value === 'string') {
                  promises.push.apply(promises, fetchEmojis(node.value));
                } else if (node.children) {
                  node.children.forEach(function (childNode) {
                    listToExplore.push(childNode);
                  });
                }
              }

              _context2.next = 5;
              return Promise.all(promises);

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function loadEmojis() {
      return _loadEmojis.apply(this, arguments);
    }

    return loadEmojis;
  }();

  _proto.loadImages =
  /*#__PURE__*/
  function () {
    var _loadImages = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee3() {
      var promises, listToExplore, node;
      return _regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              promises = [];
              listToExplore = this.children.slice(0);

              while (listToExplore.length > 0) {
                node = listToExplore.shift();

                if (node.name === 'Image') {
                  promises.push(node.fetch());
                }

                if (node.children) {
                  node.children.forEach(function (childNode) {
                    listToExplore.push(childNode);
                  });
                }
              }

              _context3.next = 5;
              return Promise.all(promises);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function loadImages() {
      return _loadImages.apply(this, arguments);
    }

    return loadImages;
  }();

  _proto.loadAssets =
  /*#__PURE__*/
  function () {
    var _loadAssets = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee4() {
      return _regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return Promise.all([this.loadFonts(), this.loadImages(), this.loadEmojis()]);

            case 2:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function loadAssets() {
      return _loadAssets.apply(this, arguments);
    }

    return loadAssets;
  }();

  _proto.applyProps = function applyProps() {
    this.children.forEach(function (child) {
      return child.applyProps();
    });
  };

  _proto.update = function update(newProps) {
    this.props = newProps;
  };

  _proto.cleanup = function cleanup() {
    this.subpages.forEach(function (p) {
      return p.cleanup();
    });
  };

  _proto.finish = function finish() {
    this.children.forEach(function (c) {
      return c.cleanup();
    });
  };

  _proto.getLayoutData = function getLayoutData() {
    return {
      type: this.name,
      children: this.subpages.map(function (c) {
        return c.getLayoutData();
      })
    };
  };

  _proto.wrapPages =
  /*#__PURE__*/
  function () {
    var _wrapPages2 = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee5() {
      var pageCount, pages, _iterator, _isArray, _i, _ref, page, wrapArea, subpages;

      return _regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              pageCount = 1;
              pages = [];
              _iterator = this.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();

            case 3:
              if (!_isArray) {
                _context5.next = 9;
                break;
              }

              if (!(_i >= _iterator.length)) {
                _context5.next = 6;
                break;
              }

              return _context5.abrupt("break", 26);

            case 6:
              _ref = _iterator[_i++];
              _context5.next = 13;
              break;

            case 9:
              _i = _iterator.next();

              if (!_i.done) {
                _context5.next = 12;
                break;
              }

              return _context5.abrupt("break", 26);

            case 12:
              _ref = _i.value;

            case 13:
              page = _ref;

              if (!page.wrap) {
                _context5.next = 23;
                break;
              }

              wrapArea = page.isAutoHeight ? Infinity : page.size.height - (page.style.paddingBottom || 0);
              _context5.next = 18;
              return _wrapPages(page, wrapArea, pageCount);

            case 18:
              subpages = _context5.sent;
              pageCount += subpages.length;
              pages.push.apply(pages, subpages);
              _context5.next = 24;
              break;

            case 23:
              pages.push(page);

            case 24:
              _context5.next = 3;
              break;

            case 26:
              return _context5.abrupt("return", pages);

            case 27:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function wrapPages() {
      return _wrapPages2.apply(this, arguments);
    }

    return wrapPages;
  }();

  _proto.renderPages =
  /*#__PURE__*/
  function () {
    var _renderPages = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee6() {
      var j;
      return _regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.wrapPages();

            case 2:
              this.subpages = _context6.sent;
              j = 0;

            case 4:
              if (!(j < this.subpages.length)) {
                _context6.next = 11;
                break;
              }

              // Update dynamic text nodes with total pages info
              this.subpages[j].renderDynamicNodes({
                pageNumber: j + 1,
                totalPages: this.subpages.length
              }, function (node) {
                return node.name === 'Text';
              });
              _context6.next = 8;
              return this.subpages[j].render();

            case 8:
              j++;
              _context6.next = 4;
              break;

            case 11:
              return _context6.abrupt("return", this.subpages);

            case 12:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function renderPages() {
      return _renderPages.apply(this, arguments);
    }

    return renderPages;
  }();

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee7() {
      return _regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              this.addMetaData();
              this.applyProps();
              _context7.next = 5;
              return this.loadAssets();

            case 5:
              _context7.next = 7;
              return this.renderPages();

            case 7:
              this.root.instance.end();
              Font$1.reset();
              _context7.next = 14;
              break;

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              throw _context7.t0;

            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this, [[0, 11]]);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Document, [{
    key: "name",
    get: function get() {
      return 'Document';
    }
  }]);

  return Document;
}();

Document.defaultProps = {
  author: null,
  keywords: null,
  subject: null,
  title: null
};

var availableMethods = ['dash', 'clip', 'save', 'path', 'fill', 'font', 'text', 'rect', 'scale', 'moveTo', 'lineTo', 'stroke', 'rotate', 'circle', 'lineCap', 'opacity', 'ellipse', 'polygon', 'restore', 'lineJoin', 'fontSize', 'fillColor', 'lineWidth', 'translate', 'miterLimit', 'strokeColor', 'fillOpacity', 'roundedRect', 'strokeOpacity', 'bezierCurveTo', 'quadraticCurveTo', 'linearGradient', 'radialGradient'];

var painter = function painter(instance) {
  var p = availableMethods.reduce(function (acc, prop) {
    var _extends2;

    return _extends({}, acc, (_extends2 = {}, _extends2[prop] = function () {
      instance[prop].apply(instance, arguments);
      return p;
    }, _extends2));
  }, {});
  return p;
};

var Canvas =
/*#__PURE__*/
function (_Base) {
  _inheritsLoose(Canvas, _Base);

  function Canvas() {
    return _Base.apply(this, arguments) || this;
  }

  var _proto = Canvas.prototype;

  _proto.render =
  /*#__PURE__*/
  function () {
    var _render = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var _this$getAbsoluteLayo, left, top, width, height, availableWidth, availableHeight;

      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$getAbsoluteLayo = this.getAbsoluteLayout(), left = _this$getAbsoluteLayo.left, top = _this$getAbsoluteLayo.top, width = _this$getAbsoluteLayo.width, height = _this$getAbsoluteLayo.height;
              availableWidth = width - this.paddingLeft - this.paddingRight;
              availableHeight = height - this.paddingTop - this.paddingBottom;
              warning(availableWidth && availableHeight, 'Canvas element has null width or height. Please provide valid values via the `style` prop in order to correctly render it.');
              this.root.instance.save();
              this.applyTransformations();
              this.drawBackgroundColor();
              this.drawBorders();
              this.clip();
              this.root.instance.translate(left + this.paddingLeft, top + this.paddingTop);

              if (this.props.paint) {
                this.props.paint(painter(this.root.instance), availableWidth, availableHeight);
              }

              this.root.instance.restore();

              if (this.props.debug) {
                this.debug();
              }

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function render() {
      return _render.apply(this, arguments);
    }

    return render;
  }();

  _createClass(Canvas, [{
    key: "name",
    get: function get() {
      return 'Canvas';
    }
  }]);

  return Canvas;
}(Base);

Canvas.defaultProps = {
  style: {},
  wrap: false
};

var constructors = {
  ROOT: Root,
  PAGE: Page,
  TEXT: Text,
  LINK: Link,
  VIEW: View,
  NOTE: Note,
  IMAGE: Image,
  CANVAS: Canvas,
  DOCUMENT: Document,
  TEXT_INSTANCE: TextInstance
};

function createInstance(element, root) {
  var type = element.type,
      _element$props = element.props,
      props = _element$props === void 0 ? {} : _element$props;

  if (constructors[type]) {
    return new constructors[type](root, props);
  }

  throw new Error("Invalid element of type " + type + " passed to PDF renderer");
}

var propsEqual = function propsEqual(a, b) {
  var oldPropsKeys = Object.keys(a);
  var newPropsKeys = Object.keys(b);

  if (oldPropsKeys.length !== newPropsKeys.length) {
    return false;
  }

  for (var i = 0; i < oldPropsKeys.length; i++) {
    var propName = oldPropsKeys[i];

    if (propName === 'render') {
      if (!a[propName] !== !b[propName]) {
        return false;
      }

      continue;
    }

    if (propName !== 'children' && a[propName] !== b[propName]) {
      if (typeof a[propName] === 'object' && typeof b[propName] === 'object' && propsEqual(a[propName], b[propName])) {
        continue;
      }

      return false;
    }

    if (propName === 'children' && (typeof a[propName] === 'string' || typeof b[propName] === 'string')) {
      return a[propName] === b[propName];
    }
  }

  return true;
};

var emptyObject = {}; // If the Link has a strign child or render prop, substitute the instance by a Text,
// that will ultimately render the inline Link via the textkit PDF renderer.

var shouldReplaceLink = function shouldReplaceLink(type, props) {
  return type === 'LINK' && (typeof props.children === 'string' || typeof props.children === 'number' || Array.isArray(props.children) || props.render);
};

var PDFRenderer = ReactFiberReconciler({
  schedulePassiveEffects: unstable_scheduleCallback,
  cancelPassiveEffects: unstable_cancelCallback,
  supportsMutation: true,
  appendInitialChild: function appendInitialChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  createInstance: function createInstance$1(type, props, internalInstanceHandle) {
    var instanceType = shouldReplaceLink(type, props) ? 'TEXT' : type;
    return createInstance({
      type: instanceType,
      props: props
    }, internalInstanceHandle);
  },
  createTextInstance: function createTextInstance(text, rootContainerInstance) {
    return createInstance({
      type: 'TEXT_INSTANCE',
      props: text
    }, rootContainerInstance);
  },
  finalizeInitialChildren: function finalizeInitialChildren(element, type, props) {
    return false;
  },
  getPublicInstance: function getPublicInstance(instance) {
    return instance;
  },
  prepareForCommit: function prepareForCommit() {// Noop
  },
  prepareUpdate: function prepareUpdate(element, type, oldProps, newProps) {
    return !propsEqual(oldProps, newProps);
  },
  resetAfterCommit: function resetAfterCommit() {// Noop
  },
  resetTextContent: function resetTextContent(element) {// Noop
  },
  getRootHostContext: function getRootHostContext() {
    return emptyObject;
  },
  getChildHostContext: function getChildHostContext() {
    return emptyObject;
  },
  shouldSetTextContent: function shouldSetTextContent(type, props) {
    return false;
  },
  now: Date.now,
  useSyncScheduling: true,
  appendChild: function appendChild(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  appendChildToContainer: function appendChildToContainer(parentInstance, child) {
    parentInstance.appendChild(child);
  },
  insertBefore: function insertBefore(parentInstance, child, beforeChild) {
    parentInstance.appendChildBefore(child, beforeChild);
  },
  removeChild: function removeChild(parentInstance, child) {
    parentInstance.removeChild(child);
  },
  removeChildFromContainer: function removeChildFromContainer(parentInstance, child) {
    parentInstance.removeChild(child);
  },
  commitTextUpdate: function commitTextUpdate(textInstance, oldText, newText) {
    textInstance.update(newText);
  },
  commitUpdate: function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    instance.update(newProps);
  }
});

var version = "1.6.7";

var View$1 = 'VIEW';
var Text$1 = 'TEXT';
var Link$1 = 'LINK';
var Page$1 = 'PAGE';
var Note$1 = 'NOTE';
var Image$1 = 'IMAGE';
var Document$1 = 'DOCUMENT';
var Canvas$1 = 'CANVAS';

var pdf = function pdf(input) {
  var container = createInstance({
    type: 'ROOT'
  });
  var mountNode = PDFRenderer.createContainer(container);
  if (input) updateContainer(input);

  function callOnRender(params) {
    if (params === void 0) {
      params = {};
    }

    if (container.document.props.onRender) {
      var layoutData = container.document.getLayoutData();
      container.document.props.onRender(_extends({}, params, {
        layoutData: layoutData
      }));
    }
  }

  function isDirty() {
    return container.isDirty;
  }

  function updateContainer(doc) {
    PDFRenderer.updateContainer(doc, mountNode, null);
  }

  function toBlob() {
    return _toBlob.apply(this, arguments);
  }

  function _toBlob() {
    _toBlob = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee() {
      var stream;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return container.render();

            case 2:
              stream = container.instance.pipe(BlobStream());
              return _context.abrupt("return", new Promise(function (resolve, reject) {
                stream.on('finish', function () {
                  try {
                    var blob = stream.toBlob('application/pdf');
                    callOnRender({
                      blob: blob
                    });
                    resolve(blob);
                  } catch (error) {
                    reject(error);
                  }
                });
                stream.on('error', reject);
              }));

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return _toBlob.apply(this, arguments);
  }

  function toBuffer() {
    return _toBuffer.apply(this, arguments);
  }

  function _toBuffer() {
    _toBuffer = _asyncToGenerator(
    /*#__PURE__*/
    _regeneratorRuntime.mark(function _callee2() {
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return container.render();

            case 2:
              callOnRender();
              return _context2.abrupt("return", container.instance);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return _toBuffer.apply(this, arguments);
  }

  function toString() {
    var result = '';
    container.render();
    return new Promise(function (resolve, reject) {
      try {
        container.instance.on('data', function (buffer) {
          result += buffer;
        });
        container.instance.on('end', function () {
          callOnRender({
            string: result
          });
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    isDirty: isDirty,
    container: container,
    updateContainer: updateContainer,
    toBuffer: toBuffer,
    toBlob: toBlob,
    toString: toString
  };
};

var flatStyles = function flatStyles(stylesArray) {
  return stylesArray.reduce(function (acc, style) {
    return _extends({}, acc, style);
  }, {});
};

var Document$2 = function Document(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return React.createElement(Document$1, props, children);
};

var InternalBlobProvider =
/*#__PURE__*/
function (_React$PureComponent) {
  _inheritsLoose(InternalBlobProvider, _React$PureComponent);

  function InternalBlobProvider(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this; // Create new root container for this render

    _this.state = {
      blob: null,
      url: null,
      loading: true,
      error: null
    };
    _this.instance = pdf();
    return _this;
  }

  var _proto = InternalBlobProvider.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.renderDocument();
    this.onDocumentUpdate();
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this.renderDocument();

    if (this.instance.isDirty() && !this.state.error) {
      this.onDocumentUpdate();
    }
  };

  _proto.renderDocument = function renderDocument() {
    this.instance.updateContainer(this.props.document);
  };

  _proto.onDocumentUpdate = function onDocumentUpdate() {
    var _this2 = this;

    var oldBlobUrl = this.state.url;
    this.instance.toBlob().then(function (blob) {
      _this2.setState({
        blob: blob,
        url: URL.createObjectURL(blob),
        loading: false
      }, function () {
        return URL.revokeObjectURL(oldBlobUrl);
      });
    }).catch(function (error) {
      _this2.setState({
        error: error
      });

      console.error(error);
      throw error;
    });
  };

  _proto.render = function render() {
    return this.props.children(this.state);
  };

  return InternalBlobProvider;
}(React.PureComponent);

var BlobProvider = function BlobProvider(_ref2) {
  var doc = _ref2.document,
      children = _ref2.children;

  if (!doc) {
    warning(false, 'You should pass a valid document to BlobProvider');
    return null;
  }

  return React.createElement(InternalBlobProvider, {
    document: doc
  }, children);
};
var PDFViewer = function PDFViewer(_ref3) {
  var className = _ref3.className,
      style = _ref3.style,
      children = _ref3.children,
      innerRef = _ref3.innerRef,
      props = _objectWithoutPropertiesLoose(_ref3, ["className", "style", "children", "innerRef"]);

  return React.createElement(InternalBlobProvider, {
    document: children
  }, function (_ref4) {
    var url = _ref4.url;
    return React.createElement("iframe", _extends({
      className: className,
      ref: innerRef,
      src: url,
      style: Array.isArray(style) ? flatStyles(style) : style
    }, props));
  });
};
var PDFDownloadLink = function PDFDownloadLink(_ref5) {
  var doc = _ref5.document,
      className = _ref5.className,
      style = _ref5.style,
      children = _ref5.children,
      _ref5$fileName = _ref5.fileName,
      fileName = _ref5$fileName === void 0 ? 'document.pdf' : _ref5$fileName;

  if (!doc) {
    warning(false, 'You should pass a valid document to PDFDownloadLink');
    return null;
  }

  var downloadOnIE = function downloadOnIE(blob) {
    return function () {
      if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, fileName);
      }
    };
  };

  return React.createElement(InternalBlobProvider, {
    document: doc
  }, function (params) {
    return React.createElement("a", {
      className: className,
      download: fileName,
      href: params.url,
      onClick: downloadOnIE(params.blob),
      style: Array.isArray(style) ? flatStyles(style) : style
    }, typeof children === 'function' ? children(params) : children);
  });
};
var dom = {
  pdf: pdf,
  View: View$1,
  Text: Text$1,
  Link: Link$1,
  Page: Page$1,
  Font: Font$1,
  Note: Note$1,
  Image: Image$1,
  Canvas: Canvas$1,
  version: version,
  Document: Document$2,
  PDFViewer: PDFViewer,
  StyleSheet: StyleSheet,
  PDFRenderer: PDFRenderer,
  BlobProvider: BlobProvider,
  createInstance: createInstance,
  PDFDownloadLink: PDFDownloadLink
};

export default dom;
export { Document$2 as Document, BlobProvider, PDFViewer, PDFDownloadLink, pdf, View$1 as View, Text$1 as Text, Link$1 as Link, Page$1 as Page, Font$1 as Font, Note$1 as Note, Image$1 as Image, Canvas$1 as Canvas, version, StyleSheet, PDFRenderer, createInstance };
//# sourceMappingURL=react-pdf.browser.es.js.map
