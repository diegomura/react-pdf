import fs from 'node:fs';
import path from 'node:path';

// The legacy REPL injected @react-pdf/math's `Math` as a global, which shadowed
// the built-in. The new engine doesn't, so the example gets a real import and
// the worker lazy-loads the package.
const PATCHES = {
  math: (raw) => `import { Math } from '@react-pdf/math';\n\n${raw}`,

  // Font `src` was relative (`fonts/...`), which the worker resolves against
  // the worker chunk's own URL instead of the site origin. Make it absolute
  // so it resolves against `/public/fonts`.
  'font-register': (raw) => raw.replaceAll('`fonts/', '`/fonts/'),
  'font-feature-settings': (raw) => raw.replaceAll('`fonts/', '`/fonts/'),

  // `Lato` was used with no Font.register call (hard error, empty preview),
  // and the profile photo pointed at a remote host with no CORS headers,
  // which the worker's fetch can't read. Register Lato from Google's font
  // repo (CORS-enabled) and swap the photo for the one the legacy site
  // shipped under public/images.
  resume: (raw) =>
    `Font.register({ family: 'Lato', src: 'https://raw.githubusercontent.com/google/fonts/main/ofl/lato/Lato-Regular.ttf' });\n\n${raw.replace(
      'https://images.gr-assets.com/characters/1264613782p8/1783.jpg',
      '/images/luke.jpg',
    )}`,

  // FormField/Picker/FormList are the pre-v4 names for these form
  // components; the renderer now exports FieldSet/Select/List (see
  // content/docs/v4/form.mdx). Without the rename these throw
  // "X is not defined" inside the tree, which React surfaces as
  // "Cannot read properties of null (reading 'props')" at the render root.
  checkbox: (raw) => raw.replaceAll('FormField', 'FieldSet'),
  formfield: (raw) => raw.replaceAll('FormField', 'FieldSet'),
  'picker-formlist': (raw) =>
    raw.replaceAll('Picker', 'Select').replaceAll('FormList', 'List'),
};

