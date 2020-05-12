/* eslint react/prop-types: 0 */

import React, { useRef, useState, useEffect } from 'react';

import styles from './styles';
import palette from './palette';
import { Text, View } from '../../dist/react-pdf.es.js';

const toggle = direction => (direction === 'column' ? 'row' : 'column');

// Creates Fractal Component that renders it's step with a background color
const Fractal = ({ steps, direction = 'column' }) => {
  if (steps === 0) {
    return null;
  }

  const fractalStyle = {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: palette[steps],
  };

  const [bounds, setBounds] = useState(null);
  const ref = useRef();
  useEffect(() => {
    if (ref.current.prevBox !== undefined) {
      const { width, height } = ref.current.prevBox;
      if (bounds === null) {
        setBounds({ width, height });
      }
    }
  }, []);

  return (
    <View ref={ref} style={styles[direction]}>
      <Fractal direction={toggle(direction)} steps={steps - 1} />
      <View style={fractalStyle}>
        <Text style={styles.text}>
          {steps}
          {bounds !== null &&
            ` (${Math.round(bounds.width)}x${Math.round(bounds.height)})`}
        </Text>
      </View>
    </View>
  );
};

export default Fractal;
