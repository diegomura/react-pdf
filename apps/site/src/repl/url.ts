import { decompress } from './compress';
import { examples } from './examples';

export const DEFAULT_EXAMPLE = 'page-wrap';

export function initialCode(params: URLSearchParams): string {
  const encoded = params.get('code');
  if (encoded) {
    const decoded = decompress(encoded);
    if (decoded) return decoded;
  }

  const example = params.get('example');
  return examples[example ?? DEFAULT_EXAMPLE] ?? examples[DEFAULT_EXAMPLE];
}
