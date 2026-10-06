import React from 'react';
import {
  Page,
  Document,
  Link,
  View,
  Image,
  Text,
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
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 9,
    color: '#888',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 9,
    color: '#666',
    lineHeight: 1.5,
    marginBottom: 10,
  },
  linkWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  link: {
    fontSize: 10,
    color: '#2563eb',
    textDecoration: 'none',
  },
  linkArrow: {
    fontSize: 10,
    color: '#2563eb',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e8e8e8',
    marginVertical: 20,
  },
  footer: {
    fontSize: 8,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 'auto',
  },
  destinationBanner: {
    backgroundColor: '#2563eb',
    borderRadius: 5,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  destinationBannerText: {
    fontSize: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  imageCard: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    alignItems: 'center',
  },
  imageLabel: {
    fontSize: 9,
    color: '#888',
    marginBottom: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  imageCaption: {
    fontSize: 8,
    color: '#aaa',
  },
  headerStripe: {
    height: 4,
    backgroundColor: '#2563eb',
    borderRadius: 2,
    marginBottom: 20,
  },
});

const GoTo = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerStripe} />

      <Text style={styles.title}>Internal Navigation</Text>
      <Text style={styles.subtitle}>
        This example demonstrates how to create internal links that navigate
        between pages within a PDF document.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>How It Works</Text>
        <Text style={styles.cardText}>
          Use the Link component with an anchor reference (e.g. #myDest) to
          point to any element with a matching id attribute. Clicking the link
          scrolls the viewer directly to that destination.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Try It Out</Text>
        <Text style={styles.cardText}>
          Click the link below to jump to the React-PDF logo on the next page.
        </Text>
        <View style={styles.linkWrapper}>
          <Link href="#myDest" style={styles.link}>
            Jump to image
          </Link>
          <Text style={styles.linkArrow}>{'->'}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.footer}>Page 1 of 2</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.headerStripe} />

      <Text style={styles.title}>Destination</Text>
      <Text style={styles.subtitle}>
        You have arrived at the link destination. The image below is the
        anchored target.
      </Text>

      <View style={styles.destinationBanner}>
        <Text style={styles.destinationBannerText}>
          Link Destination Reached
        </Text>
      </View>

      <View style={styles.imageCard}>
        <Text style={styles.imageLabel}>React-PDF Logo</Text>
        <Image
          id="myDest"
          src="https://react-pdf.org/images/logo.png"
          style={styles.image}
        />
        <Text style={styles.imageCaption}>
          This element has id=&quot;myDest&quot; matching the link on page 1
        </Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.footer}>Page 2 of 2</Text>
    </Page>
  </Document>
);

export default {
  id: 'go-to',
  name: 'Go To',
  description: 'Internal document navigation with anchor links',
  Document: GoTo,
};
