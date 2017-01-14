import React from 'react';
import ReactPDF from '../';

let doc =
  <document title="Lorem Ipsum" author="@diegomura" otherData="Something else">
    <page margin={50}>
      <image src="examples/images/react.png" x={200} y={300} width={200} />
      <text align="center" underline>
        ~ Lorem ipsum ~
      </text>
      <text columns={3} columnGap={15} align='justify'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </text>
    </page>
  </document>

const renderer = ReactPDF.render(doc);

console.log(renderer.toJSON());
