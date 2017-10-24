import React from 'react';
import { Document } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

describe('<Document />', () => {
  beforeEach(() => {
    MockDate.set(1434319925275);
  });

  const document = (props = {}) => <Document {...props} />;

  test('Should not render metadata if not specified', done => {
    render(document()).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should be able to set Title metadata', done => {
    render(document({ title: 'Test' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should be able to set Author metadata', done => {
    render(document({ author: 'John Doe' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should be able to set Subject metadata', done => {
    render(document({ subject: 'Whatever' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should be able to set Keywords metadata', done => {
    render(document({ keywords: 'lorem, ipsum' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should be able to set Creator metadata', done => {
    render(document({ creator: 'other app' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });

  test('Should be able to set Producer metadata', done => {
    render(document({ producer: 'other app' })).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });
  });
});
