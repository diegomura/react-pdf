import React from 'react';

const svgpath = require('svgpath');

import { pdf } from './index';

const queue = require('queue');

const canvasInstance = canvas => {
  const instance = {};
  const images = {};
  const ctx = canvas.getContext('2d');

  let fillColor = 'white';

  const nil = () => {
    return instance;
  };

  instance.info = {};
  instance.end = nil;
  instance.font = nil;

  instance.translate = (x, y) => {
    ctx.translate(x, y);
    return instance;
  };

  instance.addPage = ({ size }) => {
    canvas.width = size[0];
    canvas.height = size[1];

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  instance.save = () => {
    ctx.save();
    return instance;
  };

  instance.restore = () => {
    ctx.restore();
    return instance;
  };

  instance.moveTo = (x, y) => {
    ctx.moveTo(x, y);
    return instance;
  };

  instance.lineTo = (x, y) => {
    ctx.lineTo(x, y);
    return instance;
  };

  instance.bezierCurveTo = (a, b, c, d, e, f) => {
    ctx.bezierCurveTo(a, b, c, d, e, f);
    return instance;
  };

  instance.closePath = () => {
    ctx.closePath();
    return instance;
  };

  instance.clip = () => {
    ctx.clip();
    return instance;
  };

  instance.fillColor = color => {
    fillColor = color;
    return instance;
  };

  instance.rect = (a, b, c, d) => {
    ctx.rect(a, b, c, d);
    return instance;
  };

  instance.fill = () => {
    ctx.fillStyle = fillColor;
    ctx.fill();
    return instance;
  };

  instance.fillOpacity = opacity => {
    ctx.globalAlpha = opacity;
    return instance;
  };

  instance._addGlyphs = (glyphs, positions) => {
    let xAdvance = 0;
    const fontSize = 20;
    const unitsPerEm = 2048;

    for (let i = 0; i < glyphs.length; i++) {
      const glyph = glyphs[i];
      const position = positions[i];

      const path = svgpath(glyph.path.toSVG())
        .scale(1, -1)
        .scale(fontSize / unitsPerEm)
        .translate(xAdvance, 0)
        .toString();

      xAdvance += position.xAdvance;

      ctx.fillStyle = '#000';

      const p = new Path2D(path);

      ctx.stroke(p);
      ctx.fill(p);
    }

    return instance;
  };

  instance.image = (data, x, y, { width, height }) => {
    const base64Data = btoa(String.fromCharCode.apply(null, data));

    if (images[base64Data]) {
      ctx.drawImage(images[base64Data], x, y, width, height);
    } else {
      const img = document.createElement('img');
      img.src = 'data:image/png;base64,' + base64Data;

      images[base64Data] = img;

      img.onload = () => {
        ctx.drawImage(img, x, y, width, height);
      };
    }

    return instance;
  };

  instance.clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return instance;
};

export class CanvasViewer extends React.Component {
  ctx = null;
  instance = pdf();
  renderQueue = queue({ autostart: true, concurrency: 1 });
  state = { layout: null, error: null };

  componentDidMount() {
    this.ctx = canvasInstance(this.canvas);
    this.queueDocumentRender(this.props.children);

    this.renderQueue.on('error', this.onRenderFailed);
    this.renderQueue.on('success', this.onRenderSuccessful);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.queueDocumentRender(this.props.children);
    }
  }

  componentWillUnmount() {
    this.renderQueue.end();
  }

  queueDocumentRender(doc) {
    this.renderQueue.splice(0, this.renderQueue.length, () => {
      this.instance.updateContainer(doc);

      if (this.instance.isDirty() && !this.state.error) {
        return this.instance.renderWithContext(this.ctx);
      }

      return Promise.resolve();
    });
  }

  onRenderFailed = error => {
    this.setState({ error });
    console.error(error);
  };

  onRenderSuccessful = layout => {
    this.setState({ layout });
  };

  render() {
    return (
      <canvas
        height={900}
        id="myCanvas"
        ref={ref => (this.canvas = ref)}
        style={{ border: '1px solid black' }}
        width={900}
      />
    );
  }
}
