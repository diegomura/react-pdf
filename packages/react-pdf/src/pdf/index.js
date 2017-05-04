/* global Blob */
import transformTree from './transformer';

const pdf = input => {
  const header = '%PDF-1.7\n';

  // Creates the footer of the PDF document
  function buildCrossReferenceTable(objects) {
    let offset = header.length - 1;

    const pointers = objects
      .map(object => {
        const pointer = `${('0000000000' + offset).slice(-10)} 00000 n`;
        offset += object.value.length;
        return pointer;
      })
      .join('\n');

    return 'xref\n' +
      `0 ${objects.length + 1}\n` +
      '0000000000 65535 f\n' +
      `${pointers}\n` +
      'trailer\n' +
      '<<\n' +
      `/Size ${objects.length}\n` +
      '/Root 1 0 R\n' +
      '>>' +
      'startxref\n' +
      `${offset}\n` +
      '%%EOF';
  }

  function buildDocument(input) {
    // Transforms the nodes trees into a more suitable data structure
    const objects = transformTree(input);

    // Builds the body and footer of the document
    const body = objects.map(object => object.value).join('\n\n');
    const footer = buildCrossReferenceTable(objects);

    return header + body + footer;
  }

  function toBlob() {
    return new Blob([buildDocument(input)], {
      type: 'application/pdf',
    });
  }

  function toBuffer() {
    return new Buffer(buildDocument(input));
  }

  return {
    toBuffer,
    toBlob,
  };
};

export default pdf;
