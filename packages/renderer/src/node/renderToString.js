import { Buffer } from 'buffer';
import { renderToStream } from './renderToStream';

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

export const renderToString = element =>
  renderToBuffer(element).then(buffer => buffer.toString());
