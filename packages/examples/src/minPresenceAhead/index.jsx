import React from 'react';
import { Document, Page, View, Text } from '@react-pdf/renderer';

const palette = [
  '#781c81',
  '#521b80',
  '#442f8b',
  '#3f4c9f',
  '#4069b4',
  '#4582c1',
  '#4e96bd',
  '#5aa6a9',
  '#68b090',
  '#7ab878',
  '#8dbc64',
  '#a2be56',
];

const MinPresenceAhead = () => (
  <Document>
    <Page style={{ padding: 20 }}>
      {palette.map((color, i) => {
        const minPresenceAhead = i === 8 ? 82 : 0;

        return (
          <View
            key={color}
            wrap={false}
            minPresenceAhead={i === 8 ? 90 : 0}
            style={{
              width: '100%',
              height: 80,
              color: 'white',
              backgroundColor: color,
            }}
          >
            <Text>Index: {i}</Text>
            <Text>MinPresenceAhead: {minPresenceAhead}</Text>
          </View>
        );
      })}
    </Page>
  </Document>
);

export default MinPresenceAhead;
