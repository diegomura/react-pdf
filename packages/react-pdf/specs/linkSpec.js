import React from 'react';
import { Document, Page, Text, Link } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

const src = 'www.github.com/diegomura/react-pdf';

describe('<Link />', () => {
  beforeEach(() => {
    MockDate.set(1434319925275);
  });

  const matchSnapshot = (doc, done) =>
    render(<Document>{doc}</Document>).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });

  test('Should render just a Link inside a Page', done => {
    matchSnapshot(
      <Page>
        <Link src={src}>link</Link>
      </Page>,
      done,
    );
  });

  test('Should render inline Link at the start of a Text', done => {
    matchSnapshot(
      <Page>
        <Text>
          <Link src={src}>link</Link>
          Lorem ipsum dolor sit amet
        </Text>
      </Page>,
      done,
    );
  });

  test('Should render inline Link in the middle of a Text', done => {
    matchSnapshot(
      <Page>
        <Text>
          Lorem ipsum dolor sit amet
          <Link src={src}>link</Link>
          Lorem ipsum dolor sit amet
        </Text>
      </Page>,
      done,
    );
  });

  test('Should render inline Link at the end of a Text', done => {
    matchSnapshot(
      <Page>
        <Text>
          Lorem ipsum dolor sit amet
          <Link src={src}>link</Link>
        </Text>
      </Page>,
      done,
    );
  });
});
