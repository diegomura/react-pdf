/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text, Image, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  body: {
    padding: 35,
    textAlign: 'center',
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
});

const doc = (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.title}>Don Quijote de la Mancha</Text>
      <Text style={styles.author}>Miguel de Cervantes</Text>
      <Image
        style={styles.image}
        src="http://static.donquijote.org/images/blogs/dq-reg/don-quijote-de-la-mancha.jpg"
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
      <Text style={styles.text}>
        Decía él, que el Cid Ruy Díaz había sido muy buen caballero; pero que no
        tenía que ver con el caballero de la ardiente espada, que de sólo un
        revés había partido por medio dos fieros y descomunales gigantes. Mejor
        estaba con Bernardo del Carpio, porque en Roncesvalle había muerto a
        Roldán el encantado, valiéndose de la industria de Hércules, cuando
        ahogó a Anteo, el hijo de la Tierra, entre los brazos. Decía mucho bien
        del gigante Morgante, porque con ser de aquella generación gigantesca,
        que todos son soberbios y descomedidos, él solo era afable y bien
        criado; pero sobre todos estaba bien con Reinaldos de Montalbán, y más
        cuando le veía salir de su castillo y robar cuantos topaba, y cuando en
        Allende robó aquel ídolo de Mahoma, que era todo de oro, según dice su
        historia. Diera él, por dar una mano de coces al traidor de Galalón, al
        ama que tenía y aun a su sobrina de añadidura.
      </Text>
      <Image
        style={styles.image}
        src="https://panampost.com/wp-content/uploads/don-quijote-lessons.jpg"
      />
      <Text style={styles.text}>
        En efecto, rematado ya su juicio, vino a dar en el más extraño
        pensamiento que jamás dio loco en el mundo, y fue que le pareció
        convenible y necesario, así para el aumento de su honra, como para el
        servicio de su república, hacerse caballero andante, e irse por todo el
        mundo con sus armas y caballo a buscar las aventuras, y a ejercitarse en
        todo aquello que él había leído, que los caballeros andantes se
        ejercitaban, deshaciendo todo género de agravio, y poniéndose en
        ocasiones y peligros, donde acabándolos, cobrase eterno nombre y fama.
        Imaginábase el pobre ya coronado por el valor de su brazo por lo menos
        del imperio de Trapisonda: y así con estos tan agradables pensamientos,
        llevado del estraño gusto que en ellos sentía, se dió priesa a poner en
        efecto lo que deseaba. Y lo primero que hizo, fue limpiar unas armas,
        que habían sido de sus bisabuelos, que, tomadas de orín y llenas de
        moho, luengos siglos había que estaban puestas y olvidadas en un rincón.
        Limpiólas y aderezólas lo mejor que pudo; pero vió que tenían una gran
        falta, y era que no tenía celada de encaje, sino morrión simple; mas a
        esto suplió su industria, porque de cartones hizo un modo de media
        celada, que encajada con el morrión, hacía una apariencia de celada
        entera. Es verdad que para probar si era fuerte, y podía estar al riesgo
        de una cuchillada, sacó su espada, y le dió dos golpes, y con el primero
        y en un punto deshizo lo que había hecho en una semana: y no dejó de
        parecerle mal la facilidad con que la había hecho pedazos, y por
        asegurarse de este peligro, lo tornó a hacer de nuevo, poniéndole unas
        barras de hierro por de dentro de tal manera, que él quedó satisfecho de
        su fortaleza; y, sin querer hacer nueva experiencia de ella, la diputó y
        tuvo por celada finísima de encaje.
      </Text>
      <Text style={styles.text}>
        Fue luego a ver a su rocín, y aunque tenía más cuartos que un real, y
        más tachas que el caballo de Gonela, que tantum pellis, et ossa fuit, le
        pareció que ni el Bucéfalo de Alejandro, ni Babieca el del Cid con él se
        igualaban. Cuatro días se le pasaron en imaginar qué nombre le podría:
        porque, según se decía él a sí mismo, no era razón que caballo de
        caballero tan famoso, y tan bueno él por sí, estuviese sin nombre
        conocido; y así procuraba acomodársele, de manera que declarase quien
        había sido, antes que fuese de caballero andante, y lo que era entones:
        pues estaba muy puesto en razón, que mudando su señor estado, mudase él
        también el nombre; y le cobrase famoso y de estruendo, como convenía a
        la nueva orden y al nuevo ejercicio que ya profesaba: y así después de
        muchos nombres que formó, borró y quitó, añadió, deshizo y tornó a hacer
        en su memoria e imaginación, al fin le vino a llamar Rocinante, nombre a
        su parecer alto, sonoro y significativo de lo que había sido cuando fue
        rocín, antes de lo que ahora era, que era antes y primero de todos los
        rocines del mundo.
      </Text>
      <Text style={styles.text}>
        Puesto nombre y tan a su gusto a su caballo, quiso ponérsele a sí mismo,
        y en este pensamiento, duró otros ocho días, y al cabo se vino a llamar
        don Quijote, de donde como queda dicho, tomaron ocasión los autores de
        esta tan verdadera historia, que sin duda se debía llamar Quijada, y no
        Quesada como otros quisieron decir. Pero acordándose que el valeroso
        Amadís, no sólo se había contentado con llamarse Amadís a secas, sino
        que añadió el nombre de su reino y patria, por hacerla famosa, y se
        llamó Amadís de Gaula, así quiso, como buen caballero, añadir al suyo el
        nombre de la suya, y llamarse don Quijote de la Mancha, con que a su
        parecer declaraba muy al vivo su linaje y patria, y la honraba con tomar
        el sobrenombre della.
      </Text>
      <Text style={styles.text}>
        Limpias, pues, sus armas, hecho del morrión celada, puesto nombre a su
        rocín, y confirmándose a sí mismo, se dió a entender que no le faltaba
        otra cosa, sino buscar una dama de quien enamorarse, porque el caballero
        andante sin amores, era árbol sin hojas y sin fruto, y cuerpo sin alma.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
