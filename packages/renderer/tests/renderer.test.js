import React from 'react';
import { Text, Document } from '@react-pdf/primitives';
import createRenderer from '../src/renderer';

const renderer = createRenderer({});

const Component = ({ name }) => {
  return <>{name && <Text>{name}</Text>}</>;
};

const emptyString = '';

describe('renderer', () => {
  test('empty string', () => {
    const container = { type: 'ROOT', document: null };
    const mountNode = renderer.createContainer(container);
    renderer.updateContainer(
      <Document>
        <Component name={0} />
        <Component name={null} />
        <Component name={undefined} />
        <Component name={emptyString} />
        <Text>{emptyString}</Text>
      </Document>,
      mountNode,
      null,
    );

    expect(container.document.children.length).toBe(1);
  });
});
