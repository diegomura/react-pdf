/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-props-no-spreading */

import renderPDF from '@react-pdf/render';
import * as primitives from '@react-pdf/primitives';
import React, { useEffect, useRef, useState } from 'react';

import { pdf, version, Font, StyleSheet } from './index';

const queue = require('queue');

export const usePDF = ({ document }) => {
  const pdfInstance = useRef(null);

  const previousUrl = useRef(null);

  const [state, setState] = useState({
    url: null,
    blob: null,
    error: null,
    loading: false,
  });

  // Setup rendering queue
  useEffect(() => {
    const renderQueue = queue({ autostart: true, concurrency: 1 });

    const queueDocumentRender = () => {
      setState(prev => ({ ...prev, loading: true }));

      renderQueue.splice(0, renderQueue.length, () =>
        state.error ? Promise.resolve() : pdfInstance.current.toBlob(),
      );
    };

    const onRenderFailed = error => {
      console.error(error);
      setState(prev => ({ ...prev, error }));
    };

    const onRenderSuccessful = blob => {
      previousUrl.current = state.url;

      setState({
        blob,
        error: null,
        loading: false,
        url: URL.createObjectURL(blob),
      });
    };

    pdfInstance.current = pdf(null, queueDocumentRender);
    pdfInstance.current.updateContainer(document);

    renderQueue.on('error', onRenderFailed);
    renderQueue.on('success', onRenderSuccessful);

    return () => {
      renderQueue.end();
    };
  }, []);

  // Revoke old unused url instances
  useEffect(() => {
    if (previousUrl.current) URL.revokeObjectURL(previousUrl.current);
  }, [state.blob]);

  const update = () => {
    pdfInstance.current.updateContainer(document);
  };

  return [state, update];
};

export const useLayout = ({ document }) => {
  const pdfInstance = useRef(null);

  const [state, setState] = useState({
    value: null,
    error: null,
    loading: false,
  });

  // Setup rendering queue
  useEffect(() => {
    const renderQueue = queue({ autostart: true, concurrency: 1 });

    const queueDocumentRender = () => {
      setState(prev => ({ ...prev, loading: true }));

      renderQueue.splice(0, renderQueue.length, () =>
        state.error ? Promise.resolve() : pdfInstance.current.layout(),
      );
    };

    const onRenderFailed = error => {
      console.error(error);
      setState(prev => ({ ...prev, error }));
    };

    const onRenderSuccessful = value => {
      setState({
        value,
        error: null,
        loading: false,
      });
    };

    pdfInstance.current = pdf(null, queueDocumentRender);
    pdfInstance.current.updateContainer(document);

    renderQueue.on('error', onRenderFailed);
    renderQueue.on('success', onRenderSuccessful);

    return () => {
      renderQueue.end();
    };
  }, []);

  const update = () => {
    pdfInstance.current.updateContainer(document);
  };

  return [state, update];
};

export const BlobProvider = ({ document: doc, children }) => {
  const [instance, updateInstance] = usePDF({ document });

  useEffect(updateInstance, [doc]);

  if (!doc) {
    console.warn('You should pass a valid document to BlobProvider');
    return null;
  }

  return children(instance);
};

export const PDFViewer = ({
  title,
  style,
  className,
  children,
  innerRef,
  ...props
}) => {
  const [instance, updateInstance] = usePDF({ document: children });

  useEffect(updateInstance, [children]);

  return (
    <iframe
      title={title}
      ref={innerRef}
      style={style}
      src={instance.url}
      className={className}
      {...props}
    />
  );
};

