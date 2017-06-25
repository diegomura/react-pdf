import yogaValue from './yogaValue';
const hasOwnProperty = Object.prototype.hasOwnProperty;

const styleShortHands = {
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
};

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 */
const transformStyles = style => {
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
        resolvedStyle[key] = yogaValue(key, value);
        break;
      case 'textAlignVertical':
        resolvedStyle.verticalAlign = value === 'center' ? 'middle' : value;
        break;
      case 'borderColor':
      case 'borderRadius':
      case 'borderStyle':
      case 'borderWidth':
        {
          const expandedProps = styleShortHands[key];
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

module.exports = transformStyles;
