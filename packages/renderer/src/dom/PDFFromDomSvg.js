import React from 'react';
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

import { chartSvg } from './test';

// console.log(<TextInstance />, "TextInstance");

const getPropsFromAttrs = element => {
  const props = {};
  element?.attributes?.length &&
    Array.from(element.attributes).forEach(attr => {
      const attrName = attr.name.replace(/-([a-z])/g, g => g[1].toUpperCase());
      props[attrName] = attr.value;
    });

  return props || {};
};

function camelCaseToSnakeCase(str) {
  return str
    ?.split(/(?=[A-Z])/)
    ?.join('_')
    ?.toUpperCase();
}

export function PDFFromDomSvg() {
  // const [defs, setDefs] = React.useState(null);

  let SvgComponent = chartSvg;

  SvgComponent = new DOMParser().parseFromString(SvgComponent, 'text/xml');
  // console.log(React);
  // React.useEffect(() => {
  //   function manageDefsTag() {
  //     Array.from(SvgComponent.querySelectorAll('defs')).forEach(el => {
  //       if (defs) {
  //         console.log(defs, 'wtf');
  //         defs.innerHTML += el.innerHTML;
  //         el.remove();
  //       } else {
  //         setDefs(el);
  //       }
  //     });
  //   }
  //   manageDefsTag();
  //   console.log(SvgComponent, 'SvgComponent');
  // }, []);

  function domTraversal(parentElement) {
    // console.log(parentElement.childNodes, "all the nodes of parent");
    const result = Array.from(parentElement.childNodes)
      .filter(element => !element.data)
      .map(element => {
        const props = getPropsFromAttrs(element);

        element.tagNameMutated = camelCaseToSnakeCase(element?.tagName);
        // console.log(element.tagNameMutated, "element.tagNameMutated");
        if (element.tagNameMutated === 'TEXT') {
          function clearText(text) {
            return text.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
          }
          return (
            <element.tagNameMutated {...props}>
              {clearText(element.textContent)}
            </element.tagNameMutated>
          );
        } else {
          return (
            <element.tagNameMutated {...props}>
              {element.hasChildNodes() && domTraversal(element)}
            </element.tagNameMutated>
          );
        }
      })
      .filter(el => el !== null && el.type !== undefined);
    if (result.length === 1) {
      return result[0];
    } else {
      return result;
    }
  }
  const checkDomTraversal = domTraversal(SvgComponent);
  console.log(checkDomTraversal, 'checkDomTraversal result function');

  return <>{checkDomTraversal}</>;
}

export default PDFFromDomSvg;
