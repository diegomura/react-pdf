const page_breaks = `const red = '#e82200';
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
`;

export default page_breaks;
