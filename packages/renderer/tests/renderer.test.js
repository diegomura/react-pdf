/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import { Text, Document, Page } from '@react-pdf/primitives';
import createRenderer from '../src/renderer';

const renderer = createRenderer({});

const mount = children => {
  const container = { type: 'ROOT', document: null };
  const mountNode = renderer.createContainer(container);

  renderer.updateContainer(
    <Document>
      <Page>{children}</Page>
    </Document>,

    mountNode,
    null,
  );

  return container.document.children[0].children;
};

const emptyString = '';

describe('renderer', () => {
  test('empty string', () => {
    expect(() =>
      mount(<>{emptyString && <Text>{emptyString}</Text>}</>),
    ).toThrow();
  });

  test('string', () => {
    expect(() => mount(<>{'text' || <Text>text</Text>}</>)).toThrow();
  });

  test('boolean', () => {
    const result = mount(<>{true || <Text>text</Text>}</>);

    expect(result).toEqual([]);
  });

  test('zero', () => {
    expect(() => mount(<>{0 && <Text>text</Text>}</>)).toThrow();
  });

  test('numbers', () => {
    expect(() => mount(<>{10 || <Text>text</Text>}</>)).toThrow();
  });
});
