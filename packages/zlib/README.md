<p align="center">
  <img src="https://user-images.githubusercontent.com/5600341/27505816-c8bc37aa-587f-11e7-9a86-08a2d081a8b9.png" height="280px">
</p>

# @react-pdf/zlib

Emulates Node's zlib module for the browser.

This package is a port of [browserify-zlib](https://github.com/browserify/browserify-zlib), but containing **just** the deflate  bindings needed for react-pdf. It also uses the last [pako](https://github.com/nodeca/pako) version.

## `zlib.deflateSync`

Compresses a chunk of data with Deflate.

```
zlib.deflateSync(buffer)
```

**Return Value:** It returns the chunk of data with deflate.

## `zlib.createDeflate`

Creates and returns a new Deflate object.

```
zlib.createDeflate()
```

**Return Value:** Delfate instance (Transform stream)
