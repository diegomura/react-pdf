const fs = require('fs');

const bin = './bin';
const yogaSrc = './node_modules/yoga-layout';

const nodeVersion = process.version.match(/^v(\d+)/)[1];

const createFolder = dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);
};

const copyFile = (src, dst) => {
  fs.createReadStream(src).pipe(fs.createWriteStream(dst));
};

createFolder(bin);
copyFile(yogaSrc + '/sources/entry-common.js', bin + '/entry-common.js');
copyFile(yogaSrc + '/sources/YGEnums.js', bin + '/YGEnums.js');
copyFile(
  yogaSrc + '/build/Release/nbind.node',
  bin + '/' + nodeVersion + '/nbind.node'
);
