import r from 'restructure';
import fs from 'fs';

var fontkit = {};
export default fontkit;

fontkit.logErrors = false;

let formats = [];
fontkit.registerFormat = function(format) {
  formats.push(format);
};

fontkit.openSync = function(filename, postscriptName) {
  if (BROWSER) {
    throw new Error('fontkit.openSync unavailable for browser build');
  }
  let buffer = fs.readFileSync(filename);
  return fontkit.create(buffer, postscriptName);
};

fontkit.open = function(filename, postscriptName, callback) {
  if (BROWSER) {
    throw new Error('fontkit.open unavailable for browser build');
  }

  if (typeof postscriptName === 'function') {
    callback = postscriptName;
    postscriptName = null;
  }

  fs.readFile(filename, function(err, buffer) {
    if (err) { return callback(err); }

    try {
      var font = fontkit.create(buffer, postscriptName);
    } catch (e) {
      return callback(e);
    }

    return callback(null, font);
  });

  return;
};

fontkit.create = function(buffer, postscriptName) {
  for (let i = 0; i < formats.length; i++) {
    let format = formats[i];
    if (format.probe(buffer)) {
      let font = new format(new r.DecodeStream(buffer));
      if (postscriptName) {
        return font.getFont(postscriptName);
      }

      return font;
    }
  }

  throw new Error('Unknown font format');
};

fontkit.defaultLanguage = 'en';
fontkit.setDefaultLanguage = function(lang = 'en') {
  fontkit.defaultLanguage = lang;
};
