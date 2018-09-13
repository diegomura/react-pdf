import fs from 'fs';
import React from 'react';
import mock from 'mock-fs';
import { render, Document, Page, View } from '../src/node';

mock({
  testDir: {},
});

describe('Node API', () => {
  afterAll(() => {
    mock.restore();
  });

  test('Should call render callback when finishes', async () => {
    const callback = jest.fn();
    const doc = (
      <Document>
        <Page>
          <View />
        </Page>
      </Document>
    );

    await render(doc, 'testDir/testDoc1.pdf', callback);

    expect(callback.mock.calls).toHaveLength(1);
  });

  test('Should render document to a file', async () => {
    const doc = (
      <Document>
        <Page>
          <View />
        </Page>
      </Document>
    );

    await render(doc, 'testDir/testDoc2.pdf');

    expect(fs.existsSync('testDir/testDoc2.pdf')).toBeTruthy();
  });
});
