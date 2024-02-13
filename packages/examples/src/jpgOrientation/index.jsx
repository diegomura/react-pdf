import React from 'react';
import { Document, Page, Image, View } from '@react-pdf/renderer';

import Orientation1 from './images/orientation-1.jpeg';
import Orientation2 from './images/orientation-2.jpeg';
import Orientation3 from './images/orientation-3.jpeg';
import Orientation4 from './images/orientation-4.jpeg';
import Orientation5 from './images/orientation-5.jpeg';
import Orientation6 from './images/orientation-6.jpeg';
import Orientation7 from './images/orientation-7.jpeg';
import Orientation8 from './images/orientation-8.jpeg';

const Emoji = () => (
  <Document>
    <Page>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        <Image src={Orientation1} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation2} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation3} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation4} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation5} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation6} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation7} style={{ width: 220, margin: 5 }} />
        <Image src={Orientation8} style={{ width: 220, margin: 5 }} />
      </View>
    </Page>
  </Document>
);

export default Emoji;
