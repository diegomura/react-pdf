const request = require('request');

export const fetchFont = src =>
  new Promise((resolve, reject) => {
    request(
      {
        url: src,
        method: 'GET',
        encoding: null,
      },
      (error, response, body) => {
        if (error) {
          return reject(error);
        }

        return resolve(body);
      },
    );
  });
