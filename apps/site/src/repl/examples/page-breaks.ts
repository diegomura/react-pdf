const page_breaks = `const Quixote = () => (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Image
        style={styles.image}
        src="/images/quijote1.jpg"
      />
      <Text style={styles.subtitle}>
        Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
        Quijote de la Mancha
      </Text>
      <Text style={styles.text}>
        En un lugar de la Mancha, de cuyo nombre no quiero acordarme, no ha
        mucho tiempo que vivía un hidalgo de los de lanza en astillero, adarga
        antigua, rocín flaco y galgo corredor. Una olla de algo más vaca que
        carnero, salpicón las más noches, duelos y quebrantos los sábados,
        lentejas los viernes, algún palomino de añadidura los domingos,
        consumían las tres partes de su hacienda. El resto della concluían sayo
        de velarte, calzas de velludo para las fiestas con sus pantuflos de lo
        mismo, los días de entre semana se honraba con su vellori de lo más
        fino. Tenía en su casa una ama que pasaba de los cuarenta, y una sobrina
        que no llegaba a los veinte, y un mozo de campo y plaza, que así
        ensillaba el rocín como tomaba la podadera. Frisaba la edad de nuestro
        hidalgo con los cincuenta años, era de complexión recia, seco de carnes,
        enjuto de rostro; gran madrugador y amigo de la caza. Quieren decir que
        tenía el sobrenombre de Quijada o Quesada (que en esto hay alguna
        diferencia en los autores que deste caso escriben), aunque por
        conjeturas verosímiles se deja entender que se llama Quijana; pero esto
        importa poco a nuestro cuento; basta que en la narración dél no se salga
        un punto de la verdad
      </Text>
      <Text style={styles.emphasis}>Instead of showing the title here</Text>

      <Text style={styles.subtitle} break>
        Capítulo II: Que trata de la primera salida que de su tierra hizo el
        ingenioso Don Quijote
      </Text>
	  <Text style={[styles.emphasis, { position: 'absolute', top: 60, right: 30 }]}>
        It breaks to the top of the next page
      </Text>
      <Image
        style={styles.image}
        src="/images/quijote2.png"
      />
      <Text style={styles.text}>
        Hechas, pues, estas prevenciones, no quiso aguardar más tiempo a poner
        en efeto su pensamiento, apretándole a ello la falta que él pensaba que
        hacía en el mundo su tardanza, según eran los agravios que pensaba
        deshacer, tuertos que enderezar, sinrazones que emendar y abusos que
        mejorar y deudas que satisfacer. Y así, sin dar parte a persona alguna
        de su intención y sin que nadie le viese, una mañana, antes del día, que
        era uno de los calurosos del mes de Julio, se armó de todas sus armas,
        subió sobre Rocinante, puesta su mal compuesta celada, embrazó su
        adarga, tomó su lanza y por la puerta falsa de un corral salió al campo
        con grandísimo contento y alborozo de ver con cuánta facilidad había
        dado principio a su buen deseo. Mas apenas se vio en el campo cuando le
        asaltó un pensamiento terrible, y tal, que por poco le hiciera dejar la
        comenzada empresa; y fue que le vino a la memoria que no era armado
        caballero, y que, conforme a ley de caballería, ni podía ni debía tomar
        armas con ningún caballero; y puesto que lo fuera, había de llevar armas
        blancas, como novel caballero, sin empresa en el escudo, hasta que por
        su esfuerzo la ganase. Estos pensamientos le hicieron titubear en su
        propósito; mas pudiendo más su locura que otra razón alguna, propuso de
        hacerse armar caballero del primero que topase, a imitación de otros
        muchos que así lo hicieron, según él había leído en los libros que tal
        le tenían. En lo de las armas blancas, pensaba limpiarlas de manera, en
        teniendo lugar, que lo fuesen más que un arminio; y con esto se quietó18
        y prosiguió su camino, sin llevar otro que aquel que su caballo quería,
        creyendo que en aquello consistía la fuerza de las aventuras
      </Text>

    </Page>
  </Document>
);

Font.register({
  family: 'Oswald',
  src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf'
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Oswald'
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  image: {
    marginVertical: 30,
    marginHorizontal: 100,
  },
  emphasis: {
    margin: 12,
    fontSize: 24,
    color: '#F22300',
    fontFamily: 'Oswald'
  }
});

ReactPDF.render(<Quixote />);
`;

export default page_breaks;
