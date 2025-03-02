import { SafeStyle, Style } from '@react-pdf/stylesheet';
import * as P from '@react-pdf/primitives';
import { YogaNode } from 'yoga-layout/load';

import { Box, NodeProps, Origin } from './base';
import { Image } from '@react-pdf/image';

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

interface BaseImageProps extends NodeProps {
  cache?: boolean;
  x?: number;
  y?: number;
}

interface ImageWithSrcProp extends BaseImageProps {
  src: SourceObject;
  source?: never;
}

interface ImageWithSourceProp extends BaseImageProps {
  source: SourceObject;
  src?: never;
}

export type ImageProps = ImageWithSrcProp | ImageWithSourceProp;

export type ImageNode = {
  type: typeof P.Image;
  props: ImageProps;
  image?: Image;
  style?: Style | Style[];
  box?: Box;
  origin?: Origin;
  yogaNode?: YogaNode;
  children?: never[];
};

export type SafeImageNode = Omit<ImageNode, 'style'> & {
  style: SafeStyle;
};
