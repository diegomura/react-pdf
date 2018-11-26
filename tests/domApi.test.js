import React from 'react';
import { mount } from 'enzyme';
import warning from 'fbjs/lib/warning';
import { pdf } from '../src/index';
import {
  PDFDownloadLink,
  PDFViewer,
  BlobProvider,
  Document,
  Page,
  View,
} from '../src/dom';

jest.mock('fbjs/lib/warning');
jest.mock('../src/index');

class Blob {}

pdf.mockReturnValue({
  isDirty: jest.fn(),
  updateContainer: jest.fn(),
  toBlob: jest.fn().mockReturnValue(Promise.resolve(new Blob())),
});

describe('DOM API', () => {
  const doc = (
    <Document>
      <Page>
        <View />
      </Page>
    </Document>
  );

  beforeEach(() => {
    warning.mockReset();
  });

  test('BlobProvider should throw error if no document passed', () => {
    mount(<BlobProvider />);
    expect(warning.mock.calls).toHaveLength(1);
  });

  test('PDFDownloadLink should throw error if no document passed', () => {
    mount(<PDFDownloadLink>Download</PDFDownloadLink>);
    expect(warning.mock.calls).toHaveLength(1);
  });

  test('BlobProvider should return document blob', done => {
    let updates = 2;
    const instance = (
      <BlobProvider document={doc}>
        {props => {
          if (updates === 2) expect(props.blob).toBeFalsy();
          if (updates === 1) expect(props.blob).toBeInstanceOf(Blob);
          done();
          return updates--;
        }}
      </BlobProvider>
    );
    expect.assertions(2);
    mount(instance);
  });

  test('BlobProvider should return document blob url', done => {
    let updates = 2;
    const instance = (
      <BlobProvider document={doc}>
        {props => {
          if (updates === 2) expect(props.url).toBeFalsy();
          if (updates === 1) expect(props.url).toBeTruthy();
          done();
          return updates--;
        }}
      </BlobProvider>
    );
    expect.assertions(2);
    mount(instance);
  });

  test('PDFViewer should render iframe viewer by default', () => {
    const wrapper = mount(<PDFViewer>{doc}</PDFViewer>);
    expect(wrapper.find('iframe')).toHaveLength(1);
  });

  test('PDFViewer should pass unused props to iframe viewer', () => {
    const wrapper = mount(
      <PDFViewer name="PDFViewer-test-name">{doc}</PDFViewer>,
    );
    expect(wrapper.find('iframe').prop('name')).toEqual('PDFViewer-test-name');
  });

  test('PDFDownloadLink as root should anchor tag and children', () => {
    const wrapper = mount(
      <PDFDownloadLink document={doc}>Download</PDFDownloadLink>,
    );
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.text()).toBe('Download');
  });
});
