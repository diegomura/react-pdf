<big><h1 align="center">react-pdf</h1></big>

> React renderer for creating PDF files

> This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental. You can check out the slides of the talk [here](https://diegomura.github.io/think-react-slides/)

> Now using the new React Fiber API!

## How it works
ReactPDF mounter is called ReactPDF and has a render method that recieves a React Element and a path where the PDF file will be generated.

```jsx
import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Page, Text, StyleSheet, Document } from 'react-pdf';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'FLEX_DIRECTION_COLUMN',
  },
  lorem: {
    color: 'red'
  },
  sed: {
    color: '#0000FF'
  }
});

const doc = (
  <Document>
    <Page size="A4" style={styles.container}>
      <Text style={styles.lorem}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit
      </Text>
      <Text style={styles.sed}>
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
      </Text>
    </Page>
  </Document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
```

[Check out the result](https://github.com/diegomura/react-pdf/blob/master/examples/simple/example.pdf)

## Demo

```bash
# Clone the repo
git clone https://github.com/diegomura/react-pdf
cd react-pdf

# Install dependencies and set symlinks for monorepo
lerna bootstrap

# Run example script
yarn example:simple
  # or
npm run example:simple

# Open example doc
open examples/simple/example.pdf
```

Check out for the `example.pdf` file created on the root of the project

## License

MIT © [Diego Muracciole](http://github.com/diegomura)
