<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
  <p align="center">React renderer for creating PDF files on the browser and server<p>
  <p align="center">
    <a href="https://www.npmjs.com/package/@react-pdf/renderer">
      <img src="https://img.shields.io/npm/v/@react-pdf/renderer.svg" />
    </a>
    <a href="https://travis-ci.org/diegomura/react-pdf">
      <img src="https://img.shields.io/travis/diegomura/react-pdf.svg" />
    </a>
    <a href="https://github.com/diegomura/react-pdf/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/diegomura/react-pdf.svg" />
    </a>
    <a href="https://spectrum.chat/react-pdf">
      <img src="https://withspectrum.github.io/badge/badge.svg" />
    </a>
    <a href="https://github.com/prettier/prettier">
      <img src="https://img.shields.io/badge/styled_with-prettier-ff69b4.svg" />
    </a>
  </p>
</p>

## How to install

```sh
yarn add @react-pdf/renderer
```

## How it works

```jsx
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
import ReactPDF from '@react-pdf/renderer';

ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
```

## Examples

For each example, try opening `output.pdf` to see the result.

<table>
	<tbody>
		<tr>
			<td align="center" valign="top">
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/text/">
					<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/packages/examples/src/text/thumb.png?raw=true">
				</a>
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/text/">Text</a>
			</td>
			<td align="center" valign="top">
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/resume/">
					<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/packages/examples/src/resume/thumb.png?raw=true">
				</a>
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/resume/">Resume</a>
			</td>
			<td align="center" valign="top">
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/fractals/">
					<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/packages/examples/src/fractals/thumb.png?raw=true">
				</a>
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/fractals/">Fractals</a>
			</td>
		</tr>
	</tbody>
</table>
<table>
	<tbody>
		<tr>
			<td align="center" valign="top">
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/knobs/">
					<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/packages/examples/src/knobs/thumb.png?raw=true">
				</a>
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/knobs/">Knobs</a>
			</td>
			<td align="center" valign="top">
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/pageWrap/">
					<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/packages/examples/src/pageWrap/thumb.png?raw=true">
				</a>
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/packages/examples/src/pageWrap/">Page wrap</a>
			</td>
		</tr>
	</tbody>
</table>

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

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Ftaylorudell%2Freact-pdf.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Ftaylorudell%2Freact-pdf?ref=badge_large)

---

![](https://img.shields.io/npm/dt/@react-pdf/renderer.svg?style=flat)
