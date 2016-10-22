<big><h1 align="center">react-pdf</h1></big>

> React renderer for creating PDF files

> This project was created to show some concepts on a [talk](https://www.meetup.com/ReactJS-Uruguay/events/234567399/), and it's purely experimental.

## How it works
ReactPDF mounter is called ReactPDF and has a render method that recieves a React Element and a path where the PDF file will be generated.

```jsx
import React from 'react';
import ReactPDF from '../';
import lorem from './lorem';

let doc =
  <document>
    <page margin={50}>
      <text height={200} align="center" underline>
        ~ Lorem ipsum ~
      </text>
      <text columns={3} columnGap={15} align='justify'>
        {lorem}
      </text>
    </page>
  </document>

ReactPDF.render(doc, './examples/example.pdf')
```

[Check out the result](https://github.com/diegomura/react-pdf/blob/master/examples/example.pdf)

## Demo

```bash
git clone https://github.com/diegomura/react-pdf
cd react-pdf
npm install

# run example script
npm run example
```

Check out for the `example.pdf` file created on the root of the project

## Thanks

* [@iamdustan](https://github.com/iamdustan) for the explanation of how to build a renderer
