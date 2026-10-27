import React from 'react';
import {
  Document,
  Page,
  Link,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fafafa',
    padding: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 8,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  linkText: {
    fontSize: 11,
    color: '#2563eb',
  },
  highlight: {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    borderRadius: 2,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },
  viewLink: {
    width: 40,
    height: 40,
    backgroundColor: '#e0e7ff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewLinkIcon: {
    fontSize: 16,
    color: '#4f46e5',
  },
  hitSlopView: {
    width: 40,
    height: 40,
    backgroundColor: '#dbeafe',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hitSlopIcon: {
    fontSize: 16,
    color: '#2563eb',
  },
  hitSlopNote: {
    fontSize: 8,
    color: '#999',
    marginTop: 6,
  },
});

const LinkExample = () => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.title}>Link Examples</Text>
      <Text style={styles.subtitle}>
        Demonstrating the various ways links can be used in react-pdf documents
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Basic Text Link</Text>
        <Link src="https://google.com" style={styles.linkText}>
          Visit Google
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Styled Inline Text Link</Text>
        <Link src="https://google.com" style={styles.linkText}>
          A link with <Text style={styles.highlight}>highlighted</Text> inline
          text
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Nested Text Link</Text>
        <Link src="https://google.com" style={styles.linkText}>
          <Text>
            Wrapped text with <Text style={styles.highlight}>highlighted</Text>{' '}
            nested content
          </Text>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>View as Link</Text>
        <Link src="https://google.com">
          <View style={styles.viewLink}>
            <Text style={styles.viewLinkIcon}>Go</Text>
          </View>
        </Link>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>View Link with Uniform hitSlop</Text>
        <Link src="https://google.com" hitSlop={20}>
          <View style={styles.hitSlopView}>
            <Text style={styles.hitSlopIcon}>Tap</Text>
          </View>
        </Link>
        <Text style={styles.hitSlopNote}>
          hitSlop: 20px on all sides expands the tappable area
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Text Link with Directional hitSlop</Text>
        <Link
          src="https://google.com"
          hitSlop={{ top: 10, bottom: 10 }}
          style={styles.linkText}
        >
          Link with vertical hitSlop
        </Link>
        <Text style={styles.hitSlopNote}>
          hitSlop: 10px top and bottom for a taller tap target
        </Text>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'link',
  name: 'Link',
  description: '',
  Document: LinkExample,
};
