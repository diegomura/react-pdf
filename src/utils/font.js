require('isomorphic-fetch');
const Buffer = require('buffer/').Buffer;

export const fetchFont = src => {
  return fetch(src)
    .then(response => {
      if (response.buffer) {
        return response.buffer();
      }
      return response.arrayBuffer();
    })
    .then(arrayBuffer => Buffer.from(arrayBuffer));
};
