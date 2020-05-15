import React from 'react';
import BlobStream from 'blob-stream';
import PDFDocument from '@react-pdf/pdfkit';
import Font from './font';
import renderPDF from './render';
import layoutDocument from './layout';
import createRenderer from './renderer';
import StyleSheet from './stylesheet';
import propsEqual from './utils/propsEqual';
import { version } from '../package.json';
import {
  ROOT,
  SUSPENDED,
  VIEW,
  TEXT,
  LINK,
  PAGE,
  NOTE,
  IMAGE,
  DOCUMENT,
  CANVAS,
  SVG,
  GROUP,
  PATH,
  RECT,
  LINE,
  CIRCLE,
  ELLIPSE,
  POLYGON,
  POLYLINE,
  DEFS,
  TSPAN,
  CLIP_PATH,
  STOP,
  LINEAR_GRADIENT,
  RADIAL_GRADIENT,
} from './constants';

const View = VIEW;
const Text = TEXT;
const Link = LINK;
const Page = PAGE;
const Note = NOTE;
const Image = IMAGE;
const Document = DOCUMENT;
const Canvas = CANVAS;
const Svg = SVG;
const G = GROUP;
const Path = PATH;
const Rect = RECT;
const Line = LINE;
const Circle = CIRCLE;
const Ellipse = ELLIPSE;
const Polygon = POLYGON;
const Polyline = POLYLINE;
const Defs = DEFS;
const Tspan = TSPAN;
const ClipPath = CLIP_PATH;
const Stop = STOP;
const LinearGradient = LINEAR_GRADIENT;
const RadialGradient = RADIAL_GRADIENT;

const pdf = ({ initialValue, maxPasses = Number.MAX_SAFE_INTEGER }) => {
  const performLayout = async (existingLayout, pass) => {
    console.time('react');
    const container = { type: ROOT, suspended: false, document: null };
    const PDFRenderer = createRenderer(existingLayout, pass);
    const mountNode = PDFRenderer.createContainer(container);
    const root = React.createElement(
      React.Suspense,
      { fallback: React.createElement(SUSPENDED) },
      initialValue,
    );
    PDFRenderer.updateContainer(root, mountNode);
    PDFRenderer.flushPassiveEffects();
    while (container.suspended) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    console.timeEnd('react');
    console.time('layout');
    const layout = await layoutDocument(container.document);
    console.timeEnd('layout');
    return layout;
  };

  const render = async () => {
    console.time('render');
    let prevLayout = await performLayout(null, 0);
    for (let pass = 1; pass < maxPasses; pass++) {
      const nextLayout = await performLayout(prevLayout, pass);
      if (propsEqual(nextLayout, prevLayout)) {
        const ctx = new PDFDocument({ autoFirstPage: false });
        console.timeEnd('render');
        return renderPDF(ctx, nextLayout);
      } else {
        prevLayout = nextLayout;
      }
    }
  };

  async function toBlob() {
    const instance = await render();
    const stream = instance.pipe(BlobStream());

    return new Promise((resolve, reject) => {
      stream.on('finish', () => {
        try {
          const blob = stream.toBlob('application/pdf');
          resolve(blob);
        } catch (error) {
          reject(error);
        }
      });

      stream.on('error', reject);
    });
  }

  async function toBuffer() {
    return render();
  }

  function toString() {
    let result = '';
    const instance = render();

    return new Promise((resolve, reject) => {
      try {
        instance.on('data', function(buffer) {
          result += buffer;
        });

        instance.on('end', function() {
          resolve(result);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  return {
    toBuffer,
    toBlob,
    toString,
  };
};

export {
  version,
  View,
  Text,
  Link,
  Page,
  Font,
  Note,
  Image,
  Document,
  Canvas,
  Svg,
  G,
  Path,
  Rect,
  Line,
  Circle,
  Ellipse,
  Polygon,
  Defs,
  Tspan,
  ClipPath,
  Polyline,
  Stop,
  LinearGradient,
  RadialGradient,
  StyleSheet,
  pdf,
};
