/* eslint-disable import/prefer-default-export */

import React from 'react';
import camelcase from 'camelcase';
import { fromPairs } from 'ramda';
import ReactPDF from '@react-pdf/renderer';

const { Svg } = ReactPDF;

function isElement(node) {
  return node.nodeType === Node.ELEMENT_NODE;
}

function attributesToProps(attributes) {
  const attributePairs = Array.from(attributes).map(attr => [
    camelcase(attr.nodeName),
    attr.value,
  ]);
  return fromPairs(attributePairs);
}

function nodeToComponent(node, key) {
  const nodeName = camelcase(node.nodeName, { pascalCase: true });
  const Component = ReactPDF[nodeName];

  if (!Component || !isElement(node)) return null;

  const props = attributesToProps(node.attributes);
  const children = traverseNodes(node.childNodes);

  return (
    <Component key={key} {...props}>
      {children.length ? children : node.textContent}
    </Component>
  );
}

function traverseNodes(nodes) {
  return Array.from(nodes)
    .map(nodeToComponent)
    .filter(node => !!node);
}

export const SvgChart = ({ svg }) => {
  if (!svg) {
    return null;
  }
  const parser = new DOMParser();
  const doc = parser.parseFromString(svg, 'image/svg+xml');
  // console.log(svg);
  const children = traverseNodes(doc.documentElement.childNodes);
  console.log(children);
  return (
    <Svg width={600} height={400} viewBox="0 0 600 400">
      {children}
    </Svg>
  );
};
