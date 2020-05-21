/* eslint react/prop-types: 0 */

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from 'react';

import styles from './styles';
import palette from './palette';
import { Text, View, PDFContext } from '../../dist/react-pdf.es.js';

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

  const pdf = useContext(PDFContext);
  const ref = useRef();
  const [bounds, setBounds] = useState(null);
  const onLayout = useCallback(() => {
    if (bounds === null) {
      const { width, height } = ref.current.box;
      setBounds({ width, height });
    }
  }, []);

  useEffect(() => {
    pdf.on('layout', onLayout);
    return () => {
      pdf.off('layout', onLayout);
    };
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
