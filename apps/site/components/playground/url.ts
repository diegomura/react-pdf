import { decompress } from '@/lib/compress';
import { examples } from '@/lib/examples';

export const DEFAULT_EXAMPLE = 'page-wrap';

// An empty example name means the code came from `?code=`.
export function initialState(params: URLSearchParams): {
  code: string;
  example: string;
} {
  const encoded = params.get('code');
  const decoded = encoded ? decompress(encoded) : '';
  if (decoded) return { code: decoded, example: '' };

  const name = params.get('example');
  const example =
    name && Object.hasOwn(examples, name) ? name : DEFAULT_EXAMPLE;

  return { code: examples[example], example };
}
