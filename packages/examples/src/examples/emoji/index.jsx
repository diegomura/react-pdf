import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    height: 700,
    marginVertical: 70,
    marginHorizontal: '10%',
  },
  text: {
    fontSize: 100,
    textAlign: 'center',
  },
});

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const Emoji = () => (
  <Document>
    <Page>
      <View style={styles.container}>
        <Text style={styles.text}>😀💩👻🙈</Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'emoji',
  name: 'Emoji',
  description: '',
  Document: Emoji,
};
