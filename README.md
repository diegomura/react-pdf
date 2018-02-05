<p align="center"><img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="400px"></p>

React renderer for creating PDF files on the browser, mobile and server

**This project is still in development, so please do not use `react-pdf` on production _yet_. First release soon!**

[![npm](https://img.shields.io/npm/v/@react-pdf/core.svg)](https://www.npmjs.com/package/@react-pdf/core)
[![Travis](https://img.shields.io/travis/diegomura/react-pdf.svg)](https://travis-ci.org/diegomura/react-pdf)
[![license](https://img.shields.io/github/license/diegomura/react-pdf.svg)](https://github.com/diegomura/react-pdf/blob/master/LICENSE)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## How to install
```sh
# You should always install the core package
yarn add @react-pdf/core

# And also the bindings that you need
yarn add @react-pdf/node
yarn add @react-pdf/dom
yarn add @react-pdf/mobile
```

## How it works

```jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core';

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

### Render in DOM

**Note:** you need add `transform-loader` like [in example](/examples/dom-bindings/webpack.config.js#L16)

```jsx
// to fix "regeneratorRuntime is not defined", which causes by "@react-pdf/*"
// also you can use "babel-polyfill"
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <MyDocument />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### Save in a file
```jsx
import ReactPDF from '@react-pdf/node';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
```

### Render in mobile
> Coming soon

## Examples
For each example, try opening `output.pdf` to see the result.

<table>
	<tbody>
		<tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/text/thumb.png">
        <br>
        <a href="https://github.com/diegomura/react-pdf/tree/master/examples/text/">Text</a>
      </td>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/images/thumb.png">
        <br>
        <a href="https://github.com/diegomura/react-pdf/tree/master/examples/images/">Images</a>
      </td>
			<td align="center" valign="top">
				<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/resume/thumb.png">
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/examples/resume/">Resume</a>
			</td>
			<td align="center" valign="top">
				<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/fractals/thumb.png">
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/examples/fractals/">Fractals</a>
			</td>
			<td align="center" valign="top">
				<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/knobs/thumb.png">
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/examples/knobs/">Knobs</a>
			</td>
		</tr>
	</tbody>
</table>
<table>
	<tbody>
		<tr>
      <td align="center" valign="top">
        <img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/pageWrap/thumb.png">
        <br>
        <a href="https://github.com/diegomura/react-pdf/tree/master/examples/pageWrap/">Page wrap</a>
      </td>  
		</tr>
	</tbody>
</table>

To run the examples, first clone the project and install the dependencies:
```sh
git clone https://github.com/diegomura/react-pdf.git
cd react-pdf
yarn install
```
Then, run `yarn example -- <example-name>`
```sh
yarn example -- fractals
```

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="https://github.com/diegomura/react-pdf/graphs/contributors"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>

## Sponsors

Thank you to all our sponsors! [[Become a sponsors](https://opencollective.com/react-pdf#sponsors)]

<a href="https://opencollective.com/react-pdf#sponsors" target="_blank"><img src="https://opencollective.com/react-pdf/sponsors.svg?width=890"></a>

## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
