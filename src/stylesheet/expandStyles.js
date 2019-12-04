const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Expand rules
 */
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
  flex: {
    flexGrow: true,
    flexShrink: true,
    flexBasis: true,
  },
};

/**
 * Expand the shorthand properties to isolate every declaration from the others.
 *
 * @param { Object } style object
 * @returns { Object } expanded style object
 */
const expandStyles = style => {
  if (!style) return style;

  const propsArray = Object.keys(style);
  const resolvedStyle = {};

  for (let i = 0; i < propsArray.length; i++) {
    const key = propsArray[i];
    const value = style[key];

    if (styleShorthands[key]) {
      const expandedProps = styleShorthands[key];

      for (const propName in expandedProps) {
        if (hasOwnProperty.call(expandedProps, propName)) {
          resolvedStyle[propName] = value;
        }
      }
    } else {
      resolvedStyle[key] = value;
    }
  }

  return resolvedStyle;
};

export default expandStyles;
