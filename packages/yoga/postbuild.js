const fs = require('fs');
const path = require('path');

const yogaLayoutPath = path.resolve('./yoga-layout');
const nbindPath = path.join(yogaLayoutPath, 'build/Release/nbind.js');

const nbindBuffer = fs.readFileSync(nbindPath);
const it = nbindBuffer.indexOf(Buffer.from(' 134217728'));

if (it === -1) process.exit(0);

/* Patch 128 MB to 1 GB */
nbindBuffer.write('1073741824', it);
fs.writeFileSync(nbindPath, nbindBuffer);
