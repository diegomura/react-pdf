<div align="center">
  <big>
    <h1>react-pdf</h1>
    <a href="#backers"><img src="https://opencollective.com/react-pdf/backers/badge.svg" alt="Backers on Open Collective" /></a>
    <a href="#sponsors"><img src="https://opencollective.com/react-pdf/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  </big>
</div>


> React renderer for creating PDF files on the browser, mobile and server

**This project is still in development, so please do not use `react-pdf` on production _yet_. First release soon!**

## How it works

```jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/core';

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
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
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
		</tr>
	</tbody>
</table>

To run an example for yourself, run `yarn example -- <example-name>` locally.

## Comments
This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental. You can check out the slides of the talk [here](https://diegomura.github.io/think-react-slides/)

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](blob/master/CONTRIBUTING.md).
<a href="graphs/contributors"><img src="https://opencollective.com/react-pdf/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! [[Become a backer](https://opencollective.com/react-pdf#backer)]

<a href="https://opencollective.com/react-pdf#backers" target="_blank"><img src="https://opencollective.com/react-pdf/backers.svg?width=890"></a>


## Sponsors

Thank you to all our sponsors! (please ask your company to also support this open source project by [becoming a sponsor](https://opencollective.com/react-pdf#sponsor))

<a href="https://opencollective.com/react-pdf/sponsor/0/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/1/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/2/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/3/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/4/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/5/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/6/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/7/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/8/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/react-pdf/sponsor/9/website" target="_blank"><img src="https://opencollective.com/react-pdf/sponsor/9/avatar.svg"></a>



## License

MIT © [Diego Muracciole](http://github.com/diegomura)
