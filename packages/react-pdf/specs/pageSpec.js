import React from 'react';
import { Document, Page } from '../src';
import render from './testRenderer';

describe('<Page />', () => {
  beforeEach(() => {
    const DATE_TO_USE = new Date('2016');
    const _Date = Date;
    global.Date = jest.fn(() => DATE_TO_USE);
    global.Date.UTC = _Date.UTC;
    global.Date.parse = _Date.parse;
    global.Date.now = _Date.now;
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
