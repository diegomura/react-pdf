<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/pdfkit

A JavaScript PDF generation library for Node and the browser.

## Acknowledges

This project is a fork of [pdfkit](https://github.com/foliojs/pdfkit) by @devongovett and continued under the scope of this project since it has react-pdf specific features. Any recongnition should go to him and the original project mantainers.

## Description

PDFKit is a PDF document generation library for Node and the browser that makes creating complex, multi-page, printable documents easy.
It's written in CoffeeScript, but you can choose to use the API in plain 'ol JavaScript if you like. The API embraces
chainability, and includes both low level functions as well as abstractions for higher level functionality. The PDFKit API
is designed to be simple, so generating complex documents is often as simple as a few function calls.

Check out some of the [documentation and examples](http://pdfkit.org/docs/getting_started.html) to see for yourself!
You can also read the guide as a [self-generated PDF](http://pdfkit.org/docs/guide.pdf) with example output displayed inline.
If you'd like to see how it was generated, check out the README in the [docs](https://github.com/devongovett/pdfkit/tree/master/docs)
folder.

You can also try out an interactive in-browser demo of PDFKit [here](http://pdfkit.org/demo/browser.html).

## Installation

Installation uses the [npm](http://npmjs.org/) package manager. Just type the following command after installing npm.

    npm install @react-pdf/pdfkit

## Features

- Vector graphics
  - HTML5 canvas-like API
  - Path operations
  - SVG path parser for easy path creation
  - Transformations
  - Linear and radial gradients
- Text
  - Line wrapping
  - Text alignments
  - Bulleted lists
- Font embedding
  - Supports TrueType (.ttf), OpenType (.otf), WOFF, WOFF2, TrueType Collections (.ttc), and Datafork TrueType (.dfont) fonts
  - Font subsetting
  - See [fontkit](http://github.com/devongovett/fontkit) for more details on advanced glyph layout support.
- Image embedding
  - Supports JPEG and PNG files (including indexed PNGs, and PNGs with transparency)
- Annotations
  - Links
  - Notes
  - Highlights
  - Underlines
  - etc.

## Coming soon!

- Patterns fills
- Outlines
- PDF Security
- Higher level APIs for creating tables and laying out content
- More performance optimizations
- Even more awesomeness, perhaps written by you! Please fork this repository and send me pull requests.

## Documentation

For complete API documentation and more examples, see the [PDFKit website](http://pdfkit.org/).

## License

PDFKit is available under the MIT license.
