import { pdf } from '../index';

export const renderToString = element => {
  const instance = pdf(element);
  return instance.toString();
};

export default renderToString;
