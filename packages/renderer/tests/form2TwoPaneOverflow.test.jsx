/**
 * Regression test mirroring the henry-web form2 (二号用紙) layout.
 *
 * Structure mirrors Form2Page.tsx + Form2SectionColumn.tsx exactly:
 *   A4 (paddingTop=44, paddingBottom=32, paddingHorizontal=48)
 *   ├─ fixed page header (flexDirection:row, marginBottom:8, 3 text lines each col, fontSize:10)
 *   └─ table (flex:1, borderLeft/Right, position:relative)
 *      ├─ centerLine   (fixed, absolute, left=50%)
 *      ├─ tableBottom  (fixed, absolute, bottom=0)
 *      ├─ tableHeader  (fixed, flexDirection:row, borderTop+Bottom, fontSize:12)
 *      └─ encounterWrapper × N (marginBottom=16)
 *         ├─ sectionRow (flexDirection:row)
 *         │  ├─ sectionLeft  (flex:1) → SectionColumn
 *         │  └─ sectionRight (flex:1) → SectionColumn
 *         │        SectionColumn = View{padding:"8 8 0 8"}
 *         │          date text (fontSize:9)
 *         │          groups → View{blockItems} (spacer between groups)
 *         └─ footerText (width=50%, alignSelf=flex-end, fontSize:9)
 *
 * Content: lorem ipsum. Three encounters, each with BOTH left and right
 * columns containing meaningful content, sized so multiple pages are needed.
 * This exercises the flex:row multi-page split path that was broken by the
 * original optimization.
 */
import { describe, expect, test } from 'vitest';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import renderToImage from './renderComponent';

const BORDER = '1pt solid #000';

const styles = StyleSheet.create({
  page: { paddingTop: 44, paddingBottom: 32, paddingHorizontal: 48 },
  header: { flexDirection: 'row', marginBottom: 8 },
  headerCol: { flex: 1 },
  headerText: { fontSize: 10 },
  table: {
    borderLeft: BORDER,
    borderRight: BORDER,
    flex: 1,
    position: 'relative',
  },
  centerLine: {
    position: 'absolute',
    top: 0,
    left: '50%',
    bottom: 0,
    borderLeft: BORDER,
  },
  tableBottom: {
    position: 'absolute',
    bottom: 0,
    left: -1,
    right: -1,
    borderBottom: BORDER,
  },
  tableHeaderRow: {
    flexDirection: 'row',
    borderTop: BORDER,
    borderBottom: BORDER,
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    padding: '0 8',
  },
  encounterWrapper: { marginBottom: 16 },
  sectionRow: { flexDirection: 'row' },
  column: { flex: 1, padding: '8 8 0 8' },
  dateText: { fontSize: 9 },
  spacer: { fontSize: 9, minHeight: 12 },
  block: { fontSize: 9, minHeight: 12 },
  footer: {
    width: '50%',
    alignSelf: 'flex-end',
    fontSize: 9,
    textAlign: 'right',
    padding: '0 8',
  },
});

// SectionColumn mirrors Form2SectionColumn exactly
const SectionColumn = ({ date, groups }) => {
  if (!groups.length) return <View />;
  return (
    <View style={styles.column}>
      {date && <Text style={styles.dateText}>{date}</Text>}
      {groups.map((lines, gi) => (
        <View key={gi}>
          {gi > 0 && <Text style={styles.spacer}> </Text>}
          {lines.map((line, li) => (
            <Text key={li} style={styles.block}>
              {line}
            </Text>
          ))}
        </View>
      ))}
    </View>
  );
};

const Encounter = ({ date, leftGroups, rightGroups, footer }) => (
  <View style={styles.encounterWrapper}>
    <View style={styles.sectionRow}>
      <SectionColumn date={date} groups={leftGroups} />
      <SectionColumn date={null} groups={rightGroups} />
    </View>
    <Text style={styles.footer}>{footer}</Text>
  </View>
);

const L = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Duis aute irure dolor in reprehenderit in voluptate velit.',
  'Excepteur sint occaecat cupidatat non proident deserunt.',
  'Nisi ut aliquip ex ea commodo consequat enim veniam quis.',
  'Adipiscing elit sed do eiusmod tempor incididunt labore.',
  'Reprehenderit in voluptate velit esse cillum dolore fugiat.',
  'Sunt in culpa qui officia deserunt mollit anim id est.',
  'Laborum perspiciatis unde omnis iste natus error voluptatem.',
  'Accusantium doloremque laudantium totam rem aperiam eaque.',
  'Ipsa quae ab illo inventore veritatis et quasi architecto.',
];
const l = (i, n) => Array.from({ length: n }, (_, j) => L[(i + j) % L.length]);

