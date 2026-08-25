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
    name: 'Poster.jsx',
    code: `const Poster = () => (
  <Document title="Nocturne Festival">
    <Page size="A6" style={styles.page}>
      <Artwork />
      <Lineup />
      <Stub />
    </Page>
  </Document>
);

ReactPDF.render(<Poster />);`,
  },
  {
    name: 'Artwork.jsx',
    code: `// Concentric quarter-discs, drawn as arcs. No image file and
// no canvas — vectors go into the PDF as vectors.
const Rings = () => (
  <Svg viewBox="0 0 298 176" style={styles.fill}>
    <Rect width={298} height={176} fill={ink} />
    {rings.map((r, i) => (
      <Path key={r} d={quarter(r)} fill={i % 2 ? red : paper} />
    ))}
  </Svg>
);

const Artwork = () => (
  <View style={styles.art}>
    <Rings />

    <View style={styles.artType}>
      <Text style={styles.kicker}>THREE NIGHTS BY THE SEA</Text>
      <Text style={styles.title}>NOCTURNE</Text>
      <Text style={[styles.title, styles.red]}>FESTIVAL</Text>
    </View>
  </View>
);`,
  },
  {
    name: 'Lineup.jsx',
    code: `const Night = ({ night }) => (
  <View style={styles.night}>
    <Text style={styles.day}>{night.day}</Text>

    <View style={styles.acts}>
      {night.acts.map((act, i) => (
        <Text key={act} style={i ? styles.act : styles.head}>
          {act}
        </Text>
      ))}
    </View>

    <Text style={styles.stage}>{night.stage}</Text>
  </View>
);

const Lineup = () => (
  <View style={styles.lineup}>
    <View style={styles.marquee}>
      <Text>12–14 SEP</Text>
      <Text>PUERTO SUR, MONTEVIDEO</Text>
    </View>

    {nights.map((night) => (
      <Night key={night.day} night={night} />
    ))}
  </View>
);`,
  },
  {
    name: 'Stub.jsx',
    code: `const Barcode = () => (
  <Svg width={86} height={26} viewBox="0 0 86 26">
    {bars.map((bar) => (
      <Rect key={bar.x} {...bar} height={26} fill={ink} />
    ))}
  </Svg>
);

const Field = ({ label, value }) => (
  <View style={{ marginRight: 14 }}>
    <Text style={styles.tiny}>{label}</Text>
    <Text style={styles.mono}>{value}</Text>
  </View>
);

const Stub = () => (
  <View style={styles.stub}>
    <View style={styles.perforation} />

    <View style={styles.stubRow}>
      <View>
        <Text style={styles.tiny}>ADMIT ONE / 3 NIGHTS</Text>

        <View style={styles.fields}>
          {fields.map((field) => (
            <Field key={field.label} {...field} />
          ))}
        </View>
      </View>

      <Barcode />
    </View>
  </View>
);`,
  },
  {
    name: 'styles.js',
    code: `const red = '#e8290b';
const ink = '#111114';
const paper = '#f4f1e9';
const mute = '#6a6a72';

const rings = [230, 184, 138, 92, 46];

// a quarter disc pinned to the top-right corner of the page
const quarter = (r) =>
  \`M298 0v\${r}a\${r} \${r} 0 0 0 -\${r} -\${r}z\`;

const nights = [
  {
    day: 'FRI',
    stage: 'HARBOUR',
    acts: ['SUNSET DIVISION', 'Kite Parade', 'Marisol'],
  },
  {
    day: 'SAT',
    stage: 'DRY DOCK',
    acts: ['THE LONG NOW', 'Halogen Choir', 'Perro Azul'],
  },
  {
    day: 'SUN',
    stage: 'LIGHTHOUSE',
    acts: ['ATLAS IN BLOOM', 'Nite Ferry', 'Cassette'],
  },
];

const fields = [
  { label: 'GATE', value: 'C' },
  { label: 'ROW', value: '14' },
  { label: 'SEAT', value: '008' },
  { label: 'ORDER', value: 'RP-0042' },
];

const bars = 'NOCTURNE-MVD-2025'.split('').map((c, i) => ({
  x: i * 5,
  width: (c.charCodeAt(0) % 3) + 1,
}));

const styles = StyleSheet.create({
  page: { backgroundColor: paper, color: ink },
  fill: { position: 'absolute', inset: 0 },
  art: { height: 176, justifyContent: 'flex-end', padding: 18 },
  artType: { marginBottom: -3 },
  kicker: {
    fontSize: 6.5,
    letterSpacing: 1.6,
    color: '#8f8b84',
    marginBottom: 7,
  },
  title: {
    fontSize: 36,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -1.4,
    lineHeight: 0.96,
    color: paper,
  },
  red: { color: red },
  lineup: { flex: 1 },
  marquee: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: red,
    color: paper,
    fontSize: 7,
    letterSpacing: 1.2,
    paddingVertical: 4.5,
    paddingHorizontal: 18,
  },
  night: {
    flexDirection: 'row',
    alignItems: 'baseline',
    borderBottomWidth: 0.75,
    borderColor: ink,
    marginHorizontal: 18,
    paddingVertical: 6,
  },
  day: {
    width: 26,
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: 0.6,
  },
  acts: { flex: 1 },
  head: {
    fontSize: 13.5,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.4,
  },
  act: { fontSize: 8.5, color: mute, lineHeight: 1.45 },
  stage: { fontSize: 6, letterSpacing: 1.2, color: mute },
  stub: { paddingHorizontal: 18, paddingBottom: 14 },
  perforation: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#c9c5ba',
    marginBottom: 12,
  },
  stubRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  fields: { flexDirection: 'row', marginTop: 6 },
  tiny: { fontSize: 6, letterSpacing: 1.2, color: mute },
  mono: { fontFamily: 'Courier-Bold', fontSize: 10 },
});`,
  },
];
