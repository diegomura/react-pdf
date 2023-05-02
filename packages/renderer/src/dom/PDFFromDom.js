/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  G,
  Svg,
  View,
  Text,
  Link,
  Page,
  Note,
  Path,
  Rect,
  Line,
  Stop,
  Defs,
  Image,
  Tspan,
  Canvas,
  Circle,
  Ellipse,
  Polygon,
  Document,
  Polyline,
  ClipPath,
  TextInstance,
  LinearGradient,
  RadialGradient,
} from '@react-pdf/primitives';

const PRIMITIVES = [
  'G',
  'Svg',
  'View',
  'Text',
  'Link',
  'Page',
  'Note',
  'Path',
  'Rect',
  'Line',
  'Stop',
  'Defs',
  'Image',
  'Tspan',
  'Canvas',
  'Circle',
  'Ellipse',
  'Polygon',
  'Document',
  'Polyline',
  'ClipPath',
  'TextInstance',
  'LinearGradient',
  'RadialGradient',
];

function getPropsFromAttrs(element) {
  const props = {};
  if (element?.attributes?.length) {
    Array.from(element.attributes).forEach(attr => {
      const attrName = attr.name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      // TODO: fix strokeDadsharray later in package
      if (attrName === 'strokeDasharray') {
        return;
      }
      props[attrName] = attr.value;
    });
  }

  return props || {};
}

// pattern for string like this: translate(1003.3333333333333,438.00000000000006)
const translateRegexp = /translate\(([\d.]+),([\d.]+)\)/;
// shirnk function for sting like this: translate(1003.3333333333333,438.00000000000006)
function shirnkToTranslate(str) {
  const match = str.match(translateRegexp);
  if (match) {
    return `translate(${shirnkToNumber(match[1])},${shirnkToNumber(match[2])})`;
  }
  return str;
}

// shirnk function for sting like this: 39.734375
function shirnkToNumber(str) {
  return Number(str).toFixed(2);
}

// regexp to recognize  133.55078124999997
// const numberRegexp = /^-?\d+(?:\.\d+)?$/;
// function to shirng number like this: 133.55078124999997
function shirnk(str) {
  const numberRegexp = /^-?\d+(?:\.\d+)?$/;
  if (numberRegexp.test(str)) {
    return shirnkToNumber(str);
  }
  return str;
}

function camelCaseToSnakeCase(str) {
  return str
    ?.split(/(?=[A-Z])/)
    ?.join('_')
    ?.toUpperCase();
}

function clearText(text) {
  return text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
}

// TODO: fix svg inside svg

function domTraversal(parentElement, styleOverrides, params) {
  const result = Array.from(parentElement.childNodes)
    .filter(element => !element.data)
    .map(element => {
      if (element.tagName === 'title') return null;
      if (element.tagName === 'desc') return null;

      const convertedProps = getPropsFromAttrs(element);
      const component = {};
      component.tagNameMutated = camelCaseToSnakeCase(element?.tagName);
      const primitive = PRIMITIVES.find(
        el => camelCaseToSnakeCase(el) === component.tagNameMutated,
      );

      if (element.lastChild?.nodeType === Node.TEXT_NODE) {
        return (
          <Text
            key={uuidv4()}
            {...convertedProps}
            style={{
              fontSize: params?.textSize
                ? `${params?.textSize}px`
                : convertedProps.fontSize,
            }}
          >
            {clearText(element.textContent)}
          </Text>
        );
      }

      if (!primitive) {
        return (
          <View key={uuidv4()} {...convertedProps} style={styleOverrides}>
            {element.hasChildNodes() &&
              domTraversal(element, styleOverrides, params)}
          </View>
        );
      }

      return (
        <component.tagNameMutated
          key={uuidv4()}
          {...convertedProps}
          height={
            (component.tagNameMutated === 'SVG' && params?.svgHeight) ||
            convertedProps.height
          }
          width={
            (component.tagNameMutated === 'SVG' && params?.svgWidth) ||
            convertedProps.width
          }
        >
          {element.hasChildNodes() &&
            domTraversal(element, styleOverrides, params)}
        </component.tagNameMutated>
      );
    })
    .filter(el => el !== null && el.type !== undefined);
  if (result.length === 1) {
    return result[0];
  }

  return result;
}

export function PDFFromDom(props) {
  const { svgSelector, scale, height, styleOverrides, params } = props;
  const [defs, setDefs] = React.useState(null);
  const [svgElement, setSvgElement] = React.useState(null);
  const [svgReady, setSvgReady] = React.useState(false);
  const [svg, setSvg] = React.useState(null);

  React.useEffect(() => {
    if (svgSelector) {
      const element = svgSelector.body.firstChild;

      element.setAttribute('height', height);
      // const newDoc = document.implementation.createDocument(null, null, null);
      // const title = element?.querySelector('title')?.remove();
      // const desk = element?.querySelector('desc')?.remove();

      const template = document.createElement('template');

      template.appendChild(element);
      setSvgElement(template);
      setDefs(Array.from(element.querySelectorAll('defs'))[0]);
    }
    return () => {
      setSvgElement(null);
    };
  }, []);

  React.useEffect(() => {
    if (defs) {
      if (svgElement) {
        // Remove nested svg while we have render issue
        Array.from(svgElement.querySelectorAll('svg svg')).forEach(el =>
          el.remove(),
        );
        Array.from(svgElement.querySelectorAll('defs'))
          .slice(1)
          .forEach(el => {
            defs.innerHTML += el.innerHTML;
            el.remove();
          });
        setSvgReady(true);
      }
    } else {
      setSvgReady(true);
    }
  }, [defs]);

  React.useEffect(() => {
    if (svgElement) {
      setSvg(domTraversal(svgElement, styleOverrides, params));
    }
  }, [svgReady]);

  return <>{svg && svg}</>;
}

export default PDFFromDom;
