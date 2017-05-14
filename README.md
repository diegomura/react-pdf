<big><h1 align="center">react-pdf</h1></big>

> React renderer for creating PDF files

> This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental. You can check out the slides of the talk [here](https://diegomura.github.io/think-react-slides/)

> Now using the new React Fiber API!

## How it works
ReactPDF mounter is called ReactPDF and has a render method that recieves a React Element and a path where the PDF file will be generated.

```jsx
import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Document, Page, View, Text, StyleSheet } from 'react-pdf';
import lorem from './lorem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  block: {
    maxHeight: 200,
    maxWidth: 400,
    flex: 1,
  },
});

const doc = (
  <Document>
    <Page size="A4">
      <View style={styles.container}>
        <Text>
          Text
        </Text>
        <View style={styles.block}>
          <Text>
            {lorem}
          </Text>
        </View>
      </View>
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
