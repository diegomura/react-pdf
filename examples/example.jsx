var React = require('react');
var ReactPDF = require('../');

let doc =
  <document>
    <page margin={50}>
      <text>
        This is my first text!!
      </text>
    </page>
    <page margin={50}>
      <text align="center">
        This is my second text!!
      </text>

      <circle x={50} y={100} radius={50}/>
    </page>
  </document>

ReactPDF.render(doc, 'example.pdf')
