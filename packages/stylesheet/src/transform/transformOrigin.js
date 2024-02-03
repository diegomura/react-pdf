import castFloat from '../utils/castFloat';
import offsetKeyword from '../utils/offsetKeyword';

const transformTransformOrigin = (value) =>
  offsetKeyword(value) || castFloat(value);

export default transformTransformOrigin;
