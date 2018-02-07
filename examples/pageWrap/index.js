/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text, Image, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  body: {
    padding: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginTop: 20,
  },
  author: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 12,
  },
  image: {
    height: 150,
    marginBottom: 30,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    textAlign: 'center',
    color: 'grey',
  },
  footer: {
    position: 'absolute',
    fontSize: 12,
    bottom: 40,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
});

const Subtitle = ({ children, ...props }) => (
  <Text style={styles.subtitle} {...props}>
    {children}
  </Text>
);

const doc = (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.header} fixed>
        ~ Created with react-pdf ~
      </Text>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Image
        style={styles.image}
        src="http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg"
      />
      <Subtitle>
        Capítulo I: Que trata de la condición y ejercicio del famoso hidalgo D.
        Quijote de la Mancha
      </Subtitle>
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
      <Text style={styles.text}>
        Es, pues, de saber, que este sobredicho hidalgo, los ratos que estaba
        ocioso (que eran los más del año) se daba a leer libros de caballerías
        con tanta afición y gusto, que olvidó casi de todo punto el ejercicio de
        la caza, y aun la administración de su hacienda; y llegó a tanto su
        curiosidad y desatino en esto, que vendió muchas hanegas de tierra de
        sembradura, para comprar libros de caballerías en que leer; y así llevó
        a su casa todos cuantos pudo haber dellos; y de todos ningunos le
        parecían tan bien como los que compuso el famoso Feliciano de Silva:
        porque la claridad de su prosa, y aquellas intrincadas razones suyas, le
        parecían de perlas; y más cuando llegaba a leer aquellos requiebros y
        cartas de desafío, donde en muchas partes hallaba escrito: la razón de
        la sinrazón que a mi razón se hace, de tal manera mi razón enflaquece,
        que con razón me quejo de la vuestra fermosura, y también cuando leía:
        los altos cielos que de vuestra divinidad divinamente con las estrellas
        se fortifican, y os hacen merecedora del merecimiento que merece la
        vuestra grandeza.
      </Text>
      <Text style={styles.text}>
        Con estas y semejantes razones perdía el pobre caballero el juicio, y
        desvelábase por entenderlas, y desentrañarles el sentido, que no se lo
        sacara, ni las entendiera el mismo Aristóteles, si resucitara para sólo
        ello. No estaba muy bien con las heridas que don Belianis daba y
        recibía, porque se imaginaba que por grandes maestros que le hubiesen
        curado, no dejaría de tener el rostro y todo el cuerpo lleno de
        cicatrices y señales; pero con todo alababa en su autor aquel acabar su
        libro con la promesa de aquella inacabable aventura, y muchas veces le
        vino deseo de tomar la pluma, y darle fin al pie de la letra como allí
        se promete; y sin duda alguna lo hiciera, y aun saliera con ello, si
        otros mayores y continuos pensamientos no se lo estorbaran. Tuvo muchas
        veces competencia con el cura de su lugar (que era hombre docto graduado
        en Sigüenza), sobre cuál había sido mejor caballero, Palmerín de
        Inglaterra o Amadís de Gaula; mas maese Nicolás, barbero del mismo
        pueblo, decía que ninguno llegaba al caballero del Febo, y que si alguno
        se le podía comparar, era don Galaor, hermano de Amadís de Gaula, porque
        tenía muy acomodada condición para todo; que no era caballero
        melindroso, ni tan llorón como su hermano, y que en lo de la valentía no
        le iba en zaga.
      </Text>
      <Text style={styles.text}>
        En resolución, él se enfrascó tanto en su lectura, que se le pasaban las
        noches leyendo de claro en claro, y los días de turbio en turbio, y así,
        del poco dormir y del mucho leer, se le secó el cerebro, de manera que
        vino a perder el juicio. Llenósele la fantasía de todo aquello que leía
        en los libros, así de encantamientos, como de pendencias, batallas,
        desafíos, heridas, requiebros, amores, tormentas y disparates
        imposibles, y asentósele de tal modo en la imaginación que era verdad
        toda aquella máquina de aquellas soñadas invenciones que leía, que para
        él no había otra historia más cierta en el mundo.
      </Text>
      <Subtitle break>
        Capítulo II: Que trata de la primera salida que de su tierra hizo el
        ingenioso Don Quijote
      </Subtitle>
      <Image
        style={styles.image}
        src="https://panampost.com/wp-content/uploads/don-quijote-lessons.jpg"
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
      <Text style={styles.text}>
        Yendo, pues, caminando nuestro flamante aventurero, iba hablando consigo
        mesmo, y diciendo: —¿Quién duda, sino que en los venideros tiempos,
        cuando salga a luz la verdadera historia de mis famosos hechos, que el
        sabio que los escribiere no ponga, cuando llegue a contar esta mi
        primera salida tan de mañana, desta manera?: Apenas había el rubicundo
        Apolo tendido por la faz de la ancha y espaciosa tierra las doradas
        hebras de sus hermosos cabellos, y apenas los pequeños y pintados
        pajarillos con sus arpadas lenguas habían saludado con dulce y meliflua
        armonía la venida de la rosada Aurora, que, dejando la blanda cama del
        celoso marido, por las puertas y balcones del manchego horizonte a los
        mortales se mostraba, cuando el famoso caballero don Quijote de la
        Mancha, dejando las ociosas plumas, subió sobre su famoso caballo
        Rocinante y comenzó a caminar por el antiguo y conocido Campo de
        Montiel.
      </Text>
      <Text style={styles.text}>
        Y era la verdad que por él caminaba; y añadió diciendo: —Dichosa edad y
        siglo dichoso aquel adonde saldrán a luz las famosas hazañas mías,
        dignas de entallarse en bronces, esculpirse en mármoles y pintarse en
        tablas, para memoria en lo futuro. ¡Oh tú, sabio encantador, quienquiera
        que seas, a quien ha de tocar el ser coronista desta peregrina historia!
        Ruégote que no te olvides de mi buen Rocinante, compañero eterno mío en
        todos mis caminos y carreras.
      </Text>
      <Text style={styles.text}>
        Luego volvía diciendo, como si verdaderamente fuera enamorado: —¡Oh
        princesa Dulcinea, señora deste cautivo corazón! Mucho agravio me
        habedes fecho en despedirme y reprocharme con el riguroso afincamiento
        de mandarme no parecer ante la vuestra fermosura. Plégaos, señora, de
        membraros deste vuestro sujeto corazón, que tantas cuitas por vuestro
        amor padece. Con estos iba ensartando otros disparates, todos al modo de
        los que sus libros le habían enseñado, imitando en cuanto podía su
        lenguaje. Con esto caminaba tan despacio, y el sol entraba tan apriesa y
        con tanto ardor, que fuera bastante a derretirle los sesos, si algunos
        tuviera
      </Text>
      <Text style={styles.text}>
        Casi todo aquel día caminó sin acontecerle cosa que de contar fuese, de
        lo cual se desesperaba, porque quisiera topar luego luego con quien
        hacer experiencia del valor de su fuerte brazo. Autores hay que dicen
        que la primera aventura que le avino fue la del Puerto Lápice, otros
        dicen que la de los molinos de viento; pero lo que yo he podido
        averiguar en este caso, y lo que he hallado escrito en los anales de la
        Mancha, es que él anduvo todo aquel día, y, al anochecer, su rocín y él
        se hallaron cansados y muertos de hambre, y que, mirando a todas partes
        por ver si descubriría algún castillo o alguna majada de pastores donde
        recogerse y adonde pudiese remediar su mucha hambre y necesidad, vio, no
        lejos del camino por donde iba, una venta,que fue como si viera una
        estrella que, no a los portales, sino a los alcázares de su redención le
        encaminaba. Diose priesa a caminar, y llegó a ella a tiempo que
        anochecía.
      </Text>
      <Text style={styles.footer} fixed>
        ~ Don Quijote de la Mancha ~
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
