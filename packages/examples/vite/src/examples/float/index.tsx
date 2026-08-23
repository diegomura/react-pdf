import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
} from '@react-pdf/renderer';

import RobotoRegular from '../../../public/Roboto-Regular.ttf';
import RobotoBold from '../../../public/Roboto-Bold.ttf';
import Quijote from '../../../public/quijote1.jpg';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 400 },
    { src: RobotoBold, fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#fafafa',
    fontFamily: 'Roboto',
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 9,
    color: '#888888',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: '#1a1a1a',
    marginBottom: 10,
    marginTop: 12,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    marginBottom: 8,
  },
  label: {
    fontSize: 8,
    color: '#999999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  text: {
    fontSize: 10,
    color: '#333333',
  },
  floatBox: {
    width: 80,
    height: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatLeft: {
    float: 'left',
    backgroundColor: '#4069b4',
    marginRight: 10,
    marginBottom: 4,
  },
  floatRight: {
    float: 'right',
    backgroundColor: '#c25b56',
    marginLeft: 10,
    marginBottom: 4,
  },
  floatBoxText: {
    fontSize: 8,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  clearIndicator: {
    backgroundColor: '#55987a',
    borderRadius: 3,
    padding: 6,
    marginTop: 6,
    marginBottom: 6,
  },
  clearText: {
    fontSize: 8,
    color: '#ffffff',
  },
  /* Floats and cleared content don't grow their parent, so reserve room to
     keep the card border around the demo */
  floatDemo: {
    minHeight: 90,
  },
  clearDemo: {
    minHeight: 165,
  },
});

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

const articleText = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once. Typography and typesetting have long used this sentence to display fonts and test equipment. The phrase has been used since at least the late 19th century.

In the world of digital design, layout and composition remain fundamental skills. Understanding how text flows around images and other elements is crucial for creating professional documents. The float property, borrowed from CSS, allows designers to position elements while maintaining readable text flow.

Modern document generation requires flexibility in positioning elements. Whether creating reports, magazines, or books, the ability to wrap text around images and other content blocks enables rich, engaging layouts that capture readers' attention.

The art of typography extends beyond mere font selection. Line length, spacing, and the relationship between text and images all contribute to readability. When text wraps around floated elements, maintaining consistent line lengths becomes a consideration for optimal reading experience.

