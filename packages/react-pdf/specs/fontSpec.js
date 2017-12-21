import React from 'react';
import { Document, Page, Text, Font } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

const oswaldUrl =
  'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
  Proin bibendum, diam non dictum rutrum, ligula velit molestie leo, sit \
  amet suscipit purus ipsum et ligula. Cras placerat, tellus fringilla viverra \
  maximus, ex metus vulputate ante, finibus dapibus eros dolor fermentum massa.';

describe('Font', () => {
  beforeEach(() => {
    MockDate.set(1434319925275);

    // pdfkit generates a random tag for internal font name,
    // so we mock Math.random to *not* be random
    const mockMath = Object.create(global.Math);
    mockMath.random = () => 0.5;
    global.Math = mockMath;
  });

  afterEach(() => {
    Font.clear();
  });

  const matchSnapshot = (doc, done) =>
    render(<Document>{doc}</Document>).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });

  test('should be able to register font families', () => {
    Font.register('src', { family: 'MyFont' });
    Font.register('src', { family: 'MyOtherFont' });

    expect(Font.getRegisteredFonts()).toEqual(['MyFont', 'MyOtherFont']);
  });

  test('should be able to clear registered fonts', () => {
    Font.register('src', { family: 'MyFont' });

    expect(Font.getRegisteredFonts()).toEqual(['MyFont']);

    Font.clear();

    expect(Font.getRegisteredFonts()).toEqual([]);
  });

  test('should be able to load font from url', done => {
    Font.register(oswaldUrl, { family: 'Oswald' });

    matchSnapshot(
      <Page>
        <Text style={{ fontFamily: 'Oswald' }}>{lorem}</Text>
      </Page>,
      done,
    );
  });

  test('should be able to load a font from file', done => {
    Font.register(`${__dirname}/font.ttf`, { family: 'Roboto' });

    matchSnapshot(
      <Page>
        <Text style={{ fontFamily: 'Roboto' }}>{lorem}</Text>
      </Page>,
      done,
    );
  });
});
