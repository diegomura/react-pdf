var React = require('react');
var render = require('./');

render.render(
  React.createElement(
    'document', {}, [
      React.createElement(
        'page', {margin: 50},
        [
          React.createElement(
            'text', {
              x: 100,
              y: 100,
              align: 'center',
            },
            'This is my first text!!'
          )
        ]
      ),
      React.createElement(
        'page', {},
        [
          React.createElement(
            'text', {
              x: 100,
              y: 100,
              align: 'center',
            },
            'This is my second text!!'
          )
        ]
      )
    ]
  ), 'test.pdf'
)
