type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type SourceURL = string;

type SourceBuffer = Buffer;

type SourceBlob = Blob;

type SourceDataBuffer = { data: Buffer; format: 'png' | 'jpg' };

type SourceURLObject = {
  uri: string;
  method?: HTTPMethod;
  body?: any;
  headers?: any;
  credentials?: 'omit' | 'same-origin' | 'include';
};

type Source =
  | SourceURL
  | SourceBuffer
  | SourceBlob
  | SourceDataBuffer
  | SourceURLObject
  | undefined;

type SourceFactory = () => Source;

type SourceAsync = Promise<Source>;

type SourceAsyncFactory = () => Promise<Source>;

export type SourceObject =
  | Source
  | SourceFactory
  | SourceAsync
  | SourceAsyncFactory;
