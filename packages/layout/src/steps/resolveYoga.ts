import { loadYoga } from '../yoga/index';
import { DocumentNode } from '../types';

const resolveYoga = async (root: DocumentNode) => {
  const yoga = await loadYoga();

  return Object.assign({}, root, { yoga });
};

export default resolveYoga;
