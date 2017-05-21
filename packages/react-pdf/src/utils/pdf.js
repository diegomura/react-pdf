import { reduce } from 'lodash';

export const pdfDictionary = (object, inline) => {
  const newLine = inline ? '' : '\n';

  const dictionary = reduce(
    object,
    (acc, value, key) => {
      if (value && value !== '(undefined)' && value !== '(null)') {
        acc.push(`/${key} ${value}`);
      }

      return acc;
    },
    [],
  );

  return `<<${newLine}${dictionary.join(newLine)}${newLine}>>`;
};

export const pdfObject = (id, object) => {
  if (typeof object === 'object') {
    object = pdfDictionary(object);
  }

  return `${id} 0 obj\n${object}\nendobj`;
};

export const pdfStream = stream =>
  `${pdfDictionary({ Length: stream.length })}\nstream\n${stream}\nendstream`;

export const pdfDate = date => {
  const padZeros = value => `0${value}`.slice(-2);
  const year = date.getFullYear();
  const month = padZeros(date.getMonth());
  const day = padZeros(date.getDate());
  const hour = padZeros(date.getHours());
  const minutes = padZeros(date.getMinutes());
  const seconds = padZeros(date.getSeconds());

  return `D:${year}${month}${day}${hour}${minutes}${seconds}`;
};
