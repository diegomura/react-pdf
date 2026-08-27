import React from 'react';
import {
  Document,
  Page,
  View,
  Text,
  Image,
  Font,
  StyleSheet,
  Svg,
  Circle,
  Ellipse,
  Polygon,
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
    textAlign: 'justify',
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
          <View style={{ float: 'left', marginRight: 6, marginTop: -10 }}>
            <Text
              style={{
                fontSize: 42,
                lineHeight: 1,
                fontWeight: 700,
                color: BLUE,
              }}
            >
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
            the wrapping takes care of itself. Drop caps are the classic opening
            move of book and magazine design, and here they cost nothing more
            than a float and a large font size. Because a float only affects the
            lines that overlap it vertically, everything from this point on is
            laid out as if the letter never existed: full-width line after
            full-width line, with no trace of the interruption above. The longer
            the paragraph runs, the clearer the contrast becomes between the
            handful of shortened lines at the top and the plain column of text
            that follows them.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>float: right — image</Text>
        <View style={{ minHeight: 150 }}>
          <View style={{ float: 'right', width: 130, marginLeft: 10 }}>
            <Image
              src={Quijote2}
              style={[styles.image, { width: 130, height: 94 }]}
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
            Wrapping is resolved line by line: every line checks which floats
            overlap its vertical span and shortens itself accordingly, which is
            why these closing sentences, set below the image, stretch across the
            full card again. Nothing about the wrapping is precomputed — it is
            resolved from the float's box at layout time, so changing the
            image's size or margins reflows the paragraph automatically. If the
            text grows, new lines simply keep flowing at full width below the
            image; if it shrinks, the image still holds its corner and the text
            wraps as far as it reaches. That makes floated figures safe to use
            with dynamic content, where the length of the copy is not known
            until the document is rendered.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>float: left — pull quote</Text>
        <View style={{ minHeight: 102 }}>
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
            behave exactly like a floated image. The wider the floated block,
            the narrower the remaining column, so pull quotes are usually kept
            to about a third of the measure — enough to stand out without
            squeezing the text beside them. Because the quote is an ordinary
            View it can carry its own padding, borders and nested children, and
            the wrapping text never intrudes into its box. These extra sentences
            exist mostly to push the paragraph well past the quote's bottom
            edge: the first lines are indented around it, and everything after
            this point runs from margin to margin, which is exactly the shape a
            long article paragraph would take around a short editorial aside.
          </Text>
        </View>
      </View>

      <View break style={styles.card}>
        <Text style={styles.label}>float across a page break</Text>
        <View style={{ minHeight: 130 }}>
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
            have done on the previous page. Keeping a figure and the paragraph
            that discusses it together is one of the main reasons to float
            rather than position absolutely — the pair moves through pagination
            as a unit, and the wrapping re-resolves wherever it lands.
            Everything demonstrated on the first page holds here without change:
            the float carves its exclusion, the paragraph bends around it, and
            once past the image's bottom edge these final sentences run the full
            width of the card again, one after another, exactly as they would in
            the middle of a long report.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>multiple floats</Text>
        <View style={{ minHeight: 150 }}>
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
            which makes the earlier confinement easy to see. Nothing requires
            the two sides to match, either: floats of different heights simply
            carve their own spans, and every line adapts to whichever of them it
            happens to run beside. From this point on the paragraph is free of
            both images and a long tail makes the contrast obvious — a few
            pinched lines threading the middle of the card, followed by
            comfortable long ones that reach from border to border with nothing
            standing in their way.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>centered float</Text>
        <View style={{ minHeight: 106 }}>
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
            page. Below the image the two channels merge back into a single
            stream of full-width lines — the same recovery every other card
            shows, just starting from a stranger shape — and the paragraph
            carries on as if it had never been split at all. Layouts like this
            are rare in running text, but the same computed-margin technique
            places floats at any horizontal position: a chart offset toward one
            column of a report, a stamp pinned near the fold of a letter, or a
            figure straddling the midline of a spread. Wherever the block lands,
            the text simply flows around whatever room is left, on both sides at
            once if it has to.
          </Text>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.title}>Shape Outside</Text>
      <Text style={styles.subtitle}>
        shape-outside replaces a float's rectangular exclusion with a basic
        shape — circle, ellipse, polygon or inset — and text wraps along it
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>shape-outside: circle(50%)</Text>
        <View style={{ minHeight: 112 }}>
          <View
            style={{
              float: 'left',
              width: 104,
              height: 104,
              shapeOutside: 'circle(50%)',
            }}
          >
            <Svg width={104} height={104}>
              <Circle cx={52} cy={52} r={46} fill={BLUE} />
            </Svg>
          </View>
          <Text style={styles.text}>
            Without a shape, this float would push the text away along its whole
            square box. With shape-outside set to a circle, the lines instead
            creep in toward the disc: short where the circle is widest, longer
            near its top and bottom where the curve falls away. The drawn circle
            is a few points smaller than the declared shape, which is the
            simplest way to keep a little breathing room between ink and text.
            Below the circle's lowest point the lines return to the full width
            of the card, exactly as they would past any rectangular float,
            because a shape only changes the outline of the exclusion — never
            its participation in the flow. These closing sentences have already
            escaped it: they run from edge to edge beneath the disc, and the
            only trace of the circle is the round bite taken out of the
            paragraph above them.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>shape-outside: ellipse(50% 50%)</Text>
        <View style={{ minHeight: 104 }}>
          <View
            style={{
              float: 'right',
              width: 150,
              height: 90,
              shapeOutside: 'ellipse(50% 50%)',
            }}
          >
            <Svg width={150} height={90}>
              <Ellipse cx={75} cy={45} rx={69} ry={39} fill={RED} />
            </Svg>
          </View>
          <Text style={styles.text}>
            An ellipse works the same way with two radii instead of one, which
            suits the wide, flat figures that turn up far more often than
            perfect circles — badges, plates, portrait vignettes. Floated to the
            right, the curve faces the text on its left, and each line ends a
            little earlier or later depending on where it crosses the arc. The
            gentle stair-step of line endings beside the ellipse is the whole
            effect: subtle on any single line, unmistakable across the
            paragraph. Once past the shape the measure snaps back to the full
            card width and the closing sentences run flat and even.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>shape-outside: polygon — diagonal wrap</Text>
        <View style={{ minHeight: 140 }}>
          <View
            style={{
              float: 'left',
              width: 120,
              height: 100,
              shapeOutside: 'polygon(0% 0%, 100% 100%, 0% 100%)',
            }}
          >
            <Svg width={120} height={100}>
              <Polygon points="0,4 112,100 0,100" fill={GREEN} />
            </Svg>
          </View>
          <Text style={styles.text}>
            A polygon takes any outline you can describe as points — here a
            right triangle whose hypotenuse runs from the top-left corner down
            to the bottom-right. The text follows that diagonal: the first lines
            start almost at the left margin, and each one after begins a little
            further in as the triangle widens beneath it, producing a staircase
            of indents that no rectangular float could make. This is the tool
            for angled figures, arrows, and cut-corner callouts. Below the
            triangle's base the staircase ends at once, and the paragraph
            finishes with ordinary full-width lines as if the slope had never
            been there — these last sentences run past the base to prove it,
            reaching the left margin that the diagonal kept pushing the earlier
            lines away from. By the time the paragraph gets this deep the
            exclusion is exhausted, and the closing lines stretch across the
            entire card, flat and unbroken, which is the plainest proof of where
            the shape stops. Nothing about the triangle is special, either: any
            polygon of three or more points, convex or not, wraps the same way.
          </Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>shape-outside: inset(10 18)</Text>
        <View style={{ minHeight: 88 }}>
          <View
            style={{
              float: 'right',
              width: 150,
              height: 84,
              shapeOutside: 'inset(10 18)',
              borderWidth: 1,
              borderStyle: 'dashed',
              borderColor: '#bbbbbb',
              borderRadius: 4,
              paddingVertical: 10,
              paddingHorizontal: 18,
            }}
          >
            <View
              style={{ flex: 1, backgroundColor: GREEN, borderRadius: 3 }}
            />
          </View>
          <Text style={styles.text}>
            Inset goes the other way: instead of carving a curve it shrinks the
            exclusion inside the float's own box. The dashed outline marks the
            real border box; the solid block is the inset shape the text
            actually respects. The lines beside it run 18 points into the dashed
            frame before stopping at the solid edge — the float's box no longer
            keeps text out, only the shape does. This is how a figure with
            generous built-in padding lets text sit close to its ink rather than
            its box, without touching margins at all.
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
