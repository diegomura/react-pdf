const fractals = `const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  column: {
    flexGrow: 1,
  },
  text: {
    margin: 10,
    fontSize: 10,
    color: 'white',
  },
});

const palette = [
  '#781c81',
  '#521b80',
  '#442f8b',
  '#3f4c9f',
  '#4069b4',
  '#4582c1',
  '#4e96bd',
  '#5aa6a9',
  '#68b090',
  '#7ab878',
  '#8dbc64',
  '#a2be56',
  '#b7bd4b',
  '#c9b843',
  '#d8ae3d',
  '#e29e37',
  '#e78632',
  '#e6672d',
  '#e14427',
  '#d92120',
];

const toggle = direction => (direction === 'column' ? 'row' : 'column');

// Creates Fractal Component that renders it's step with a background color
const Fractal = ({ steps, direction = 'column' }) => {
  if (steps === 0) {
    return null;
  }

  const fractalStyle = {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette[steps],
  };

  return (
    <View style={styles[direction]}>
      <Fractal direction={toggle(direction)} steps={steps - 1} />
      <View style={fractalStyle}>
        <Text style={styles.text}>{steps}</Text>
      </View>
    </View>
  );
};

const doc = (
  <Document
    title="Fractals"
    author="John Doe"
    subject="Rendering fractals with react-pdf"
    keywords={['react', 'pdf', 'fractals']}
  >
    <Page size="A4">
      <Fractal steps={18} />
    </Page>

    <Page orientation="landscape" size="A4">
      <Fractal steps={14} />
    </Page>

    <Page size="B4">
      <Fractal steps={10} />
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default fractals;