const Form2Doc = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header} fixed>
        <View style={styles.headerCol}>
          <Text style={styles.headerText}>Lorem: 000001</Text>
          <Text style={styles.headerText}>Ipsum: Lorem Ipsum</Text>
          <Text style={styles.headerText}>Dolor: 45 1980-01-01</Text>
        </View>
        <View style={styles.headerCol}>
          <Text style={styles.headerText}>Sit: 2026-01-01 ~ 2026-06-30</Text>
          <Text style={styles.headerText}>Amet: Lorem Ipsum</Text>
          <Text style={styles.headerText}>Consectetur</Text>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.centerLine} fixed />
        <View style={styles.tableBottom} fixed />
        <View style={styles.tableHeaderRow} fixed>
          <Text style={styles.tableHeaderCell}>Lorem / Ipsum / Dolor</Text>
          <Text style={styles.tableHeaderCell}>Sit / Amet / Consectetur</Text>
        </View>

        {/* Encounter 1: left-heavy (~430pt) */}
        <Encounter
          date="2026-01-15"
          leftGroups={[
            ['Lorem)', ...l(0, 5)],
            ['Ipsum)', ...l(4, 5)],
            ['Dolor)', ...l(8, 5)],
            ['Sit)', ...l(2, 5)],
            ['Amet)', ...l(6, 5)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(0, 5)],
            ['Adipiscing', ...l(5, 5)],
            ['Elit sed', ...l(2, 4)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 2: symmetric (~380pt) */}
        <Encounter
          date="2026-02-10"
          leftGroups={[
            ['Lorem)', ...l(1, 5)],
            ['Ipsum)', ...l(3, 5)],
            ['Dolor)', ...l(7, 5)],
            ['Sit)', ...l(5, 5)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(0, 5)],
            ['Adipiscing elit', ...l(4, 5)],
            ['Sed do eiusmod', ...l(8, 5)],
            ['Tempor incididunt', ...l(2, 4)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 3: right-heavy (~420pt driven by right) */}
        <Encounter
          date="2026-02-28"
          leftGroups={[
            ['Lorem)', ...l(2, 4)],
            ['Ipsum)', ...l(6, 4)],
            ['Dolor)', ...l(10, 4)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(0, 6)],
            ['Adipiscing', ...l(5, 6)],
            ['Elit sed do', ...l(1, 6)],
            ['Eiusmod tempor', ...l(3, 6)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 4: symmetric, forces page 3+ (~380pt) */}
        <Encounter
          date="2026-03-20"
          leftGroups={[
            ['Lorem)', ...l(3, 5)],
            ['Ipsum)', ...l(7, 5)],
            ['Dolor)', ...l(11, 5)],
            ['Sit)', ...l(1, 5)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(2, 5)],
            ['Adipiscing', ...l(6, 5)],
            ['Elit sed do', ...l(10, 5)],
            ['Eiusmod tempor', ...l(4, 4)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 5: left-heavy, forces page 4+ (~440pt) */}
        <Encounter
          date="2026-04-15"
          leftGroups={[
            ['Lorem)', ...l(0, 6)],
            ['Ipsum)', ...l(4, 6)],
            ['Dolor)', ...l(8, 6)],
            ['Sit)', ...l(2, 6)],
            ['Amet)', ...l(6, 5)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(1, 5)],
            ['Adipiscing', ...l(5, 5)],
            ['Elit', ...l(9, 4)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 6: right-heavy, forces page 5 (~400pt) */}
        <Encounter
          date="2026-05-10"
          leftGroups={[
            ['Lorem)', ...l(3, 4)],
            ['Ipsum)', ...l(7, 4)],
            ['Dolor)', ...l(11, 4)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(0, 6)],
            ['Adipiscing', ...l(4, 6)],
            ['Elit sed do', ...l(8, 6)],
            ['Eiusmod tempor', ...l(2, 5)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 7: symmetric (~380pt), forces page 5 */}
        <Encounter
          date="2026-06-01"
          leftGroups={[
            ['Lorem)', ...l(0, 5)],
            ['Ipsum)', ...l(4, 5)],
            ['Dolor)', ...l(8, 5)],
            ['Sit)', ...l(2, 5)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(1, 5)],
            ['Adipiscing', ...l(6, 5)],
            ['Elit sed do', ...l(3, 5)],
            ['Eiusmod', ...l(9, 4)],
          ]}
          footer="Lorem Ipsum"
        />

        {/* Encounter 8: short closer */}
        <Encounter
          date="2026-06-25"
          leftGroups={[
            ['Lorem)', ...l(0, 3)],
            ['Ipsum)', ...l(5, 3)],
          ]}
          rightGroups={[
            ['Consectetur', ...l(2, 3)],
            ['Adipiscing', ...l(7, 3)],
          ]}
          footer="Lorem Ipsum"
        />
      </View>
    </Page>
  </Document>
);

describe('form2 two-pane overflow regression', () => {
  test('multi-encounter A4 two-pane layout should match snapshot', async () => {
    const image = await renderToImage(<Form2Doc />);
    expect(image).toMatchImageSnapshot();
  }, 30_000);
});