Professional publications often employ multiple float patterns within a single article. Left-aligned images might introduce a topic, while right-aligned callout boxes highlight key points. Center-aligned layouts with elements on both sides create visual interest and break up long passages of text.`;

const FloatExample = () => (
  <Document>
    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.title}>Float — Magazine Layout</Text>
      <Text style={styles.subtitle}>
        A single text flowing around a left image, a right callout box and a
        centered block
      </Text>

      <View>
        <View>
          <Image
            src={Quijote}
            style={{
              float: 'left',
              width: 220,
              height: 150,
              borderRadius: 4,
              marginRight: 12,
              marginBottom: 4,
            }}
          />

          <View
            style={{
              float: 'right',
              width: 170,
              backgroundColor: '#c25b56',
              borderRadius: 4,
              padding: 14,
              marginTop: 266,
              marginLeft: 12,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: 700, color: '#ffffff' }}>
              Key Points
            </Text>
            <Text
              style={{
                fontSize: 9,
                color: '#ffffff',
                marginTop: 6,
                lineHeight: 1.5,
              }}
            >
              • Left float{'\n'}• Right float{'\n'}• Centered float
            </Text>
          </View>

          {/* Content width ≈ 515pt, element 170pt wide → marginLeft (515-170)/2 ≈ 172 */}
          <View
            style={{
              float: 'left',
              width: 170,
              height: 130,
              marginLeft: 172,
              marginRight: 10,
              marginTop: 320,
              backgroundColor: '#8a63b3',
              borderRadius: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.floatBoxText}>CENTERED</Text>
          </View>

          <Text style={styles.text}>
            {articleText}
            {articleText}
          </Text>
        </View>
      </View>

      <View break>
        <Text style={styles.sectionTitle}>Continued Article</Text>
        <View style={styles.card}>
          <View>
            <View
              style={[
                styles.floatBox,
                styles.floatLeft,
                { width: 110, height: 90, backgroundColor: '#55987a' },
              ]}
            >
              <Text style={styles.floatBoxText}>NEW{'\n'}FLOAT</Text>
            </View>
            <Text style={styles.text}>
              This section appears after the page break with a new float
              element. The text wraps around the green float box on the left.{' '}
              {articleText}
            </Text>
          </View>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.title}>Float Basics</Text>
      <Text style={styles.subtitle}>
        Elements positioned to the left or right with text wrapping around them,
        similar to CSS float behavior
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>float: left</Text>
        <View style={styles.floatDemo}>
          <View style={[styles.floatBox, styles.floatLeft]}>
            <Text style={styles.floatBoxText}>FLOAT{'\n'}LEFT</Text>
          </View>
          <Text style={styles.text}>{longText}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>float: right</Text>
        <View style={styles.floatDemo}>
          <View style={[styles.floatBox, styles.floatRight]}>
            <Text style={styles.floatBoxText}>FLOAT{'\n'}RIGHT</Text>
          </View>
          <Text style={styles.text}>{longText}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Multiple floats</Text>
        <View>
          <View
            style={[
              styles.floatBox,
              styles.floatLeft,
              { width: 60, height: 60 },
            ]}
          >
            <Text style={styles.floatBoxText}>L</Text>
          </View>
          <View
            style={[
              styles.floatBox,
              styles.floatRight,
              { width: 60, height: 60 },
            ]}
          >
            <Text style={styles.floatBoxText}>R</Text>
          </View>
          <Text style={styles.text}>{longText}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Image float</Text>
        <View>
          <Image
            src={Quijote}
            style={{
              float: 'left',
              width: 100,
              height: 100,
              borderRadius: 4,
              marginRight: 10,
              marginBottom: 4,
            }}
          />
          <Text style={styles.text}>
            This example shows an image floated to the left with text wrapping
            around it. This is a common pattern for magazine-style layouts where
            images are placed alongside article text. {longText}
          </Text>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.title}>Clear</Text>
      <Text style={styles.subtitle}>
        The clear property moves an element below preceding floats on the given
        side
      </Text>

      <View style={styles.card} wrap={false}>
        <Text style={styles.label}>clear: left — left float is taller</Text>
        <View style={styles.clearDemo}>
          <View style={[styles.floatBox, styles.floatLeft, { height: 100 }]}>
            <Text style={styles.floatBoxText}>LEFT{'\n'}100PT</Text>
          </View>
          <View style={[styles.floatBox, styles.floatRight, { height: 50 }]}>
            <Text style={styles.floatBoxText}>RIGHT{'\n'}50PT</Text>
          </View>
          <Text style={styles.text}>
            This text wraps around both floats. The left float is 100pt tall and
            the right float is only 50pt tall.
          </Text>
          <View style={[styles.clearIndicator, { clear: 'left' }]}>
            <Text style={styles.clearText}>
              clear: left — this box sits below the tall left float, at the
              100pt mark
            </Text>
          </View>
          <Text style={styles.text}>
            This text comes after clear: left. It starts below the left float.
            Since the right float was only 50pt, it ended above this position.
          </Text>
        </View>
      </View>

      <View style={styles.card} wrap={false}>
        <Text style={styles.label}>clear: right — right float is taller</Text>
        <View style={styles.clearDemo}>
          <View style={[styles.floatBox, styles.floatLeft, { height: 50 }]}>
            <Text style={styles.floatBoxText}>LEFT{'\n'}50PT</Text>
          </View>
          <View style={[styles.floatBox, styles.floatRight, { height: 100 }]}>
            <Text style={styles.floatBoxText}>RIGHT{'\n'}100PT</Text>
          </View>
          <Text style={styles.text}>
            This text wraps around both floats. The left float is only 50pt tall
            and the right float is 100pt tall.
          </Text>
          <View style={[styles.clearIndicator, { clear: 'right' }]}>
            <Text style={styles.clearText}>
              clear: right — this box sits below the tall right float, at the
              100pt mark
            </Text>
          </View>
          <Text style={styles.text}>
            This text comes after clear: right. It starts below the right float.
            Since the left float was only 50pt, it ended above this position.
          </Text>
        </View>
      </View>

      <View style={styles.card} wrap={false}>
        <Text style={styles.label}>clear: both</Text>
        <View style={styles.clearDemo}>
          <View style={[styles.floatBox, styles.floatLeft, { height: 60 }]}>
            <Text style={styles.floatBoxText}>LEFT{'\n'}60PT</Text>
          </View>
          <View style={[styles.floatBox, styles.floatRight, { height: 90 }]}>
            <Text style={styles.floatBoxText}>RIGHT{'\n'}90PT</Text>
          </View>
          <Text style={styles.text}>
            This text wraps around both floats. The left float is 60pt and the
            right float is 90pt tall.
          </Text>
          <View style={[styles.clearIndicator, { clear: 'both' }]}>
            <Text style={styles.clearText}>
              clear: both — this box sits below both floats, at the 90pt mark of
              the taller one
            </Text>
          </View>
          <Text style={styles.text}>
            This text comes after clear: both. It starts below whichever float
            is taller — the right one at 90pt in this case. Both floats have
            ended above this position.
          </Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default {
  id: 'float',
  name: 'Float (Text Wrapping)',
  description: 'Text wrapping around floated elements using float: left/right',
  Document: FloatExample,
};
