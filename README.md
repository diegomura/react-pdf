<big><h1 align="center">react-pdf</h1></big>

> React renderer for creating PDF files

> This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental. You can check out the slides of the talk [here](https://diegomura.github.io/think-react-slides/)

> Now using the new React Fiber API!

## How it works
ReactPDF mounter is called ReactPDF and has a render method that recieves a React Element and a path where the PDF file will be generated.

```jsx
import React from 'react';
import ReactPDF from '../';
import lorem from './lorem';

let doc =
  <document title="Lorem Ipsum" author="@diegomura" otherData="Something else">
    <page margin={50}>
      <image src="examples/images/react.png" x={200} y={300} width={200} />
      <text align="center" underline>
        ~ Lorem ipsum ~
      </text>
      <text columns={3} columnGap={15} align='justify'>
        {lorem}
      </text>
    </page>
  </document>

ReactPDF.render(doc, './examples/example.pdf');
```

[Check out the result](https://github.com/diegomura/react-pdf/blob/master/examples/example.pdf)

## Demo

```bash
# Clone the repo
git clone https://github.com/diegomura/react-pdf
cd react-pdf

# Install dependencies
yarn install
  # or
npm install

# Run example script
yarn example
  # or
npm run example

# Open example doc
open examples/example.pdf
```

Check out for the `example.pdf` file created on the root of the project
