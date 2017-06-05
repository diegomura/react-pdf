import React from 'react';
import { Document, Page, View, Text } from '../../src';
import MockDate from 'mockdate';
import render from '../testRenderer';

describe('Flex Direction Row', () => {
  beforeEach(() => {
    MockDate.set(new Date('2016', '1', '1'));
  });

  const oneTextElementPage = (props = {}) => (
    <Document>
      <Page>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }}>
            <Text>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget
              dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus.
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );

  test('Render one text page with row direction', async () => {
    const result = await render(oneTextElementPage());

    expect(result).toMatchSnapshot();
  });
});
