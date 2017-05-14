/* global Blob */
const pdf = input => {
  function parse(input) {
    return input.render();
  }

  function toBlob() {
    return new Blob([parse(input)], {
      type: 'application/pdf',
    });
  }

  function toBuffer() {
    return new Buffer(parse(input));
  }

  return {
    toBuffer,
    toBlob,
  };
};

export default pdf;
