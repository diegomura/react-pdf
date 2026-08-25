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
    name: 'Specimen.jsx',
    code: `const Specimen = () => (
  <Document title="Helvetica specimen">
    <Page size="A6" style={styles.page}>
      <PressMarks />

      <View style={styles.sheet}>
        <Header />
        <Waterfall />
        <Text style={styles.charset}>{charset}</Text>
        <Meta />
        <ColourBar />
      </View>
    </Page>
  </Document>
);

ReactPDF.render(<Specimen />);`,
  },
  {
    name: 'PressMarks.jsx',
    code: `// Crop marks and a registration target, drawn onto the trim
// itself. The page is the artwork.
const PressMarks = () => (
  <Svg viewBox="0 0 298 420" style={styles.marks}>
    {corners.map(([x, y, dx, dy]) => (
      <Path
        key={\`\${x}-\${y}\`}
        d={\`M\${x} \${y}h\${dx}M\${x} \${y}v\${dy}\`}
        stroke={ink}
        strokeWidth={0.5}
      />
    ))}

    <Circle cx={149} cy={12} r={5} fill="none"
      stroke={ink} strokeWidth={0.5} />
    <Path d="M149 5v14M142 12h14"
      stroke={ink} strokeWidth={0.5} />
  </Svg>
);

const Header = () => (
  <View style={styles.header}>
    <View>
      <Text style={styles.title}>Helvetica</Text>
      <Text style={styles.sub}>
        SPECIMEN SHEET / BASE 14 / NO EMBEDDING
      </Text>
    </View>

    <Text style={styles.folio}>A6</Text>
  </View>
);`,
  },
  {
    name: 'Waterfall.jsx',
    code: `// The same word at five sizes, with the tracking tightening
// as it grows — the way a real specimen sheet sets it.
const Line = ({ size }) => (
  <View style={styles.line}>
    <Text style={styles.size}>{size}</Text>
    <Text style={{ fontSize: size, letterSpacing: -size / 40 }}>
      Handgloves
    </Text>
  </View>
);

const Waterfall = () => (
  <View style={styles.waterfall}>
    {sizes.map((size) => (
      <Line key={size} size={size} />
    ))}
  </View>
);`,
  },
  {
    name: 'Meta.jsx',
    code: `const Meta = () => (
  <View style={styles.meta}>
    {specs.map(([label, value]) => (
      <View key={label} style={styles.metaRow}>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{value}</Text>
      </View>
    ))}
  </View>
);

const ColourBar = () => (
  <View style={styles.bar}>
    {swatches.map((hex) => (
      <View key={hex} style={styles.swatchBox}>
        <View
          style={[styles.swatch, { backgroundColor: hex }]}
        />
        <Text style={styles.hex}>{hex.toUpperCase()}</Text>
      </View>
    ))}
  </View>
);`,
  },
  {
    name: 'styles.js',
    code: `const red = '#e82200';
const ink = '#1c1b1a';
const paper = '#faf7f2';
const mute = '#8a8580';
const rule = '#ddd7cd';

const sizes = [9, 13, 18, 25, 35];

const specs = [
  ['TRIM', '105 × 148 MM'],
  ['MEDIA BOX', '297.64 × 419.53 PT'],
  ['FONTS', 'HELVETICA, COURIER'],
  ['DRAWN BY', '@REACT-PDF/RENDERER'],
];

const swatches = [red, '#8d1602', '#3e3e3e', '#c9c2b6'];

const charset =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ ' +
  'abcdefghijklmnopqrstuvwxyz 0123456789 ' +
  '& @ % # ? ! × § ¶';

// x, y, then the horizontal and vertical tick lengths
const corners = [
  [13, 13, -9, -9],
  [285, 13, 9, -9],
  [13, 407, -9, 9],
  [285, 407, 9, 9],
];

const styles = StyleSheet.create({
  page: { backgroundColor: paper, color: ink },
  marks: { position: 'absolute', inset: 0 },
  sheet: {
    flex: 1,
    paddingHorizontal: 26,
    paddingTop: 32,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: ink,
    paddingBottom: 8,
  },
  title: { fontSize: 24, letterSpacing: -1 },
  sub: { fontSize: 5.5, letterSpacing: 1.4, color: mute },
  folio: {
    fontFamily: 'Courier-Bold',
    fontSize: 10,
    color: red,
  },
  waterfall: { marginTop: 6 },
  line: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomWidth: 0.4,
    borderColor: rule,
    paddingVertical: 5.5,
  },
  size: {
    fontFamily: 'Courier',
    fontSize: 6.5,
    color: red,
    width: 24,
  },
  charset: {
    fontSize: 7,
    lineHeight: 1.9,
    letterSpacing: 0.4,
    color: mute,
    marginTop: 10,
  },
  meta: {
    marginTop: 12,
    borderTopWidth: 0.4,
    borderColor: rule,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.4,
    borderColor: rule,
    paddingVertical: 4,
  },
  metaLabel: {
    fontFamily: 'Courier',
    fontSize: 6,
    color: mute,
  },
  metaValue: {
    fontFamily: 'Courier-Bold',
    fontSize: 6,
    color: ink,
  },
  bar: { flexDirection: 'row', marginTop: 'auto' },
  swatchBox: { flex: 1, marginRight: 4 },
  swatch: { height: 22, borderWidth: 0.4, borderColor: rule },
  hex: { fontFamily: 'Courier', fontSize: 5, color: mute },
});`,
  },
];
