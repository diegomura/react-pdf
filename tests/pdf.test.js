import React from 'react';
import { pdf, Document, Page, Text } from '../src/node';

describe('pdf', () => {
  test('Should create empty pdf instance', () => {
    const instance = pdf();
    expect(instance).toBeTruthy();
  });

  test('Should create pdf instance with initial value', () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const instance = pdf(doc);
    expect(instance).toBeTruthy();
  });

  test('Should get string from instance', async () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const string = await pdf(doc).toString();

    expect(string).toEqual(expect.stringContaining('%PDF-1.3'));
  });

  test('Should get buffer from instance', () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const buffer = pdf(doc).toBuffer();

    expect(buffer).toBeTruthy();
  });

  test('Should get blob from instance', async () => {
    const doc = (
      <Document>
        <Page />
      </Document>
    );
    const blob = await pdf(doc).toBlob();

    expect(blob).toBeTruthy();
  });

  test('Should call onRender when toBuffer called', done => {
    const onRender = ({ layoutData }) => {
      expect(layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Page>
          <Text>Hey</Text>
        </Page>
      </Document>
    );

    pdf(doc).toBuffer();
  });

  test('Should call onRender when toBlob called', done => {
    const onRender = ({ blob, layoutData }) => {
      expect(blob).toBeTruthy();
      expect(layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Page>
          <Text>Hey</Text>
        </Page>
      </Document>
    );

    pdf(doc).toBlob();
  });

  test('Should call onRender when toString called', done => {
    const onRender = ({ string, layoutData }) => {
      expect(string).toBeTruthy();
      expect(layoutData).toBeTruthy();
      done();
    };

    const doc = (
      <Document onRender={onRender}>
        <Page>
          <Text>Hey</Text>
        </Page>
      </Document>
    );

    pdf(doc).toString();
  });
});
