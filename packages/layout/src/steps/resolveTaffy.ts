import { loadTaffy } from '../taffy/index';
import { DocumentNode } from '../types';

/**
 * Make sure the Taffy WASM module is loaded before layout starts.
 * Runs first in the layout pipeline.
 */
const resolveTaffy = async (root: DocumentNode): Promise<DocumentNode> => {
  await loadTaffy();

  return root;
};

export default resolveTaffy;
