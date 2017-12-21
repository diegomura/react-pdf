/* eslint react/prop-types: 0 */
/* eslint react/jsx-sort-props: 0 */

import React from 'react';
import ReactPDF from '@react-pdf/node';
import { Document, Page, Text, Image, StyleSheet } from '@react-pdf/core';

const styles = StyleSheet.create({
  body: {
    padding: 20,
  },
  text: {
    margin: 10,
    fontSize: 15,
  },
  image: {
    height: 250,
  },
  title: {
    fontSize: 30,
    align: 'center',
    marginVertical: 20,
  },
});

const doc = (
  <Document>
    <Page style={styles.body} wrap>
      <Text style={styles.title}>Lorem ipsum</Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu lorem
        porta, cursus ante vitae, pretium lectus. Phasellus condimentum
        convallis elit id tincidunt. Praesent et mi dolor. Fusce placerat purus
        id nibh blandit, eget aliquet leo efficitur. Nunc gravida nunc id diam
        bibendum, a convallis metus elementum. Aenean libero risus, vehicula eu
        dolor sed, facilisis rutrum erat. Maecenas vehicula purus ut mollis
        porta. Nulla nec est sed libero efficitur efficitur nec ac mi. Donec at
        facilisis sem. Suspendisse quis dui vitae mi tincidunt condimentum.
        Quisque laoreet lorem ullamcorper, vestibulum nibh lacinia, consequat
        eros. Sed non nibh mauris. Praesent quam purus, sollicitudin in feugiat
        sed, cursus eget tortor.
      </Text>
      <Text style={styles.text}>
        Nullam ornare pulvinar fermentum. Aliquam sagittis nulla id lectus
        luctus, sed bibendum dolor varius. Morbi congue egestas eros a aliquet.
        Donec scelerisque pellentesque lorem, non consectetur turpis ornare sit
        amet. Proin nulla metus, condimentum eget mi at, mattis tristique est.
        Suspendisse potenti. Curabitur lacus odio, dignissim eu maximus ut,
        euismod at urna. Donec eu eros eu sem semper finibus. Etiam nec
        vestibulum tortor.
      </Text>
      <Text style={styles.text}>
        In efficitur a quam sed hendrerit. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; Ut eget dolor
        elit. Donec nisl orci, feugiat eu sollicitudin id, dignissim at leo.
        Phasellus vestibulum lacus lectus, aliquet laoreet eros suscipit at.
        Phasellus tempor metus quis ultricies hendrerit. Proin volutpat leo eget
        elit tincidunt, ac facilisis lectus gravida. Sed vitae cursus felis,
        pellentesque dignissim lacus. Nullam efficitur convallis bibendum. Donec
        volutpat vestibulum accumsan. Nunc scelerisque, diam et condimentum
        scelerisque, purus dolor dignissim elit, vitae faucibus sem metus
        commodo metus. Nunc vel tortor viverra, volutpat ipsum ut, lacinia sem.
      </Text>
      <Image
        style={styles.image}
        src="http://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg"
      />
      <Text style={styles.text}>
        Nam neque sem, pellentesque ut pulvinar quis, condimentum sit amet arcu.
        Phasellus mollis gravida leo, vel accumsan metus dictum ut. In non risus
        vel dolor scelerisque congue vel ac tellus. Duis quis purus ultricies,
        gravida diam id, sodales lacus. Curabitur laoreet finibus tellus et
        tincidunt. Nulla cursus erat sem, sed faucibus felis luctus quis. Mauris
        feugiat pellentesque arcu vitae lobortis. Nulla velit libero, mattis et
        orci pretium, semper tempor arcu. In hac habitasse platea dictumst. Duis
        lacinia tellus eget viverra sodales. Donec vehicula mauris vitae lacus
        laoreet pharetra.
      </Text>
      <Text style={styles.text}>
        Phasellus ac congue enim, et tristique diam. Sed vestibulum at nisl sed
        interdum. Sed consectetur mi dui, sed ornare elit scelerisque quis. Sed
        convallis augue feugiat tortor aliquam hendrerit. Duis pretium
        vestibulum ex. Mauris volutpat scelerisque libero eget semper.
        Pellentesque gravida tortor eu elit aliquet semper. Aenean non fermentum
        nibh. Vivamus ac nisi nisi. Ut posuere, dui vel mattis varius, ipsum ex
        tristique nisi, ut varius leo neque nec odio.
      </Text>
      <Text style={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu lorem
        porta, cursus ante vitae, pretium lectus. Phasellus condimentum
        convallis elit id tincidunt. Praesent et mi dolor. Fusce placerat purus
        id nibh blandit, eget aliquet leo efficitur. Nunc gravida nunc id diam
        bibendum, a convallis metus elementum. Aenean libero risus, vehicula eu
        dolor sed, facilisis rutrum erat. Maecenas vehicula purus ut mollis
        porta. Nulla nec est sed libero efficitur efficitur nec ac mi. Donec at
        facilisis sem. Suspendisse quis dui vitae mi tincidunt condimentum.
        Quisque laoreet lorem ullamcorper, vestibulum nibh lacinia, consequat
        eros. Sed non nibh mauris. Praesent quam purus, sollicitudin in feugiat
        sed, cursus eget tortor.
      </Text>
      <Text style={styles.text}>
        Nullam ornare pulvinar fermentum. Aliquam sagittis nulla id lectus
        luctus, sed bibendum dolor varius. Morbi congue egestas eros a aliquet.
        Donec scelerisque pellentesque lorem, non consectetur turpis ornare sit
        amet. Proin nulla metus, condimentum eget mi at, mattis tristique est.
        Suspendisse potenti. Curabitur lacus odio, dignissim eu maximus ut,
        euismod at urna. Donec eu eros eu sem semper finibus. Etiam nec
        vestibulum tortor.
      </Text>
      <Image
        style={styles.image}
        src="http://blog.oxforddictionaries.com/wp-content/uploads/mountain-names.jpg"
      />
      <Text style={styles.text}>
        Nam neque sem, pellentesque ut pulvinar quis, condimentum sit amet arcu.
        Phasellus mollis gravida leo, vel accumsan metus dictum ut. In non risus
        vel dolor scelerisque congue vel ac tellus. Duis quis purus ultricies,
        gravida diam id, sodales lacus. Curabitur laoreet finibus tellus et
        tincidunt. Nulla cursus erat sem, sed faucibus felis luctus quis. Mauris
        feugiat pellentesque arcu vitae lobortis. Nulla velit libero, mattis et
        orci pretium, semper tempor arcu. In hac habitasse platea dictumst. Duis
        lacinia tellus eget viverra sodales. Donec vehicula mauris vitae lacus
        laoreet pharetra.
      </Text>
      <Text style={styles.text}>
        Phasellus ac congue enim, et tristique diam. Sed vestibulum at nisl sed
        interdum. Sed consectetur mi dui, sed ornare elit scelerisque quis. Sed
        convallis augue feugiat tortor aliquam hendrerit. Duis pretium
        vestibulum ex. Mauris volutpat scelerisque libero eget semper.
        Pellentesque gravida tortor eu elit aliquet semper. Aenean non fermentum
        nibh. Vivamus ac nisi nisi. Ut posuere, dui vel mattis varius, ipsum ex
        tristique nisi, ut varius leo neque nec odio.
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/output.pdf`);
