import React from 'react';
import { Document, Page } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

describe('<Page />', () => {
  beforeEach(() => {
    MockDate.set(1434319925275);
  });

  const page = (props = {}) => (
    <Document>
      <Page {...props} />
    </Document>
  );

  test('Should render A4 blank portrait page by default', async () => {
    const result = await render(page());

    expect(result).toMatchSnapshot();
  });

  test('Should render given size', async () => {
    const result = await render(page({ size: 'A0' }));

    expect(result).toMatchSnapshot();
  });

  test('Should render given background color', async () => {
    const result = await render(page({ style: { backgroundColor: 'tomato' } }));

    expect(result).toMatchSnapshot();
  });

  test('Should render landscape page', async () => {
    const result = await render(page({ orientation: 'landscape' }));

    expect(result).toMatchSnapshot();
  });
});
