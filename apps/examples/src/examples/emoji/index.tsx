import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  halfCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  largeEmoji: {
    fontSize: 64,
    textAlign: 'center',
  },
  mediumEmoji: {
    fontSize: 36,
    textAlign: 'center',
  },
  inlineText: {
    fontSize: 12,
    color: '#333',
    lineHeight: 1.8,
    textAlign: 'center',
  },
  footer: {
    marginTop: 'auto',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
  },
  footerText: {
    fontSize: 7,
    color: '#aaa',
  },
});

const Emoji = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Emoji Rendering</Text>
      <Text style={styles.subtitle}>
        Twemoji images rendered inline via Font.registerEmojiSource
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Faces</Text>
        <Text style={styles.largeEmoji}>😀 😎 🥳 😍</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Animals</Text>
          <Text style={styles.mediumEmoji}>🐶 🐱 🐼 🦊</Text>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Objects</Text>
          <Text style={styles.mediumEmoji}>💩 👻 🙈 🎉</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Food</Text>
          <Text style={styles.mediumEmoji}>🍕 🍔 🌮 🍣</Text>
        </View>
        <View style={styles.halfCard}>
          <Text style={styles.label}>Nature</Text>
          <Text style={styles.mediumEmoji}>🌸 🌈 ⭐ 🔥</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Inline with Text</Text>
        <Text style={styles.inlineText}>
          Emojis work seamlessly 🎨 within regular text 📝 and can be mixed
          freely 🚀 at any point in a sentence
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Powered by Twemoji — rendered as PNG images at 72x72
        </Text>
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
