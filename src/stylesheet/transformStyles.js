import yogaValue from './yogaValue';
import parseScalar from './transformUnits';
import { isBorderStyle, processBorders } from './borders';
import { isBoxModelStyle, processBoxModel } from './boxModel';
import { isFontWeightStyle, processFontWeight } from './transformFontWeight';
import { isObjectPositionStyle, processObjectPosition } from './objectPosition';
import {
  isTransformOriginStyle,
  processTransformOrigin,
} from './transformOrigin';

const hasOwnProperty = Object.prototype.hasOwnProperty;

const styleShorthands = {
  margin: {
    marginTop: true,
    marginRight: true,
    marginBottom: true,
    marginLeft: true,
  },
  marginHorizontal: {
    marginLeft: true,
    marginRight: true,
  },
  marginVertical: {
    marginTop: true,
    marginBottom: true,
  },
  padding: {
    paddingTop: true,
    paddingRight: true,
    paddingBottom: true,
    paddingLeft: true,
  },
  paddingHorizontal: {
    paddingLeft: true,
    paddingRight: true,
  },
  paddingVertical: {
    paddingTop: true,
    paddingBottom: true,
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
    borderLeftWidth: true,
  },
  borderTop: {
    borderTopColor: true,
    borderTopStyle: true,
    borderTopWidth: true,
  },
  borderRight: {
    borderRightColor: true,
    borderRightStyle: true,
    borderRightWidth: true,
  },
  borderBottom: {
    borderBottomColor: true,
    borderBottomStyle: true,
    borderBottomWidth: true,
  },
  borderLeft: {
    borderLeftColor: true,
    borderLeftStyle: true,
    borderLeftWidth: true,
  },
  borderColor: {
    borderTopColor: true,
    borderRightColor: true,
    borderBottomColor: true,
    borderLeftColor: true,
  },
  borderRadius: {
    borderTopLeftRadius: true,
    borderTopRightRadius: true,
    borderBottomRightRadius: true,
    borderBottomLeftRadius: true,
  },
  borderStyle: {
    borderTopStyle: true,
    borderRightStyle: true,
    borderBottomStyle: true,
    borderLeftStyle: true,
  },
  borderWidth: {
    borderTopWidth: true,
    borderRightWidth: true,
    borderBottomWidth: true,
    borderLeftWidth: true,
  },
  objectPosition: {
    objectPositionX: true,
    objectPositionY: true,
  },
  transformOrigin: {
    transformOriginX: true,
    transformOriginY: true,
  },
};

// Expand the shorthand properties to isolate every declaration from the others.
const expandStyles = (style, Yoga) => {
  if (!style) return style;

  const propsArray = Object.keys(style);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i++) {
    const key = propsArray[i];
    const value = style[key];

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
        resolvedStyle[key] = yogaValue(key, value, Yoga);
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
          const expandedProps = styleShorthands[key];
          for (const propName in expandedProps) {
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

const transformStyles = (style, container, Yoga) => {
  const expandedStyles = expandStyles(style, Yoga);
  const propsArray = Object.keys(expandedStyles);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i++) {
    const key = propsArray[i];
    const value = expandedStyles[key];

    let resolved;
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

export default transformStyles;
