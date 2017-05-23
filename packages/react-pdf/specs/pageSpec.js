import React from 'react';
import { Document, Page } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

describe('<Page />', () => {
  beforeEach(() => {
    MockDate.set(new Date('2016', '1', '1'));
  });

  const page = (props = {}) => (
    <Document>
      <Page {...props} />
    </Document>
  );

  test('Should render A4 blank portrait page by default', () => {
    render(page()).then(result => {
      expect(result).toMatchSnapshot();
    });
  });

  test('Should render given size', () => {
    render(page({ size: 'A0' })).then(result => {
      expect(result).toMatchSnapshot();
    });
  });

  test('Should render given background color', () => {
    render(
      page({
        style: {
          backgroundColor: 'tomato',
        },
      }),
    ).then(result => {
      expect(result).toMatchSnapshot();
    });
  });

  test('Should render landscape page', () => {
    render(page({ orientation: 'landscape' })).then(result => {
      expect(result).toMatchSnapshot();
    });
  });
});
