const nbind = require('nbind');

const nodeVersion = process.version.match(/^v(\d+)/)[1];
const ret = nbind.init(__dirname + '/' + nodeVersion);

module.exports = require('./entry-common')(ret.bind, ret.lib);
