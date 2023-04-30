/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import {
  Page,
  Text,
  View,
  Image,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Font,
  usePDF,
  PDFViewer,
  Svg,
  SvgText,
  TextInstance,
  Path,
  Link,
  Stop,
  Rect,
  Defs,
  LinearGradient,
  Line,
  G,
  ClipPath,
  Tspan,
} from '@react-pdf/primitives';

function getPropsFromAttrs(element) {
  const props = {};
  if (element?.attributes?.length) {
    Array.from(element.attributes).forEach(attr => {
      const attrName = attr.name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      props[attrName] = attr.value;
    });
  }

  return props || {};
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

function domTraversal(parentElement) {
  const result = Array.from(parentElement.childNodes)
    .filter(element => !element.data)
    .map(element => {
      const convertedProps = getPropsFromAttrs(element);
      const component = {};
      component.tagNameMutated = camelCaseToSnakeCase(element?.tagName);

      if (component.tagNameMutated === 'TEXT') {
        return (
          <component.tagNameMutated key={uuidv4()} {...convertedProps}>
            {clearText(element.textContent)}
          </component.tagNameMutated>
        );
      }
      return (
        <component.tagNameMutated key={uuidv4()} {...convertedProps}>
          {element.hasChildNodes() && domTraversal(element)}
        </component.tagNameMutated>
      );
    })
    .filter(el => el !== null && el.type !== undefined);
  if (result.length === 1) {
    return result[0];
  }

  return result;
}

export function PDFFromDomSvg(props) {
  const { svgSelector } = props;
  const [defs, setDefs] = React.useState(null);
  const [svgElement, setSvgElement] = React.useState(null);
  const [svgReady, setSvgReady] = React.useState(false);
  const [svg, setSvg] = React.useState(null);

  React.useEffect(() => {
    if (svgSelector) {
      const element = document.querySelector(svgSelector);
      const clone = element.cloneNode(true);
      // const newDoc = document.implementation.createDocument(null, null, null);
      const title = clone?.querySelector('title')?.remove();
      const desk = clone?.querySelector('desc')?.remove();

      const template = document.createElement('template');

      template.appendChild(clone);
      setSvgElement(template);
      setDefs(Array.from(clone.querySelectorAll('defs'))[0]);
    }
  }, []);

  React.useEffect(() => {
    if (defs) {
      if (svgElement) {
        Array.from(svgElement.querySelectorAll('defs'))
          .slice(1)
          .forEach(el => {
            defs.innerHTML += el.innerHTML;
            el.remove();
          });
        setSvgReady(true);
      }
    }
  }, [defs]);

  React.useEffect(() => {
    if (svgElement) {
      setSvg(domTraversal(svgElement));
    }
  }, [svgReady]);

  return <>{svg && svg}</>;
}

export default PDFFromDomSvg;
