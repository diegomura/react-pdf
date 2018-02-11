import React from 'react';
import { Document, Page, View, Text } from '../src';
import MockDate from 'mockdate';
import render from './testRenderer';

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. \
  Proin bibendum, diam non dictum rutrum, ligula velit molestie leo, sit \
  amet suscipit purus ipsum et ligula. Cras placerat, tellus fringilla viverra \
  maximus, ex metus vulputate ante, finibus dapibus eros dolor fermentum massa.';

describe('<Text />', () => {
  beforeEach(() => {
    MockDate.set(1434319925275);
  });

  const matchSnapshot = (doc, done) =>
    render(<Document>{doc}</Document>).then(result => {
      expect(result).toMatchSnapshot();
      done();
    });

  test('Should render just a text', done => {
    matchSnapshot(
      <Page>
        <Text>{lorem}</Text>
      </Page>,
      done,
    );
  });

  test('Should render a text below another', done => {
    matchSnapshot(
      <Page>
        <Text>{lorem}</Text>
        <Text>{lorem}</Text>
      </Page>,
      done,
    );
  });

  test('Should render texts with flex 1, within flexDirection column', done => {
    matchSnapshot(
      <Page style={{ flexDirection: 'column' }}>
        <Text style={{ flex: 1 }}>{lorem}</Text>
        <Text style={{ flex: 1 }}>{lorem}</Text>
      </Page>,
      done,
    );
  });

  test('Should render texts with flex 1, within flexDirection row', done => {
    matchSnapshot(
      <Page style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>{lorem}</Text>
        <Text style={{ flex: 1 }}>{lorem}</Text>
      </Page>,
      done,
    );
  });

  test('Should render text and view with flex 1, within flexDirection column', done => {
    matchSnapshot(
      <Page style={{ flexDirection: 'column' }}>
        <Text style={{ flex: 1 }}>{lorem}</Text>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
      </Page>,
      done,
    );
  });

  test('Should render text and view with flex 1, within flexDirection row', done => {
    matchSnapshot(
      <Page style={{ flexDirection: 'row' }}>
        <Text style={{ flex: 1 }}>{lorem}</Text>
        <View style={{ flex: 1, backgroundColor: 'red' }} />
      </Page>,
      done,
    );
  });

  test('Should render texts with flex 1, within flexDirection column and fixed height', done => {
    matchSnapshot(
      <Page>
        <View style={{ flexDirection: 'column', height: 500 }}>
          <Text style={{ flex: 1 }}>{lorem}</Text>
          <Text style={{ flex: 1 }}>{lorem}</Text>
        </View>
      </Page>,
      done,
    );
  });

  test('Should render texts with flex 1, within flexDirection row and fixed width', done => {
    matchSnapshot(
      <Page>
        <View style={{ flexDirection: 'row', width: 300 }}>
          <Text style={{ flex: 1 }}>{lorem}</Text>
          <Text style={{ flex: 1 }}>{lorem}</Text>
        </View>
      </Page>,
      done,
    );
  });

  test('Should render text and view with flex 1, within flexDirection column and fixed height', done => {
    matchSnapshot(
      <Page>
        <View style={{ flexDirection: 'column', height: 500 }}>
          <Text style={{ flex: 1 }}>{lorem}</Text>
          <View style={{ flex: 1, backgroundColor: 'red' }} />
        </View>
      </Page>,
      done,
    );
  });

  test('Should render text and view with flex 1, within flexDirection row and fixed width', done => {
    matchSnapshot(
      <Page>
        <View style={{ flexDirection: 'row', width: 300 }}>
          <Text style={{ flex: 1 }}>{lorem}</Text>
          <View style={{ flex: 1, backgroundColor: 'red' }} />
        </View>
      </Page>,
      done,
    );
  });

  test('Should log a warning if a styles props was supplied', done => {
    console.errorCount = 0;
    console.error = () => console.errorCount++;

    render(
      <Document>
        <Page>
          <View styles={{}}>
            <Text styles={{}}>Should have been 'style'</Text>
          </View>
        </Page>
      </Document>,
    ).then(() => {
      expect(console.errorCount).toBe(2);
      done();
    });
  });
});
