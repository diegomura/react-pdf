import fs from 'fs';
import { Buffer } from 'buffer';

import { pdf } from '../index';

export const renderToStream = async element => {
  const instance = pdf(element);
  const stream = await instance.toBuffer();
  return stream;
};

export const renderToFile = async (element, filePath, callback) => {
  const output = await renderToStream(element);
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

export const renderToBuffer = element =>
  renderToStream(element).then(
    stream =>
      new Promise((resolve, reject) => {
        const chunks = [];
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', error => reject(error));
      }),
  );

export const renderToString = element => {
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      '`renderToString` is deprecated and will be removed in next major release, use `renderToBuffer` instead',
    );
  }

  return renderToBuffer(element).then(buffer => buffer.toString());
};
