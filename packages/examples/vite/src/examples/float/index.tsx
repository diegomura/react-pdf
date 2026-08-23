import React from 'react';
import { Document, Page, View, Text, Image } from '@react-pdf/renderer';

import Quijote1 from '../../../public/quijote1.jpg';
import Quijote2 from '../../../public/quijote2.png';
import Landscape1 from '../../../public/landscape1.jpg';
import Landscape2 from '../../../public/landscape2.jpg';

const INK = '#211d16';
const PAPER = '#f8f5ee';

const PAGE_WIDTH = 595.28;
const MARGIN = 54;
const CONTENT_WIDTH = PAGE_WIDTH - 2 * MARGIN;

/* Two engine constraints shape this file: an explicit lineHeight disables
   wrapping, and Yoga measures text without exclusions, so a wrapping section
   ends up taller than its box — each wrap View reserves the real height via
   minHeight to keep the following section from overlapping. */
const styles = {
  page: {
    paddingVertical: 48,
    paddingHorizontal: MARGIN,
    backgroundColor: PAPER,
    color: INK,
    fontFamily: 'Times-Roman',
    fontSize: 10.5,
  },
  masthead: {
    fontFamily: 'Times-Bold',
    fontSize: 32,
    letterSpacing: 2,
    textAlign: 'center' as const,
  },
  mastheadRule: {
    borderBottomWidth: 2,
    borderColor: INK,
    marginTop: 6,
  },
  motto: {
    fontFamily: 'Times-Italic',
    fontSize: 11,
    textAlign: 'center' as const,
    marginTop: 6,
    marginBottom: 24,
  },
  heading: {
    fontFamily: 'Times-Bold',
    fontSize: 13,
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  section: {
    marginBottom: 16,
  },
  frame: {
    borderWidth: 1,
    borderColor: INK,
    padding: 4,
    backgroundColor: '#ffffff',
  },
  caption: {
    fontFamily: 'Times-Italic',
    fontSize: 8.5,
    textAlign: 'center' as const,
    marginTop: 4,
  },
  figure: {
    borderWidth: 1,
    borderColor: INK,
    backgroundColor: '#e9e3d3',
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
  },
  figureLabel: {
    fontFamily: 'Times-Bold',
    fontSize: 8,
    letterSpacing: 1,
  },
};

const DropCap = ({ letter }: { letter: string }) => (
  <View style={{ float: 'left', marginRight: 6 }}>
    <Text style={{ fontFamily: 'Times-Bold', fontSize: 46 }}>{letter}</Text>
  </View>
);

const Figure = ({
  side,
  height,
  label,
}: {
  side: 'left' | 'right';
  height: number;
  label: string;
}) => (
  <View
    style={[
      styles.figure,
      {
        float: side,
        width: 108,
        height,
        [side === 'left' ? 'marginRight' : 'marginLeft']: 12,
        marginBottom: 6,
      },
    ]}
  >
    <Text style={styles.figureLabel}>{label}</Text>
    <Text style={styles.figureLabel}>{height} PT</Text>
  </View>
);

const ClearedHeading = ({
  clear,
  title,
}: {
  clear: 'left' | 'right' | 'both';
  title: string;
}) => (
  <View style={{ clear, borderTopWidth: 1, borderColor: INK, paddingTop: 5 }}>
    <Text style={{ fontFamily: 'Times-Bold', fontSize: 9, letterSpacing: 1 }}>
      {title}
    </Text>
  </View>
);

const PLATE_WIDTH = 236;
const PLATE_CENTER_MARGIN = (CONTENT_WIDTH - PLATE_WIDTH) / 2;

const FloatExample = () => (
  <Document>
    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.masthead}>THE FLOATED PAGE</Text>
      <View style={styles.mastheadRule} />
      <Text style={styles.motto}>
        A printer&rsquo;s specimen of text wrapped around floating bodies
      </Text>

      <View style={styles.section}>
        <View>
          <DropCap letter="A" />
          <Text>
            float, in the printer&rsquo;s sense, is any body lifted out of the
            ordinary flow of the column and pushed to one side, so that the text
            no longer runs beneath it but around it. The oldest float of all is
            the drop capital that opens this very paragraph: a single oversized
            letter set with float left, around which these opening lines are
            obliged to bend. Nothing else is required of the compositor. The
            letter is floated, the paragraph is set, and the line boxes shorten
            themselves of their own accord until the capital has been safely
            passed, whereupon the measure quietly returns to its full width.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>I. THE PLATE, FLOATED RIGHT</Text>
        <View style={{ minHeight: 172 }}>
          <View style={{ float: 'right', width: 186, marginLeft: 12 }}>
            <View style={styles.frame}>
              <Image src={Quijote2} style={{ width: 176, height: 127 }} />
            </View>
            <Text style={styles.caption}>
              Plate I. — The knight charges the windmills, floated to the right
              margin.
            </Text>
          </View>
          <Text>
            An illustration set with float right retires to the outer margin and
            holds its ground there while the column pours past on the left. The
            engraving of Plate I occupies the right-hand side of this section,
            and every line of this paragraph is measured against it: each line
            begins at the left margin as usual, but surrenders whatever width
            the plate demands. A caption travels inside the floated block, for
            whatever is placed within the float is carried along with it and
            takes no part in the wrapping. When the reader has descended past
            the lower edge of the plate, the lines recover the entire measure,
            and the column proceeds as though nothing had interrupted it. This
            is the commonest arrangement in books and journals, and the one from
            which all the others in this specimen are derived.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>II. THE QUOTATION, FLOATED LEFT</Text>
        <View style={{ minHeight: 104 }}>
          <View
            style={{
              float: 'left',
              width: 150,
              marginRight: 12,
              borderLeftWidth: 2,
              borderColor: INK,
              paddingLeft: 8,
              paddingVertical: 2,
            }}
          >
            <Text style={{ fontFamily: 'Times-Italic', fontSize: 12.5 }}>
              &ldquo;The float need not be a picture; any block may be lifted
              from the flow.&rdquo;
            </Text>
          </View>
          <Text>
            The mirror image is float left, and the floated body need not be an
            engraving at all. Here a pulled quotation stands against the left
            margin behind a single vertical rule, and the paragraph wraps along
            its right-hand side. Editors favour this device because it lets a
            sentence be read twice: once in passing, large and alone, and once
            again in its proper place within the column. The mechanics are
            identical to those of the plate above, only reflected: lines now
            begin further to the right while the float persists, and stretch
            back to the left margin the moment it has been cleared.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>III. A COLUMN BETWEEN TWO FLOATS</Text>
        <View style={{ minHeight: 120 }}>
          <View style={{ float: 'left', width: 128, marginRight: 12 }}>
            <View style={styles.frame}>
              <Image src={Landscape1} style={{ width: 118, height: 59 }} />
            </View>
            <Text style={styles.caption}>Plate II. — At the left.</Text>
          </View>
          <View style={{ float: 'right', width: 128, marginLeft: 12 }}>
            <View style={styles.frame}>
              <Image src={Landscape2} style={{ width: 118, height: 59 }} />
            </View>
            <Text style={styles.caption}>Plate III. — At the right.</Text>
          </View>
          <Text>
            Floats may also be set in pairs, one to each margin, so that the
            text is made to thread the narrow channel left between them. While
            both plates persist, the column is pinched to the width of this
            central passage; when the plates end, as they do here at the same
            height, the measure springs back at once to the full width of the
            page, and the paragraph closes in comfortable long lines that make
            the earlier confinement all the more visible.
          </Text>
        </View>
      </View>

      <View break style={styles.section}>
        <Text style={styles.heading}>IV. ACROSS THE PAGE BREAK</Text>
        <View style={{ minHeight: 100 }}>
          <View style={{ float: 'left', width: 168, marginRight: 12 }}>
            <View style={styles.frame}>
              <Image src={Quijote1} style={{ width: 158, height: 66 }} />
            </View>
            <Text style={styles.caption}>Plate IV. — On a fresh page.</Text>
          </View>
          <Text>
            This section was ordered to begin on a fresh page, and it brings a
            float of its own along with it. Pagination and floating are
            indifferent to one another: a new page simply offers a new flow, and
            any block floated within it wraps its neighbouring text exactly as
            it would have done on the first. One arrangement remains to be
            shown, and it is the strangest of them all — the plate that stands
            in the very middle of the measure.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>V. THE CENTERED PLATE</Text>
        <View style={{ minHeight: 165 }}>
          <View
            style={{
              float: 'left',
              width: PLATE_WIDTH,
              marginLeft: PLATE_CENTER_MARGIN,
              marginRight: 12,
            }}
          >
            <View style={styles.frame}>
              <Image src={Quijote1} style={{ width: 226, height: 94 }} />
            </View>
            <Text style={styles.caption}>Plate V. — Set mid-measure.</Text>
          </View>
          <Text>
            A float pushed off the margin by a computed margin comes to rest in
            the middle of the measure, and the column splits into two slender
            channels, one on either side of the plate, each line leaping the gap
            as it goes. Text of this sort is a curiosity rather than a
            convenience, but it proves that the wrapping follows the geometry of
            the float wherever it stands, and not merely at the edges of the
            page. The matter of wrapping ends here; the matter of clearing,
            which governs how the flow escapes a float, occupies the page that
            follows.
          </Text>
        </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page} experimentalPagination>
      <Text style={styles.masthead}>ON CLEARING</Text>
      <View style={styles.mastheadRule} />
      <Text style={styles.motto}>
        How the flow is made to step below a float instead of beside it
      </Text>

      <View style={styles.section}>
        <View style={{ minHeight: 158 }}>
          <Figure side="left" height={96} label="FIG. 1" />
          <Figure side="right" height={48} label="FIG. 2" />
          <Text>
            Two figures of unequal height stand at the margins: Fig. 1 reaches
            96 points on the left, Fig. 2 only 48 on the right. The rule below
            carries clear left, so it must sink beneath the taller left-hand
            figure before it may begin.
          </Text>
          <ClearedHeading clear="left" title="CLEAR: LEFT — BELOW FIG. 1" />
          <Text style={{ marginTop: 4 }}>
            The cleared rule sits at the 96-point mark, flush under Fig. 1. Had
            it cleared nothing, it would have followed the short paragraph above
            directly; clearing on the left made it wait for the left float
            alone.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ minHeight: 146 }}>
          <Figure side="left" height={48} label="FIG. 3" />
          <Figure side="right" height={96} label="FIG. 4" />
          <Text>
            The arrangement is now reversed: the short figure keeps the left
            margin and the tall one the right. A rule bearing clear right
            disregards Fig. 3 entirely and waits only upon Fig. 4, coming to
            rest at its 96-point foot.
          </Text>
          <ClearedHeading clear="right" title="CLEAR: RIGHT — BELOW FIG. 4" />
          <Text style={{ marginTop: 4 }}>
            Clearing is thus a directed instruction. Each side of the page keeps
            its own account of floats, and a cleared element consults only the
            ledger it was told to.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={{ minHeight: 142 }}>
          <Figure side="left" height={40} label="FIG. 5" />
          <Figure side="right" height={64} label="FIG. 6" />
          <Text>
            Lastly, clear both defers to every float in sight and descends below
            whichever of them reaches lowest — here Fig. 6, at 64 points.
          </Text>
          <ClearedHeading clear="both" title="CLEAR: BOTH — BELOW THE TALLER" />
          <Text style={{ marginTop: 4 }}>
            With both margins cleared the page is empty of floats, and the
            specimen may close as it began, in plain full-measure lines.
          </Text>
          <Text
            style={{ textAlign: 'center', marginTop: 16, letterSpacing: 4 }}
          >
            * * *
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
