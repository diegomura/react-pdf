/**
 * The hero example, split across faux files for the tab bar.
 *
 * Files are concatenated in array order into one module, so the list reads
 * entry-first (the tab bar opens on the first one) while the `ReactPDF.render`
 * call lives at the end of the last file, after every component exists.
 *
 * A6 keeps the type legible at hero scale: an A4 would render at half this
 * size inside the panel. Lines stay short so the editor pane never scrolls
 * sideways.
 */
export const HERO_FILES: { name: string; code: string }[] = [
  {
    name: 'Report.jsx',
    code: `const Report = () => (
  <Document title="Q3 report">
    <Page size="A6" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Q3 REPORT</Text>
        <Text style={styles.tiny}>ACME / JUL-SEP 2025</Text>
      </View>

      <Kpis />
      <Summary />
      <Bars />
      <Split />
      <Table />
    </Page>
  </Document>
);`,
  },
  {
    name: 'Kpis.jsx',
    code: `const Kpi = ({ label, value, delta }) => (
  <View style={styles.kpi}>
    <Text style={styles.tiny}>{label}</Text>
    <Text style={styles.kpiValue}>{value}</Text>
    <Text style={delta > 0 ? styles.up : styles.down}>
      {delta > 0 ? '+' : ''}
      {delta}%
    </Text>
  </View>
);

const Kpis = () => (
  <View style={styles.kpis}>
    {kpis.map((kpi) => (
      <Kpi key={kpi.label} {...kpi} />
    ))}
  </View>
);`,
  },
  {
    name: 'Summary.jsx',
    code: `// Justified body copy: react-pdf breaks and spaces the lines
// itself, the same way a typesetter would.
const Summary = () => (
  <Section title="SUMMARY">
    <Text style={styles.body}>
      Revenue closed the quarter at $4.2M, up 12% on Q2 and
      ahead of plan for the third quarter running. Growth came
      almost entirely from organic search, while churn fell to
      its lowest point since the March pricing change.
    </Text>
  </Section>
);`,
  },
  {
    name: 'Charts.jsx',
    code: `const Bars = () => (
  <Section title="REVENUE BY MONTH">
    <Svg viewBox="0 0 258 72" style={styles.chart}>
      {months.map((month, i) => (
        <Rect
          key={month.name}
          x={i * 43 + 8}
          y={72 - month.value * 0.6}
          width={27}
          height={month.value * 0.6}
          fill={i === months.length - 1 ? red : ink}
        />
      ))}
    </Svg>

    <View style={styles.axis}>
      {months.map((month) => (
        <Text key={month.name} style={styles.axisLabel}>
          {month.name}
        </Text>
      ))}
    </View>
  </Section>
);

// A donut is one stroked arc per slice — no chart library
// involved, just a little trigonometry.
const Donut = () => (
  <Svg width={64} height={64} viewBox="0 0 86 86">
    {slices.map((slice) => (
      <Path
        key={slice.label}
        d={arc(slice.start, slice.end)}
        stroke={slice.color}
        strokeWidth={15}
        fill="none"
      />
    ))}
  </Svg>
);

const Split = () => (
  <Section title="TRAFFIC SPLIT">
    <View style={styles.split}>
      <Donut />

      <View style={styles.legend}>
        {slices.map((slice) => (
          <View key={slice.label} style={styles.legendRow}>
            <View
              style={[
                styles.swatch,
                { backgroundColor: slice.color },
              ]}
            />
            <Text style={styles.legendLabel}>
              {slice.label}
            </Text>
            <Text style={styles.mono}>{slice.value}%</Text>
          </View>
        ))}
      </View>
    </View>
  </Section>
);`,
  },
  {
    name: 'Table.jsx',
    code: `const Section = ({ title, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Table = () => (
  <Section title="TOP REGIONS">
    {regions.map(([name, amount, delta]) => (
      <View key={name} style={styles.row}>
        <Text style={styles.cell}>{name}</Text>
        <Text style={styles.amount}>{amount}</Text>
        <Text style={[styles.up, styles.delta]}>{delta}</Text>
      </View>
    ))}
  </Section>
);`,
  },
  {
    name: 'styles.js',
    code: `const red = '#e82200';
const ink = '#3e3e3e';
const paper = '#ffffff';
const mute = '#8a8a87';
const rule = '#e5e5e3';

const kpis = [
  { label: 'REVENUE', value: '$4.2M', delta: 12 },
  { label: 'CHURN', value: '1.8%', delta: -4 },
  { label: 'NPS', value: '61', delta: 9 },
];

const months = [
  { name: 'APR', value: 68 },
  { name: 'MAY', value: 81 },
  { name: 'JUN', value: 54 },
  { name: 'JUL', value: 92 },
  { name: 'AUG', value: 74 },
  { name: 'SEP', value: 118 },
];

const regions = [
  ['South America', '$1.61M', '+18%'],
  ['Europe', '$1.24M', '+7%'],
  ['North America', '$0.92M', '+3%'],
];

const traffic = [
  { label: 'Organic', value: 46, color: red },
  { label: 'Referral', value: 29, color: '#f0865f' },
  { label: 'Direct', value: 25, color: ink },
];

// turn percentages into start/end angles, clockwise from 12
let angle = -Math.PI / 2;
const slices = traffic.map((slice) => {
  const start = angle;
  angle += (slice.value / 100) * 2 * Math.PI;
  return { ...slice, start, end: angle };
});

const point = (a) => [
  43 + 33 * Math.cos(a),
  43 + 33 * Math.sin(a),
];

const arc = (start, end) => {
  const [x1, y1] = point(start);
  const [x2, y2] = point(end - 0.04);
  const wide = end - start > Math.PI ? 1 : 0;
  return \`M\${x1} \${y1}A33 33 0 \${wide} 1 \${x2} \${y2}\`;
};

const styles = StyleSheet.create({
  page: { backgroundColor: paper, color: ink, padding: 18 },
  header: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderColor: red,
    paddingBottom: 6,
  },
  title: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 17,
    letterSpacing: -0.5,
  },
  tiny: { fontSize: 5.5, letterSpacing: 1.3, color: mute },
  kpis: { flexDirection: 'row', marginTop: 7 },
  kpi: { flex: 1 },
  kpiValue: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 18,
    marginTop: 3,
  },
  up: { fontSize: 8, color: '#1f7a4d' },
  down: { fontSize: 8, color: red },
  section: { marginTop: 9 },
  sectionTitle: {
    fontSize: 5.5,
    letterSpacing: 1.6,
    color: mute,
    borderBottomWidth: 0.5,
    borderColor: rule,
    paddingBottom: 3,
    marginBottom: 6,
  },
  chart: { height: 54 },
  body: {
    fontSize: 6.5,
    lineHeight: 1.5,
    textAlign: 'justify',
  },
  axis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  axisLabel: {
    flex: 1,
    fontSize: 5.5,
    letterSpacing: 1,
    color: mute,
    textAlign: 'center',
  },
  split: { flexDirection: 'row', alignItems: 'center' },
  legend: { flex: 1, marginLeft: 18 },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2.5,
  },
  swatch: { width: 7, height: 7, marginRight: 7 },
  legendLabel: { flex: 1, fontSize: 9 },
  mono: { fontFamily: 'Courier-Bold', fontSize: 9 },
  amount: {
    fontFamily: 'Courier-Bold',
    fontSize: 9,
    width: 52,
  },
  delta: { width: 34, textAlign: 'right' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: rule,
    paddingVertical: 3.5,
  },
  cell: { flex: 1, fontSize: 9 },
});

ReactPDF.render(<Report />);`,
  },
];
