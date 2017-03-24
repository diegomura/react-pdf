import React from 'react';
import ReactPDF from 'react-pdf';
import lorem from './lorem';

const doc = (
  <document author="@diegomura" otherData="Something else" title="Lorem Ipsum">
    <page margin={50}>
      <image
        src={`${__dirname}/images/react.png`}
        width={200}
        x={200}
        y={300}
      />
      <text align="center" underline>
        ~ Lorem ipsum ~
      </text>
      <text align="justify" columnGap={15} columns={3}>
        {lorem}
      </text>
    </page>
  </document>
);

ReactPDF.render(doc, `${__dirname}/example.pdf`);
