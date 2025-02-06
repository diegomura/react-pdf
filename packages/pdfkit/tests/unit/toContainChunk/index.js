import { diff } from 'jest-diff';

const buildMessage = (utils, data, chunk, headIndex) => {
  let message;
  if (headIndex !== -1) {
    const received = data.slice(headIndex, headIndex + chunk.length);
    const difference = diff(chunk, received);
    message = `Difference:\n\n${difference}`;
  } else {
    message =
      'Expected data to contain chunk:\n' + `  ${utils.printExpected(chunk)}\n`;
  }
  return message;
};

const passMessage = (utils, data, chunk, headIndex) => () => {
  return (
    utils.matcherHint('.not.toContainChunk', 'data', 'chunk') +
    '\n\n' +
    buildMessage(utils, data, chunk, headIndex)
  );
};

const failMessage = (utils, data, chunk, headIndex) => () => {
  return (
    utils.matcherHint('.toContainChunk', 'data', 'chunk') +
    '\n\n' +
    buildMessage(utils, data, chunk, headIndex)
  );
};

export default {
  toContainChunk(data, chunk) {
    const headIndex = data.indexOf(chunk[0]);
    let pass = headIndex !== -1;
    if (pass) {
      for (let i = 1; i < chunk.length; ++i) {
        if (chunk[i] instanceof RegExp) {
          pass = pass && chunk[i].test(data[headIndex + i]);
        } else {
          pass = pass && this.equals(data[headIndex + i], chunk[i]);
        }
      }
    }

    if (pass) {
      return {
        pass: true,
        message: passMessage(this.utils, data, chunk, headIndex)
      };
    }

    return {
      pass: false,
      message: failMessage(this.utils, data, chunk, headIndex)
    };
  }
};
