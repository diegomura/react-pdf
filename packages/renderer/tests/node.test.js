/* eslint-disable import/no-named-as-default-member */

import fs from 'fs';
import React from 'react';
import ReactPDF from '../src/node';

const { Document, Page, View } = ReactPDF;

const TestDocument = ({ onRender }) => {
  return (
    <Document onRender={onRender}>
      <Page>
        <View style={{ width: 20, height: 20, backgroundColor: 'red' }} />
      </Page>
    </Document>
  );
};

describe('node', () => {
  test('should render to string', async () => {
    const document = await ReactPDF.renderToString(<TestDocument />);

    expect(typeof document).toBe('string');
    expect(document.indexOf('%PDF-1.3')).toBe(0);
  });

  test('should render to string call render callback', async () => {
    const mock = jest.fn();

    await ReactPDF.renderToString(<TestDocument onRender={mock} />);

    expect(mock.mock.calls).toHaveLength(1);
  });

  test('should render to stream', async () => {
    const document = await ReactPDF.renderToStream(<TestDocument />);

    expect(typeof document).toBe('object');
    expect(typeof document.pipe).toBe('function');
  });

  test('should render to stream call render callback', async () => {
    const mock = jest.fn();

    await ReactPDF.renderToStream(<TestDocument onRender={mock} />);

    expect(mock.mock.calls).toHaveLength(1);
  });

  test('should render to file', async () => {
    const path = `${__dirname}/test.pdf`;
    await ReactPDF.renderToFile(<TestDocument />, path);

    expect(fs.existsSync(path)).toBeTruthy();

    fs.unlinkSync(path)
  });

  test('should export font store', () => {
    expect(ReactPDF.Font).toBeTruthy();
  });

  test('should export styleSheet', () => {
    expect(ReactPDF.StyleSheet).toBeTruthy();
  });

  test('should export version info', () => {
    expect(ReactPDF.version).toBeTruthy();
  });

  test('should throw error when trying to use PDFViewer', () => {
    expect(() => ReactPDF.PDFViewer()).toThrow();
  });

  test('should throw error when trying to use PDFDownloadLink', () => {
    expect(() => ReactPDF.PDFDownloadLink()).toThrow();
  });

  test('should throw error when trying to use BlobProvider', () => {
    expect(() => ReactPDF.BlobProvider()).toThrow();
  });

  test('should throw error when trying to use usePDF', () => {
    expect(() => ReactPDF.usePDF()).toThrow();
  });
});
