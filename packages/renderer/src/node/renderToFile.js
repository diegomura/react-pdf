import fs from 'fs';

import { pdf } from '../index';

export const renderToFile = async (element, filePath, callback) => {
  const instance = pdf(element);
  const output = await instance.toBuffer();
  const stream = fs.createWriteStream(filePath);

  output.pipe(stream);

  return new Promise((resolve, reject) => {
    stream.on('finish', () => {
      if (callback) callback(output, filePath);
      resolve(output);
    });
    stream.on('error', reject);
  });
};

export default renderToFile;