const canvasInstance = ctx => {
  ctx.fillStyle = 'white';

  const instance = {
    save: () => {
      ctx.save();
      return instance;
    },
    clip: () => {
      ctx.clip();
      return instance;
    },
    fill: () => {
      ctx.fill();
      return instance;
    },
    stroke: () => {
      ctx.stroke();
      return instance;
    },
    restore: () => {
      ctx.restore();
      return instance;
    },
    closePath: () => {
      ctx.closePath();
      return instance;
    },
    moveTo: (x, y) => {
      ctx.moveTo(x, y);
      return instance;
    },
    lineTo: (x, y) => {
      ctx.lineTo(x, y);
      return instance;
    },
    fillColor: color => {
      ctx.fillStyle = color;
      return instance;
    },
    strokeColor: color => {
      ctx.strokeStyle = color;
      return instance;
    },
    lineWidth: width => {
      ctx.lineWidth = width;
      return instance;
    },
    undash: () => {
      ctx.setLineDash([]);
      return instance;
    },
    opacity: opacity => {
      ctx.globalAlpha = opacity;
      return instance;
    },
    strokeOpacity: opacity => {
      ctx.globalAlpha = opacity;
      return instance;
    },
    fillOpacity: opacity => {
      ctx.globalAlpha = opacity;
      return instance;
    },
    translate: (left, top) => {
      ctx.translate(left, top);
      return instance;
    },
    rect: (x, y, width, height) => {
      ctx.beginPath();
      ctx.rect(x, y, width, height);
      return instance;
    },
    bezierCurveTo: (cp1x, cp1y, cp2x, cp2y, x, y) => {
      ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
      return instance;
    },
    end: () => {
      return instance;
    },
    addPage: ({ size }) => {
      ctx.save();
      ctx.beginPath();
      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, size[0], size[1]);
      ctx.restore();
      return instance;
    },
    info: {},
    //TODO
    fontSize: () => {
      return instance;
    },
    text: () => {
      return instance;
    },

    circle: () => {
      return instance;
    },
  };

  return instance;
};

const CanvasPage = props => {
  const canvasRef = useRef(null);

  useEffect(() => {
    canvasRef.current.width = props.box.width;
    canvasRef.current.height = props.box.height;

    const ctx = canvasRef.current.getContext('2d');
    const instance = canvasInstance(ctx);
    const doc = { children: [props] };

    renderPDF(instance, doc);
  }, []);

  console.log(props);

  return <canvas ref={canvasRef} />;
};

export const CanvasViewer = ({ children }) => {
  const [layout, relayout] = useLayout({ document: children });

  useEffect(relayout, [children]);

  if (layout.error) return <div>{layout.error}</div>;

  if (layout.loading) return <div>Loading...</div>;

  return (
    <div style={{ backgroundColor: 'gray' }}>
      {layout.value?.children.map((page, i) => (
        <CanvasPage key={i} {...page} />
      ))}
    </div>
  );
};

export const PDFDownloadLink = ({
  style,
  children,
  className,
  document: doc,
  fileName = 'document.pdf',
}) => {
  const [instance, updateInstance] = usePDF({ document: doc });

  useEffect(updateInstance, [children]);

  if (!doc) {
    console.warn('You should pass a valid document to PDFDownloadLink');
    return null;
  }

  const handleDownloadIE = () => {
    if (window.navigator.msSaveBlob) {
      // IE
      window.navigator.msSaveBlob(instance.blob, fileName);
    }
  };

  return (
    <a
      style={style}
      href={instance.url}
      download={fileName}
      className={className}
      onClick={handleDownloadIE}
    >
      {typeof children === 'function' ? children(instance) : children}
    </a>
  );
};

const throwEnvironmentError = name => {
  throw new Error(
    `${name} is a Node specific API. You're either using this method in a browser, or your bundler is not loading react-pdf from the appropriate web build.`,
  );
};

export const renderToStream = () => {
  throwEnvironmentError('renderToStream');
};

export const renderToString = () => {
  throwEnvironmentError('renderToString');
};

export const renderToFile = () => {
  throwEnvironmentError('renderToFile');
};

export const render = () => {
  throwEnvironmentError('render');
};

export * from './index';

export * from '@react-pdf/primitives';

export default {
  pdf,
  usePDF,
  useLayout,
  Font,
  version,
  StyleSheet,
  PDFViewer,
  CanvasViewer,
  BlobProvider,
  PDFDownloadLink,
  renderToStream,
  renderToString,
  renderToFile,
  render,
  ...primitives,
};
