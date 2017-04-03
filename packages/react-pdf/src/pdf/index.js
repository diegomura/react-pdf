/* global Blob */
import toPairsIn from 'lodash/fp/toPairsIn';

// We only support the latest version
const VERSION = '1.7';

const escapableRe = /[\n\r\t\b\f\(\)\\]/g;
const escapable = {
  '\n': '\\n',
  '\r': '\\r',
  '\t': '\\t',
  '\b': '\\b',
  '\f': '\\f',
  '\\': '\\\\',
  '(': '\\(',
  ')': '\\)',
};

// Convert little endian UTF-16 to big endian
function swapBytes(buff) {
  const length = buff.length;
  if (length & 0x01) {
    throw new Error('Buffer length must be even');
  } else {
    for (let i = 0, end = length - 1; i < end; i += 2) {
      const a = buff[i];
      buff[i] = buff[i + 1];
      buff[i + 1] = a;
    }
  }

  return buff;
}

function stringEncodeUTF16(object) {
  let isUnicode = false;

  // Escape characters as required by the spec
  let string = object.replace(escapableRe, match => escapable[match]);

  for (let i = 0, end = string.length; i < end; i++) {
    if (string.charCodeAt(i) > 0x7f) {
      isUnicode = true;
      break;
    }
  }

  // If so, encode it as big endian UTF-16
  if (isUnicode) {
    string = swapBytes(new Buffer('\ufeff' + string, 'utf16le')).toString(
      'binary'
    );
  }

  return '(' + string + ')';
}

// Convert JS primitves to PDF;
// Token from https://github.com/devongovett/pdfkit/blob/63d6e5020f0b3efa3005286476a29905f8d5e843/lib/object.coffee
function convert(object) {
  if (typeof object === 'function') {
    return object();
  } else if (typeof object === 'string') {
    // String literals are converted to the PDF name type
    if (!object.startsWith('%PDF')) return `/${object}`;
    return object;
  }

  // String objects are converted to PDF strings (UTF-16)
  if (object instanceof String) {
    return stringEncodeUTF16(object);
  }

  if ({}.toString.call(object) === '[object Object]') {
    return [
      '<<',
      ...toPairsIn(object).map(([key, val]) => `/${key} ${convert(val)}`),
      '>>',
    ].join('\n');
  }

  if (Array.isArray(object)) {
    return `[${object.map(convert).join(' ')}]`;
  }

  if (typeof object === 'number') {
    if (object > -1e21 && object < 1e21) return Math.round(object * 1e6) / 1e6;
    throw new Error(`unsupported number: ${object}`);
  }

  return String(object);
}

function writeOutput(header, body, trailer) {
  return [header, body, trailer].join('\n');
}

function pdf() {
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
    let curPage;

    function getValueOf(instance) {
      return instance.valueOf();
    }

    function loopItem(item) {
      input.children.forEach(child => {
        const value = getValueOf(child);

        if (value.Type === 'Page') {
          pages.push(value);
          curPage = pageCount++;
        }

        traverseTree(child);
      });
    }

    loopItem(input);

    return {
      pages,
      pageCount,
    };
  }

  function getCrossReferenceTable(catalog) {
    return `
xref
0 ${output.length + 1}
0000000000 65535 f
${output
      .map(
        (item, index) => `${('0000000000' + offsets[index]).slice(-10)} 00000 n`
      )
      .join('\n')}

trailer
${convert({ Size: output.length, Root: () => getRef(catalog) })}
startxref
${offsets[offsets.length - 1]}
%%EOF
`;
  }

  function buildDocument(input) {
    // Reset output
    reset();

    const header = `%PDF-${VERSION}`;

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
        })
      );
    });

    const body = output
      .map((input, index) => createPDFObject(convert(input), index))
      .join('\n\n');

    const footer = getCrossReferenceTable(refs.catelog);

    return writeOutput(header, body, footer);
  }

  function toArrayBuffer(input) {
    return buildDocument(input);
  }

  function toBlob(input) {
    return new Blob([toArrayBuffer(input)], {
      type: 'application/pdf',
    });
  }

  function toBuffer(input) {
    return new Buffer(toArrayBuffer(input));
  }

  return {
    toBuffer,
    toBlob,
  };
}

export default pdf;
