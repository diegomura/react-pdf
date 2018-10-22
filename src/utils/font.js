import fetch from 'isomorphic-fetch';

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
