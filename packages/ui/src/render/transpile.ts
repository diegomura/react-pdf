import { transform } from 'sucrase';

export const transpile = (source: string): string =>
  transform(source, { transforms: ['jsx', 'imports'], production: true }).code;
