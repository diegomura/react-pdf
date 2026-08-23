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
import Quijote1 from '../../../public/quijote1.jpg';
import Quijote2 from '../../../public/quijote2.png';
import Landscape1 from '../../../public/landscape1.jpg';
import Landscape2 from '../../../public/landscape2.jpg';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: RobotoRegular, fontWeight: 400 },
    { src: RobotoBold, fontWeight: 700 },
  ],
});

const BLUE = '#4069b4';
const RED = '#c25b56';
const GREEN = '#55987a';

const PAGE_WIDTH = 595.28;
const PAGE_PADDING = 40;
const CARD_INNER_WIDTH = PAGE_WIDTH - 2 * PAGE_PADDING - 2 * 12 - 2;

/* Two engine constraints shape this file: an explicit lineHeight disables
   wrapping, and Yoga measures text without exclusions, so a wrapping demo
   ends up taller than its box — each card reserves the real height via
   minHeight to keep the following card from overlapping. */
const styles = StyleSheet.create({
  page: {
    padding: PAGE_PADDING,
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
  image: {
    borderRadius: 4,
  },
  caption: {
    fontSize: 7,
    color: '#999999',
    textAlign: 'center',
    marginTop: 4,
  },
  floatBox: {
    width: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatBoxText: {
    fontSize: 8,
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  clearBar: {
    backgroundColor: GREEN,
    borderRadius: 3,
    padding: 6,
  },
  clearBarText: {
    fontSize: 8,
    color: '#ffffff',
  },
});

const FloatBox = ({
  side,
  height,
  color,
}: {
  side: 'left' | 'right';
  height: number;
  color: string;
}) => (
  <View
    style={[
      styles.floatBox,
      {
        float: side,
        height,
        backgroundColor: color,
        [side === 'left' ? 'marginRight' : 'marginLeft']: 10,
        marginBottom: 4,
      },
    ]}
  >
    <Text style={styles.floatBoxText}>
      {side.toUpperCase()}
      {'\n'}
      {height}PT
    </Text>
  </View>
);

const IMAGE_WIDTH = 168;
const IMAGE_CENTER_MARGIN = (CARD_INNER_WIDTH - IMAGE_WIDTH) / 2;

const FloatExample = () => (
  <Document>
    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.title}>Float — Text Wrapping</Text>
      <Text style={styles.subtitle}>
        Elements taken out of the flow and pushed to one side, with text
        wrapping around them, similar to CSS float behavior
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>float: left — drop cap</Text>
        <View style={{ minHeight: 58 }}>
          <View style={{ float: 'left', marginRight: 6 }}>
            <Text style={{ fontSize: 42, fontWeight: 700, color: BLUE }}>
              A
            </Text>
          </View>
          <Text style={styles.text}>
            float is a block taken out of the normal flow and pinned to one side
            of its container, with the surrounding text wrapping around it. The
            oversized letter that opens this paragraph is the oldest float of
            all: a drop cap. The lines beside it shorten to make room and return
            to the full width of the card once past its bottom edge. Nothing
            else is needed — the letter is floated, the paragraph is set, and
            the wrapping takes care of itself.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>float: right — image</Text>
        <View style={{ minHeight: 145 }}>
          <View style={{ float: 'right', width: 150, marginLeft: 10 }}>
            <Image
              src={Quijote2}
              style={[styles.image, { width: 150, height: 108 }]}
            />
            <Text style={styles.caption}>Floated to the right edge</Text>
          </View>
          <Text style={styles.text}>
            This image is floated to the right edge of the card, and the
            paragraph wraps along its left side. Each line still begins at the
            left margin but gives up whatever width the image occupies. Anything
            placed inside the floated block — the caption, for instance —
            travels with it and takes no part in the wrapping. Past the bottom
            edge of the image, the lines recover the entire width and flow on as
            though nothing had interrupted them. This is the most common float
            pattern, used for figures and callouts in article-style layouts.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>float: left — pull quote</Text>
        <View style={{ minHeight: 78 }}>
          <View
            style={{
              float: 'left',
              width: 140,
              marginRight: 10,
              borderLeftWidth: 2,
              borderColor: BLUE,
              paddingLeft: 8,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: 700, color: BLUE }}>
              A float doesn't need to be an image — any block can be lifted from
              the flow.
            </Text>
          </View>
          <Text style={styles.text}>
            Here a pull quote sits against the left margin and the paragraph
            wraps along its right-hand side, mirroring the previous card. While
            the quote persists the lines start further to the right; once it has
            been passed they stretch back to the left margin. Any View can be
            floated this way: quotes, sidebars, stat blocks or small tables all
            behave exactly like a floated image.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>multiple floats</Text>
        <View style={{ minHeight: 100 }}>
          <View style={{ float: 'left', width: 120, marginRight: 10 }}>
            <Image
              src={Landscape1}
              style={[styles.image, { width: 120, height: 60 }]}
            />
          </View>
          <View style={{ float: 'right', width: 120, marginLeft: 10 }}>
            <Image
              src={Landscape2}
              style={[styles.image, { width: 120, height: 60 }]}
            />
          </View>
          <Text style={styles.text}>
            Floats can be set on both sides at once, forcing the text to thread
            the channel left between them. While both images persist the column
            is pinched to this narrow middle passage; where they end, the
            measure springs back to the full width of the card in a single step,
            which makes the earlier confinement easy to see.
          </Text>
        </View>
      </View>

      <View break style={styles.card}>
        <Text style={styles.label}>float across a page break</Text>
        <View style={{ minHeight: 80 }}>
          <View style={{ float: 'left', width: 150, marginRight: 10 }}>
            <Image
              src={Quijote1}
              style={[styles.image, { width: 150, height: 62 }]}
            />
          </View>
          <Text style={styles.text}>
            This card was pushed onto a fresh page with a break, and it brings a
            float of its own along with it. Pagination and floating are
            independent: a new page simply offers a new flow, and a block
            floated within it wraps its neighbouring text exactly as it would
            have done on the previous page.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>centered float</Text>
        <View style={{ minHeight: 80 }}>
          <View
            style={{
              float: 'left',
              width: IMAGE_WIDTH,
              marginLeft: IMAGE_CENTER_MARGIN,
              marginRight: 10,
            }}
          >
            <Image
              src={Quijote1}
              style={[styles.image, { width: IMAGE_WIDTH, height: 70 }]}
            />
          </View>
          <Text style={styles.text}>
            A left float pushed inward by a computed margin comes to rest in the
            middle of the card, splitting the text into two narrow channels that
            are read line by line across the gap. The wrapping follows the
            float's geometry wherever it stands, not just at the edges of the
            page.
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

      <View style={styles.card}>
        <Text style={styles.label}>clear: left — left float is taller</Text>
        <View style={{ minHeight: 140 }}>
          <FloatBox side="left" height={80} color={BLUE} />
          <FloatBox side="right" height={40} color={RED} />
          <Text style={styles.text}>
            The blue float is 80pt tall, the red one only 40pt. The green bar
            below carries clear: left, so it must drop beneath the taller left
            float before it can begin.
          </Text>
          <View style={[styles.clearBar, { clear: 'left', marginTop: 6 }]}>
            <Text style={styles.clearBarText}>
              clear: left — this bar sits below the left float, at the 80pt mark
            </Text>
          </View>
          <Text style={[styles.text, { marginTop: 6 }]}>
            Text after the bar starts here, below the left float. The right
            float ended at 40pt, well above this point, so it plays no part.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>clear: right — right float is taller</Text>
        <View style={{ minHeight: 140 }}>
          <FloatBox side="left" height={40} color={BLUE} />
          <FloatBox side="right" height={80} color={RED} />
          <Text style={styles.text}>
            The arrangement is reversed: the short float keeps the left margin
            and the tall one the right. A bar carrying clear: right ignores the
            left float entirely and waits only for the right one.
          </Text>
          <View style={[styles.clearBar, { clear: 'right', marginTop: 6 }]}>
            <Text style={styles.clearBarText}>
              clear: right — this bar sits below the right float, at the 80pt
              mark
            </Text>
          </View>
          <Text style={[styles.text, { marginTop: 6 }]}>
            Clearing is a directed instruction: each side keeps its own account
            of floats, and a cleared element consults only the side it was told
            to.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>clear: both</Text>
        <View style={{ minHeight: 130 }}>
          <FloatBox side="left" height={50} color={BLUE} />
          <FloatBox side="right" height={70} color={RED} />
          <Text style={styles.text}>
            Lastly, clear: both defers to every float in sight and descends
            below whichever of them reaches lowest — the red one here, at 70pt.
          </Text>
          <View style={[styles.clearBar, { clear: 'both', marginTop: 6 }]}>
            <Text style={styles.clearBarText}>
              clear: both — this bar sits below both floats, at the 70pt mark of
              the taller one
            </Text>
          </View>
          <Text style={[styles.text, { marginTop: 6 }]}>
            With both sides cleared no floats remain, and the card closes with
            plain full-width lines.
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
