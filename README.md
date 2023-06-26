<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
  <p align="center">React renderer for creating PDF files on the browser and server<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@nutshelllabs/renderer">
      <img src="https://img.shields.io/npm/v/@nutshelllabs/renderer.svg" />
    </a>
    <a href="https://travis-ci.org/nutshelllabs/react-pdf">
      <img src="https://img.shields.io/travis/nutshelllabs/react-pdf.svg" />
    </a>
    <a href="https://github.com/nutshelllabs/react-pdf/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/nutshelllabs/react-pdf.svg" />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" />
    </a>
    <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf.svg?type=shield"/></a>
  </p>
</p>

## Lost?

This package is a fork of [react-pdf](https://github.com/diegomura/react-pdf).  We're trying to implement some specific performance improvements for multiple renders.  I'd recommend you don't use this package.

### What's different between this fork and the main repo?

1. The top level `<Document />` component takes a `cacheId` prop.  If this prop is present, re-rendering subsequent documents with the same `cacheId` will _not_ re-run the `resolveAssets()` step.  This means if you conditionally render components with different fonts or something like that, on subsequent renders those fonts won't get picked up and your document might look weird.
2. Got rid of emojis.  For the type of documents we do, emojis aren't apart of the text we're rendering so removing emoji-detection saved us some time.
3. Optimized some object copy operations
4. Target node 16, and no browsers at all.  For our use case, we're just running this in a node process.  Targeting our platforms version of node, and removing browser support from babel has saved us some time.

## How to install
```sh
yarn add @nutshelllabs/renderer
```

## How it works

```jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@nutshelllabs/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
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
import { PDFViewer } from '@nutshelllabs/renderer';

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
import ReactPDF from '@nutshelllabs/renderer';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
```

## Contributors

This project exists thanks to all the people who contribute. Looking to contribute? Please check our [[contribute]](https://github.com/nutshelllabs/react-pdf/blob/master/.github/CONTRIBUTING.md) document for more details about how to setup a development environment and submitting code.

<a href="https://github.com/nutshelllabs/react-pdf/blob/master/.github/CONTRIBUTING.md"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>

## Sponsors

Thank you to all our sponsors! [[Become a sponsors](https://opencollective.com/react-pdf#sponsors)]

<a href="https://opencollective.com/react-pdf#sponsors" target="_blank"><img src="https://opencollective.com/react-pdf/sponsors.svg?width=890"></a>

## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>

## License

MIT © [Diego Muracciole](http://github.com/diegomura)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fdiegomura%2Freact-pdf?ref=badge_large)

---
![](https://img.shields.io/npm/dt/@nutshelllabs/renderer.svg?style=flat)
