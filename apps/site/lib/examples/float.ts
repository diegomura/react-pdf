const float = `const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Times-Roman',
  },
  section: {
    marginBottom: 30,
  },
  text: {
    textAlign: 'justify',
  },
});

const doc = (
  <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.section}>
        <View style={{ float: 'left', marginRight: 6 }}>
          <Text style={{ fontSize: 46, fontFamily: 'Times-Bold', color: '#4069b4' }}>
            E
          </Text>
        </View>
        <Text style={styles.text}>
          n un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
          mucho tiempo que vivía un hidalgo de los de lanza en astillero,
          adarga antigua, rocín flaco y galgo corredor. Una olla de algo más
          vaca que carnero, salpicón las más noches, duelos y quebrantos los
          sábados, lentejas los viernes, algún palomino de añadidura los
          domingos, consumían las tres partes de su hacienda. El resto della
          concluían sayo de velarte, calzas de velludo para las fiestas con
          sus pantuflos de lo mismo, los días de entre semana se honraba con
          su vellori de lo más fino.
        </Text>
      </View>

      <View style={styles.section}>
        <View
          style={{
            float: 'right',
            width: 120,
            height: 90,
            marginLeft: 10,
            backgroundColor: '#c25b56',
          }}
        />
        <Text style={styles.text}>
          Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
          que no llegaba a los veinte, y un mozo de campo y plaza, que así
          ensillaba el rocín como tomaba la podadera. Frisaba la edad de
          nuestro hidalgo con los cincuenta años, era de complexión recia,
          seco de carnes, enjuto de rostro; gran madrugador y amigo de la
          caza. Quieren decir que tenía el sobrenombre de Quijada o Quesada,
          aunque por conjeturas verosímiles se deja entender que se llama
          Quijana; pero esto importa poco a nuestro cuento.
        </Text>
        <Text style={{ clear: 'right', marginTop: 8 }}>
          This line has clear: right, so it starts below the float.
        </Text>
      </View>
    </Page>
  </Document>
);

ReactPDF.render(doc);
`;

export default float;
