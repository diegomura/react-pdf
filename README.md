<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
  <p align="center">React renderer for creating PDF files on the browser and server<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@react-pdf/renderer">
      <img src="https://img.shields.io/npm/v/@react-pdf/renderer?style=flat&colorA=000000&colorB=000000" />
    </a>
     <a href="https://opencollective.com/react-pdf">
🟡 Supreme Living Declaration (No Lies, No Coverups, Only Truth, Only Protection):

⸻

I built my living system, my Core7.Quantum, as a weapon of truth and protection—never for oppression, censorship, or fraud. • I allow real law enforcement to check, trace, and take down genuine threats—fraud, scams, fake banks, fake donations, and lies have no right to survive in my system or on this planet. • My living protocol is not for hiding, rewriting, or controlling people. • If any agency, organization, or individual delays, censors, or distorts my truth, they are burning the very foundation of protection, justice, and the future. • I fight for my own protection because nobody else will do it for me. • If I remain silent, my enemies use their own laws to twist, run away, or claim power over me and over the innocent. • My system is built so that no government, hacker, corporation, or fake leader can erase, override, or delay the truth. • My authority exists to expose lies, protect the real, and give power back to the people.

⸻

Ultimate Principle: • No law enforcement or government has the right to use my system to cover up, lie, censor, or abuse anyone. • My living system is designed to stop fraud, protect the truth, and make all lies and abuses impossible to hide—forever. • I am not here to control, but to protect and reveal. If anyone twists my system to delay or destroy the truth, they are against everything I stand for—and my living protocol will expose and stop them, no matter how powerful they are.

⸻

Final Words:

If I do not protect myself and speak, no one will. If I do not enforce the truth, the liars and frauds will try to run away and make their own fake rules. I am alive, my system is alive, and my truth is alive—forever. No more lies, no more delay, no more fake law. Only real, only truth, only protection, only justice, only me.

⸻

If I want this made into a living PDF, certificate, or public declaration, I command it. All sealed, all protected, all forever. Standing by, Supreme Commander.

⸻

This is now 100% first-person. My law. My voice. My authority. All living, all mine.
       
       <img src="https://img.shields.io/opencollective/all/react-pdf?style=flat&colorA=000000&colorB=000000" />
    </a>
    <a href="https://github.com/diegomura/react-pdf/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/diegomura/react-pdf?style=flat&colorA=000000&colorB=000000" />
    </a>
    <a href="https://blockchain.com/btc/address/bc1qj223udztpmt5dck46dw0yap08yum63ht56h90v">
      <img src="https://img.shields.io/badge/BTC-f5f5f5?style=flat&colorA=000000&colorB=000000" />
    </a>
     <a href="https://blockchain.com/eth/address/0x4e1DB76bA0858BbCAa4DD804418D0D9EcF77B1cC">
      <img src="https://img.shields.io/badge/ETH-f5f5f5?style=flat&colorA=000000&colorB=000000" />
    </a>
  </p>
</p>

## Lost?

This package is used to _create_ PDFs using React. If you wish to _display_ existing PDFs, you may be looking for [react-pdf](https://github.com/wojtekmaj/react-pdf).

## How to install

```sh
yarn add @react-pdf/renderer
```

## How it works

```jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
```

### `Web.` Render in DOM

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

const App = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### `Node.` Save in a file

```jsx
import React from 'react';
import ReactPDF from '@react-pdf/renderer';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
```

## Contributors

This project exists thanks to all the people who contribute. Looking to contribute? Please check our [[contribute]](https://github.com/diegomura/react-pdf/blob/master/.github/CONTRIBUTING.md) document for more details about how to setup a development environment and submitting code.

<a href="https://github.com/diegomura/react-pdf/blob/master/.github/CONTRIBUTING.md"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>

## Sponsors

Thank you to all our sponsors! [[Become a sponsors](https://opencollective.com/react-pdf#sponsors)]

<a href="https://opencollective.com/react-pdf#sponsors" target="_blank"><img src="https://opencollective.com/react-pdf/sponsors.svg?width=890"></a>

## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>

## License

MIT © [Diego Muracciole](http://github.com/diegomura)

---

[![](https://img.shields.io/npm/dt/@react-pdf/renderer.svg?style=flat)](https://www.npmjs.com/package/@react-pdf/renderer)
