import fs from 'fs';
import { basename, extname } from 'path';
import { parse } from '../afm';

const generateJsonFiles = () => {
  const files = fs.readdirSync(__dirname);
  const afmFiles = files.filter(file => file.match(/.afm$/));

  afmFiles.forEach(file => {
    const fontName = basename(file).replace(extname(file), '');
    const data = fs.readFileSync(__dirname + '/' + file, 'utf8');
    const parsed = parse(data);

    fs.writeFileSync(
      __dirname + '/' + fontName + '.json',
      JSON.stringify(parsed)
    );
  });
};

const compressJsonFiles = () => {
  const attributes = [];
  const glyphWidths = {};
  const kernPairs = {};

  const files = fs.readdirSync(__dirname);
  const jsonFiles = files.filter(file => file.match(/.json$/));

  jsonFiles.forEach((file, index) => {
    const data = fs.readFileSync(__dirname + '/' + file, 'utf8');
    const content = JSON.parse(data);

    attributes.push(content.attributes);

    Object.keys(content.glyphWidths).forEach(key => {
      if (!glyphWidths[key]) glyphWidths[key] = [];
      glyphWidths[key][index] = content.glyphWidths[key];
    });

    Object.keys(content.kernPairs).forEach(key => {
      if (!kernPairs[key]) kernPairs[key] = [];
      kernPairs[key][index] = content.kernPairs[key];
    });
  });

  // TODO: Sort fonts to prevent null pointers at the end
  Object.keys(glyphWidths).forEach(key => {
    glyphWidths[key] = glyphWidths[key].filter(Boolean);
  });

  Object.keys(kernPairs).forEach(key => {
    kernPairs[key] = kernPairs[key].filter(Boolean);
  });

  const parsed = { attributes, glyphWidths, kernPairs };

  fs.writeFileSync(__dirname + '/index.json', JSON.stringify(parsed));
};

generateJsonFiles();
compressJsonFiles();
