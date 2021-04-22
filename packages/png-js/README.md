<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/png-js

A PNG decoder in JS for the canvas element or Node.js.

## Acknowledges

This project is a fork of [png.js](https://github.com/foliojs/png.js) by @devongovett and continued under the scope of this project since it has react-pdf specific features. Any recongnition should go to him and the original project mantainers.

## About this fork

> Updated to 977b857a11676c1e720e79ed8d9178a005a9abd6

- Build node and browser specific bundles
- Uses rollup for build
## Browser Usage

Simply include png.js and zlib.js on your HTML page, create a canvas element, and call PNG.load to load an image.

    <canvas></canvas>
    <script src="zlib.js"></script>
    <script src="png.js"></script>
    <script>
        var canvas = document.getElementsByTagName('canvas')[0];
        PNG.load('some.png', canvas);
    </script>

The source code for the browser version resides in `png.js` and also supports loading and displaying animated PNGs.

## Node.js Usage

Install the module using npm

    sudo npm install png-js

Require the module and decode a PNG

    var PNG = require('png-js');
    PNG.decode('some.png', function(pixels) {
        // pixels is a 1d array (in rgba order) of decoded pixel data
    });

You can also call `PNG.load` if you want to load the PNG (but not decode the pixels) synchronously.  If you already
have the PNG data in a buffer, simply use `new PNG(buffer)`.  In both of these cases, you need to call `png.decode`
yourself which passes your callback the decoded pixels as a buffer.  If you already have a buffer you want the pixels
copied to, call `copyToImageData` with your buffer and the decoded pixels as returned from `decodePixels`.
