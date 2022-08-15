type HTTPMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

type SourceURL = string

type SourceBuffer = Buffer

type SourceDataBuffer = { data: Buffer; format: 'png' | 'jpg' }

type SourceURLObject =  { uri: string; method: HTTPMethod; body: any; headers: any }

type Source =
  | SourceURL
  | SourceBuffer
  | SourceDataBuffer
  | SourceURLObject
  | undefined

type SourceFactory = () => Source

type SourceAsync = Promise<Source>

type SourceAsyncFactory = () => Promise<Source>

export type SourceObject = Source | SourceFactory | SourceAsync | SourceAsyncFactory
