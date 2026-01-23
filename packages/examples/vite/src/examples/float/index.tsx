import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  StyleSheet,
} from '@react-pdf/renderer';

import Quijote from '../../../public/quijote1.jpg';

const styles = StyleSheet.create({
  page: {
    padding: 40,
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  content: {
    backgroundColor: '#fff',
  },
  floatLeft: {
    float: 'left',
    width: 80,
    height: 80,
    backgroundColor: '#3498db',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatRight: {
    float: 'right',
    width: 80,
    height: 80,
    backgroundColor: '#e74c3c',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatText: {
    color: 'white',
    fontSize: 18,
  },
  text: {
    fontSize: 12,
    color: '#333',
  },
  note: {
    fontSize: 8,
    color: '#666',
    marginTop: 20,
  },
  clearLeft: {
    clear: 'left',
  },
  clearRight: {
    clear: 'right',
  },
  clearBoth: {
    clear: 'both',
  },
  clearIndicator: {
    backgroundColor: '#2ecc71',
    padding: 5,
    marginTop: 5,
  },
  clearText: {
    fontSize: 10,
    color: '#fff',
  },
});

const longText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.`;

const articleText = `The quick brown fox jumps over the lazy dog. This pangram contains every letter of the alphabet at least once. Typography and typesetting have long used this sentence to display fonts and test equipment. The phrase has been used since at least the late 19th century.

In the world of digital design, layout and composition remain fundamental skills. Understanding how text flows around images and other elements is crucial for creating professional documents. The float property, borrowed from CSS, allows designers to position elements while maintaining readable text flow.

Modern document generation requires flexibility in positioning elements. Whether creating reports, magazines, or books, the ability to wrap text around images and other content blocks enables rich, engaging layouts that capture readers' attention.

The art of typography extends beyond mere font selection. Line length, spacing, and the relationship between text and images all contribute to readability. When text wraps around floated elements, maintaining consistent line lengths becomes a consideration for optimal reading experience.

Professional publications often employ multiple float patterns within a single article. Left-aligned images might introduce a topic, while right-aligned callout boxes highlight key points. Center-aligned layouts with elements on both sides create visual interest and break up long passages of text.`;

const FloatExample = () => (
  <Document>
    {/* Magazine-style layout with left and right floats */}
    <Page size="A4" style={{ padding: 30 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 15 }}>
        Magazine Article Layout
      </Text>

      <View>
        {/* Left float - header image */}
        <Image
          src={Quijote}
          style={{
            float: 'left',
            width: 240,
            height: 160,
            marginRight: 10,
          }}
        />

        {/* Right float - callout box */}
        <View
          style={{
            float: 'right',
            width: 200,
            backgroundColor: '#e74c3c',
            padding: 20,
            marginTop: 300,
            marginLeft: 10,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#fff' }}>
            Key Points
          </Text>
          <Text style={{ fontSize: 12, color: '#fff', marginTop: 8 }}>
            • Left float{'\n'}• Right float{'\n'}• Center float
          </Text>
        </View>

        {/* Centered float - text flows on both sides */}
        {/* Content width = 535pt, element 200px, margin = (535-200)/2 ≈ 167 */}
        <View
          style={{
            float: 'left',
            width: 200,
            height: 160,
            marginLeft: 167,
            marginRight: 10,
            marginTop: 560,
            backgroundColor: '#9b59b6',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 14, color: '#fff' }}>Centered</Text>
        </View>

        {/* Single long text that wraps around both floats */}
        <Text style={{ fontSize: 15 }}>
          {articleText}
          {articleText}
        </Text>
      </View>

      {/* New section with float - will appear on page 2 after pagination */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
          Continued Article
        </Text>
        <View>
          <View
            style={{
              float: 'left',
              width: 120,
              height: 100,
              backgroundColor: '#27ae60',
              marginRight: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 12, color: '#fff', textAlign: 'center' }}>
              NEW{'\n'}FLOAT
            </Text>
          </View>
          <Text style={{ fontSize: 15 }}>
            This section appears after the page break with a new float element.
            The text wraps around the green float box on the left. {articleText}
          </Text>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Left Float</Text>
        <View style={styles.content}>
          <View style={styles.floatLeft}>
            <Text style={styles.floatText}>FLOAT</Text>
            <Text style={styles.floatText}>LEFT</Text>
          </View>
          <Text style={styles.text}>
            {longText}
            {longText}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Right Float</Text>
        <View style={styles.content}>
          <View style={styles.floatRight}>
            <Text style={styles.floatText}>FLOAT</Text>
            <Text style={styles.floatText}>RIGHT</Text>
          </View>
          <Text style={styles.text}>
            {longText}
            {longText}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Multiple Floats</Text>
        <View style={styles.content}>
          <View style={[styles.floatLeft, { width: 60, height: 60 }]}>
            <Text style={styles.floatText}>L</Text>
          </View>
          <View style={[styles.floatRight, { width: 60, height: 60 }]}>
            <Text style={styles.floatText}>R</Text>
          </View>
          <Text style={styles.text}>
            {longText}
            {longText}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Image Float</Text>
        <View style={styles.content}>
          <Image
            src={Quijote}
            style={{
              float: 'left',
              width: 100,
              height: 100,
              marginRight: 10,
            }}
          />
          <Text style={styles.text}>
            This example shows an image floated to the left with text wrapping
            around it. This is a common pattern for magazine-style layouts where
            images are placed alongside article text. {longText}
          </Text>
        </View>
      </View>

      <Text style={styles.note}>
        Float property allows elements to be positioned to the left or right,
        with text wrapping around them. This is similar to CSS float behavior.
      </Text>
    </Page>

    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clear: left (Left is taller)</Text>
        <View style={styles.content}>
          <View style={[styles.floatLeft, { height: 100 }]}>
            <Text style={styles.floatText}>LEFT</Text>
            <Text style={styles.floatText}>100px</Text>
          </View>
          <View style={[styles.floatRight, { height: 50 }]}>
            <Text style={styles.floatText}>RIGHT</Text>
            <Text style={styles.floatText}>50px</Text>
          </View>
          <Text style={styles.text}>
            This text wraps around both floats. The left float is 100px tall and
            the right float is only 50px tall.
          </Text>
          <View style={[styles.clearIndicator, { clear: 'left' }]}>
            <Text style={styles.clearText}>
              clear: left - This green box should be below the TALL left float
              (at 100px position)
            </Text>
          </View>
          <Text style={styles.text}>
            This text comes after clear:left. It should start below the left
            float (100px). Since the right float was only 50px, it ended above
            this position.
          </Text>
        </View>
      </View>

      <View style={{ ...styles.section, marginTop: 80 }}>
        <Text style={styles.sectionTitle}>Clear: right (Right is taller)</Text>
        <View style={styles.content}>
          <View style={[styles.floatLeft, { height: 50 }]}>
            <Text style={styles.floatText}>LEFT</Text>
            <Text style={styles.floatText}>50px</Text>
          </View>
          <View style={[styles.floatRight, { height: 100 }]}>
            <Text style={styles.floatText}>RIGHT</Text>
            <Text style={styles.floatText}>100px</Text>
          </View>
          <Text style={styles.text}>
            This text wraps around both floats. The left float is only 50px tall
            and the right float is 100px tall.
          </Text>
          <View style={[styles.clearIndicator, { clear: 'right' }]}>
            <Text style={styles.clearText}>
              clear: right - This green box should be below the TALL right float
              (at 100px position)
            </Text>
          </View>
          <Text style={styles.text}>
            This text comes after clear:right. It should start below the right
            float (100px). Since the left float was only 50px, it ended above
            this position.
          </Text>
        </View>
      </View>

      <View style={{ ...styles.section, marginTop: 80 }}>
        <Text style={styles.sectionTitle}>Clear: both</Text>
        <View style={styles.content}>
          <View style={[styles.floatLeft, { height: 60 }]}>
            <Text style={styles.floatText}>LEFT</Text>
            <Text style={styles.floatText}>60px</Text>
          </View>
          <View style={[styles.floatRight, { height: 90 }]}>
            <Text style={styles.floatText}>RIGHT</Text>
            <Text style={styles.floatText}>90px</Text>
          </View>
          <Text style={styles.text}>
            This text wraps around both floats. The left float is 60px and the
            right float is 90px tall.
          </Text>
          <View style={[styles.clearIndicator, { clear: 'both' }]}>
            <Text style={styles.clearText}>
              clear: both - This green box should be below BOTH floats (at 90px,
              the taller one)
            </Text>
          </View>
          <Text style={styles.text}>
            This text comes after clear:both. It should start below whichever
            float is taller (the right one at 90px in this case). Both floats
            have ended above this position.
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
