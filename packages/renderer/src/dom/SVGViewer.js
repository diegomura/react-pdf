/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect } from 'react';

import useSVG from './useSVG';

const SVGPage = ({ value }) => {
  return (
    <div
      style={{ border: '1px solid gray', display: 'inline-block' }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
};

export const SVGViewer = ({ children }) => {
  const [layout, update] = useSVG({ document: children });

  useEffect(update, [children]);

  if (layout.loading || !layout.value) return <div>Loading...</div>;

  return layout.value.map(value => <SVGPage value={value} />);
};

export default SVGViewer;
