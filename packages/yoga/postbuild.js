const fs = require('fs');
const path = require('path');

const srcPath = path.resolve('./src');
const nbindPath = path.join(srcPath, 'build/Release/nbind.js');

let nbindBuffer = fs.readFileSync(nbindPath);

function replace(buffer, target, dst) {
  const it = buffer.indexOf(Buffer.from(target));

  if (it !== -1) {
    const start = buffer.slice(0, it);
    const chunk = Buffer.from(dst);
    const end = buffer.slice(it + target.length);

    return Buffer.concat([start, chunk, end]);
  }

  return buffer;
}

// Increase memory heap from 128 MB to 1 GB
nbindBuffer = replace(nbindBuffer, '134217728', '1073741824');

// // Fixes yoga nbind issue
// // https://github.com/vadimdemedes/yoga-layout-prebuilt/issues/2
nbindBuffer = replace(
  nbindBuffer,
  '_a = _typeModule(_typeModule),',
  'var _a = _typeModule(_typeModule);',
);

fs.writeFileSync(nbindPath, nbindBuffer);
