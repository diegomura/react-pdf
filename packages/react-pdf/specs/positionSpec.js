import React from 'react';
import { Document, Page, View } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

const boxStyle = {
  width: '50px',
  height: '50px',
  backgroundColor: 'red',
  position: 'absolute',
};

describe('absolute position', () => {
  beforeEach(() => {
    MockDate.set(1434319925275);
  });

  const matchSnapshot = (doc, done) =>
    render(<Document>{doc}</Document>).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });

  test('Should accept fixed values to top', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { top: 50 }]} />
      </Page>,
      done,
    );
  });

  test('Should accept fixed values to right', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { right: 50 }]} />
      </Page>,
      done,
    );
  });

  test('Should accept fixed values to bottom', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { bottom: 50 }]} />
      </Page>,
      done,
    );
  });

  test('Should accept fixed values to left', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { left: 50 }]} />
      </Page>,
      done,
    );
  });

  test('Should accept percent values to top', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { top: '50%' }]} />
      </Page>,
      done,
    );
  });

  test('Should accept percent values to right', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { right: '50%' }]} />
      </Page>,
      done,
    );
  });

  test('Should accept percent values to left', done => {
    matchSnapshot(
      <Page>
        <View style={[boxStyle, { left: '50%' }]} />
      </Page>,
      done,
    );
  });
});