// Authored here, not ported. Unlike PATCHES above, these are not fixes to the
// legacy source: the .txt files for the four page-wrapping examples taught the
// concept with a `marginTop: '90%'` shove, forty lines of Don Quixote and an
// empty 1200pt View, so nothing of the original survived. The legacy text is
// no longer their source — edit these strings.
//
// They share one vocabulary: brand red is the subject, deep red its second
// voice, sand draws the rules, ink sets the type. All four are A6 set at
// near-poster scale, because the docs preview fits one whole page into a
// ~26rem pane — roughly 240px wide — where ordinary body copy disappears.
const REWRITES = {
  'breakable-unbreakable': `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, color: ink },
  label: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, letterSpacing: 1.2 },
  intro: { fontSize: 11, lineHeight: 1.5, marginTop: 7, marginBottom: 16 },
  columns: { flexDirection: 'row', justifyContent: 'space-between' },
  caption: { fontSize: 8, letterSpacing: 1, marginBottom: 5 },
  note: { fontSize: 8.5, lineHeight: 1.4, marginBottom: 6, color: deep },
  band: { borderWidth: 0.75, borderColor: red },
  mark: { fontSize: 9 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderColor: sand,
  },
  index: { fontFamily: 'Courier-Bold', color: red, marginRight: 7 },
});

const rows = Array.from({ length: 14 }, (_, i) => i + 1);
const hairline = { width: 100, height: 0.5, fill: 'white', fillOpacity: 0.3 };

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <Text style={[styles.label, { color: red }]}>REACHING THE PAGE EDGE</Text>
      <Text style={styles.intro}>
        Both blocks below are taller than the room left for them. The View is
        breakable, the Svg is not.
      </Text>

      <View style={styles.columns}>
        <View style={{ width: 118 }}>
          <Text style={styles.caption}>BREAKABLE VIEW</Text>
          <Text style={styles.note}>Cut at the edge, resumed overleaf.</Text>
          <View style={styles.band}>
            {rows.map((n) => (
              <View key={n} style={styles.row}>
                <Text style={styles.index}>{String(n).padStart(2, '0')}</Text>
                <Text>table row</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ width: 100 }}>
          <Text style={styles.caption}>UNBREAKABLE SVG</Text>
          <Text style={styles.note}>Cannot be cut, so none of it stays.</Text>
          <Svg width={100} height={336}>
            <Rect width={100} height={336} fill={deep} />
            {rows.map((n) => (
              <Rect key={n} y={n * 24} {...hairline} />
            ))}
            <Text x={10} y={16} fill="white" style={styles.mark}>ONE PIECE</Text>
          </Svg>
        </View>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`,

  'disable-wrapping': `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, color: ink },
  label: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, letterSpacing: 1.2 },
  intro: { fontSize: 11, lineHeight: 1.5, marginTop: 7, marginBottom: 16 },
  caption: { fontSize: 8, letterSpacing: 1, marginBottom: 5 },
  note: { fontSize: 8.5, lineHeight: 1.4, marginBottom: 6, color: deep },
  band: { width: 118, borderWidth: 0.75, borderColor: red },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderColor: sand,
  },
  index: { fontFamily: 'Courier-Bold', color: red, marginRight: 7 },
});

const rows = Array.from({ length: 14 }, (_, i) => i + 1);

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <Text style={[styles.label, { color: red }]}>
        THE SAME BAND, MADE UNBREAKABLE
      </Text>
      <Text style={styles.intro}>
        This is the block that split down the middle in the previous example.
        With wrap turned off it moves the way an Image would.
      </Text>

      <Text style={styles.caption}>BREAKABLE VIEW — WRAP DISABLED</Text>
      <Text style={styles.note}>Most of them fitted here. None stayed.</Text>
      <View style={styles.band} wrap={false}>
        {rows.map((n) => (
          <View key={n} style={styles.row}>
            <Text style={styles.index}>{String(n).padStart(2, '0')}</Text>
            <Text>table row</Text>
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`,

  'page-breaks': `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 11, color: ink },
  label: { fontFamily: 'Helvetica-Bold', fontSize: 8.5, letterSpacing: 1.2 },
  rule: { borderBottomWidth: 1, borderColor: sand, marginVertical: 8 },
  heading: { fontFamily: 'Helvetica-Bold', fontSize: 19, letterSpacing: -0.4 },
  body: { fontSize: 11, lineHeight: 1.6, marginTop: 10 },
  note: { fontSize: 8.5, lineHeight: 1.4, marginTop: 22, color: deep },
});

const Chapter = ({ tone, number, title, children, ...props }) => (
  <View {...props}>
    <Text style={[styles.label, { color: tone }]}>CHAPTER {number}</Text>
    <View style={styles.rule} />
    <Text style={styles.heading}>{title}</Text>
    <Text style={styles.body}>{children}</Text>
  </View>
);

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <Chapter tone={red} number="ONE" title="Where the reader starts">
        A chapter this short leaves most of the page unused, and nothing in it
        forces a break. Anything that followed would simply carry on below.
      </Chapter>

      <Text style={styles.note}>
        Room to spare — and the next chapter takes a fresh page anyway.
      </Text>

      <Chapter tone={deep} number="TWO" title="Always at the top" break>
        The break prop starts a new page before this chapter is laid out, so it
        opens at the top of one however much room was left on the page before.
      </Chapter>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`,

  'fixed-components': `const red = '#e82200';
const deep = '#8d1602';
const sand = '#c9c2b6';
const ink = '#3e3e3e';

const styles = StyleSheet.create({
  page: { padding: 24, paddingBottom: 44, fontSize: 11, color: ink },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    borderBottomWidth: 1.5,
    borderColor: red,
    paddingBottom: 5,
    marginBottom: 12,
  },
  brand: { fontFamily: 'Helvetica-Bold', fontSize: 15, letterSpacing: -0.4 },
  small: { fontSize: 8, letterSpacing: 1.2, color: deep },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 24,
    paddingHorizontal: 6,
    borderBottomWidth: 0.5,
    borderColor: sand,
  },
  index: { fontFamily: 'Courier-Bold', color: red, marginRight: 7 },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 24,
    right: 24,
    fontSize: 8,
    letterSpacing: 1.2,
    color: deep,
    textAlign: 'center',
  },
});

const rows = Array.from({ length: 20 }, (_, i) => i + 1);

const doc = (
  <Document>
    <Page size="A6" style={styles.page} wrap>
      <View style={styles.header} fixed>
        <Text style={styles.brand}>Field manual</Text>
        <Text style={styles.small}>REV 4</Text>
      </View>

      {rows.map((n) => (
        <View key={n} style={styles.row}>
          <Text style={styles.index}>{String(n).padStart(2, '0')}</Text>
          <Text>inspection point</Text>
        </View>
      ))}

      <Text
        style={styles.footer}
        render={({ pageNumber, totalPages }) =>
          \`PAGE \${pageNumber} OF \${totalPages}\`
        }
        fixed
      />
    </Page>
  </Document>
);

ReactPDF.render(doc);
`,
};

const [srcDir, destDir] = process.argv.slice(2);
fs.mkdirSync(destDir, { recursive: true });

const identifier = (name) => name.replace(/-/g, '_');

const names = [];
for (const file of fs.readdirSync(srcDir).filter((f) => f.endsWith('.txt'))) {
  const name = path.basename(file, '.txt');
  const patch = PATCHES[name] ?? ((raw) => raw);
  const raw =
    REWRITES[name] ?? patch(fs.readFileSync(path.join(srcDir, file), 'utf8'));
  const escaped = raw
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  const ident = identifier(name);

  fs.writeFileSync(
    path.join(destDir, `${name}.ts`),
    `const ${ident} = \`${escaped}\`;\n\nexport default ${ident};\n`,
  );
  names.push(name);
}

const index = [
  ...names.map((n) => `import ${identifier(n)} from './${n}';`),
  '',
  'export const examples: Record<string, string> = {',
  ...names.map((n) =>
    n === identifier(n) ? `  ${n}: ${n},` : `  '${n}': ${identifier(n)},`,
  ),
  '};',
  '',
].join('\n');

fs.writeFileSync(path.join(destDir, 'index.ts'), index);
console.log(`${names.length} examples`);
