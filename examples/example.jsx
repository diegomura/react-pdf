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
