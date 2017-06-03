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

  test('Should render A4 blank portrait page by default', done => {
    render(page()).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should render given size', done => {
    render(page({ size: 'A0' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should render given background color', done => {
    render(
      page({
        style: {
          backgroundColor: 'tomato',
        },
      }),
    ).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should render landscape page', done => {
    render(page({ orientation: 'landscape' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });
});
