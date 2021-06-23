import fs from 'fs';
import { basename, extname } from 'path';
import { parse } from '../afm';

fs.readdir(__dirname, (err, files) => {
  files.forEach(file => {
    if (file.match(/.afm$/)) {
      const fontName = basename(file).replace(extname(file), '');
      const data = fs.readFileSync(__dirname + '/' + file, 'utf8');
      const parsed = parse(data);

      fs.writeFileSync(
        __dirname + '/' + fontName + '.json',
        JSON.stringify(parsed)
      );
    }
  });
});
