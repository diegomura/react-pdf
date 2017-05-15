import { map } from 'lodash';

export const pdfDictionary = (object, inline) => {
  const newLine = inline ? '' : '\n';
  const dictionary = map(object, (value, key) => `/${key} ${value}`);

  return `<<${newLine}${dictionary.join(newLine)}${newLine}>>`;
};

export const pdfObject = (id, object) => {
  if (typeof object === 'object') {
    object = pdfDictionary(object);
  }

  return `${id} 0 obj\n${object}\nendobj`;
};

export const pdfStream = (object, stream) =>
  `${pdfDictionary(object)}\nstream\n${stream}\nendstream`;
