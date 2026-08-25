/**
 * The hero example, split across faux files for the tab bar.
 *
 * Files are listed entry-first for reading; the worker evaluates a single
 * module, so `mini-repl` concatenates them in REVERSE — every declaration
 * lands before its use. Keep that order true when editing this list.
 *
 * A6 keeps the type legible at hero scale: an A4 would render at half this
 * size inside the panel. Lines stay short so the editor pane never scrolls
 * sideways (see tests/hero-files.test.ts).
 */
export const HERO_FILES: { name: string; code: string }[] = [
  {
    name: 'Invoice.jsx',
    code: `const Invoice = () => (
  <Document title="Invoice RP-0042">
    <Page size="A6" style={styles.page}>
      <Header />
      <Billing />
      <Items />
      <Summary />

      <View style={styles.footer}>
        <Text>Payable within 30 days</Text>
        <Text style={styles.mark}>react-pdf</Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<Invoice />);`,
  },
  {
    name: 'Header.jsx',
    code: `const Mark = () => (
  <Svg width={19} height={23} viewBox="0 0 19 23">
    <Path d="M0 0h12.5L19 6.5V23H0z" fill={brand} />
    <Path d="M12.5 0L19 6.5h-6.5z" fill="#fff" opacity={0.5} />
    <Rect x={4.5} y={11} width={10} height={1.6} fill="#fff" />
    <Rect x={4.5} y={15} width={6.5} height={1.6} fill="#fff" />
  </Svg>
);

const Header = () => (
  <View style={[styles.between, { marginBottom: 16 }]}>
    <View style={{ flexDirection: 'row', gap: 7 }}>
      <Mark />
      <View>
        <Text style={styles.brand}>Northwind Type Co.</Text>
        <Text style={styles.soft}>Montevideo, Uruguay</Text>
      </View>
    </View>

    <View style={styles.end}>
      <Text style={styles.kicker}>INVOICE</Text>
      <Text style={styles.bold}>RP-0042</Text>
    </View>
  </View>
);

const Billing = () => (
  <View style={[styles.between, styles.card]}>
    <View>
      <Text style={styles.kicker}>BILLED TO</Text>
      <Text style={styles.bold}>Aurora Publishing</Text>
      <Text style={styles.soft}>accounts@aurora.press</Text>
    </View>

    <View style={styles.end}>
      <Text style={styles.kicker}>ISSUED</Text>
      <Text style={styles.bold}>31 Aug 2025</Text>
      <Text style={styles.soft}>Net 30</Text>
    </View>
  </View>
);`,
  },
  {
    name: 'Items.jsx',
    code: `const Th = ({ style, children }) => (
  <Text style={[style, styles.kicker]}>{children}</Text>
);

const Row = ({ item }) => (
  <View style={styles.row}>
    <Text style={styles.cell}>{item.task}</Text>
    <Text style={[styles.qty, styles.soft]}>{item.hours}</Text>
    <Text style={styles.amt}>{money(item.hours * rate)}</Text>
  </View>
);

const Items = () => (
  <View>
    <View style={styles.head}>
      <Th style={styles.cell}>DESCRIPTION</Th>
      <Th style={styles.qty}>HRS</Th>
      <Th style={styles.amt}>AMOUNT</Th>
    </View>

    {items.map((item) => (
      <Row key={item.task} item={item} />
    ))}
  </View>
);

// A vector chart: no image, no canvas — SVG drawn on the page.
const Bars = () => (
  <Svg width={104} height={34} viewBox="0 0 104 34">
    {items.map((item, i) => (
      <Rect
        key={item.task}
        x={i * 21}
        y={34 - item.hours * 1.4}
        width={14}
        height={item.hours * 1.4}
        fill={i === 0 ? brand : bar}
      />
    ))}
  </Svg>
);

const Summary = () => {
  const total = items.reduce((n, i) => n + i.hours * rate, 0);
  const vat = Math.round(total * 0.21);

  return (
    <View style={[styles.between, styles.summary]}>
      <View>
        <Text style={styles.chartLabel}>HOURS BY TASK</Text>
        <Bars />
      </View>

      <View style={styles.end}>
        <Text style={styles.soft}>Subtotal {money(total)}</Text>
        <Text style={styles.soft}>VAT 21% {money(vat)}</Text>
        <Text style={styles.dueLabel}>TOTAL DUE</Text>
        <Text style={styles.amount}>{money(total + vat)}</Text>
      </View>
    </View>
  );
};`,
  },
  {
    name: 'styles.js',
    code: `const brand = '#e8290b';
const ink = '#141417';
const soft = '#87878f';
const rule = '#e6e6ec';
const bar = '#d8d8e2';

const rate = 95;

const items = [
  { task: 'Layout engine, Yoga flexbox', hours: 24 },
  { task: 'Typography & hyphenation', hours: 16 },
  { task: 'Charts drawn in SVG', hours: 12 },
  { task: 'Fonts, images, page breaks', hours: 10 },
  { task: 'Document assembly', hours: 9 },
];

const money = (n) => '$' + n.toLocaleString('en-US');

const kicker = { fontSize: 6.5, letterSpacing: 1, color: soft };

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 9,
    lineHeight: 1.4,
    color: ink,
  },
  between: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  end: { alignItems: 'flex-end' },
  soft: { color: soft },
  bold: { fontFamily: 'Helvetica-Bold' },
  mark: { color: brand, fontFamily: 'Helvetica-Bold' },
  kicker,
  chartLabel: { ...kicker, marginBottom: 4 },
  dueLabel: { ...kicker, marginTop: 5 },
  brand: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.3,
  },
  amount: {
    fontSize: 17,
    fontFamily: 'Helvetica-Bold',
    color: brand,
  },
  card: {
    backgroundColor: '#fafafb',
    borderRadius: 3,
    padding: 9,
    marginBottom: 16,
  },
  head: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: ink,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: rule,
    paddingVertical: 5,
  },
  summary: { marginTop: 18, alignItems: 'flex-end' },
  cell: { flex: 1 },
  qty: { width: 26, textAlign: 'right' },
  amt: { width: 48, textAlign: 'right' },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 9,
    borderTopWidth: 0.5,
    borderColor: rule,
    fontSize: 7.5,
    color: soft,
  },
});`,
  },
];
