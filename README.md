<big><h1 align="center">react-pdf</h1></big>

> React renderer for creating PDF files

> This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental. You can check out the slides of the talk [here](https://diegomura.github.io/think-react-slides/)

> Now using the new React Fiber API!

## How it works
ReactPDF mounter is called ReactPDF and has a render method that recieves a React Element and a path where the PDF file will be generated.

```jsx
import React from 'react';
import ReactPDF from 'react-pdf-node';
import { Page, Text, View, Document } from 'react-pdf';
import styles from './styles';
import palette from './palette';

const toggle = direction => direction === 'column' ? 'row' : 'column';

// Creates Fractal Component that renders it's step with a background color
const Fractal = ({ steps, direction = 'column' }) => {
  if (steps === 0) {
    return <View />;
  }

  const fractalStyle = {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette[steps],
  };

  return (
    <View style={styles[direction]}>
      <Fractal direction={toggle(direction)} steps={steps - 1} />
      <View style={fractalStyle}>
        <Text style={styles.text}>{steps}</Text>
      </View>
    </View>
  );
};

// Create Document Component
const doc = (
  <Document>
    <Page size="A4">
      <Fractal steps={18} />
    </Page>

    <Page orientation="landscape" size="A4">
      <Fractal steps={14} />
    </Page>

    <Page size="B4">
      <Fractal steps={10} />
    </Page>
  </Document>
);

// Renders document and save it
ReactPDF.render(doc, `${__dirname}/example.pdf`);
```
[Check out the result](https://github.com/diegomura/react-pdf/blob/master/examples/simple/example.pdf) or the rest of the example [here](https://github.com/diegomura/react-pdf/tree/master/examples/simple)


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
