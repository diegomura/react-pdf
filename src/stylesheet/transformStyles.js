import yogaValue from './yogaValue';
import parseScalar from './transformUnits';
const hasOwnProperty = Object.prototype.hasOwnProperty;

const styleShortHands = {
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
};

// Expand the shorthand properties to isolate every declaration from the others.
const expandStyles = style => {
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

const matchBorderShorthand = value =>
  value.match(/(\d+(px|in|mm|cm|pt)?)\s(\S+)\s(\S+)/);

// Transforms shorthand border values to correct value
const processBorders = (key, value) => {
  const match = matchBorderShorthand(value);

  if (match) {
    if (key.match(/.Color/)) {
      return match[4];
    } else if (key.match(/.Style/)) {
      return match[3];
    } else if (key.match(/.Width/)) {
      return match[1];
    } else {
      throw new Error(`StyleSheet: Invalid '${value}' for '${key}'`);
    }
  }

  return value;
};

const transformStyles = style => {
  const expandedStyles = expandStyles(style);
  const propsArray = Object.keys(expandedStyles);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i++) {
    const key = propsArray[i];
    const value = expandedStyles[key];
    const isBorderStyle = key.match(/border/) && typeof value === 'string';
    const resolved = isBorderStyle ? processBorders(key, value) : value;

    resolvedStyle[key] = parseScalar(resolved);
  }

  return resolvedStyle;
};

export default transformStyles;
