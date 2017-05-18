<big><h1 align="center">react-pdf</h1></big>

> React renderer for creating PDF files on the browser, mobile and server

## How it works

```jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from 'react-pdf';

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

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
);
```

### Render in DOM
```jsx
import React from 'react';
import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <MyDocument />
  <div>
);

ReactDOM.render(<App />, document.getElementById('root'));
```

### Save in a file
```jsx
import ReactPDF from 'react-pdf-node';

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
		</tr>
	</tbody>
</table>

## Comments
This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental. You can check out the slides of the talk [here](https://diegomura.github.io/think-react-slides/)

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
