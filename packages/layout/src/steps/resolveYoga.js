import { loadYoga } from '../yoga/index';

const resolveYoga = (root) => {
  const yoga = loadYoga();

  return Object.assign({}, root, { yoga });
};

export default resolveYoga;
