/* global Blob */
import convert from './convert';

const writeOutput = (header, body, trailer) =>
  [header, body, trailer].join('\n');

const pdf = input => {
  let output = [];
  let offsets = [];

  // Reset for new compilation
  function reset() {
    output = [];
    offsets = [];
  }

  function createPDFObject(input, index) {
    const output = `${index + 1} 0 obj\n${input}\nendobj`;

    // Index should be +1 because first one file header is not taken in account.
    offsets[index + 1] = offsets[index] + output.length;

    return output;
  }

  // Return the reference for an pdf object
  function getRef(instance) {
    if (Array.isArray(instance)) {
      return `[${instance.map(getRef).join(' ')}]`;
    }

    return `${output.indexOf(instance) + 1} 0 R`;
  }

  function write(instance) {
    // Push the instance to the object list
    output.push(instance);

    // Return the pushed instance
    return output[output.length - 1];
  }

  function traverseTree(input) {
    const pages = [];
    let pageCount = 0;

    function getValueOf(instance) {
      return instance.valueOf();
    }

    function loopItem(item) {
      item.children.forEach(child => {
        const value = getValueOf(child);

        if (value.Type === 'Page') {
          pages.push(value);
          pageCount++;
        }

        loopItem(child);
      });
    }

    loopItem(input);

    return {
      pages,
      pageCount,
    };
  }

  function getCrossReferenceTable(catalog) {
    const objects = output
      .map(
        (item, index) =>
          `${('0000000000' + offsets[index]).slice(-10)} 00000 n`,
      )
      .join('\n');

    return 'xref\n' +
      `0 ${output.length + 1}` +
      '0000000000 65535 f\n' +
      `${objects}\n` +
      'trailer\n' +
      `${convert({ Size: output.length, Root: () => getRef(catalog) })}\n` +
      'startxref\n' +
      `${offsets[offsets.length - 1]}\n` +
      '%%EOF';
  }

  function buildDocument(input) {
    // Reset output
    reset();

    const header = '%PDF-1.7';

    offsets[0] = header.length;

    // Reusabele object references
    const refs = {
      catelog: undefined,
      pages: undefined,
      outlines: undefined,
      pageList: [],
    };

    refs.catelog = write({
      Type: 'Catalog',
      Pages: () => getRef(refs.pages),
      Outlines: () => getRef(refs.outlines),
    });

    refs.pages = write({
      Type: 'Pages',
      // TODO return pages
      Kids: () => getRef(refs.pageList),
      Count: () => refs.pageList.length,
    });

    refs.outlines = write({
      Type: 'Outlines',
      // TODO implement the same as pages
      Count: 0,
    });

    const {
      pages,
    } = traverseTree(input);

    pages.forEach(({ width, height }) => {
      refs.pageList.push(
        write({
          Type: 'Page',
          Parent: () => getRef(refs.pages),
          MediaBox: [0, 0, width, height],
        }),
      );
    });

    const body = output
      .map((input, index) => createPDFObject(convert(input), index))
      .join('\n\n');

    const footer = getCrossReferenceTable(refs.catelog);

    return writeOutput(header, body, footer);
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
