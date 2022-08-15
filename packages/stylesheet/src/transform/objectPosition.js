import castFloat from '../utils/castFloat';
import offsetKeyword from '../utils/offsetKeyword';

const transformObjectPosition = value =>
  offsetKeyword(value) || castFloat(value);

export default transformObjectPosition;
