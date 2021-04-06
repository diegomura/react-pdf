import './index.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

import Svg from './svg';
import GoTo from './goTo';
import Text from './text';
import Knobs from './knobs';
import Resume from './resume';
import Fractals from './fractals';
import PageWrap from './pageWrap';

const MOUNT_ELEMENT = document.getElementById('root');

const EXAMPLES = {
  svg: Svg,
  goTo: GoTo,
  text: Text,
  knobs: Knobs,
  resume: Resume,
  pageWrap: PageWrap,
  fractals: Fractals,
};

const Viewer = () => {
  const [example, setExample] = useState('pageWrap');

  console.log(example);

  const handleExampleChange = e => {
    setExample(e.target.dataset.name);
  };

  const Document = EXAMPLES[example];

  return (
    <div className="wrapper">
      <h2>Examples</h2>

      <ul>
        {Object.keys(EXAMPLES).map(value => (
          <li
            key={value}
            data-name={value}
            role="presentation"
            onClick={handleExampleChange}
          >
            {value}
          </li>
        ))}
      </ul>

      <PDFViewer style={{ flex: 1 }}>
        <Document />
      </PDFViewer>
    </div>
  );
};

ReactDOM.render(<Viewer />, MOUNT_ELEMENT);
