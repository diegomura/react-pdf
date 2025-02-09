import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

import RobotoFont from '../../../public/Roboto-Regular.ttf';

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  text: {
    fontSize: 15,
    maxLines: 1,
    fontColor: '#000000',
    textOverflow: 'ellipsis',
    fontFamily: 'Roboto',
  },
});

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: RobotoFont,
      fontWeight: 400,
    },
  ],
});

const MyDoc = () => {
  return (
    <Page style={styles.body}>
      <View style={{ width: 70 }}>
        <Text style={styles.text}>And here here</Text>
      </View>
    </Page>
  );
};

const Ellipsis = () => {
  return (
    <Document>
      <MyDoc />
    </Document>
  );
};

export default {
  id: 'ellipsis',
  name: 'Ellipsis',
  description: '',
  Document: Ellipsis,
};
