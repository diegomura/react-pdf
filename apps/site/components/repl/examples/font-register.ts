const font_register = `Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: \`/fonts/Roboto-Regular.ttf\`
    },
    {
      src: \`/fonts/Roboto-Bold.ttf\`,
      fontWeight: 'bold'
    },
    {
      src: \`/fonts/Roboto-Italic.ttf\`,
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    {
      src: \`/fonts/Roboto-BoldItalic.ttf\`,
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  ]
})

const MyDocument = () => (
  <Document>
    <Page>
      <Text style={{ fontFamily: 'Roboto' }}>
        Velit sit cillum adipisicing aliqua id sint cillum occaecat fugiat adipisicing non elit.
      </Text>
      <Text style={{ fontFamily: 'Roboto', fontWeight: 'bold' }}>
        Velit sit cillum adipisicing aliqua id sint cillum occaecat fugiat adipisicing non elit.
      </Text>
      <Text style={{ fontFamily: 'Roboto', fontStyle: 'italic' }}>
        Velit sit cillum adipisicing aliqua id sint cillum occaecat fugiat adipisicing non elit.
      </Text>
      <Text style={{ fontFamily: 'Roboto', fontStyle: 'italic', fontWeight: 700 }}>
        Velit sit cillum adipisicing aliqua id sint cillum occaecat fugiat adipisicing non elit.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(<MyDocument />);
`;

export default font_register;
