var React = require('react');
var render = require('./');

console.log(
  render.render(
    React.createElement(
      'text',
      {
        offsetX: 100,
        offsetY: 100
      }
    ), 'test.pdf'
  )
);
