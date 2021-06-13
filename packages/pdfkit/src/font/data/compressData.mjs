import fs from 'fs';
import { dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';
import parse from '../parse.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

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
