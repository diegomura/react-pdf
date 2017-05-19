import React from 'react';
import { Document, Page } from '../src';
import render from './testRenderer';

describe('<Page />', () => {
  let result;

  const page = (props = {}) => (
    <Document>
      <Page {...props} />
    </Document>
  );

  test('Should render A4 blank portrait page by default', () => {
    result = render(page());

    expect(result).toMatchSnapshot();
  });

  test('Should render given size', () => {
    result = render(page({ size: 'A0' }));

    expect(result).toMatchSnapshot();
  });

  test('Should render given background color', () => {
    result = render(
      page({
        style: {
          backgroundColor: 'tomato',
        },
      }),
    );

    expect(result).toMatchSnapshot();
  });

  test('Should render landscape page', () => {
    result = render(page({ orientation: 'landscape' }));

    expect(result).toMatchSnapshot();
  });
});
