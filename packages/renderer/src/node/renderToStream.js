import { pdf } from '../index';

export const renderToStream = async element => {
  const instance = pdf(element);
  const buffer = await instance.toBuffer();
  return buffer;
};

export default renderToStream;
