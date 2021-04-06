type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type SourceObject =
  | string
  | { data: Buffer; format: 'png' | 'jpg' }
  | { uri: string; method: HTTPMethod; body: any; headers: any };
