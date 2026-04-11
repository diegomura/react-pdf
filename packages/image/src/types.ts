import type { SvgNode } from '@react-pdf/svg';

export interface RasterImage {
  width: number;
  height: number;
  data: Buffer;
  format: 'jpeg' | 'png';
  key?: string;
}

export type ImageFormat = 'jpg' | 'jpeg' | 'png' | 'svg';

export type Viewbox = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export interface SvgImage {
  width: number;
  height: number;
  data: string;
  format: 'svg';
  viewBox?: Viewbox;
  children: SvgNode[];
  key?: string;
}

export type Image = RasterImage | SvgImage;

export type DataImageSrc = {
  data: Buffer;
  format: ImageFormat;
};

export type LocalImageSrc = {
  uri: string;
  format?: ImageFormat;
};

export type RemoteImageSrc = {
  uri: string;
  method?: 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  format?: ImageFormat;
  body?: any;
  credentials?: 'omit' | 'same-origin' | 'include';
};

export type Base64ImageSrc = {
  uri: `data:image${string}`;
};

export type ImageSrc =
  | Blob
  | Buffer
  | DataImageSrc
  | LocalImageSrc
  | RemoteImageSrc
  | Base64ImageSrc;
