<div align="center">
  <big>
    <h1>react-pdf</h1>
  </big>
</div>


> React renderer for creating PDF files on the browser, mobile and server

**This project is still in development, so please do not use `react-pdf` on production _yet_. First release soon!**

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
```jsx
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
				<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/page-layout/thumb.png">
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/examples/page-layout/">Page Layout</a>
			</td>  
			<td align="center" valign="top">
				<img width="150" height="150" src="https://github.com/diegomura/react-pdf/blob/master/examples/fractals/thumb.png">
				<br>
				<a href="https://github.com/diegomura/react-pdf/tree/master/examples/fractals/">Fractals</a>
			</td>  
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
		</tr>
	</tbody>
</table>

To run an example for yourself, run `yarn example -- <example-name>` locally.

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](blob/master/CONTRIBUTING.md).
<a href="https://github.com/diegomura/react-pdf/graphs/contributors"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
