import fs from 'fs';
import url from 'url';
import { basename, extname } from 'path';
// This file is ran directly with Node - needs to have .js extension
// eslint-disable-next-line import/extensions
import { parse } from '../afm.js';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

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

// Order is designed to produce the smaller size possible
const COMPRESS_ORDER = ['Helvetica', 'Times', 'Courier'];

const readJson = file => {
  const data = fs.readFileSync(__dirname + '/' + file, 'utf8');
  return JSON.parse(data);
};

const sortFiles = (a, b) => {
  const indexA = COMPRESS_ORDER.indexOf(a.attributes.FamilyName);
  const indexB = COMPRESS_ORDER.indexOf(b.attributes.FamilyName);

  return indexA - indexB;
};

const fillWithZeros = array => {
  const res = [];

  for (let i = 0; i < array.length; i++) {
    res[i] = array[i] || 0;
  }

  return res;
};

const compressJsonFiles = () => {
  const attributes = [];
  const glyphWidths = {};
  const kernPairs = {};

  const files = fs.readdirSync(__dirname);
  const jsonFiles = files.filter(file => file.match(/.json$/));
  const filesContent = jsonFiles.map(readJson);
  const sortedFiles = filesContent.sort(sortFiles);

  sortedFiles.forEach((content, index) => {
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

  // Cheaper to store nulls as 0s
  Object.keys(glyphWidths).forEach(key => {
    glyphWidths[key] = fillWithZeros(glyphWidths[key]);
  });

  Object.keys(kernPairs).forEach(key => {
    kernPairs[key] = fillWithZeros(kernPairs[key]);
  });

  const parsed = { attributes, glyphWidths, kernPairs };

  fs.writeFileSync(__dirname + '/index.json', JSON.stringify(parsed));
};

generateJsonFiles();
compressJsonFiles();
