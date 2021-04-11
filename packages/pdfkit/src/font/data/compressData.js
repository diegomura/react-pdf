const fs = require('fs');
const LZString = require('lz-string');

var decimalToHex = function(d) {
  var hex = Number(d).toString(16);
  var padding = 2;

  while (hex.length < padding) {
    hex = `0` + hex;
  }

  return hex;
};

var arrayToString = function(acc, value) {
  return acc + decimalToHex(value);
};

fs.readdir(__dirname, function(err, files) {
  files.forEach(function(file) {
    if (file.match(/.afm$/)) {
      const fontName = file.substring(0, file.length - 4);
      const data = fs.readFileSync(__dirname + '/' + file, 'utf8');
      const compressed = LZString.compressToBase64(data);

      fs.writeFileSync(__dirname + '/' + fontName + '.b64.afm', compressed);
    }
  });
});
